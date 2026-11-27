import type { TypedSupabaseClient } from '$lib/supabase/client';
import { resolveStorageUrl } from '$lib/supabase/storage';
import { getPublishedSiteContents, type SiteContentRow } from '$lib/repositories/content.repository';
import { getPublishedPageBySlug, getPublishedPages, type SitePageRow } from '$lib/repositories/page.repository';
import { getActiveSiteMedia, type SiteMediaRow } from '$lib/repositories/media.repository';
import type {
	ClosingSectionContent,
	ContactInfoContent,
	FeaturedSectionContent,
	FooterContent,
	HeroContent,
	HighlightItem,
	HighlightsSectionContent,
	PhilosophyContent,
	SiteGlobalData,
	SiteMediaView,
	SitePageView,
	SocialLinkItem
} from '$lib/types/website';
import { getSafeExternalHttpsUrl } from '$lib/utils/url';

type JsonRecord = Record<string, unknown>;

function asRecord(val: unknown): JsonRecord | null {
	if (val && typeof val === 'object' && !Array.isArray(val)) {
		return val as JsonRecord;
	}
	return null;
}

function pickString(rec: JsonRecord | null, ...keys: string[]): string | undefined {
	if (!rec) return undefined;
	for (const k of keys) {
		const v = rec[k];
		if (typeof v === 'string' && v.trim().length > 0) {
			return v.trim();
		}
	}
	return undefined;
}

function pickFirstContent(map: Map<string, SiteContentRow>, ...keys: string[]): JsonRecord | null {
	for (const k of keys) {
		const row = map.get(k);
		if (row) {
			const rec = asRecord(row.content_value);
			if (rec) return rec;
		}
	}
	return null;
}

function mapMediaRow(supabase: TypedSupabaseClient, row: SiteMediaRow): SiteMediaView | null {
	const url = resolveStorageUrl(supabase, 'site-media', row.storage_path);
	if (!url) return null;
	return {
		id: row.id,
		url,
		alt: row.alt_text?.trim() || 'AXELO studio imagery',
		width: row.width,
		height: row.height,
		displayOrder: row.display_order,
		mediaType: row.media_type
	};
}

function mapPageRow(supabase: TypedSupabaseClient, row: SitePageRow): SitePageView {
	return {
		id: row.id,
		slug: row.slug,
		title: row.title,
		content: row.content,
		excerpt: row.excerpt,
		seoTitle: row.seo_title,
		seoDescription: row.seo_description,
		ogImageUrl: resolveStorageUrl(supabase, 'site-media', row.og_image_path),
		publishedAt: row.published_at,
		updatedAt: row.updated_at
	};
}

function parseSocialLinks(
	socialRec: JsonRecord | null,
	footerRec: JsonRecord | null,
	contactRec: JsonRecord | null
): SocialLinkItem[] {
	const raw =
		socialRec?.links ??
		socialRec?.items ??
		footerRec?.social_links ??
		contactRec?.social_links ??
		socialRec;

	const results: SocialLinkItem[] = [];

	if (Array.isArray(raw)) {
		for (const item of raw) {
			const r = asRecord(item);
			const url = getSafeExternalHttpsUrl(pickString(r, 'url', 'href'));
			const label = pickString(r, 'label', 'name', 'platform');
			if (url && label) {
				results.push({ platform: label.toLowerCase(), label, url });
			}
		}
		return results;
	}

	const obj = asRecord(raw);
	if (obj) {
		for (const [key, val] of Object.entries(obj)) {
			if (typeof val === 'string') {
				const url = getSafeExternalHttpsUrl(val);
				if (url) {
					results.push({
						platform: key.toLowerCase(),
						label: key.charAt(0).toUpperCase() + key.slice(1),
						url
					});
				}
			}
		}
	}

	return results;
}

export async function getSiteMediaList(supabase: TypedSupabaseClient): Promise<SiteMediaView[]> {
	const rows = await getActiveSiteMedia(supabase);
	return rows
		.map((r) => mapMediaRow(supabase, r))
		.filter((m): m is SiteMediaView => m !== null);
}

