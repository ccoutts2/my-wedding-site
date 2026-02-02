import prisma from '$lib/server/prisma';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from 'sveltekit-superforms';

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
		throw Error('User not found');
	}

	return {
		user
	};
};

export const actions = {
	delete: async ({ request, params }) => {
		const userId = params.id;

		const formData = await request.formData();
		const userIdFromForm = formData.get('userId');

		if (!userIdFromForm || userIdFromForm !== userId) {
			return fail(400, { text: 'Invalid user ID provided for deletion.' });
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
			return fail(500, { text: 'Something went wrong. Please try again.' });
		}

		throw redirect(302, '/admin/view-guests');
	},

	deleteGuest: async ({ request }) => {
		const formData = await request.formData();
		const guestIdFromForm = formData.get('guestId');

		if (!guestIdFromForm || typeof guestIdFromForm !== 'string') {
			return fail(400, { text: 'Invalid guest ID provided for deletion.' });
		}

		const guestId = parseInt(guestIdFromForm, 10);

		try {
			await prisma.guest.delete({
				where: { id: guestId }
			});
		} catch (error) {
			console.log(error);
			return fail(500, { text: 'Something went wrong. Please try again.' });
		}

		throw redirect(302, '/admin/view-guests');
	}
} satisfies Actions;
