import type { RequestHandler } from './$types';
import { getPublishedProducts } from '$lib/repositories/product.repository';
import { getPublishedPages } from '$lib/repositories/page.repository';

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async ({ locals: { supabase }, url }) => {
	const origin = url.origin.replace(/\/+$/, '');
	const [products, pages] = await Promise.all([
		getPublishedProducts(supabase),
		getPublishedPages(supabase)
	]);

	const staticRoutes = ['/', '/products', '/about', '/contact'];
	const urls: Array<{ loc: string; lastmod?: string }> = staticRoutes.map((path) => ({
		loc: `${origin}${path}`
	}));

	for (const product of products) {
		urls.push({
			loc: `${origin}/products/${encodeURIComponent(product.slug)}`,
			lastmod: product.updated_at || product.published_at || undefined
		});
	}

	const reservedSlugs = new Set(['about', 'about-axelo', 'contact', 'products']);
	for (const page of pages) {
		if (!reservedSlugs.has(page.slug)) {
			urls.push({
				loc: `${origin}/${encodeURIComponent(page.slug)}`,
				lastmod: page.updated_at || page.published_at || undefined
			});
		}
	}

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...urls.map((entry) => {
			const lastmodTag = entry.lastmod
				? `<lastmod>${escapeXml(new Date(entry.lastmod).toISOString())}</lastmod>`
				: '';
			return `  <url><loc>${escapeXml(entry.loc)}</loc>${lastmodTag}</url>`;
		}),
		'</urlset>'
	].join('\n');

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, must-revalidate'
		}
	});
};
