<script lang="ts">
  import { products } from '../../data/products';
  import ProductCard from '../ui/ProductCard.svelte';
  import { ArrowRight, SlidersHorizontal } from 'lucide-svelte';

  export let activeCategory = 'all';

  const filterTabs = [
    { id: 'all', label: 'All Studio Gear' },
    { id: 'desk-mats', label: 'Desk Mats' },
    { id: 'keyboards', label: 'Keyboards & Dials' },
    { id: 'mice', label: 'Precision Mice' },
    { id: 'organization', label: 'Organization' }
  ];

  $: filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);
</script>

<section id="products" class="py-24 md:py-36 bg-[#FFFFFF] border-b border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-axelo-blue">
            CURATED DISCOVERY // 08
          </span>
          <span class="text-axelo-border">•</span>
          <span class="text-[11px] font-mono text-axelo-muted uppercase">HARDWARE CATALOG</span>
        </div>
        <h2 class="editorial-title text-3xl sm:text-5xl font-extrabold tracking-tight text-axelo-dark">
          Engineered for Daily Flow.
        </h2>
      </div>

      <!-- Filter Tabs -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {#each filterTabs as tab}
          <button
            type="button"
            on:click={() => (activeCategory = tab.id)}
            class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all {activeCategory === tab.id
              ? 'bg-axelo-dark text-white shadow-xs'
              : 'bg-axelo-neutral text-axelo-muted hover:text-axelo-dark hover:bg-axelo-border/60'}"
          >
            {tab.label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {#each filteredProducts as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>

    <!-- Bottom Reassurance bar -->
    <div class="mt-16 p-6 rounded-2xl bg-axelo-neutral/80 border border-axelo-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
      <div class="flex items-center gap-3">
        <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
        <span class="text-axelo-dark font-medium">All hardware ships with complimentary carbon-neutral freight on orders over $100.</span>
      </div>
      <a href="#philosophy" class="font-semibold text-axelo-blue hover:underline flex items-center gap-1 font-mono">
        <span>Read Material Standards</span>
        <ArrowRight class="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
</section>
