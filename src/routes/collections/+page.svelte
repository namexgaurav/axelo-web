<script lang="ts">
  import ProductCard from '$lib/components/ui/ProductCard.svelte';
  import { Search, SlidersHorizontal, ArrowRight, ChevronRight, Home, Sparkles, X, Check } from 'lucide-svelte';

  export let data;

  let activeCategory = data.activeCategory || 'all';
  let searchQuery = '';
  let sortBy = 'featured'; // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  let showFiltersDrawer = false;
  let inStockOnly = false;
  let maxPrice = 300;

  const categoryPills = [
    { id: 'all', label: 'All Hardware', count: data.products.length },
    { id: 'desk-mats', label: 'Desk Mats', count: data.products.filter(p => p.category === 'desk-mats').length || 6 },
    { id: 'keyboards', label: 'Keyboards', count: data.products.filter(p => p.category === 'keyboards').length || 4 },
    { id: 'mice', label: 'Precision Mice', count: data.products.filter(p => p.category === 'mice').length || 3 },
    { id: 'organization', label: 'Organization', count: data.products.filter(p => p.category === 'organization').length || 8 }
  ];

  const collectionCards = [
    {
      slug: 'desk-mats',
      title: 'Desk Mats & Surfaces',
      tagline: 'Dual-surface precision wool & vegan leather foundations',
      count: 6,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=85',
      accent: 'Foundational Layer'
    },
    {
      slug: 'keyboards',
      title: 'Mechanical Keyboards',
      tagline: 'CNC 6063 aluminum chassis & acoustic dampening',
      count: 4,
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=85',
      accent: 'Tactile Haptics'
    },
    {
      slug: 'mice',
      title: 'Precision Mice & Hardware',
      tagline: 'Ultralight sub-60g wireless tracking with virgin PTFE glide',
      count: 3,
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=85',
      accent: 'Micro Ergonomics'
    },
    {
      slug: 'organization',
      title: 'Desk Organization & Riser Kits',
      tagline: 'Machined cable guides, device anchors & solid walnut trays',
      count: 8,
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=85',
      accent: 'Zero Visual Noise'
    }
  ];

  $: filteredProducts = data.products
    .filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  function resetFilters() {
    activeCategory = 'all';
    searchQuery = '';
    sortBy = 'featured';
    maxPrice = 300;
    inStockOnly = false;
  }
</script>

<svelte:head>
  <title>Curated Collections & Store | AXELO Hardware</title>
  <meta name="description" content="Explore AXELO's complete physical hardware collections: desk mats, mechanical keyboards, precision mice, and desk organization." />
</svelte:head>

