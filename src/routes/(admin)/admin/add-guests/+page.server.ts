import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { type Actions } from '@sveltejs/kit';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { GuestType } from '../../../../generated/prisma/enums';

const schema = z.object({
	givenName: z.string().min(1, 'You must enter a valid name.'),
	familyName: z.string().min(1, 'You must enter a valid name.'),
	email: z.email(),
	type: z.enum(GuestType),
	hasGuests: z.string().min(1, 'You must select an option'),
	additionalGuests: z
		.object({
			givenName: z.string().min(1, 'You must enter a valid name.'),
			familyName: z.string().min(1, 'You must enter a valid name.'),
			type: z.enum(GuestType)
		})
		.array()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(schema), { errors: false });

	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));
		const emailCheck = await prisma.user.findUnique({
			where: {
				email: form.data.email
			}
		});

		if (!form.valid) {
			console.log(form.errors);
			return message(form, {
				status: 'invalid',
				message: 'Form is invalid. Please check the form for errors.'
			});
		}

		if (!emailCheck) {
			try {
				const user = await prisma.user.create({
					data: {
						givenName: form.data.givenName,
						familyName: form.data.familyName,
						email: form.data.email,
						type: form.data.type,
						hasGuests: form.data.hasGuests === 'yes',
						isAccepted: false,
						RSVP: false
					},
					include: {
						guest: true
					}
				});

				if (user.hasGuests) {
					for (const guest of form.data.additionalGuests) {
						await prisma.guest.create({
							data: {
								userId: user.id,
								givenName: guest.givenName,
								familyName: guest.familyName,
								type: user.type,
								isAccepted: false
							}
						});
					}
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
		}
		return message(form, { text: 'Guests added successfully!' });
	}
} satisfies Actions;
