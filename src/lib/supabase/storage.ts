import type { TypedSupabaseClient } from './client';

export type StorageBucket = 'product-images' | 'site-media';

/**
 * Resolves a storage path or absolute URL into a valid public HTTPS image URL.
 * Returns null if the input path is empty or unsafe.
 */
export function resolveStorageUrl(
	supabase: TypedSupabaseClient | undefined,
	bucket: StorageBucket,
	pathOrUrl: string | null | undefined
): string | null {
	if (!pathOrUrl || typeof pathOrUrl !== 'string') {
		return null;
	}

	const trimmed = pathOrUrl.trim();
	if (!trimmed) {
		return null;
	}

	if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
		return trimmed;
	}

	if (trimmed.startsWith('//') || trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
		return null;
	}

	const normalizedPath = trimmed.replace(/^\/+/, '');
	if (!supabase) {
		return null;
	}

	const { data } = supabase.storage.from(bucket).getPublicUrl(normalizedPath);
	return data?.publicUrl || null;
}
