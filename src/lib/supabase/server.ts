import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$app/env/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$app/env/private';
import type { Database } from './types';

/**
 * Server-only privileged Supabase client for secure write operations
 * (such as persisting validated contact form submissions).
 * Never import this module from client-side code.
 */
export function createServiceRoleClient(
	platformEnv?: App.Platform['env']
): SupabaseClient<Database> | null {
	const serviceRoleKey =
		(typeof platformEnv?.SUPABASE_SERVICE_ROLE_KEY === 'string' &&
			platformEnv.SUPABASE_SERVICE_ROLE_KEY.trim()) ||
		SUPABASE_SERVICE_ROLE_KEY;

	if (!serviceRoleKey) {
		return null;
	}

	return createClient<Database>(PUBLIC_SUPABASE_URL, serviceRoleKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false
		}
	});
}
