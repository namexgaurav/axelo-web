import type { ProductView } from '$lib/types/website';

export interface SeoMetadata {
	title: string;
	description: string;
	canonicalUrl: string;
	ogType?: 'website' | 'product' | 'article';
	ogImage?: string | null;
	noindex?: boolean;
}

export function buildCanonicalUrl(origin: string, pathname: string): string {
	const cleanOrigin = origin.replace(/\/+$/, '');
	const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return `${cleanOrigin}${cleanPath}`;
}

/**
 * Builds factual Schema.org Product JSON-LD strictly from verified database fields.
 * Never fabricates ratings, reviews, availability, or unpopulated prices.
 */
export function buildProductJsonLd(product: ProductView, canonicalUrl: string): Record<string, unknown> {
	const images = product.images.map((img) => img.url).filter(Boolean);

	const jsonLd: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		url: canonicalUrl,
		brand: {
			'@type': 'Brand',
			name: product.brandName || 'AXELO'
		}
	};

	const desc = product.seoDescription || product.shortDescription || product.tagline || product.description;
	if (desc) {
		jsonLd.description = desc;
	}

	if (images.length > 0) {
		jsonLd.image = images;
	}

	if (product.sku) {
		jsonLd.sku = product.sku;
	}

	if (product.categoryName) {
		jsonLd.category = product.categoryName;
	}

	if (product.price !== null && product.price > 0 && product.currency) {
		jsonLd.offers = {
			'@type': 'Offer',
			price: product.price,
			priceCurrency: product.currency.toUpperCase(),
			...(product.amazonUrl ? { url: product.amazonUrl } : {})
		};
	}

	return jsonLd;
}

export function buildOrganizationJsonLd(origin: string): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'AXELO',
		url: origin,
		slogan: 'Premium. Yet Affordable.'
	};
}
