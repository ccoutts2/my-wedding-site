import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { type Actions } from '@sveltejs/kit';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { GuestType } from '../../../../../generated/prisma/enums';

const schema = z.object({
	givenName: z.string().trim().min(1, 'You must enter a valid name.'),
	familyName: z.string().trim().min(1, 'You must enter a valid name.'),
	email: z.string().trim().pipe(z.email()),
	type: z.enum(GuestType),
	hasGuests: z.string().min(1, 'You must select an option'),
	additionalGuests: z
		.object({
			givenName: z.string().trim().min(1, 'You must enter a valid name.'),
			familyName: z.string().trim().min(1, 'You must enter a valid name.'),
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

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form is invalid. Please check the form for errors.'
			});
		}

		const emailCheck = await prisma.user.findUnique({
			where: {
				email: form.data.email
			}
		});

		if (emailCheck) {
			return message(form, {
				status: 'error',
				text: 'Email is already registered. Please enter a different email. '
			});
		}

		try {
			await prisma.$transaction(async (tx) => {
				const user = await tx.user.create({
					data: {
						givenName: form.data.givenName,
						familyName: form.data.familyName,
						email: form.data.email,
						type: form.data.type,
						hasGuests: form.data.hasGuests === 'yes',
						isAccepted: false,
						RSVP: false
					}
				});

				if (user.hasGuests) {
					await tx.guest.createMany({
						data: form.data.additionalGuests.map((guest) => ({
							userId: user.id,
							givenName: guest.givenName,
							familyName: guest.familyName,
							type: user.type,
							isAccepted: false
						}))
					});
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

		return message(form, { status: 'success', text: 'Form submitted successfully!' });
	}
} satisfies Actions;
