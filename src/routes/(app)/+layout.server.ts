import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (!cookies.get('allowed') && !cookies.get('adminAllowed')) {
		throw redirect(302, '/login');
	}

	const admin = cookies.get('adminAllowed');

	return {
		adminUser: admin === 'true'
	};
};
