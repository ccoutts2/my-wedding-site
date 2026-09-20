import { DietaryOptions } from '../../../../generated/prisma/enums';
import { message, superValidate } from 'sveltekit-superforms';
import { redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod/v4';
import { zod4 } from 'sveltekit-superforms/adapters';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

const buildSchema = () =>
	z
		.object({
			acceptance: z.string().min(1, 'Please select an option.'),
			meal: z.enum(DietaryOptions).optional(),
			allergies: z.string(),
			allergiesDescription: z.string().optional(),
			guestResponses: z
				.object({
					id: z.number(),
					acceptance: z.string().min(1, 'Please select an option.'),
					meal: z.enum(DietaryOptions).optional(),
					allergies: z.string().optional(),
					allergiesDescription: z.string().optional()
				})
				.array()
		})
		.superRefine((data, ctx) => {
			if (data.acceptance === 'yes') {
				if (!data.meal || data.meal === undefined) {
					ctx.addIssue({
						code: 'custom',
						minimum: 1,
						message: 'Please select a meal option.',
						path: ['meal']
					});
				}

				if (!data.allergies || data.allergies === '') {
					ctx.addIssue({
						code: 'custom',
						minimum: 1,
						message: 'Please select an option.',
						path: ['allergies']
					});
				}
			}

			data.guestResponses.map((guest, i) => {
				if (guest.acceptance === 'yes') {
					if (!guest.meal) {
						ctx.addIssue({
							code: 'custom',
							message: 'Please select a meal option.',
							path: ['guestResponses', i, 'meal']
						});
					}

					if (!guest.allergies) {
						ctx.addIssue({
							code: 'custom',
							message: 'Please select an option.',
							path: ['guestResponses', i, 'allergies']
						});
					}
				}
			});
		});

export const load: PageServerLoad = async ({ cookies }) => {
	const email = cookies.get('user_email');

	if (!email) {
		throw redirect(302, '/auth/check-invitation');
	}

	const user = await prisma.user.findUnique({
		where: { email }
	});

	if (!user) {
		cookies.delete('user_email', {
			path: '/'
		});

		throw redirect(302, '/');
	}

	if (user.RSVP) {
		throw redirect(302, `/rsvp/${user.id}/edit`);
	}

	const additionalGuests = await prisma.guest.findMany({
		where: { userId: user?.id }
	});

	let guestResponses = [];

	guestResponses = additionalGuests.map((guest) => ({
		id: guest.id,
		acceptance: '',
		meal: undefined,
		allergies: '',
		allergiesDescription: ''
	}));

	const schema = buildSchema();

	const form = await superValidate({ guestResponses }, zod4(schema), {
		errors: false
	});

	return {
		user,
		form,
		guestResponses,
		additionalGuests
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const email = cookies.get('user_email');

		let user, form;

		try {
			user = await prisma.user.findUnique({
				where: { email },
				include: { guest: true }
			});

			form = await superValidate(request, zod4(buildSchema()));
		} catch (error) {
			console.log(error);
			const fallbackForm = await superValidate(zod4(buildSchema()));
			return message(
				fallbackForm,
				{ status: 'error', text: 'Something went wrong. Please try again.' },
				{ status: 500 }
			);
		}

		if (!user) {
			return message(form, { status: 'error', text: 'User not found.' }, { status: 404 });
		}

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form could not be sent. Please fill in the necessary fields.'
			});
		}

		try {
			const validGuestIds = new Set(user.guest.map((g) => g.id));

			for (const response of form.data.guestResponses) {
				if (!validGuestIds.has(response.id)) {
					return message(form, { status: 'error', text: 'Invalid guest.' }, { status: 403 });
				}
			}

			await prisma.user.update({
				where: { email },
				data: {
					RSVP: true,
					isAccepted: form.data.acceptance === 'yes',
					diet: form.data.meal,
					hasAllergies: form.data.allergies === 'yes',
					allergiesDescription: form.data.allergiesDescription
				}
			});

			for (const response of form.data.guestResponses) {
				const isGuestAttending = response.acceptance === 'yes';

				await prisma.guest.update({
					where: { id: response.id },
					data: {
						isAccepted: isGuestAttending,
						diet: isGuestAttending ? response.meal : null,
						hasAllergies: isGuestAttending ? response.allergies === 'yes' : null,
						allergiesDescription: isGuestAttending ? response.allergiesDescription : null
					}
				});
			}
		} catch (error) {
			console.log(error);
			return message(
				form,
				{
					status: 'error',
					text: 'Something went wrong. Please try again.'
				},
				{
					status: 500
				}
			);
		}

		return message(form, {
			status: 'success',
			text: "Thanks for filling in the form. That's us got your choices!"
		});
	}
} satisfies Actions;