<div class="min-h-screen pt-28 pb-28 bg-[#FFFFFF]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    
    <!-- Breadcrumb Hierarchy -->
    <nav class="flex items-center gap-2 text-xs font-mono text-axelo-muted mb-8" aria-label="Breadcrumb">
      <a href="/" class="flex items-center gap-1.5 hover:text-axelo-dark transition-colors">
        <Home class="w-3.5 h-3.5" />
        <span>Home</span>
      </a>
      <ChevronRight class="w-3.5 h-3.5 text-axelo-border" />
      <span class="text-axelo-dark font-medium">Collections</span>
    </nav>

    <!-- Monumental Editorial Header (Image 2 Aesthetic) -->
    <div class="pb-12 border-b border-black/[0.06] mb-14">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 mb-3">
            <span class="w-2 h-2 rounded-full bg-axelo-blue"></span>
            <span class="text-[11px] font-mono font-bold uppercase tracking-widest text-axelo-muted">
              AXELO HARDWARE ARCHIVE
            </span>
          </div>
          <h1 class="editorial-title text-5xl sm:text-7xl lg:text-[5rem] font-extrabold text-axelo-dark tracking-[-0.04em] leading-[0.95]">
            Collections
          </h1>
        </div>
        <p class="max-w-md text-sm text-axelo-muted font-sans leading-relaxed">
          Engineered physical layers crafted for architects, engineers, and digital craftsmen. Explore by modular category or inspect the full archive below.
        </p>
      </div>
    </div>

    <!-- Visual Collections Cards Grid (Directly inspired by Image 2) -->
    <section class="mb-24" aria-label="Hardware Collections">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2.5">
          <span class="font-mono text-xs uppercase tracking-wider text-axelo-muted font-semibold">01 // SELECT CATEGORY</span>
          <span class="text-axelo-border">•</span>
          <span class="text-xs text-axelo-muted">{collectionCards.length} Curated Series</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each collectionCards as col}
          <a
            href="/collections/{col.slug}"
            class="group relative flex flex-col justify-between bg-[#F7F7F5] rounded-3xl p-5 border border-black/[0.05] hover:border-axelo-blue/30 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <!-- Card Image Container -->
            <div class="aspect-4/3 w-full rounded-2xl overflow-hidden bg-white/70 mb-5 relative">
              <img
                src={col.image}
                alt={col.title}
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-axelo-dark font-semibold shadow-xs">
                {col.accent}
              </span>
            </div>

            <!-- Card Bottom Meta -->
            <div>
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-base font-bold text-axelo-dark group-hover:text-axelo-blue transition-colors leading-snug">
                  {col.title}<sup class="text-xs font-mono font-normal text-axelo-muted ml-1">{col.count}</sup>
                </h3>
                <div class="w-8 h-8 rounded-full bg-white border border-black/[0.06] flex items-center justify-center shrink-0 group-hover:bg-axelo-dark group-hover:text-white transition-all shadow-2xs">
                  <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
              <p class="text-xs text-axelo-muted mt-2 leading-relaxed">
                {col.tagline}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- All Products Catalog Section (Inspired by Image 1 Filter Bar & Store) -->
    <section id="store-catalog" class="pt-10 border-t border-black/[0.06]">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span class="font-mono text-xs uppercase tracking-wider text-axelo-muted font-semibold">02 // COMPLETE STORE ARCHIVE</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-axelo-dark tracking-tight mt-1">
            All Hardware Pieces
          </h2>
        </div>
        <div class="font-mono text-xs text-axelo-muted">
          Showing <span class="font-bold text-axelo-dark">{filteredProducts.length}</span> of {data.products.length} catalog items
        </div>
      </div>

      <!-- Filter & Sort Bar (Matching Image 1 design) -->
      <div class="bg-[#F7F7F5] p-3 sm:p-4 rounded-2xl border border-black/[0.06] mb-8">
        <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          <!-- Left: Show Filters Button & Category Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              type="button"
              on:click={() => (showFiltersDrawer = !showFiltersDrawer)}
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-semibold transition-all shrink-0 {showFiltersDrawer
                ? 'bg-axelo-dark text-white border-axelo-dark shadow-xs'
                : 'bg-white text-axelo-dark border-black/[0.08] hover:border-axelo-dark shadow-2xs'}"
            >
              <SlidersHorizontal class="w-3.5 h-3.5" />
              <span>{showFiltersDrawer ? 'Hide Filters' : 'Show Filters'}</span>
              {#if maxPrice < 300 || inStockOnly}
                <span class="w-2 h-2 rounded-full bg-axelo-blue"></span>
              {/if}
            </button>

            <div class="h-6 w-px bg-black/10 mx-1 hidden sm:block"></div>

            {#each categoryPills as pill}
              <button
                type="button"
                on:click={() => (activeCategory = pill.id)}
                class="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all shrink-0 whitespace-nowrap {activeCategory === pill.id
                  ? 'bg-axelo-dark text-white font-bold shadow-xs'
                  : 'bg-white/80 text-axelo-dark hover:bg-white border border-black/[0.05]'}"
              >
                {pill.label} ({pill.count})
              </button>
            {/each}
          </div>

          <!-- Right: Search Input & Sort Dropdown -->
          <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="relative flex-1 sm:w-60">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search pieces..."
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

            <!-- Sort By Pill Dropdown -->
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

        <!-- Collapsible Filters Drawer -->
        {#if showFiltersDrawer}
          <div class="mt-4 pt-4 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in text-xs">
            <div>
              <label class="block font-mono text-[11px] uppercase tracking-wider text-axelo-muted font-bold mb-2">
                Price Cap: ${maxPrice}
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

            <div>
              <span class="block font-mono text-[11px] uppercase tracking-wider text-axelo-muted font-bold mb-2">
                Availability
              </span>
              <label class="inline-flex items-center gap-2 cursor-pointer text-axelo-dark">
                <input
                  type="checkbox"
                  bind:checked={inStockOnly}
                  class="rounded accent-axelo-blue"
                />
                <span>In Stock & Ready for Express Freight</span>
              </label>
            </div>

            <div class="flex items-end justify-start sm:justify-end">
              <button
                type="button"
                on:click={resetFilters}
                class="px-4 py-1.5 rounded-lg border border-black/10 hover:border-axelo-dark text-axelo-dark font-mono text-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        {/if}
      </div>

      <!-- Products Grid -->
      {#if filteredProducts.length === 0}
        <div class="py-24 text-center border border-dashed border-black/10 rounded-3xl p-8 bg-[#F7F7F5]/50">
          <p class="text-sm font-bold text-axelo-dark uppercase tracking-wider">No matching hardware pieces</p>
          <p class="text-xs text-axelo-muted mt-1.5 max-w-sm mx-auto">
            Try adjusting your search criteria, raising your price ceiling, or choosing another collection.
          </p>
          <button
            type="button"
            on:click={resetFilters}
            class="mt-5 px-5 py-2.5 rounded-full bg-axelo-dark text-white text-xs font-mono uppercase tracking-wider hover:bg-axelo-blue transition-colors shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredProducts as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      {/if}

    </section>

    <!-- Reassurance Banner at Bottom of Store -->
    <div class="mt-28 p-8 sm:p-12 rounded-3xl bg-[#090C15] text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="max-w-xl">
        <span class="text-[10px] font-mono uppercase tracking-widest text-axelo-blue font-bold">
          AXELO GUARANTEE
        </span>
        <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
          30-Day Workspace Trial. Zero Restocking Fees.
        </h3>
        <p class="text-xs text-white/60 mt-2 leading-relaxed">
          Experience our mechanical keyboards, desk mats, and precision mice in your physical daily setup. If it doesn't elevate your posture and focus, return it effortlessly.
        </p>
      </div>
      <div class="flex items-center gap-4 shrink-0">
        <a
          href="/philosophy"
          class="px-6 py-3 rounded-full bg-white text-axelo-dark font-medium text-xs uppercase tracking-wider hover:bg-axelo-neutral transition-colors shadow-sm"
        >
          Read Philosophy
        </a>
      </div>
    </div>

  </div>
</div>
