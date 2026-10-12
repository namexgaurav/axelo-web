<script lang="ts">
  import { onMount } from 'svelte';
  import { cartCount, cartDrawerOpen } from '../../stores/cart';
  import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-svelte';

  export let onOpenMobileMenu: () => void = () => {};

  let isScrolled = false;
  let searchOpen = false;
  let searchQuery = '';

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const navLinks = [
    { label: 'Shop All', href: '#products' },
    { label: 'Desk Mats', href: '#category-desk-mats' },
    { label: 'Keyboards', href: '#category-keyboards' },
    { label: 'Mice & Hardware', href: '#category-mice' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Editorial', href: '#stories' }
  ];
</script>

<header
  class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 {isScrolled
    ? 'bg-white/90 backdrop-blur-md border-b border-axelo-border/70 py-3.5 shadow-subtle'
    : 'bg-transparent py-5'}"
>
  <div class="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
    <!-- Brand Wordmark -->
    <a href="/" class="flex items-center gap-2.5 group">
      <div class="w-7 h-7 bg-axelo-dark rounded-md flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 22 8.5 22 12 13 15.5 22 22 22 12 2" fill="white" stroke="none" />
          <circle cx="12" cy="7" r="1.5" fill="#0052FF" />
        </svg>
      </div>
      <span class="text-lg font-bold tracking-tight text-axelo-dark uppercase">
        AXELO
      </span>
      <span class="hidden sm:inline-block text-[10px] font-mono font-medium text-axelo-muted border-l border-axelo-border pl-2.5 ml-1">
        STUDIO
      </span>
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-8">
      {#each navLinks as link}
        <a
          href={link.href}
          class="text-xs font-medium uppercase tracking-wider text-axelo-dark/80 hover:text-axelo-blue transition-colors duration-200"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right utility controls -->
    <div class="flex items-center gap-3 sm:gap-5">
      <!-- Search toggle -->
      <button
        type="button"
        on:click={() => (searchOpen = !searchOpen)}
        class="p-2 text-axelo-dark/80 hover:text-axelo-blue transition-colors rounded-full hover:bg-axelo-neutral"
        aria-label="Search catalog"
      >
        <Search class="w-4 h-4" />
      </button>

      <!-- Cart Button -->
      <button
        type="button"
        on:click={() => cartDrawerOpen.set(true)}
        class="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-axelo-border hover:border-axelo-dark bg-white/70 hover:bg-white transition-all text-xs font-medium text-axelo-dark"
        aria-label="Open shopping bag"
      >
        <ShoppingBag class="w-3.5 h-3.5 text-axelo-dark" />
        <span class="hidden sm:inline text-xs tracking-wider uppercase">Bag</span>
        <span class="w-4 h-4 rounded-full bg-axelo-dark text-white text-[10px] font-bold flex items-center justify-center">
          {$cartCount}
        </span>
      </button>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        on:click={onOpenMobileMenu}
        class="md:hidden p-2 text-axelo-dark hover:text-axelo-blue rounded-md hover:bg-axelo-neutral"
        aria-label="Open mobile navigation"
      >
        <Menu class="w-5 h-5" />
      </button>
    </div>
  </div>

  <!-- Inline Search Dropdown -->
  {#if searchOpen}
    <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-3 pb-2 border-t border-axelo-border/50 animate-fade-in">
      <div class="relative max-w-xl mx-auto">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search desk mats, mechanical keyboards, precision mice..."
          class="w-full pl-10 pr-10 py-2 text-sm bg-axelo-neutral rounded-lg border border-axelo-border focus:border-axelo-blue focus:outline-none transition-colors"
        />
        <Search class="w-4 h-4 text-axelo-muted absolute left-3 top-3" />
        {#if searchQuery}
          <button
            type="button"
            on:click={() => (searchQuery = '')}
            class="absolute right-3 top-2.5 text-axelo-muted hover:text-axelo-dark text-xs font-bold"
          >
            Clear
          </button>
        {/if}
      </div>
      {#if searchQuery}
        <div class="max-w-xl mx-auto mt-2 text-center text-xs text-axelo-muted">
          Showing curated results for "<span class="text-axelo-dark font-medium">{searchQuery}</span>"
        </div>
      {/if}
    </div>
  {/if}
</header>
