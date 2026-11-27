/**
 * Formats a product price with its currency code only when both are valid.
 * Never invents prices or discounts when absent.
 */
export function formatProductPrice(
	amount: number | null | undefined,
	currency: string | null | undefined
): string | null {
	if (amount === null || amount === undefined || !Number.isFinite(amount) || amount <= 0) {
		return null;
	}

	const code = (currency || 'USD').trim().toUpperCase();
	try {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: code,
			maximumFractionDigits: Number.isInteger(amount) ? 0 : 2
		}).format(amount);
	} catch {
		return `${code} ${amount}`;
	}
}