export async function getGlobalSiteData(supabase: TypedSupabaseClient): Promise<SiteGlobalData> {
	const [contentMap, pages] = await Promise.all([
		getPublishedSiteContents(supabase, [
			'footer_info',
			'footer',
			'contact_details',
			'contact',
			'social_links',
			'social'
		]),
		getPublishedPages(supabase)
	]);

	const footerRec = pickFirstContent(contentMap, 'footer_info', 'footer');
	const contactRec = pickFirstContent(contentMap, 'contact_details', 'contact');
	const socialRec = pickFirstContent(contentMap, 'social_links', 'social');

	const footer: FooterContent = {
		brandDescription:
			pickString(footerRec, 'brand_description', 'description', 'summary') ||
			'Thoughtfully designed technology and desk accessories built around minimal aesthetics, everyday functionality, and lasting value.',
		copyrightText:
			pickString(footerRec, 'copyright', 'copyright_text') ||
			`© ${new Date().getFullYear()} AXELO. All rights reserved.`,
		tagline: pickString(footerRec, 'tagline') || 'Premium. Yet Affordable.',
		isFallback: !footerRec
	};

	const contact: ContactInfoContent = {
		introTitle: pickString(contactRec, 'title', 'intro_title', 'heading'),
		introDescription: pickString(contactRec, 'description', 'intro_description', 'subtitle'),
		email: pickString(contactRec, 'email', 'support_email', 'contact_email'),
		phone: pickString(contactRec, 'phone', 'telephone'),
		location: pickString(contactRec, 'location', 'address'),
		hours: pickString(contactRec, 'hours', 'support_hours'),
		isFallback: !contactRec
	};

	return {
		footer,
		contact,
		socialLinks: parseSocialLinks(socialRec, footerRec, contactRec),
		publishedPages: pages.map((p) => ({ slug: p.slug, title: p.title }))
	};
}

