import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
		throw redirect(302, '/admin/view-guests');
	}

	return {
		user
	};
};
