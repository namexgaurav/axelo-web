export interface ProductImageView {
	id: string;
	url: string;
	alt: string;
	displayOrder: number;
	isPrimary: boolean;
}

export interface ProductSpecItem {
	label: string;
	value: string;
}

export interface ProductHighlightItem {
	title: string;
	description?: string;
}

export interface ProductVariantView {
	id: string;
	name: string;
	colorHex: string | null;
	imageUrl: string | null;
}

export interface ProductView {
	id: string;
	name: string;
	slug: string;
	brandName: string;
	tagline: string | null;
	shortDescription: string | null;
	description: string | null;
	sku: string | null;
	categoryId: string | null;
	categoryName: string | null;
	categorySlug: string | null;
	badge: string | null;
	isFeatured: boolean;
	isNewArrival: boolean;
	isBestSeller: boolean;
	sortOrder: number;
	price: number | null;
	currency: string | null;
	amazonUrl: string | null;
	amazonButtonLabel: string;
	primaryImage: ProductImageView | null;
	images: ProductImageView[];
	variants: ProductVariantView[];
	highlights: ProductHighlightItem[];
	details: string[];
	specs: ProductSpecItem[];
	seoTitle: string | null;
	seoDescription: string | null;
	seoOgImage: string | null;
	publishedAt: string | null;
	updatedAt: string;
}

export interface CategoryView {
	id: string;
	name: string;
	slug: string;
	subtitle: string | null;
	description: string | null;
	imageUrl: string | null;
	sortOrder: number;
	isFeatured: boolean;
}

export interface SiteMediaView {
	id: string;
	url: string;
	alt: string;
	width: number | null;
	height: number | null;
	displayOrder: number;
	mediaType: string | null;
}

export interface SitePageView {
	id: string;
	slug: string;
	title: string;
	content: string | null;
	excerpt: string | null;
	seoTitle: string | null;
	seoDescription: string | null;
	ogImageUrl: string | null;
	publishedAt: string | null;
	updatedAt: string;
}

export interface HeroContent {
	eyebrow?: string;
	headline: string;
	supportingText: string;
	primaryCtaLabel: string;
	primaryCtaHref: string;
	secondaryCtaLabel?: string;
	secondaryCtaHref?: string;
	imageUrl?: string | null;
	imageAlt?: string | null;
	isFallback?: boolean;
}

export interface HighlightItem {
	eyebrow?: string;
	title: string;
	description: string;
}

export interface PhilosophyContent {
	eyebrow?: string;
	title: string;
	summary: string;
	paragraphs: string[];
	imageUrl?: string | null;
	imageAlt?: string | null;
	isFallback?: boolean;
}

export interface HighlightsSectionContent {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	items: HighlightItem[];
	isFallback?: boolean;
}

export interface FeaturedSectionContent {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	ctaLabel?: string;
	isFallback?: boolean;
}

export interface ClosingSectionContent {
	eyebrow?: string;
	title: string;
	description: string;
	primaryCtaLabel: string;
	primaryCtaHref: string;
	secondaryCtaLabel?: string;
	secondaryCtaHref?: string;
	isFallback?: boolean;
}

export interface ContactInfoContent {
	introTitle?: string;
	introDescription?: string;
	email?: string;
	phone?: string;
	location?: string;
	hours?: string;
	isFallback?: boolean;
}

export interface SocialLinkItem {
	platform: string;
	label: string;
	url: string;
}

export interface FooterContent {
	brandDescription: string;
	copyrightText: string;
	tagline?: string;
	isFallback?: boolean;
}

export interface SiteGlobalData {
	footer: FooterContent;
	contact: ContactInfoContent;
	socialLinks: SocialLinkItem[];
	publishedPages: Array<{ slug: string; title: string }>;
}
