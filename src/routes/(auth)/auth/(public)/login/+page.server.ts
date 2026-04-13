import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { redirect, type Actions } from '@sveltejs/kit';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { ADMIN_PASSWORD, GUEST_PASSWORD } from '$env/static/private';

const emailSchema = z
	.object({
		password: z.string('Incorrect password. Please try again.').trim()
	})
	.refine((data) => data.password === GUEST_PASSWORD || data.password === ADMIN_PASSWORD, {
		message: 'Password is incorrect.'
	});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(emailSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(emailSchema));

		if (!form.valid) {
			return message(
				form,
				{
					status: 'invalid',
					text: 'Password was incorrect. Please try again.'
				},
				{
					status: 400
				}
			);
		}

		if (form.data.password === GUEST_PASSWORD) {
			cookies.set('allowed', 'true', {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				secure: true,
				sameSite: 'lax'
			});

			throw redirect(302, '/');
		}

		if (form.data.password === ADMIN_PASSWORD) {
			cookies.set('adminAllowed', 'true', {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				secure: true,
				sameSite: 'lax'
			});

			throw redirect(302, '/');
		}

		return message(
			form,
			{
				status: 'error',
				text: 'Something went wrong. Please try again'
			},
			{ status: 400 }
		);
	}
} satisfies Actions;
