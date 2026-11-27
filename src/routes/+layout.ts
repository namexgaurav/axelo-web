import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	return {
		site: data.site,
		origin: data.origin
	};
};
