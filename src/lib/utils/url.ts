/**
 * Validates and sanitizes internal redirect destinations to prevent Open Redirects.
 */
export function getSafeRedirectUrl(
	target: string | null | undefined,
	fallback: string = '/'
): string {
	if (!target || typeof target !== 'string') {
		return fallback;
	}

	const trimmed = target.trim();

	if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
		return fallback;
	}

	if (trimmed.includes('://') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
		return fallback;
	}

	return trimmed;
}

/**
 * Validates an external URL (e.g. Amazon product link or social profile link).
 * Only allows valid https:// URLs (never javascript:, data:, http:, or relative paths).
 */
export function getSafeExternalHttpsUrl(rawUrl: string | null | undefined): string | null {
	if (!rawUrl || typeof rawUrl !== 'string') {
		return null;
	}

	const trimmed = rawUrl.trim();
	if (!trimmed) {
		return null;
	}

	try {
		const parsed = new URL(trimmed);
		if (parsed.protocol !== 'https:') {
			return null;
		}
		if (!parsed.hostname || !parsed.hostname.includes('.')) {
			return null;
		}
		return parsed.toString();
	} catch {
		return null;
	}
}

/**
 * Validates an Amazon purchase URL stored in the database.
 */
export function getValidAmazonUrl(rawUrl: string | null | undefined): string | null {
	return getSafeExternalHttpsUrl(rawUrl);
}
