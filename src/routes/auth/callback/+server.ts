import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSafeRedirectUrl } from '$lib/utils/url';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const next = getSafeRedirectUrl(url.searchParams.get('next'), '/account');

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, next);
		}
	}

	throw redirect(303, '/login?error=auth_callback_failed');
};

