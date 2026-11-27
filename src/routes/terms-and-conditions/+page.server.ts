import type { PageServerLoad } from './$types';
import { getPublishedPageContentBySlug } from '$lib/services/site.service';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const page = await getPublishedPageContentBySlug(supabase, 'terms-and-conditions');
	return { page };
};
