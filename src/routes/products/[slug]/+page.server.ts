import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductDetailBySlug } from '$lib/services/catalog.service';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const result = await getProductDetailBySlug(supabase, params.slug);

	if (!result) {
		throw error(404, 'Product not found');
	}

	return {
		product: result.product,
		relatedProducts: result.relatedProducts
	};
};
