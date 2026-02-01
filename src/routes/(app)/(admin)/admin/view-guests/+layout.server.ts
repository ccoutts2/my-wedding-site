import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { z } from 'zod/v4';
import { redirect } from '@sveltejs/kit';
import { ITEMS_PER_PAGE, ORDER_BY_OPTIONS } from '$lib';

const querySchema = z.object({
	query: z.string().nullable(),
	orderBy: z.enum(ORDER_BY_OPTIONS),
	ascending: z
		.string()
		.nullable()
		.transform((value) => value !== 'false'),
	page: z.number().nullable()
});

export const load: LayoutServerLoad = async ({ url, setHeaders }) => {
	const {
		query,
		orderBy,
		ascending,
		page: requestedPage
	} = querySchema.parse({
		query: url.searchParams.get('q'),
		orderBy: url.searchParams.get('orderBy') || ORDER_BY_OPTIONS[0],
		ascending: url.searchParams.get('asc'),
		page: parseInt(url.searchParams.get('p') || '1', 10)
	});

	const page = requestedPage ?? 1;

	const totalGuests = await prisma.user.count();

	const totalPages = Math.ceil(totalGuests / ITEMS_PER_PAGE);

	const maxPage = Math.max(1, totalPages);

	if (page < 1 || page > maxPage) {
		const redirectUrl = new URL(url);
		redirectUrl.searchParams.set('p', page < 1 ? '1' : maxPage.toString());
		throw redirect(303, redirectUrl);
	}

	const users = await prisma.user.findMany({
		skip: (page - 1) * ITEMS_PER_PAGE,
		take: ITEMS_PER_PAGE,
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
		},
		totalGuests
	};
};
