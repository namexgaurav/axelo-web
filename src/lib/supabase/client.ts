import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$app/env/public';
import type { Database } from './types';

export type TypedSupabaseClient = SupabaseClient<Database>;

export function createPublicSupabaseClient(
	customFetch?: typeof fetch
): TypedSupabaseClient {
	return createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false
		},
		...(customFetch ? { global: { fetch: customFetch } } : {})
	});
}
