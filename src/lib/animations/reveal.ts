/**
 * Lightweight viewport reveal action using IntersectionObserver.
 * Triggers once and respects prefers-reduced-motion.
 */
export function reveal(node: HTMLElement, options: { delay?: number; y?: number; duration?: number } = {}) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    node.style.opacity = '1';
    node.style.transform = 'none';
    return {
      destroy() {}
    };
  }

  const delay = options.delay ?? 0;
  const y = options.y ?? 20;
  const duration = options.duration ?? 700;

  node.style.opacity = '0';
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
  node.style.willChange = 'opacity, transform';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
          observer.unobserve(node);
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
