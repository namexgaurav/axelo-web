import type { PageServerLoad } from './$types';
import { getAboutContent } from '$lib/services/site.service';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const about = await getAboutContent(supabase);
	return { about };
};
