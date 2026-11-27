import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { submitContactMessage } from '$lib/services/contact.service';

export const load: PageServerLoad = async () => {
	return {
		formLoadedAt: Date.now()
	};
};

export const actions: Actions = {
	default: async ({ request, locals, platform, getClientAddress }) => {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '');
		const email = String(formData.get('email') ?? '');
		const subject = String(formData.get('subject') ?? '');
		const message = String(formData.get('message') ?? '');
		const website = String(formData.get('website') ?? '');
		const rawLoadedAt = Number(formData.get('formLoadedAt'));

		const clientIp =
			request.headers.get('cf-connecting-ip') ||
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			getClientAddress() ||
			'unknown';

		const result = await submitContactMessage({
			input: {
				name,
				email,
				subject,
				message,
				website,
				formLoadedAt: Number.isFinite(rawLoadedAt) ? rawLoadedAt : undefined
			},
			clientIp,
			publicSupabase: locals.supabase,
			platformEnv: platform?.env
		});

		if (!result.ok) {
			return fail(result.status, {
				success: false,
				message: result.message,
				errors: result.errors || {},
				values: { name, email, subject, message }
			});
		}

		return {
			success: true,
			message: result.message
		};
	}
};
