import type { TypedSupabaseClient } from '$lib/supabase/client';
import { resolveStorageUrl } from '$lib/supabase/storage';
import {
	getPublishedProducts,
	getFeaturedProducts,
	getProductBySlug,
	getRelatedProducts,
	type ProductWithRelations,
	type CategoryRow
} from '$lib/repositories/product.repository';
import { getActiveCategories } from '$lib/repositories/category.repository';
import type {
	CategoryView,
	ProductHighlightItem,
	ProductImageView,
	ProductSpecItem,
	ProductVariantView,
	ProductView
} from '$lib/types/website';
import { getValidAmazonUrl } from '$lib/utils/url';

function normalizeSpecs(raw: unknown): ProductSpecItem[] {
	if (!Array.isArray(raw)) return [];
	return raw
		.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
		.map((item) => ({
			label: String(item.label ?? item.name ?? '').trim(),
			value: String(item.value ?? '').trim()
		}))
		.filter((item) => item.label.length > 0 && item.value.length > 0);
}

function normalizeDetails(raw: unknown): string[] {
	if (!Array.isArray(raw)) return [];
	return raw
		.map((item) => (typeof item === 'string' ? item.trim() : ''))
		.filter((item) => item.length > 0);
}

function normalizeHighlights(raw: unknown): ProductHighlightItem[] {
	if (!Array.isArray(raw)) return [];
	const items: ProductHighlightItem[] = [];
	for (const entry of raw) {
		if (typeof entry === 'string' && entry.trim()) {
			items.push({ title: entry.trim() });
		} else if (entry && typeof entry === 'object') {
			const record = entry as Record<string, unknown>;
			const title = String(record.title ?? record.label ?? record.heading ?? '').trim();
			const description = record.description ? String(record.description).trim() : undefined;
			if (title) {
				items.push({ title, ...(description ? { description } : {}) });
			}
		}
	}
	return items;
}

function resolveNumericPrice(salePrice: number | null, basePrice: number | null): number | null {
	const candidate = salePrice !== null && salePrice !== undefined ? Number(salePrice) : Number(basePrice);
	if (!Number.isFinite(candidate) || candidate <= 0) {
		return null;
	}
	return candidate;
}

function mapCategoryRow(supabase: TypedSupabaseClient | undefined, row: CategoryRow): CategoryView {
	return {
		id: row.id,
		name: row.name,
		slug: row.slug,
		subtitle: row.subtitle,
		description: row.description,
		imageUrl: resolveStorageUrl(supabase, 'product-images', row.image_path),
		sortOrder: row.sort_order,
		isFeatured: row.is_featured
	};
}

function mapProductRow(
	supabase: TypedSupabaseClient | undefined,
	row: ProductWithRelations,
	categoryMap: Map<string, CategoryRow>
): ProductView {
	const sortedImages = [...(row.product_images || [])].sort((a, b) => {
		if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
		return a.display_order - b.display_order;
	});

	const images: ProductImageView[] = sortedImages
		.map((img) => {
			const url = resolveStorageUrl(supabase, 'product-images', img.storage_path);
			if (!url) return null;
			return {
				id: img.id,
				url,
				alt: img.alt_text?.trim() || row.name,
				displayOrder: img.display_order,
				isPrimary: img.is_primary
			};
		})
		.filter((img): img is ProductImageView => img !== null);

	const variants: ProductVariantView[] = (row.product_variants || []).map((v) => ({
		id: v.id,
		name: v.name,
		colorHex: v.color_hex,
		imageUrl: resolveStorageUrl(supabase, 'product-images', v.image_url)
	}));

	const category = row.categories || (row.category_id ? categoryMap.get(row.category_id) : undefined) || null;
	const price = resolveNumericPrice(row.sale_price, row.base_price);

	return {
		id: row.id,
		name: row.name,
		slug: row.slug,
		brandName: row.brand_name?.trim() || 'AXELO',
		tagline: row.tagline,
		shortDescription: row.short_description,
		description: row.description,
		sku: row.sku,
		categoryId: row.category_id,
		categoryName: category?.name ?? null,
		categorySlug: category?.slug ?? null,
		badge: row.badge,
		isFeatured: row.is_featured,
		isNewArrival: row.is_new_arrival,
		isBestSeller: row.is_best_seller,
		sortOrder: row.sort_order,
		price,
		currency: price !== null ? row.currency || 'USD' : null,
		amazonUrl: getValidAmazonUrl(row.amazon_url),
		amazonButtonLabel: row.amazon_button_label?.trim() || 'Buy on Amazon',
		primaryImage: images[0] ?? null,
		images,
		variants,
		highlights: normalizeHighlights(row.highlights),
		details: normalizeDetails(row.details),
		specs: normalizeSpecs(row.specs),
		seoTitle: row.seo_title,
		seoDescription: row.seo_description,
		seoOgImage: resolveStorageUrl(supabase, 'product-images', row.seo_og_image_path) || images[0]?.url || null,
		publishedAt: row.published_at,
		updatedAt: row.updated_at
	};
}

export async function listActiveCategories(
	supabase: TypedSupabaseClient
): Promise<CategoryView[]> {
	const rows = await getActiveCategories(supabase);
	return rows.map((row) => mapCategoryRow(supabase, row));
}

export async function listPublishedProducts(
	supabase: TypedSupabaseClient,
	categorySlugOrId?: string
): Promise<{ products: ProductView[]; categories: CategoryView[] }> {
	const activeCategories = await getActiveCategories(supabase);
	const categoryMap = new Map(activeCategories.map((c) => [c.id, c]));

	let resolvedCategoryId: string | undefined;
	if (categorySlugOrId && categorySlugOrId !== 'all') {
		const matched = activeCategories.find(
			(c) => c.slug === categorySlugOrId || c.id === categorySlugOrId
		);
		resolvedCategoryId = matched ? matched.id : categorySlugOrId;
	}

	const rows = await getPublishedProducts(supabase, resolvedCategoryId);
	return {
		products: rows.map((row) => mapProductRow(supabase, row, categoryMap)),
		categories: activeCategories.map((c) => mapCategoryRow(supabase, c))
	};
}

export async function listFeaturedProducts(
	supabase: TypedSupabaseClient,
	limit = 4
): Promise<ProductView[]> {
	const [rows, categories] = await Promise.all([
		getFeaturedProducts(supabase, limit),
		getActiveCategories(supabase)
	]);
	const categoryMap = new Map(categories.map((c) => [c.id, c]));
	return rows.map((row) => mapProductRow(supabase, row, categoryMap));
}

export async function getProductDetailBySlug(
	supabase: TypedSupabaseClient,
	slug: string
): Promise<{ product: ProductView; relatedProducts: ProductView[] } | null> {
	const [row, categories] = await Promise.all([
		getProductBySlug(supabase, slug),
		getActiveCategories(supabase)
	]);

	if (!row) {
		return null;
	}

	const categoryMap = new Map(categories.map((c) => [c.id, c]));
	const product = mapProductRow(supabase, row, categoryMap);
	const relatedRows = await getRelatedProducts(supabase, row.category_id, row.id, 3);

	return {
		product,
		relatedProducts: relatedRows.map((rel) => mapProductRow(supabase, rel, categoryMap))
	};
}
