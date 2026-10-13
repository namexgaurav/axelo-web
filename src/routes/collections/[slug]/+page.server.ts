import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchCatalogProducts, fetchCatalogCategories } from '$lib/products/product.service';
import { categories as staticCategories } from '$lib/data/products';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const slug = params.slug;

	const [allProducts, categories] = await Promise.all([
		fetchCatalogProducts(supabase),
		fetchCatalogCategories(supabase)
	]);

	const currentCategory = categories.find((c) => c.id === slug) ||
		staticCategories.find((c) => c.id === slug);

	if (!currentCategory) {
		throw error(404, `Collection "${slug}" not found.`);
	}

	const categoryProducts = allProducts.filter((p) => p.category === slug);

	return {
		category: currentCategory,
		products: categoryProducts,
		allCategories: categories
	};
};
