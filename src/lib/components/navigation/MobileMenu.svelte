<script lang="ts">
  import { page } from '$app/state';
  import { X, ArrowRight } from 'lucide-svelte';
  import BrandLogo from '$lib/components/common/BrandLogo.svelte';

  export let isOpen = false;
  export let onClose: () => void = () => {};

  const links = [
    { label: 'Home', href: '/', index: '01' },
    { label: 'Products', href: '/products', index: '02' },
    { label: 'About AXELO', href: '/about', index: '03' },
    { label: 'Contact', href: '/contact', index: '04' }
  ];

  function handleWindowKeydown(e: KeyboardEvent) {
    if (isOpen && e.key === 'Escape') {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleWindowKeydown} />

{#if isOpen}
  <div
    class="fixed inset-0 z-50 bg-axelo-obsidian/45 backdrop-blur-sm animate-fade-in"
    on:click={onClose}
    role="presentation"
  ></div>

  <aside
    class="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white border-l border-axelo-border shadow-elevated flex flex-col p-6 sm:p-8"
    aria-label="Mobile Navigation"
  >
    <div class="flex items-center justify-between pb-6 border-b border-axelo-border">
      <a href="/" on:click={onClose} class="group">
        <BrandLogo variant="dark" showSubmark={false} />
      </a>
      <button
        type="button"
        on:click={onClose}
        class="w-9 h-9 rounded-full flex items-center justify-center text-axelo-muted hover:text-axelo-dark hover:bg-axelo-neutral transition-colors"
        aria-label="Close navigation menu"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <nav class="flex-1 py-8 space-y-1.5" aria-label="Mobile">
      {#each links as link}
        {@const active = link.href === '/' ? page.url?.pathname === '/' : page.url?.pathname?.startsWith(link.href)}
        <a
          href={link.href}
          on:click={onClose}
          class="flex items-center justify-between px-3.5 py-3.5 rounded-xl transition-colors group {active
            ? 'bg-axelo-dark text-white'
            : 'text-axelo-dark hover:bg-axelo-neutral'}"
        >
          <div class="flex items-center gap-3">
            <span class="font-mono text-[11px] {active ? 'text-axelo-blueSoft/80' : 'text-axelo-muted'}">
              {link.index}
            </span>
            <span class="text-base font-medium tracking-tight">{link.label}</span>
          </div>
          <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      {/each}
    </nav>

    <div class="pt-6 border-t border-axelo-border space-y-4">
      <a
        href="/products"
        on:click={onClose}
        class="w-full py-3.5 px-5 rounded-xl bg-axelo-dark hover:bg-axelo-blue text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
      >
        <span>Explore Products</span>
        <ArrowRight class="w-4 h-4" />
      </a>
      <p class="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-axelo-muted">
        Premium. Yet Affordable.
      </p>
    </div>
  </aside>
{/if}
