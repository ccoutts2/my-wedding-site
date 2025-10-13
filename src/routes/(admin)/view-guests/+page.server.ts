import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const users = await prisma.user.findMany({});

	return {
		users
	};
};
