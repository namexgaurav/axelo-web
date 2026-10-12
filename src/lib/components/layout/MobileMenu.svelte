<script lang="ts">
  import { X, ArrowRight, ShoppingBag } from 'lucide-svelte';
  import { cartDrawerOpen, cartCount } from '../../stores/cart';

  export let isOpen = false;
  export let onClose: () => void = () => {};

  const links = [
    { label: 'Shop Catalog', href: '#products', count: '06 Items' },
    { label: 'Desk Mats & Pads', href: '#category-desk-mats', count: 'Pro & Core' },
    { label: 'Mechanical Keyboards', href: '#category-keyboards', count: 'Apex 75' },
    { label: 'Precision Mice', href: '#category-mice', count: 'Contour 58g' },
    { label: 'Desk Organization', href: '#products', count: 'Shelves & Docks' },
    { label: 'Design Philosophy', href: '#philosophy', count: 'Manifesto' },
    { label: 'Editorial Stories', href: '#stories', count: 'Read' }
  ];

  function handleNavigate(href: string) {
    onClose();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

{#if isOpen}
  <!-- Overlay Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
    on:click={onClose}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === 'Escape' && onClose()}
  ></div>

  <!-- Drawer Menu -->
  <div
    class="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col p-6 sm:p-8 animate-fade-in"
  >
    <div class="flex items-center justify-between pb-6 border-b border-axelo-border">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 bg-axelo-dark rounded flex items-center justify-center">
          <span class="text-white text-xs font-bold font-mono">A</span>
        </div>
        <span class="font-bold tracking-tight text-sm uppercase">AXELO NAVIGATION</span>
      </div>
      <button
        type="button"
        on:click={onClose}
        class="p-2 text-axelo-muted hover:text-axelo-dark rounded-full hover:bg-axelo-neutral"
        aria-label="Close menu"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation List -->
    <div class="flex-1 py-8 flex flex-col justify-start space-y-4 overflow-y-auto">
      {#each links as link}
        <a
          href={link.href}
          on:click|preventDefault={() => handleNavigate(link.href)}
          class="flex items-center justify-between py-2 text-lg font-medium text-axelo-dark hover:text-axelo-blue transition-colors group"
        >
          <span>{link.label}</span>
          <div class="flex items-center gap-2 text-xs font-mono text-axelo-muted group-hover:text-axelo-blue">
            <span>{link.count}</span>
            <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </a>
      {/each}
    </div>

    <!-- Bottom Actions -->
    <div class="pt-6 border-t border-axelo-border space-y-3">
      <button
        type="button"
        on:click={() => {
          onClose();
          cartDrawerOpen.set(true);
        }}
        class="w-full flex items-center justify-center gap-2 py-3 bg-axelo-dark text-white rounded-lg text-sm font-medium hover:bg-axelo-blue transition-colors"
      >
        <ShoppingBag class="w-4 h-4" />
        <span>View Shopping Bag ({$cartCount})</span>
      </button>
      <div class="text-center text-[11px] text-axelo-muted">
        AXELO — DEFINE YOUR OWN POWER
      </div>
    </div>
  </div>
{/if}
