import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { DietaryOptions } from '../../../generated/prisma/enums';

const schema = z.object({
	acceptance: z.string().min(1, 'Please select an option.'),
	meal: z.enum(DietaryOptions),
	allergies: z.string().min(1, 'Please select an option.'),
	allergiesDescription: z.string().optional(),
	musicSelection: z.string().min(1, 'Please tell us!'),
	guestResponses: z
		.object({
			id: z.number(),
			meal: z.enum(DietaryOptions),
			acceptance: z.string().min(1, 'Please select an option.'),
			allergies: z.string().min(1, 'Please select an option.'),
			allergiesDescription: z.string().optional(),
			musicSelection: z.string().min(1, 'Please tell us!')
		})
		.array()
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

	const additionalGuests = await prisma.guest.findMany({
		where: { userId: user?.id }
	});

	let guestResponses = [];

	guestResponses = additionalGuests.map((guest) => ({
		id: guest.id,
		acceptance: '',
		meal: DietaryOptions.MEAT,
		allergies: '',
		allergiesDescription: '',
		musicSelection: ''
	}));

	const form = await superValidate({ guestResponses }, zod4(schema), {
		errors: false
	});

	return {
		user,
		form,
		guestResponses
	};
};

const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(schema));
		const email = cookies.get('user_email');

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form was invalid. Please check the form for errors'
			});
		}

		try {
			const user = await prisma.user.update({
				where: { email },
				include: { guest: true },
				data: {
					RSVP: true,
					isAccepted: form.data.acceptance === 'yes',
					diet: form.data.meal,
					hasAllergies: form.data.allergies === 'yes',
					allergiesDescription: form.data.allergiesDescription,
					musicSelection: form.data.musicSelection
				}
			});

			for (const response of form.data.guestResponses) {
				await prisma.guest.update({
					where: { id: response.id },
					data: {
						isAccepted: response.acceptance === 'yes',
						diet: response.meal,
						hasAllergies: response.allergies === 'yes',
						allergiesDescription: response.allergiesDescription,
						musicSelection: response.musicSelection
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
			text: 'You ave successfully submitted your RSVP form.'
		});
	}
} satisfies Actions;