export async function getHomepageContent(supabase: TypedSupabaseClient): Promise<{
	hero: HeroContent;
	featuredSection: FeaturedSectionContent;
	philosophy: PhilosophyContent;
	highlights: HighlightsSectionContent;
	closing: ClosingSectionContent;
	media: SiteMediaView[];
}> {
	const [contentMap, media] = await Promise.all([
		getPublishedSiteContents(supabase),
		getSiteMediaList(supabase)
	]);

	const heroRec = pickFirstContent(contentMap, 'homepage_hero', 'hero', 'home_hero');
	const featuredRec = pickFirstContent(contentMap, 'homepage_featured', 'featured_section');
	const philRec = pickFirstContent(contentMap, 'brand_philosophy', 'philosophy');
	const highlightsRec = pickFirstContent(contentMap, 'brand_highlights', 'highlights');
	const closingRec = pickFirstContent(contentMap, 'homepage_closing', 'closing_section', 'homepage_cta');

	const heroMediaPath = pickString(heroRec, 'image_path', 'image_url', 'media_path');
	const heroMediaUrl = resolveStorageUrl(supabase, 'site-media', heroMediaPath) || media[0]?.url || null;

	const hero: HeroContent = {
		eyebrow: pickString(heroRec, 'eyebrow', 'kicker', 'badge') || 'Premium. Yet Affordable.',
		headline: pickString(heroRec, 'headline', 'title') || 'Technology, Designed Around You.',
		supportingText:
			pickString(heroRec, 'supporting_text', 'subtitle', 'description') ||
			'Thoughtfully designed accessories that bring together performance, simplicity and everyday functionality.',
		primaryCtaLabel: pickString(heroRec, 'primary_cta_label', 'cta_label') || 'Explore Products',
		primaryCtaHref: pickString(heroRec, 'primary_cta_href', 'cta_href') || '/products',
		secondaryCtaLabel: pickString(heroRec, 'secondary_cta_label') || 'Discover AXELO',
		secondaryCtaHref: pickString(heroRec, 'secondary_cta_href') || '/about',
		imageUrl: heroMediaUrl,
		imageAlt: pickString(heroRec, 'image_alt') || media[0]?.alt || 'AXELO hardware collection',
		isFallback: !heroRec
	};

	const featuredSection: FeaturedSectionContent = {
		eyebrow: pickString(featuredRec, 'eyebrow') || 'Featured Hardware',
		title: pickString(featuredRec, 'title', 'headline') || 'Curated Essentials',
		subtitle:
			pickString(featuredRec, 'subtitle', 'description') ||
			'Precision desk accessories engineered for clean focus and dependable daily use.',
		ctaLabel: pickString(featuredRec, 'cta_label') || 'View All Products',
		isFallback: !featuredRec
	};

	const philParagraphs: string[] = [];
	if (Array.isArray(philRec?.paragraphs)) {
		for (const p of philRec.paragraphs) {
			if (typeof p === 'string' && p.trim()) philParagraphs.push(p.trim());
		}
	} else {
		const body = pickString(philRec, 'body', 'content', 'description');
		if (body) philParagraphs.push(body);
	}

	const philMediaPath = pickString(philRec, 'image_path', 'image_url');
	const philosophy: PhilosophyContent = {
		eyebrow: pickString(philRec, 'eyebrow') || 'Brand Philosophy',
		title: pickString(philRec, 'title', 'headline') || 'Clarity in Every Detail.',
		summary:
			pickString(philRec, 'summary', 'subtitle') ||
			'AXELO brings minimal industrial design, durable materials, and everyday practicality together—without unnecessary complexity or inflated pricing.',
		paragraphs: philParagraphs,
		imageUrl: resolveStorageUrl(supabase, 'site-media', philMediaPath) || media[1]?.url || null,
		imageAlt: pickString(philRec, 'image_alt') || media[1]?.alt || 'AXELO design philosophy',
		isFallback: !philRec
	};

	const parsedHighlights: HighlightItem[] = [];
	const rawItems = highlightsRec?.items ?? highlightsRec?.highlights ?? highlightsRec?.pillars;
	if (Array.isArray(rawItems)) {
		for (const entry of rawItems) {
			const r = asRecord(entry);
			const title = pickString(r, 'title', 'heading', 'name');
			const description = pickString(r, 'description', 'body', 'summary');
			const eyebrow = pickString(r, 'eyebrow', 'tag', 'number');
			if (title && description) {
				parsedHighlights.push({ eyebrow, title, description });
			}
		}
	}

	const defaultHighlights: HighlightItem[] = [
		{
			eyebrow: '01',
			title: 'Thoughtful Design',
			description: 'Clean proportions and considered surfaces created to integrate quietly into modern desks.'
		},
		{
			eyebrow: '02',
			title: 'Everyday Performance',
			description: 'Reliable hardware tuned for consistent responsiveness across focused work and daily routines.'
		},
		{
			eyebrow: '03',
			title: 'Minimal Aesthetics',
			description: 'Restrained forms and balanced finishes that reduce visual clutter without sacrificing utility.'
		},
		{
			eyebrow: '04',
			title: 'Premium Accessibility',
			description: 'High design standards made approachable through honest materials and transparent positioning.'
		}
	];

	const highlights: HighlightsSectionContent = {
		eyebrow: pickString(highlightsRec, 'eyebrow') || 'Core Principles',
		title: pickString(highlightsRec, 'title', 'headline') || 'Built Around What Matters',
		subtitle: pickString(highlightsRec, 'subtitle', 'description'),
		items: parsedHighlights.length > 0 ? parsedHighlights : defaultHighlights,
		isFallback: !highlightsRec || parsedHighlights.length === 0
	};

	const closing: ClosingSectionContent = {
		eyebrow: pickString(closingRec, 'eyebrow') || 'Explore AXELO',
		title: pickString(closingRec, 'title', 'headline') || 'Elevate Your Everyday Setup.',
		description:
			pickString(closingRec, 'description', 'subtitle') ||
			'Browse the complete AXELO lineup and discover accessories crafted for calm, dependable performance.',
		primaryCtaLabel: pickString(closingRec, 'primary_cta_label', 'cta_label') || 'Explore All Products',
		primaryCtaHref: pickString(closingRec, 'primary_cta_href', 'cta_href') || '/products',
		secondaryCtaLabel: pickString(closingRec, 'secondary_cta_label') || 'Contact Us',
		secondaryCtaHref: pickString(closingRec, 'secondary_cta_href') || '/contact',
		isFallback: !closingRec
	};

	return { hero, featuredSection, philosophy, highlights, closing, media };
}

export async function getAboutContent(supabase: TypedSupabaseClient): Promise<{
	page: SitePageView | null;
	aboutContent: JsonRecord | null;
	philosophy: PhilosophyContent;
	highlights: HighlightsSectionContent;
	media: SiteMediaView[];
}> {
	const [pageRow, contentMap, homeContent] = await Promise.all([
		getPublishedPageBySlug(supabase, 'about').then((p) => p || getPublishedPageBySlug(supabase, 'about-axelo')),
		getPublishedSiteContents(supabase, ['about_axelo', 'about']),
		getHomepageContent(supabase)
	]);

	return {
		page: pageRow ? mapPageRow(supabase, pageRow) : null,
		aboutContent: pickFirstContent(contentMap, 'about_axelo', 'about'),
		philosophy: homeContent.philosophy,
		highlights: homeContent.highlights,
		media: homeContent.media
	};
}

export async function getPublishedPageContentBySlug(
	supabase: TypedSupabaseClient,
	slug: string
): Promise<SitePageView | null> {
	const row = await getPublishedPageBySlug(supabase, slug);
	return row ? mapPageRow(supabase, row) : null;
}
