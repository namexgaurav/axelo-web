import type { TypedSupabaseClient } from '$lib/supabase/client';
import type { Database } from '$lib/supabase/types';

export type SitePageRow = Database['public']['Tables']['site_pages']['Row'];

export async function getPublishedPages(
	supabase: TypedSupabaseClient
): Promise<SitePageRow[]> {
	const { data, error } = await supabase
		.from('site_pages')
		.select('*')
		.eq('status', 'published')
		.order('sort_order', { ascending: true })
		.order('title', { ascending: true });

	if (error || !data) {
		return [];
	}

	return data;
}

export async function getPublishedPageBySlug(
	supabase: TypedSupabaseClient,
	slug: string
): Promise<SitePageRow | null> {
	const cleanSlug = slug.trim().toLowerCase();
	if (!cleanSlug || !/^[a-z0-9-]+$/.test(cleanSlug)) {
		return null;
	}

	const { data, error } = await supabase
		.from('site_pages')
		.select('*')
		.eq('status', 'published')
		.eq('slug', cleanSlug)
		.maybeSingle();

	if (error || !data) {
		return null;
	}

	return data;
}
