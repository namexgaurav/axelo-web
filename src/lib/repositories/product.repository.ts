import type { TypedSupabaseClient } from '$lib/supabase/client';
import type { Database } from '$lib/supabase/types';

export type ProductRow = Database['public']['Tables']['products']['Row'];
export type ProductImageRow = Database['public']['Tables']['product_images']['Row'];
export type ProductVariantRow = Database['public']['Tables']['product_variants']['Row'];
export type CategoryRow = Database['public']['Tables']['categories']['Row'];

export interface ProductWithRelations extends ProductRow {
	categories: CategoryRow | null;
	product_images: ProductImageRow[];
	product_variants: ProductVariantRow[];
}

const PRODUCT_SELECT = '*, categories(*), product_images(*), product_variants(*)';

export async function getPublishedProducts(
	supabase: TypedSupabaseClient,
	categoryId?: string
): Promise<ProductWithRelations[]> {
	let query = supabase
		.from('products')
		.select(PRODUCT_SELECT)
		.eq('status', 'published')
		.order('sort_order', { ascending: true })
		.order('created_at', { ascending: false });

	if (categoryId && categoryId !== 'all') {
		query = query.eq('category_id', categoryId);
	}

	const { data, error } = await query;
	if (error || !data) {
		return [];
	}

	return data as unknown as ProductWithRelations[];
}

export async function getFeaturedProducts(
	supabase: TypedSupabaseClient,
	limit = 6
): Promise<ProductWithRelations[]> {
	const { data, error } = await supabase
		.from('products')
		.select(PRODUCT_SELECT)
		.eq('status', 'published')
		.eq('is_featured', true)
		.order('sort_order', { ascending: true })
		.limit(limit);

	if (error || !data) {
		return [];
	}

	return data as unknown as ProductWithRelations[];
}

export async function getProductBySlug(
	supabase: TypedSupabaseClient,
	slug: string
): Promise<ProductWithRelations | null> {
	const cleanSlug = slug.trim();
	if (!cleanSlug || !/^[a-zA-Z0-9_-]+$/.test(cleanSlug)) {
		return null;
	}

	const { data, error } = await supabase
		.from('products')
		.select(PRODUCT_SELECT)
		.eq('status', 'published')
		.eq('slug', cleanSlug)
		.maybeSingle();

	if (error || !data) {
		return null;
	}

	return data as unknown as ProductWithRelations;
}

export async function getRelatedProducts(
	supabase: TypedSupabaseClient,
	categoryId: string | null,
	excludeProductId: string,
	limit = 3
): Promise<ProductWithRelations[]> {
	if (!categoryId) {
		return [];
	}

	const { data, error } = await supabase
		.from('products')
		.select(PRODUCT_SELECT)
		.eq('status', 'published')
		.eq('category_id', categoryId)
		.neq('id', excludeProductId)
		.order('sort_order', { ascending: true })
		.limit(limit);

	if (error || !data) {
		return [];
	}

	return data as unknown as ProductWithRelations[];
}
