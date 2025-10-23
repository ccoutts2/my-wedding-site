import prisma from '$lib/server/prisma';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';
import { error } from 'console';

const schema = z.object({
	id: z.string().optional(),
	email: z.email().optional(),
	givenName: z.string().optional(),
	familyName: z.string().optional(),
	hasGuests: z.boolean().optional()
});

export const load: PageServerLoad = async ({ params, request }) => {
	const userId = params.id;
	const form = await superValidate(zod4(schema));

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			guest: true
		}
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	return {
		user,
		form
	};
};

export const actions = {
	delete: async ({ request, params }) => {
		const userId = params.id;

		const formData = await request.formData();
		const userIdFromForm = formData.get('userId');

		if (!userIdFromForm || userIdFromForm !== userId) {
			return fail(400, { message: 'Invalid user ID provided for deletion.' });
		}

		try {
			const deleteUserGuests = prisma.guest.deleteMany({
				where: { userId: userId }
			});

			const deleteUser = prisma.user.delete({
				where: { id: userId }
			});

			await prisma.$transaction([deleteUserGuests, deleteUser]);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Something went wrong. Please try again.' });
		}

		throw redirect(302, '/admin/view-guests');
	}
} satisfies Actions;
