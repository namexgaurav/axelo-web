import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { submitContactMessage } from '$lib/services/contact.service';

export const POST: RequestHandler = async ({ request, locals, platform, getClientAddress }) => {
	let payload: Record<string, unknown>;
	try {
		payload = (await request.json()) as Record<string, unknown>;
	} catch {
		return json(
			{ ok: false, message: 'Invalid JSON request body.' },
			{ status: 400 }
		);
	}

	const clientIp =
		request.headers.get('cf-connecting-ip') ||
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		getClientAddress() ||
		'unknown';

	const result = await submitContactMessage({
		input: {
			name: typeof payload.name === 'string' ? payload.name : '',
			email: typeof payload.email === 'string' ? payload.email : '',
			subject: typeof payload.subject === 'string' ? payload.subject : '',
			message: typeof payload.message === 'string' ? payload.message : '',
			website: typeof payload.website === 'string' ? payload.website : '',
			formLoadedAt: typeof payload.formLoadedAt === 'number' ? payload.formLoadedAt : undefined
		},
		clientIp,
		publicSupabase: locals.supabase,
		platformEnv: platform?.env
	});

	return json(result, { status: result.status });
};
