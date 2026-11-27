import type { LayoutServerLoad } from './$types';
import { getGlobalSiteData } from '$lib/services/site.service';

export const load: LayoutServerLoad = async ({ locals: { supabase }, url }) => {
	const site = await getGlobalSiteData(supabase);

	return {
		site,
		origin: url.origin
	};
};
