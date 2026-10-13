import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		throw redirect(303, '/login?redirectTo=/account');
	}

	// Fetch customer profile
	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.maybeSingle();

	// Fetch user role
	const { data: roleRow } = await supabase
		.from('user_roles')
		.select('role')
		.eq('user_id', user.id)
		.maybeSingle();

	return {
		user,
		profile,
		role: roleRow?.role || 'customer'
	};
};
