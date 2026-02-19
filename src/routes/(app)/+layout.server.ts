import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (!cookies.get('allowed') && !cookies.get('adminAllowed')) {
		throw redirect(302, '/auth/login');
	}

	const page = url.pathname;

	const admin = cookies.get('adminAllowed');

	const authenticatedUser = cookies.get('user_email');

	let user;

	try {
		user = await prisma.user.findUnique({
			where: {
				email: authenticatedUser
			}
		});
	} catch (error) {
		console.log('Error fiding user.');
	}

	return {
		adminUser: admin === 'true',
		page,
		user
	};
};
