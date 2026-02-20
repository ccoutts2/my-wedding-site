import { DietaryOptions } from '../../../../../../generated/prisma/enums';
import { message, superValidate } from 'sveltekit-superforms';
import { redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod/v4';
import { zod4 } from 'sveltekit-superforms/adapters';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from '../$types';

const schema = z
	.object({
		acceptance: z.string().min(1, 'Please select an option.'),
		meal: z.enum(DietaryOptions).optional(),
		allergies: z.string().optional(),
		allergiesDescription: z.string().optional(),
		music: z.string().optional(),
		guestResponses: z
			.object({
				id: z.number(),
				meal: z.enum(DietaryOptions).optional(),
				acceptance: z.string().min(1, 'Please select an option.'),
				allergies: z.string().optional(),
				allergiesDescription: z.string().optional(),
				music: z.string().optional()
			})
			.array()
	})
	.superRefine((data, ctx) => {
		if (data.acceptance === 'yes') {
			if (!data.meal) {
				ctx.addIssue({
					code: 'custom',
					message: 'Please select a meal option.',
					path: ['meal']
				});
			}

			if (!data.allergies) {
				ctx.addIssue({
					code: 'custom',
					message: 'Please select an option.',
					path: ['allergies']
				});
			}

			if (!data.music) {
				ctx.addIssue({
					code: 'custom',
					message: 'Please tell us!',
					path: ['music']
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

				if (!guest.music) {
					ctx.addIssue({
						code: 'custom',
						message: 'Please tell us!',
						path: ['guestResponses', i, 'music']
					});
				}
			}
		});
	});

export const load: PageServerLoad = async ({ cookies, params }) => {
	const email = cookies.get('user_email');

	if (!email) {
		throw redirect(302, '/auth/check-invitation');
	}

	const user = await prisma.user.findUnique({
		where: { id: params.id },
		include: {
			guest: true
		}
	});

	if (!user || user.email !== email) {
		cookies.delete('user_email', {
			path: '/'
		});

		throw redirect(302, '/');
	}

	const initialData = {
		acceptance: user.isAccepted === true ? 'yes' : user.isAccepted === false ? 'no' : '',
		meal: user.diet ?? undefined,
		allergies: user.hasAllergies === true ? 'yes' : user.hasAllergies === false ? 'no' : '',
		allergiesDescription: user.allergiesDescription ?? '',
		music: user.musicSelection ?? '',

		guestResponses: user.guest.map((guest) => ({
			id: guest.id,
			acceptance: guest.isAccepted === true ? 'yes' : guest.isAccepted === false ? 'no' : '',
			meal: guest.diet ?? undefined,
			allergies: guest.hasAllergies === true ? 'yes' : guest.hasAllergies === false ? 'no' : '',
			allergiesDescription: guest.allergiesDescription ?? '',
			music: guest.musicSelection ?? ''
		}))
	};

	// Pass the initialData to superValidate
	const form = await superValidate(initialData, zod4(schema), {
		errors: false
	});

	return {
		user,
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(schema));
		const email = cookies.get('user_email');

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form was invalid. Please check the form for errors.'
			});
		}

		try {
			const user = await prisma.user.findUnique({
				where: { email: email },
				include: { guest: true }
			});

			if (!user) {
				return message(form, { status: 'error', text: 'User not found.' }, { status: 404 });
			}

			const validGuestIds = new Set(user.guest.map((g) => g.id));

			await prisma.user.update({
				where: { email },
				data: {
					RSVP: true,
					isAccepted: form.data.acceptance === 'yes',
					diet: form.data.meal,
					hasAllergies: form.data.allergies === 'yes',
					allergiesDescription: form.data.allergiesDescription,
					musicSelection: form.data.music
				}
			});

			for (const response of form.data.guestResponses) {
				if (!validGuestIds.has(response.id)) {
					return message(form, { status: 'error', text: 'Invalid guest.' }, { status: 403 });
				}

				await prisma.guest.update({
					where: { id: response.id },
					data: {
						isAccepted: response.acceptance === 'yes',
						diet: response.meal,
						hasAllergies: response.allergies === 'yes',
						allergiesDescription: response.allergiesDescription,
						musicSelection: response.music
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
