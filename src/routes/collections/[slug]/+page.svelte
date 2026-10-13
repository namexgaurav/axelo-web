<script lang="ts">
  import ProductCard from '$lib/components/ui/ProductCard.svelte';
  import { Search, SlidersHorizontal, ArrowRight, ChevronRight, Home, ArrowLeft, X, Sparkles } from 'lucide-svelte';

  export let data;

  let searchQuery = '';
  let sortBy = 'featured';
  let showFiltersDrawer = false;
  let maxPrice = 300;

  $: category = data.category;
  $: products = data.products;

  $: filteredProducts = products
    .filter(p => {
      const matchesSearch = !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  $: otherCategories = data.allCategories.filter(c => c.id !== category.id);
</script>

<svelte:head>
  <title>{category.title} Collection | AXELO Hardware</title>
  <meta name="description" content="{category.description}" />
</svelte:head>

<div class="min-h-screen pt-28 pb-28 bg-[#FFFFFF]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    
    <!-- Breadcrumbs (Matching Image 1: Home / Collections / [Category]) -->
    <nav class="flex items-center gap-2 text-xs font-mono text-axelo-muted mb-8" aria-label="Breadcrumb">
      <a href="/" class="flex items-center gap-1.5 hover:text-axelo-dark transition-colors">
        <Home class="w-3.5 h-3.5" />
        <span>Home</span>
      </a>
      <ChevronRight class="w-3.5 h-3.5 text-axelo-border" />
      <a href="/collections" class="hover:text-axelo-dark transition-colors">
        Collections
      </a>
      <ChevronRight class="w-3.5 h-3.5 text-axelo-border" />
      <span class="text-axelo-dark font-medium">{category.title}</span>
    </nav>

    <!-- Collection Hero Banner (Inspired directly by Image 1) -->
    <div class="relative rounded-3xl bg-[#F7F7F5] border border-black/[0.06] overflow-hidden mb-12">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-axelo-blue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-8 sm:p-12 lg:p-16">
        <!-- Text Details -->
        <div class="lg:col-span-7">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="w-2 h-2 rounded-full bg-axelo-blue"></span>
            <span class="text-[11px] font-mono font-bold uppercase tracking-widest text-axelo-muted">
              COLLECTION // {category.id.toUpperCase()}
            </span>
          </div>

          <h1 class="editorial-title text-4xl sm:text-6xl lg:text-[4.75rem] font-extrabold text-axelo-dark tracking-[-0.04em] leading-[0.95] mb-5">
            {category.title}
          </h1>

          <p class="text-sm sm:text-base text-axelo-muted max-w-xl leading-relaxed mb-6">
            {category.description}
          </p>

          <div class="flex flex-wrap items-center gap-3">
            <span class="px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-axelo-dark font-medium shadow-2xs">
              {products.length} Products in Series
            </span>
            <span class="px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-axelo-dark font-medium shadow-2xs">
              Direct-to-Desk Express Freight
            </span>
            <span class="px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-axelo-dark font-medium shadow-2xs">
              30-Day Evaluation
            </span>
          </div>
        </div>

        <!-- Hero Photograph -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-black/[0.08] bg-white">
            <img
              src={category.image}
              alt={category.title}
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Filter & Sort Bar (Matching Image 1) -->
    <div class="bg-[#F7F7F5] p-3 sm:p-4 rounded-2xl border border-black/[0.06] mb-10">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        <!-- Left: Show Filters Button -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            on:click={() => (showFiltersDrawer = !showFiltersDrawer)}
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-semibold transition-all {showFiltersDrawer
              ? 'bg-axelo-dark text-white border-axelo-dark shadow-xs'
              : 'bg-white text-axelo-dark border-black/[0.08] hover:border-axelo-dark shadow-2xs'}"
          >
            <SlidersHorizontal class="w-3.5 h-3.5" />
            <span>{showFiltersDrawer ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          <span class="text-xs font-mono text-axelo-muted">
            {filteredProducts.length} of {products.length} items
          </span>
        </div>

        <!-- Right: In-category Search & Sort Dropdown -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative flex-1 sm:w-56">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search {category.title.toLowerCase()}..."
              class="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-full border border-black/[0.08] focus:border-axelo-blue focus:outline-none transition-all placeholder:text-axelo-muted"
            />
            <Search class="w-3.5 h-3.5 text-axelo-muted absolute left-2.5 top-2" />
            {#if searchQuery}
              <button
                type="button"
                on:click={() => (searchQuery = '')}
                class="absolute right-2.5 top-1.5 text-axelo-muted hover:text-axelo-dark"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            {/if}
          </div>

          <!-- Sort dropdown (Matching Image 1: Sort by: Featured •) -->
          <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-black/[0.08] shrink-0">
            <span class="text-[11px] font-mono text-axelo-muted whitespace-nowrap">Sort by:</span>
            <select
              bind:value={sortBy}
              class="bg-transparent text-xs font-semibold text-axelo-dark focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured">Featured •</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Expandable Filters Drawer -->
      {#if showFiltersDrawer}
        <div class="mt-4 pt-4 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in text-xs">
          <div>
            <label class="block font-mono text-[11px] uppercase tracking-wider text-axelo-muted font-bold mb-2">
              Price Range: Up to ${maxPrice}
            </label>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              bind:value={maxPrice}
              class="w-full accent-axelo-blue cursor-pointer"
            />
            <div class="flex justify-between text-[10px] font-mono text-axelo-muted mt-1">
              <span>$50</span>
              <span>$300</span>
            </div>
          </div>

          <div class="flex items-end justify-start sm:justify-end gap-2">
            <button
              type="button"
              on:click={() => { searchQuery = ''; maxPrice = 300; sortBy = 'featured'; }}
              class="px-4 py-1.5 rounded-lg border border-black/10 hover:border-axelo-dark text-axelo-dark font-mono text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Product Grid for This Category -->
    {#if filteredProducts.length === 0}
      <div class="py-24 text-center border border-dashed border-black/10 rounded-3xl p-8 bg-[#F7F7F5]/50">
        <p class="text-sm font-bold text-axelo-dark uppercase tracking-wider">No matching products found</p>
        <p class="text-xs text-axelo-muted mt-1">Try clearing your search query or adjusting your price limit.</p>
        <button
          type="button"
          on:click={() => { searchQuery = ''; maxPrice = 300; }}
          class="mt-4 px-4 py-2 rounded-lg bg-axelo-dark text-white text-xs font-mono uppercase tracking-wider"
        >
          Reset Filter
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProducts as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {/if}

    <!-- Other Collections Navigation -->
    <div class="mt-28 pt-12 border-t border-black/[0.06]">
      <div class="flex items-center justify-between mb-8">
        <div>
          <span class="font-mono text-xs uppercase tracking-wider text-axelo-muted font-semibold">MORE SERIES</span>
          <h3 class="text-2xl font-bold text-axelo-dark tracking-tight mt-1">Explore Other Collections</h3>
        </div>
        <a
          href="/collections"
          class="text-xs font-mono font-semibold text-axelo-blue hover:underline flex items-center gap-1"
        >
          <span>All Collections</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {#each otherCategories.slice(0, 3) as col}
          <a
            href="/collections/{col.id}"
            class="group bg-[#F7F7F5] rounded-2xl p-4 border border-black/[0.05] hover:border-axelo-blue/30 hover:shadow-md transition-all flex items-center gap-4"
          >
            <img
              src={col.image}
              alt={col.title}
              class="w-16 h-16 rounded-xl object-cover bg-white shrink-0 group-hover:scale-105 transition-transform"
            />
            <div class="min-w-0 flex-1">
              <h4 class="text-xs font-bold text-axelo-dark group-hover:text-axelo-blue transition-colors truncate">
                {col.title}
              </h4>
              <p class="text-[11px] text-axelo-muted truncate mt-0.5">{col.subtitle || 'Engineered Hardware'}</p>
            </div>
            <ArrowRight class="w-4 h-4 text-axelo-muted group-hover:text-axelo-dark transform group-hover:translate-x-0.5 transition-all shrink-0" />
          </a>
        {/each}
      </div>
    </div>

  </div>
</div>
