import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$app/env/public';
import type { Database } from './types';

export function createSupabaseBrowserClient() {
	return createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

export function createSupabaseServerClient(
	cookies: {
		getAll: () => Array<{ name: string; value: string }>;
		setAll: (cookies: Array<{ name: string; value: string; options: Record<string, unknown> }>) => void;
	}
) {
	return createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies
	});
}
