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
	},
	SUPABASE_SERVICE_ROLE_KEY: {
		public: false,
		static: false,
		schema: (val) => (val && val.trim().length > 0 ? val.trim() : undefined),
		description: 'Optional server-only key used strictly by /api/contact to persist contact_messages.'
	}
});
