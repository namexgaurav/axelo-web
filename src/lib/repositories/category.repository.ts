import type { TypedSupabaseClient } from '$lib/supabase/client';
import type { Database } from '$lib/supabase/types';

export type CategoryRow = Database['public']['Tables']['categories']['Row'];

export async function getActiveCategories(
	supabase: TypedSupabaseClient
): Promise<CategoryRow[]> {
	const { data, error } = await supabase
		.from('categories')
		.select('*')
		.eq('is_active', true)
		.order('sort_order', { ascending: true });

	if (error || !data) {
		return [];
	}

	return data;
}

export async function getCategoryBySlug(
	supabase: TypedSupabaseClient,
	slug: string
): Promise<CategoryRow | null> {
	const cleanSlug = slug.trim();
	if (!cleanSlug || !/^[a-zA-Z0-9_-]+$/.test(cleanSlug)) {
		return null;
	}

	const { data, error } = await supabase
		.from('categories')
		.select('*')
		.eq('is_active', true)
		.eq('slug', cleanSlug)
		.maybeSingle();

	if (error || !data) {
		return null;
	}

	return data;
}
