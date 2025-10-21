import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';


const schema = 
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

	return {
		user
	};
};
