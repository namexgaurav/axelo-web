import { createSupabaseServerClient } from '$lib/supabase/client';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		getAll: () => event.cookies.getAll(),
		setAll: (cookiesToSet) => {
			cookiesToSet.forEach(({ name, value, options }) => {
				event.cookies.set(name, value, {
					...options,
					path: '/'
				});
			});
		}
	});

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session from
	 * the client-stored cookie without validation, `safeGetSession` validates
	 * the session on the server using `getUser()`. This is the recommended
	 * pattern per Supabase SSR docs.
	 */
	event.locals.safeGetSession = async () => {
		try {
			const {
				data: { session }
			} = await event.locals.supabase.auth.getSession();

			if (!session) {
				return { session: null, user: null };
			}

			const {
				data: { user },
				error
			} = await event.locals.supabase.auth.getUser();

			if (error) {
				// JWT validation failed — treat as unauthenticated
				return { session: null, user: null };
			}

			return { session, user };
		} catch (err) {
			return { session: null, user: null };
		}
	};

	// Resolve the session for all requests
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

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

	return response;
};

