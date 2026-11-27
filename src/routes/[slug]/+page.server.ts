import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPublishedPageContentBySlug } from '$lib/services/site.service';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const page = await getPublishedPageContentBySlug(supabase, params.slug);

	if (!page) {
		throw error(404, 'Page not found');
	}

	return { page };
};
