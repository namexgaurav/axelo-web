import type { PageServerLoad } from './$types';
import { fetchCatalogProducts, fetchCatalogCategories } from '$lib/products/product.service';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
	const categoryParam = url.searchParams.get('category') || 'all';
	const [products, categories] = await Promise.all([
		fetchCatalogProducts(supabase),
		fetchCatalogCategories(supabase)
	]);

	return {
		products,
		categories,
		activeCategory: categoryParam
	};
};
