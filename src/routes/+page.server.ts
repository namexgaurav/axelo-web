import type { PageServerLoad } from './$types';
import { listFeaturedProducts } from '$lib/services/catalog.service';
import { getHomepageContent } from '$lib/services/site.service';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const [featuredProducts, homepage] = await Promise.all([
		listFeaturedProducts(supabase, 6),
		getHomepageContent(supabase)
	]);

	return {
		featuredProducts,
		homepage
	};
};
