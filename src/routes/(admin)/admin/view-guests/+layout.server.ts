import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { z } from 'zod/v4';

const ORDER_BY_OPTIONS = ['givenName', 'diet', 'isAccepted'] as const;

const querySchema = z.object({
	query: z.string().nullable(),
	orderBy: z.enum(ORDER_BY_OPTIONS),
	ascending: z.coerce.boolean().nullable().default(true)
});

export const load: LayoutServerLoad = async ({ url, setHeaders }) => {
	const { query, orderBy, ascending } = querySchema.parse({
		query: url.searchParams.get('q'),
		orderBy: url.searchParams.get('orderBy') || ORDER_BY_OPTIONS[0],
		ascending: url.searchParams.get('asc') || true
	});

	const users = await prisma.user.findMany({
		where: {
			OR: query
				? [
						{
							familyName: {
								contains: query,
								mode: 'insensitive'
							}
						},
						{
							givenName: {
								contains: query,
								mode: 'insensitive'
							}
						}
					]
				: undefined
		},

		orderBy: {
			[orderBy]: ascending ? 'asc' : 'desc'
		}
	});

	setHeaders({
		'cache-control': 'private, max-age=10'
	});

	return {
		users,
		query
	};
};
