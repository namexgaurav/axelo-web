import { createPublicSupabaseClient } from '$lib/supabase/client';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createPublicSupabaseClient(event.fetch);

	const response = await resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});

	// Defense-in-depth HTTP security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	// Prevent stale SSR pages from serving unpublished products or content
	const contentType = response.headers.get('content-type') || '';
	if (contentType.includes('text/html') && !response.headers.has('cache-control')) {
		response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
	}

	return response;
};
