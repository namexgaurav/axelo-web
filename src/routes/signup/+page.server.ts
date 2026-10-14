import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSafeRedirectUrl } from '$lib/utils/url';

export const load: PageServerLoad = async ({ url }) => {
	const redirectTo = getSafeRedirectUrl(url.searchParams.get('redirectTo'), '/account');
	throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`);
};

