<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { Menu, ArrowUpRight } from 'lucide-svelte';
  import BrandLogo from '$lib/components/common/BrandLogo.svelte';

  export let onOpenMobileMenu: () => void = () => {};

  let isScrolled = false;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  onMount(() => {
    const onScroll = () => {
      isScrolled = window.scrollY > 16;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function isActive(href: string, pathname: string | undefined): boolean {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }
</script>

<header
  class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 {isScrolled
    ? 'bg-white/92 backdrop-blur-xl border-b border-axelo-border shadow-subtle py-3'
    : 'bg-white/75 backdrop-blur-md border-b border-axelo-border/50 py-4'}"
>
  <div class="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
    <a href="/" class="group shrink-0" aria-label="AXELO Home">
      <BrandLogo variant="dark" />
    </a>

    <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
      {#each navLinks as link}
        {@const active = isActive(link.href, page.url?.pathname)}
        <a
          href={link.href}
          aria-current={active ? 'page' : undefined}
          class="px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 {active
            ? 'bg-axelo-dark text-white'
            : 'text-axelo-graphite hover:text-axelo-dark hover:bg-axelo-neutral'}"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="flex items-center gap-3">
      <a
        href="/products"
        class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-axelo-border hover:border-axelo-dark bg-white text-xs font-semibold text-axelo-dark transition-all duration-200 group"
      >
        <span>Explore Catalogue</span>
        <ArrowUpRight class="w-3.5 h-3.5 text-axelo-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>

      <button
        type="button"
        on:click={onOpenMobileMenu}
        class="md:hidden p-2 rounded-lg text-axelo-dark hover:bg-axelo-neutral transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu class="w-5 h-5" />
      </button>
    </div>
  </div>
</header>
