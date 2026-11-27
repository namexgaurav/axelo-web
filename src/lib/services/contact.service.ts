import type { TypedSupabaseClient } from '$lib/supabase/client';
import { createServiceRoleClient } from '$lib/supabase/server';

export interface ContactSubmissionInput {
	name: string;
	email: string;
	subject: string;
	message: string;
	website?: string; // Honeypot field
	formLoadedAt?: number;
}

export interface ContactValidationErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
	form?: string;
}

export interface ContactSubmissionResult {
	ok: boolean;
	status: number;
	message: string;
	errors?: ContactValidationErrors;
}

// Sliding-window rate limit per IP (best-effort in worker isolate)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function checkContactRateLimit(clientKey: string, now = Date.now()): boolean {
	const recent = (rateLimitStore.get(clientKey) || []).filter(
		(ts) => now - ts < RATE_LIMIT_WINDOW_MS
	);
	if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
		rateLimitStore.set(clientKey, recent);
		return false;
	}
	recent.push(now);
	rateLimitStore.set(clientKey, recent);

	// Keep map bounded
	if (rateLimitStore.size > 1000) {
		const oldestKey = rateLimitStore.keys().next().value;
		if (oldestKey) rateLimitStore.delete(oldestKey);
	}
	return true;
}

export function validateContactInput(input: ContactSubmissionInput): {
	valid: boolean;
	errors: ContactValidationErrors;
	sanitized: { name: string; email: string; subject: string; message: string };
} {
	const name = (input.name || '').trim().replace(/[\r\n]+/g, ' ');
	const email = (input.email || '').trim().toLowerCase();
	const subject = (input.subject || '').trim().replace(/[\r\n]+/g, ' ');
	const message = (input.message || '').trim();

	const errors: ContactValidationErrors = {};

	if (name.length < 2 || name.length > 120) {
		errors.name = 'Please enter your name (2–120 characters).';
	}

	if (!EMAIL_REGEX.test(email) || email.length > 254) {
		errors.email = 'Please enter a valid email address.';
	}

	if (subject.length < 2 || subject.length > 180) {
		errors.subject = 'Please provide a brief subject (2–180 characters).';
	}

	if (message.length < 10 || message.length > 4000) {
		errors.message = 'Please enter a message of at least 10 characters (max 4,000).';
	}

	return {
		valid: Object.keys(errors).length === 0,
		errors,
		sanitized: { name, email, subject, message }
	};
}

export async function submitContactMessage(params: {
	input: ContactSubmissionInput;
	clientIp: string;
	publicSupabase: TypedSupabaseClient;
	platformEnv?: App.Platform['env'];
}): Promise<ContactSubmissionResult> {
	const { input, clientIp, publicSupabase, platformEnv } = params;

	// 1. Honeypot spam trap
	if (input.website && input.website.trim().length > 0) {
		return {
			ok: false,
			status: 400,
			message: 'Unable to process submission.',
			errors: { form: 'Unable to process submission.' }
		};
	}

	// 2. Minimum form fill duration check (rejects instant automated POST bots)
	if (typeof input.formLoadedAt === 'number' && Number.isFinite(input.formLoadedAt)) {
		const elapsed = Date.now() - input.formLoadedAt;
		if (elapsed >= 0 && elapsed < 1500) {
			return {
				ok: false,
				status: 400,
				message: 'Please take a moment to complete the form before submitting.',
				errors: { form: 'Please take a moment to complete the form before submitting.' }
			};
		}
	}

	// 3. Rate limit check
	if (!checkContactRateLimit(clientIp)) {
		return {
			ok: false,
			status: 429,
			message: 'Too many contact requests. Please wait a few minutes before trying again.',
			errors: { form: 'Too many contact requests. Please wait a few minutes before trying again.' }
		};
	}

	// 4. Server-side field validation
	const { valid, errors, sanitized } = validateContactInput(input);
	if (!valid) {
		return {
			ok: false,
			status: 400,
			message: 'Please review the highlighted fields.',
			errors
		};
	}

	// 5. Heuristic spam link flood protection
	const urlMatches = sanitized.message.match(/https?:\/\//gi) || [];
	if (urlMatches.length > 3) {
		return {
			ok: false,
			status: 400,
			message: 'Message contains too many external links.',
			errors: { message: 'Please limit external links in your message.' }
		};
	}

	// 6. Persist to Supabase contact_messages using server-only client when configured
	const writerClient = createServiceRoleClient(platformEnv) ?? publicSupabase;

	const { error } = await writerClient.from('contact_messages').insert({
		name: sanitized.name,
		email: sanitized.email,
		subject: sanitized.subject,
		message: sanitized.message,
		status: 'new'
	});

	if (error) {
		console.error('[ContactService] Failed to persist contact message:', error.code, error.message);
		return {
			ok: false,
			status: 503,
			message: 'We could not deliver your message right now. Please try again later.',
			errors: {
				form: 'We could not deliver your message right now. Please try again later.'
			}
		};
	}

	return {
		ok: true,
		status: 201,
		message: 'Thank you for reaching out. Your message has been received by the AXELO team.'
	};
}
