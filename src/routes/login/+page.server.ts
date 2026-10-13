import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession }, url }) => {
	const { session } = await safeGetSession();
	const redirectTo = url.searchParams.get('redirectTo') || '/account';

	if (session) {
		throw redirect(303, redirectTo);
	}

	return {
		redirectTo
	};
};
