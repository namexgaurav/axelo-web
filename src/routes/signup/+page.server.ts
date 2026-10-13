import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const redirectTo = url.searchParams.get('redirectTo') || '/account';
	throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
};
