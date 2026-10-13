import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_SUPABASE_URL: {
		public: true,
		static: true,
		schema: (val) => val || 'https://placeholder.supabase.co'
	},
	PUBLIC_SUPABASE_ANON_KEY: {
		public: true,
		static: true,
		schema: (val) => val || 'placeholder-anon-key'
	}
});
