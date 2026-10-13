import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';
import { products as staticProducts, categories as staticCategories } from '$lib/data/products';
import type { Product, Category } from '$lib/types';

export type DbProduct = Database['public']['Tables']['products']['Row'];
export type DbCategory = Database['public']['Tables']['categories']['Row'];

/**
 * Fetch published products from Supabase with graceful fallback to static catalog
 */
export async function fetchCatalogProducts(
	supabase?: SupabaseClient<Database, any, any>,
	categoryId?: string
): Promise<Product[]> {
	if (!supabase) return filterStatic(categoryId);

	try {
		let query = supabase
			.from('products')
			.select('*, product_images(*), product_variants(*)')
			.eq('status', 'published')
			.order('sort_order', { ascending: true });

		if (categoryId && categoryId !== 'all') {
			query = query.eq('category_id', categoryId);
		}

		const { data, error } = await query;

		if (error || !data || data.length === 0) {
			return filterStatic(categoryId);
		}

		// Transform database rows to frontend Product model
		return data.map((row: any) => {
			const primaryImg = row.product_images?.find((img: any) => img.is_primary)?.storage_path
				|| row.product_images?.[0]?.storage_path
				|| 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85';
			
			const secondaryImg = row.product_images?.find((img: any) => !img.is_primary)?.storage_path
				|| primaryImg;

			const colors = (row.product_variants || []).map((v: any) => ({
				name: v.name,
				hex: v.color_hex || '#111111',
				image: v.image_url || primaryImg
			}));

			return {
				id: row.id,
				name: row.name,
				category: row.category_id || 'desk-mats',
				categoryLabel: row.category_id || 'Desk Mat',
				tagline: row.tagline || '',
				description: row.description || '',
				price: Number(row.sale_price || row.base_price),
				originalPrice: row.sale_price ? Number(row.base_price) : undefined,
				rating: Number(row.rating || 5.0),
				ratingCount: Number(row.rating_count || 0),
				badge: row.badge || undefined,
				isNew: Boolean(row.is_new_arrival),
				isFeatured: Boolean(row.is_featured),
				colors: colors.length > 0 ? colors : [{ name: 'Default', hex: '#111111', image: primaryImg }],
				primaryImage: primaryImg,
				secondaryImage: secondaryImg,
				specs: Array.isArray(row.specs) ? row.specs : [],
				details: Array.isArray(row.details) ? row.details : []
			};
		});
	} catch {
		return filterStatic(categoryId);
	}
}

function filterStatic(categoryId?: string): Product[] {
	if (!categoryId || categoryId === 'all') return staticProducts;
	return staticProducts.filter((p) => p.category === categoryId);
}

/**
 * Fetch single product by its slug / ID
 */
export async function fetchProductBySlug(
	supabase: SupabaseClient<Database, any, any> | undefined,
	idOrSlug: string
): Promise<Product | null> {
	if (!supabase) {
		return staticProducts.find((p) => p.id === idOrSlug) || null;
	}

	try {
		const { data, error } = await supabase
			.from('products')
			.select('*, product_images(*), product_variants(*)')
			.or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
			.maybeSingle();

		if (error || !data) {
			return staticProducts.find((p) => p.id === idOrSlug) || null;
		}

		const primaryImg = data.product_images?.find((img: any) => img.is_primary)?.storage_path
			|| data.product_images?.[0]?.storage_path
			|| 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85';
		
		const secondaryImg = data.product_images?.find((img: any) => !img.is_primary)?.storage_path
			|| primaryImg;

		const colors = (data.product_variants || []).map((v: any) => ({
			name: v.name,
			hex: v.color_hex || '#111111',
			image: v.image_url || primaryImg
		}));

		return {
			id: data.id,
			name: data.name,
			category: data.category_id || 'desk-mats',
			categoryLabel: data.category_id || 'Desk Mat',
			tagline: data.tagline || '',
			description: data.description || '',
			price: Number(data.sale_price || data.base_price),
			originalPrice: data.sale_price ? Number(data.base_price) : undefined,
			rating: Number(data.rating || 5.0),
			ratingCount: Number(data.rating_count || 0),
			badge: data.badge || undefined,
			isNew: Boolean(data.is_new_arrival),
			isFeatured: Boolean(data.is_featured),
			colors: colors.length > 0 ? colors : [{ name: 'Default', hex: '#111111', image: primaryImg }],
			primaryImage: primaryImg,
			secondaryImage: secondaryImg,
			specs: Array.isArray(data.specs) ? data.specs : [],
			details: Array.isArray(data.details) ? data.details : []
		};
	} catch {
		return staticProducts.find((p) => p.id === idOrSlug) || null;
	}
}

/**
 * Fetch categories with fallback
 */
export async function fetchCatalogCategories(
	supabase?: SupabaseClient<Database, any, any>
): Promise<Category[]> {
	if (!supabase) return staticCategories;

	try {
		const { data, error } = await supabase
			.from('categories')
			.select('*')
			.eq('is_active', true)
			.order('sort_order', { ascending: true });

		if (error || !data || data.length === 0) {
			return staticCategories;
		}

		return data.map((c) => ({
			id: c.id,
			title: c.name,
			subtitle: c.subtitle || '',
			description: c.description || '',
			count: 0,
			image: c.image_path || 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=85',
			featured: c.is_featured
		}));
	} catch {
		return staticCategories;
	}
}
