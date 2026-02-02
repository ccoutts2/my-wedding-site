import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';

const emailSchema = z.object({
	email: z.string().trim().pipe(z.email())
});

export const load: PageServerLoad = async ({ cookies }) => {
	const form = await superValidate(zod4(emailSchema));
	const email = cookies.get('user_email');

	if (email) {
		throw redirect(302, '/rsvp');
	}

	return {
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(emailSchema));
		const email = form.data.email;

		if (!form.valid) {
			return message(form, {
				status: 'invalid',
				text: 'Form was invalid. Please check the form for errors.'
			});
		}
		try {
			const user = await prisma.user.findUnique({
				where: {
					email: email
				}
			});

			if (!user) {
				return message(
					form,
					{
						status: 'error',
						text: 'Invalid user. Please try again.'
					},
					{
						status: 400
					}
				);
			}

			if (user) {
				cookies.set('user_email', email, {
					path: '/',
					maxAge: 60 * 60 * 24 * 365,
					httpOnly: true,
					secure: true,
					sameSite: 'lax'
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

		throw redirect(302, '/rsvp');
	}
} satisfies Actions;
