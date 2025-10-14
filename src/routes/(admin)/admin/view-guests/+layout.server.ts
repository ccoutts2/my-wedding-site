import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async () => {
	const users = await prisma.user.findMany({});

	return {
		users
	};
};
