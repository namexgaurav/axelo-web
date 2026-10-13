<script lang="ts">
  import { onMount } from 'svelte';
  import { cartCount, cartDrawerOpen, quickViewProduct } from '../../stores/cart';
  import { isAuthenticated } from '$lib/auth/auth.store';
  import { products } from '../../data/products';
  import { ShoppingBag, Search, Menu, X, ArrowRight, User as UserIcon, Sparkles } from 'lucide-svelte';

  export let onOpenMobileMenu: () => void = () => {};

  let isScrolled = false;
  let searchOpen = false;
  let searchQuery = '';
  let searchInputEl: HTMLInputElement;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchOpen = !searchOpen;
        if (searchOpen) {
          setTimeout(() => searchInputEl?.focus(), 100);
        }
      }
      if (e.key === 'Escape' && searchOpen) {
        searchOpen = false;
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  import { page } from '$app/state';

  const navLinks = [
    { label: 'Collections', href: '/collections' },
    { label: 'Desk Mats', href: '/collections/desk-mats' },
    { label: 'Keyboards', href: '/collections/keyboards' },
    { label: 'Mice', href: '/collections/mice' },
    { label: 'Organization', href: '/collections/organization' },
    { label: 'Philosophy', href: '/philosophy' },
    { label: 'Editorial', href: '/stories' }
  ];

  $: searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  function handleSelectSearchResult(p: any) {
    searchOpen = false;
    searchQuery = '';
    quickViewProduct.set(p);
  }
</script>

<!-- Sticky / Fixed Top Header Wrapper -->
<div class="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
  <!-- Top Announcement Ticker Bar -->
  <div
    class="bg-[#111111] text-white text-[11px] font-mono tracking-wider text-center border-b border-white/10 transition-all duration-300 overflow-hidden {isScrolled
      ? 'max-h-0 opacity-0 py-0 border-b-0 -translate-y-2'
      : 'max-h-12 opacity-100 py-1.5 px-4 translate-y-0'}"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <span class="hidden sm:inline-block text-white/50 text-[10px]">REVISION 2.0 // REVERSIBLE MATS IN STOCK</span>
      <div class="flex-1 text-center font-medium">
        <span>Free express freight on orders over $100</span>
        <span class="text-white/40 mx-2">•</span>
        <span class="text-white/70">30-day workspace evaluation</span>
      </div>
      <span class="hidden md:inline-block text-white/50 text-[10px] font-mono">DEFINE YOUR OWN POWER</span>
    </div>
  </div>

  <!-- Primary Navigation Bar -->
  <header
    class="w-full transition-all duration-300 {isScrolled
      ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.08] py-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
      : 'bg-white/60 backdrop-blur-md py-4 sm:py-5 border-b border-black/[0.03]'}"
  >
    <div class="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
    <!-- Brand Wordmark -->
    <a href="/" class="flex items-center gap-3 group">
      <div class="w-7 h-7 bg-axelo-dark rounded-md flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-2xs">
        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 22 8.5 22 12 13 15.5 22 22 22 12 2" fill="white" stroke="none" />
          <circle cx="12" cy="7" r="1.5" fill="#0052FF" />
        </svg>
      </div>
      <div class="flex items-baseline gap-2">
        <span class="text-lg font-extrabold tracking-[-0.03em] text-axelo-dark uppercase">
          AXELO
        </span>
        <span class="text-[10px] font-mono font-medium text-axelo-muted border-l border-axelo-border pl-2">
          STUDIO
        </span>
      </div>
    </a>

    <!-- Desktop Navigation (Redirects to Dedicated Screens) -->
    <nav class="hidden md:flex items-center gap-1">
      {#each navLinks as link}
        <a
          href={link.href}
          class="px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 {page.url?.pathname === link.href || (link.href !== '/' && link.href !== '/collections' && page.url?.pathname?.startsWith(link.href))
            ? 'bg-axelo-dark text-white font-semibold shadow-2xs'
            : page.url?.pathname === '/collections' && link.href === '/collections'
              ? 'bg-axelo-dark text-white font-semibold shadow-2xs'
              : 'text-axelo-dark/80 hover:text-axelo-dark hover:bg-black/[0.04]'}"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right utility controls -->
    <div class="flex items-center gap-2.5 sm:gap-4">
      <!-- Search toggle button with shortcut badge -->
      <button
        type="button"
        on:click={() => {
          searchOpen = !searchOpen;
          if (searchOpen) setTimeout(() => searchInputEl?.focus(), 100);
        }}
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-full text-axelo-dark/80 hover:text-axelo-dark hover:bg-black/[0.04] transition-colors"
        aria-label="Search catalog"
        title="Search (Cmd+K)"
      >
        <Search class="w-4 h-4" />
        <span class="hidden lg:inline text-[11px] font-mono text-axelo-muted bg-axelo-neutral px-1.5 py-0.5 rounded border border-axelo-border/80">⌘K</span>
      </button>

      <!-- Account / Sign In -->
      {#if $isAuthenticated}
        <a
          href="/account"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-axelo-border hover:border-axelo-dark bg-white/70 hover:bg-white transition-all text-xs font-mono uppercase tracking-wider text-axelo-dark"
          title="My Account"
        >
          <UserIcon class="w-3.5 h-3.5 text-axelo-blue" />
          <span class="hidden sm:inline text-[11px] font-semibold">Account</span>
        </a>
      {:else}
        <a
          href="/login"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-axelo-neutral hover:bg-axelo-dark hover:text-white border border-axelo-border transition-all text-xs font-mono uppercase tracking-wider text-axelo-dark"
        >
          <UserIcon class="w-3.5 h-3.5" />
          <span class="hidden sm:inline text-[11px] font-semibold">Sign In</span>
        </a>
      {/if}

      <!-- Cart Button with Animated Count -->
      <button
        type="button"
        on:click={() => cartDrawerOpen.set(true)}
        class="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-axelo-dark text-white hover:bg-axelo-blue transition-all duration-200 text-xs font-medium shadow-xs group"
        aria-label="Open shopping bag"
      >
        <ShoppingBag class="w-3.5 h-3.5 text-white" />
        <span class="text-xs tracking-wider uppercase font-semibold">Bag</span>
        <span class="min-w-4 h-4 px-1 rounded-full bg-white text-axelo-dark text-[10px] font-bold flex items-center justify-center transition-transform group-hover:scale-110">
          {$cartCount}
        </span>
      </button>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        on:click={onOpenMobileMenu}
        class="md:hidden p-2 text-axelo-dark hover:text-axelo-blue rounded-lg hover:bg-black/[0.04]"
        aria-label="Open mobile navigation"
      >
        <Menu class="w-5 h-5" />
      </button>
    </div>
  </div>

  <!-- Command Palette / Search Dropdown Drawer -->
  {#if searchOpen}
    <div class="max-w-4xl mx-auto px-5 sm:px-8 pt-4 pb-4 border-t border-black/[0.06] mt-3 animate-fade-in bg-white/95 backdrop-blur-2xl rounded-2xl shadow-elevated mx-4 sm:mx-auto">
      <div class="relative">
        <input
          bind:this={searchInputEl}
          type="text"
          bind:value={searchQuery}
          placeholder="Type to search desk mats, keyboards, mice, or acoustic accessories..."
          class="w-full pl-11 pr-20 py-2.5 text-sm bg-axelo-neutral rounded-xl border border-axelo-border focus:border-axelo-blue focus:outline-none transition-all"
        />
        <Search class="w-4 h-4 text-axelo-muted absolute left-3.5 top-3.5" />
        <div class="absolute right-3 top-2.5 flex items-center gap-2">
          {#if searchQuery}
            <button
              type="button"
              on:click={() => (searchQuery = '')}
              class="text-axelo-muted hover:text-axelo-dark text-xs font-bold font-mono px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          {/if}
          <button
            type="button"
            on:click={() => (searchOpen = false)}
            class="text-[10px] font-mono text-axelo-muted bg-white px-2 py-0.5 rounded border border-axelo-border hover:text-axelo-dark"
          >
            ESC
          </button>
        </div>
      </div>

      <!-- Quick category suggestions when empty -->
      {#if !searchQuery}
        <div class="mt-3 flex items-center gap-2 text-xs">
          <span class="text-axelo-muted text-[11px] font-mono">Popular:</span>
          <button
            type="button"
            on:click={() => (searchQuery = 'Studio Desk Mat')}
            class="px-2.5 py-1 rounded-full bg-axelo-neutral hover:bg-axelo-border/80 text-[11px] text-axelo-dark transition-colors"
          >
            Studio Desk Mat Pro
          </button>
          <button
            type="button"
            on:click={() => (searchQuery = 'Apex 75')}
            class="px-2.5 py-1 rounded-full bg-axelo-neutral hover:bg-axelo-border/80 text-[11px] text-axelo-dark transition-colors"
          >
            Apex 75 Keyboard
          </button>
          <button
            type="button"
            on:click={() => (searchQuery = 'Contour')}
            class="px-2.5 py-1 rounded-full bg-axelo-neutral hover:bg-axelo-border/80 text-[11px] text-axelo-dark transition-colors"
          >
            Contour 58g Mouse
          </button>
        </div>
      {:else}
        <!-- Real-time search result list -->
        <div class="mt-4 divide-y divide-axelo-border/60 max-h-72 overflow-y-auto">
          {#if searchResults.length > 0}
            {#each searchResults as result}
              <div
                class="py-2.5 px-3 rounded-lg hover:bg-axelo-neutral flex items-center justify-between cursor-pointer transition-colors"
                on:click={() => handleSelectSearchResult(result)}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && handleSelectSearchResult(result)}
              >
                <div class="flex items-center gap-3">
                  <img src={result.primaryImage} alt={result.name} class="w-10 h-10 rounded-md object-cover bg-white border border-axelo-border" />
                  <div>
                    <h5 class="text-xs font-bold text-axelo-dark">{result.name}</h5>
                    <p class="text-[11px] text-axelo-muted">{result.categoryLabel} • {result.tagline}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-xs font-mono font-bold text-axelo-dark">${result.price}</span>
                  <span class="text-[11px] text-axelo-blue font-semibold">Inspect →</span>
                </div>
              </div>
            {/each}
          {:else}
            <div class="py-6 text-center text-xs text-axelo-muted">
              No matching AXELO hardware found for "{searchQuery}".
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</header>
</div>
