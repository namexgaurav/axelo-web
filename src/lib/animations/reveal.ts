/**
 * Viewport reveal Svelte action using IntersectionObserver.
 * Uses GPU-friendly opacity and transform, triggers once, and respects prefers-reduced-motion.
 */
export function reveal(
	node: HTMLElement,
	options: { delay?: number; y?: number; duration?: number } = {}
) {
	if (typeof window === 'undefined') {
		return { destroy() {} };
	}

	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) {
		node.style.opacity = '1';
		node.style.transform = 'none';
		return { destroy() {} };
	}

	const delay = options.delay ?? 0;
	const y = options.y ?? 18;
	const duration = options.duration ?? 650;

	node.style.opacity = '0';
	node.style.transform = `translate3d(0, ${y}px, 0)`;
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
	node.style.willChange = 'opacity, transform';

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translate3d(0, 0, 0)';
					observer.unobserve(node);
				}
			}
		},
		{
			rootMargin: '0px 0px -48px 0px',
			threshold: 0.08
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
