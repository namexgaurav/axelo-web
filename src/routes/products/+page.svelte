<script lang="ts">
  import ProductCard from '$lib/components/ui/ProductCard.svelte';
  import { Search, SlidersHorizontal } from 'lucide-svelte';

  export let data;

  let activeCategory = data.activeCategory || 'all';
  let searchQuery = '';

  const categoryOptions = [
    { id: 'all', label: 'All Hardware' },
    { id: 'desk-mats', label: 'Desk Mats' },
    { id: 'keyboards', label: 'Keyboards & Dials' },
    { id: 'mice', label: 'Precision Mice' },
    { id: 'organization', label: 'Organization' }
  ];

  $: filteredProducts = data.products.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
</script>

<svelte:head>
  <title>Curated Hardware Catalog | AXELO</title>
  <meta name="description" content="Explore AXELO's full catalog of precision desk essentials, mechanical keyboards, and workspace tools." />
</svelte:head>

<section class="min-h-screen pt-32 pb-24 px-5 sm:px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    
    <!-- Title & Editorial Description -->
    <div class="mb-10 text-center max-w-2xl mx-auto">
      <span class="eyebrow-text text-axelo-blue font-mono">COMPLETE ARCHIVE</span>
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-axelo-dark uppercase mt-1">
        HARDWARE CATALOG
      </h1>
      <p class="text-xs sm:text-sm text-axelo-muted mt-2 font-sans leading-relaxed">
        Thoughtfully engineered physical layers designed to quiet visual distraction and amplify your focus.
      </p>
    </div>

    <!-- Filter Bar -->
    <div class="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-axelo-border">
      <!-- Category Tabs -->
      <div class="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
        {#each categoryOptions as cat}
          <button
            type="button"
            on:click={() => (activeCategory = cat.id)}
            class="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 {activeCategory === cat.id
              ? 'bg-axelo-dark text-white shadow-xs'
              : 'bg-axelo-neutral text-axelo-muted hover:text-axelo-dark hover:bg-axelo-border/60'}"
          >
            {cat.label}
          </button>
        {/each}
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:w-72">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Filter catalog..."
          class="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-axelo-border bg-axelo-neutral focus:bg-white focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue transition-all"
        />
        <Search class="w-3.5 h-3.5 text-axelo-muted absolute left-3 top-2.5" />
      </div>
    </div>

    <!-- Product Grid -->
    {#if filteredProducts.length === 0}
      <div class="py-20 text-center border-2 border-dashed border-axelo-border rounded-2xl p-8">
        <p class="text-sm font-semibold text-axelo-dark uppercase tracking-wide">No matching hardware found</p>
        <p class="text-xs text-axelo-muted mt-1">Try selecting another category or clearing your search filter.</p>
        <button
          type="button"
          on:click={() => { activeCategory = 'all'; searchQuery = ''; }}
          class="mt-4 px-4 py-2 rounded-lg bg-axelo-dark text-white text-xs font-mono uppercase tracking-wider"
        >
          Reset Filters
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {#each filteredProducts as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {/if}

  </div>
</section>
