import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSafeRedirectUrl } from '$lib/utils/url';

export const load: PageServerLoad = async ({ locals: { safeGetSession }, url }) => {
	const { session } = await safeGetSession();
	const rawRedirect = url.searchParams.get('redirectTo');
	const redirectTo = getSafeRedirectUrl(rawRedirect, '/account');

	if (rawRedirect && rawRedirect !== redirectTo) {
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
	}

	if (session) {
		throw redirect(303, redirectTo);
	}

	return {
		redirectTo
	};
};

