import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { GuestType } from '../../../../../../../generated/prisma/enums';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { message, superValidate } from 'sveltekit-superforms';
import { redirect, type Actions } from '@sveltejs/kit';

const schema = z.object({
	givenName: z.string().trim().min(1, 'You must enter a valid name.').optional(),
	familyName: z.string().trim().min(1, 'You must enter a valid name.').optional(),
	email: z.string().trim().pipe(z.email()).optional(),
	hasGuests: z.string().min(1, 'Please select an option.').optional(),
	type: z.enum(GuestType).optional(),
	additionalGuests: z
		.object({
			id: z.number(),
			givenName: z.string().min(1, 'You must enter a valid name.').optional(),
			familyName: z.string().min(1, 'You must enter a valid name.').optional(),
			type: z.enum(GuestType).optional()
		})
		.array()
});

export const load: PageServerLoad = async ({ params }) => {
	const userId = params.id;

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			guest: true
		}
	});

	if (!user) {
		throw Error('User not found');
	}

	const additionalGuestsData = user.guest.map((guest) => ({
		id: guest.id,
		givenName: guest.givenName ?? '',
		familyName: guest.familyName ?? '',
		type: guest.type ?? undefined
	}));

	const form = await superValidate(
		{
			givenName: user.givenName ?? '',
			familyName: user.familyName ?? '',
			email: user.email ?? '',
			hasGuests: user.hasGuests ? 'yes' : 'no',
			type: user.type ?? undefined,
			additionalGuests: additionalGuestsData
		},
		zod4(schema)
	);

	return {
		user,
		form
	};
};

export const actions = {
	edit: async ({ request, params }) => {
		const userId = params.id;

		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form was invalid. Please check the form for errors'
			});
		}

		try {
			await prisma.user.update({
				where: {
					id: userId
				},
				data: {
					givenName: form.data.givenName,
					familyName: form.data.familyName,
					email: form.data.email,
					hasGuests: form.data.hasGuests === 'yes',
					type: form.data.type
				}
			});
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

		throw redirect(302, `/admin/view-guests/${userId}`);
	},
	editGuest: async ({ request, params }) => {
		const userId = params.id;
		const form = await superValidate(request, zod4(schema));

		if (!form) {
			return message(form, {
				status: 'invalid',
				text: 'Form was invalid. Please check the form for errors.'
			});
		}

		try {
			for (const guest of form.data.additionalGuests) {
				await prisma.guest.update({
					where: {
						id: guest.id
					},
					data: {
						givenName: guest.givenName,
						familyName: guest.familyName,
						type: guest.type
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

		throw redirect(302, `/admin/view-guests/${userId}`);
	}
} satisfies Actions;
