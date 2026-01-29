import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { z } from 'zod/v4';

const ORDER_BY_OPTIONS = ['givenName', 'diet', 'isAccepted'] as const;

const querySchema = z.object({
	query: z.string().nullable(),
	orderBy: z.enum(ORDER_BY_OPTIONS),
	ascending: z
		.string()
		.nullable()
		.transform((value) => value !== 'false')
});

export const load: LayoutServerLoad = async ({ url, setHeaders }) => {
	const { query, orderBy, ascending } = querySchema.parse({
		query: url.searchParams.get('q'),
		orderBy: url.searchParams.get('orderBy') || ORDER_BY_OPTIONS[0],
		ascending: url.searchParams.get('asc')
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
		query,
		sorting: {
			orderBy,
			ascending
		}
	};
};
