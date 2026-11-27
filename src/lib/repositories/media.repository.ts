import type { TypedSupabaseClient } from '$lib/supabase/client';
import type { Database } from '$lib/supabase/types';

export type SiteMediaRow = Database['public']['Tables']['site_media']['Row'];

export async function getActiveSiteMedia(
	supabase: TypedSupabaseClient
): Promise<SiteMediaRow[]> {
	const { data, error } = await supabase
		.from('site_media')
		.select('*')
		.eq('is_active', true)
		.order('display_order', { ascending: true });

	if (error || !data) {
		return [];
	}

	return data;
}
