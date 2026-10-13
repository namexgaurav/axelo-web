<script lang="ts">
  import { products } from '../../data/products';
  import ProductCard from '../ui/ProductCard.svelte';
  import { ArrowRight, SlidersHorizontal, Sparkles } from 'lucide-svelte';

  export let activeCategory = 'all';

  const filterTabs = [
    { id: 'all', label: 'All Studio Gear' },
    { id: 'desk-mats', label: 'Desk Mats' },
    { id: 'keyboards', label: 'Keyboards & Dials' },
    { id: 'mice', label: 'Precision Mice' },
    { id: 'organization', label: 'Organization' }
  ];

  function getCategoryCount(catId: string) {
    if (catId === 'all') return products.length;
    return products.filter(p => p.category === catId).length;
  }

  $: filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);
</script>

<section id="products" class="py-28 md:py-40 bg-[#FFFFFF] border-b border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Section Header with Generous Whitespace -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
      <div>
        <div class="flex items-center gap-2 mb-3.5">
          <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
          <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-blue">
            CURATED DISCOVERY // 08
          </span>
          <span class="text-axelo-border">•</span>
          <span class="text-[11px] font-mono text-axelo-muted uppercase tracking-wider">HARDWARE CATALOG</span>
        </div>
        <h2 class="editorial-title text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-axelo-dark">
          Engineered for Daily Flow.
        </h2>
      </div>

      <!-- Filter Tabs with Dynamic Item Counts -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {#each filterTabs as tab}
          <button
            type="button"
            on:click={() => (activeCategory = tab.id)}
            class="px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 {activeCategory === tab.id
              ? 'bg-axelo-dark text-white shadow-xs'
              : 'bg-axelo-neutral text-axelo-muted hover:text-axelo-dark hover:bg-black/[0.05]'}"
          >
            <span>{tab.label}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded-full {activeCategory === tab.id ? 'bg-white/20 text-white' : 'bg-axelo-border text-axelo-muted'}">
              {getCategoryCount(tab.id)}
            </span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Active Filter Summary Bar -->
    <div class="flex items-center justify-between text-xs text-axelo-muted font-mono mb-8 pb-4 border-b border-axelo-border/50">
      <span>
        Showing <strong class="text-axelo-dark">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'} in {filterTabs.find(t => t.id === activeCategory)?.label}
      </span>
      <span class="hidden sm:inline text-[11px]">ALL PRODUCTS VERIFIED IN-STOCK & COMPATIBLE</span>
    </div>

    <!-- Product Grid with High-Aesthetic Proportions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {#each filteredProducts as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>

    <!-- Bottom Reassurance bar -->
    <div class="mt-20 p-6 sm:p-8 rounded-3xl bg-axelo-neutral/80 border border-axelo-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
      <div class="flex items-center gap-3">
        <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
        <span class="text-axelo-dark font-medium sm:text-sm">
          All hardware ships with complimentary carbon-neutral freight on orders over $100.
        </span>
      </div>
      <a href="#philosophy" class="font-semibold text-axelo-blue hover:underline flex items-center gap-1 font-mono text-xs">
        <span>Read Material Standards</span>
        <ArrowRight class="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
</section>
