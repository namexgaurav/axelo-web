import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchAddresses } from '$lib/addresses/address.service';

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		throw redirect(303, '/login?redirectTo=/checkout');
	}

	const { data: addresses } = await fetchAddresses(supabase, user.id);

	return {
		user,
		addresses
	};
};
