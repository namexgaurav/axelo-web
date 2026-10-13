<script lang="ts">
  import { X, ArrowRight, ShoppingBag, User as UserIcon } from 'lucide-svelte';
  import { cartDrawerOpen, cartCount } from '../../stores/cart';
  import { isAuthenticated } from '$lib/auth/auth.store';

  export let isOpen = false;
  export let onClose: () => void = () => {};

  const links = [
    { label: 'All Collections & Store', href: '/collections', count: 'Archive' },
    { label: 'Desk Mats & Pads', href: '/collections/desk-mats', count: '06 Pieces' },
    { label: 'Mechanical Keyboards', href: '/collections/keyboards', count: 'Apex 75' },
    { label: 'Precision Mice', href: '/collections/mice', count: 'Contour 58g' },
    { label: 'Desk Organization', href: '/collections/organization', count: 'Risers & Docks' },
    { label: 'Design Philosophy', href: '/philosophy', count: 'Manifesto' },
    { label: 'Editorial Stories', href: '/stories', count: 'Journal' }
  ];
</script>

{#if isOpen}
  <!-- Overlay Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-md transition-opacity"
    on:click={onClose}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === 'Escape' && onClose()}
  ></div>

  <!-- Drawer Menu -->
  <div
    class="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white border-l border-black/[0.08] shadow-2xl flex flex-col p-6 sm:p-8 animate-fade-in sm:rounded-l-3xl"
  >
    <div class="flex items-center justify-between pb-6 border-b border-black/[0.06]">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 bg-axelo-dark rounded-lg flex items-center justify-center shadow-sm">
          <span class="text-white text-xs font-bold font-mono tracking-tighter">AX</span>
        </div>
        <span class="font-mono text-xs uppercase tracking-widest text-axelo-muted">Index / Navigation</span>
      </div>
      <button
        type="button"
        on:click={onClose}
        class="w-8 h-8 flex items-center justify-center text-axelo-muted hover:text-axelo-dark rounded-full hover:bg-black/[0.04] transition-colors"
        aria-label="Close menu"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- Navigation List -->
    <div class="flex-1 py-8 flex flex-col justify-start space-y-1 overflow-y-auto">
      {#each links as link, i}
        <a
          href={link.href}
          on:click={onClose}
          class="flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium text-axelo-dark hover:bg-black/[0.03] hover:text-axelo-blue transition-all group"
        >
          <div class="flex items-center gap-3">
            <span class="font-mono text-[11px] text-axelo-muted group-hover:text-axelo-blue">0{i + 1}</span>
            <span class="tracking-tight">{link.label}</span>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono text-axelo-muted group-hover:text-axelo-blue">
            <span>{link.count}</span>
            <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </a>
      {/each}
    </div>

    <!-- Bottom Actions -->
    <div class="pt-6 border-t border-black/[0.06] space-y-3">
      {#if $isAuthenticated}
        <a
          href="/account"
          on:click={onClose}
          class="w-full flex items-center justify-center gap-2 py-3 bg-white border border-black/10 text-axelo-dark rounded-xl text-sm font-medium hover:bg-axelo-neutral transition-colors shadow-xs"
        >
          <UserIcon class="w-4 h-4 text-axelo-blue" />
          <span>My Account & Orders</span>
        </a>
      {:else}
        <a
          href="/login"
          on:click={onClose}
          class="w-full flex items-center justify-center gap-2 py-3 bg-white border border-black/10 text-axelo-dark rounded-xl text-sm font-medium hover:bg-axelo-neutral transition-colors shadow-xs"
        >
          <UserIcon class="w-4 h-4 text-axelo-muted" />
          <span>Sign In / Create Account</span>
        </a>
      {/if}

      <button
        type="button"
        on:click={() => {
          onClose();
          cartDrawerOpen.set(true);
        }}
        class="w-full flex items-center justify-center gap-2 py-3.5 bg-axelo-dark text-white rounded-xl text-sm font-medium hover:bg-axelo-blue transition-colors shadow-sm"
      >
        <ShoppingBag class="w-4 h-4" />
        <span>View Shopping Bag ({$cartCount})</span>
      </button>
      <div class="text-center font-mono text-[10px] uppercase tracking-wider text-axelo-muted pt-1">
        AXELO — Engineered Workspace Hardware
      </div>
    </div>
  </div>
{/if}
