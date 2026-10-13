import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProductBySlug } from '$lib/products/product.service';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const product = await fetchProductBySlug(supabase, params.slug);

	if (!product) {
		throw error(404, `Product "${params.slug}" not found.`);
	}

	return {
		product
	};
};
