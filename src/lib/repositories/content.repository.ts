import type { TypedSupabaseClient } from '$lib/supabase/client';
import type { Database } from '$lib/supabase/types';

export type SiteContentRow = Database['public']['Tables']['site_content']['Row'];

export async function getPublishedSiteContent(
	supabase: TypedSupabaseClient,
	contentKey: string
): Promise<SiteContentRow | null> {
	const { data, error } = await supabase
		.from('site_content')
		.select('*')
		.eq('content_key', contentKey)
		.eq('is_published', true)
		.maybeSingle();

	if (error || !data) {
		return null;
	}

	return data;
}

export async function getPublishedSiteContents(
	supabase: TypedSupabaseClient,
	keys?: string[]
): Promise<Map<string, SiteContentRow>> {
	let query = supabase
		.from('site_content')
		.select('*')
		.eq('is_published', true);

	if (keys && keys.length > 0) {
		query = query.in('content_key', keys);
	}

	const { data, error } = await query;
	const map = new Map<string, SiteContentRow>();

	if (error || !data) {
		return map;
	}

	for (const row of data) {
		map.set(row.content_key, row);
	}

	return map;
}
