// See https://svelte.dev/docs/kit/types#app.d.ts
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';

declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
		interface Locals {
			supabase: SupabaseClient<Database>;
		}
		interface Platform {
			env?: {
				SUPABASE_SERVICE_ROLE_KEY?: string;
				[key: string]: unknown;
			};
		}
	}
}

declare module '$app/env/public' {
	export const PUBLIC_SUPABASE_URL: string;
	export const PUBLIC_SUPABASE_ANON_KEY: string;
}

declare module '$app/env/private' {
	export const SUPABASE_SERVICE_ROLE_KEY: string | undefined;
}

export {};
