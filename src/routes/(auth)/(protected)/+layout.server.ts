import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (!cookies.get('allowed')) {
		throw redirect(302, '/login');
	}
};
