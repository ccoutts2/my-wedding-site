import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (!cookies.get('adminAllowed')) {
		throw redirect(302, '/');
	}
};
