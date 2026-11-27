import type { PageServerLoad } from './$types';
import { listPublishedProducts } from '$lib/services/catalog.service';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
	const categoryParam = url.searchParams.get('category')?.trim() || 'all';
	const { products, categories } = await listPublishedProducts(supabase, categoryParam);

	return {
		products,
		categories,
		activeCategory: categoryParam
	};
};
