/**
 * Validates and sanitizes redirect destinations to prevent Open Redirect vulnerabilities.
 * Ensures destinations are safe relative paths starting with '/' and rejects
 * protocol-relative ('//'), backslash ('/\\'), scheme ('https://'), or script URLs.
 */
export function getSafeRedirectUrl(
	target: string | null | undefined,
	fallback: string = '/account'
): string {
	if (!target || typeof target !== 'string') {
		return fallback;
	}

	const trimmed = target.trim();

	// Must start with a single '/' and not '//' or '/\'
	if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
		return fallback;
	}

	// Must not contain scheme or protocol indicators
	if (trimmed.includes('://') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
		return fallback;
	}

	return trimmed;
}
