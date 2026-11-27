<script lang="ts">
  import { goto } from '$app/navigation';
  import { Search, X } from 'lucide-svelte';
  import SeoHead from '$lib/components/common/SeoHead.svelte';
  import ProductCard from '$lib/components/products/ProductCard.svelte';
  import { buildCanonicalUrl } from '$lib/utils/seo';

  export let data;

  let searchQuery = '';

  $: activeCategory = data.activeCategory || 'all';
  $: activeCategoryObj = data.categories.find(
    (c) => c.slug === activeCategory || c.id === activeCategory
  );

  $: filteredProducts = data.products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q))
    );
  });

  function selectCategory(slug: string) {
    const target = slug === 'all' ? '/products' : `/products?category=${encodeURIComponent(slug)}`;
    goto(target, { reset: false });
  }

  $: canonicalUrl = buildCanonicalUrl(data.origin, '/products');
  $: seo = {
    title: activeCategoryObj
      ? `${activeCategoryObj.name} | AXELO Products`
      : 'Products | AXELO — Premium. Yet Affordable.',
    description:
      activeCategoryObj?.description ||
      'Explore the AXELO collection of thoughtfully designed technology and desk accessories.',
    canonicalUrl,
    ogType: 'website' as const,
    ogImage: data.products[0]?.primaryImage?.url || null
  };
</script>

<SeoHead {seo} />

<section class="min-h-screen pt-32 pb-24 bg-white">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Editorial Page Header -->
    <div class="max-w-3xl space-y-4 pb-10 border-b border-axelo-border">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
        <span class="eyebrow-text font-mono text-axelo-blue">Product Catalogue</span>
      </div>
      <h1 class="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-axelo-dark">
        {activeCategoryObj ? activeCategoryObj.name : 'All Products'}
      </h1>
      <p class="text-sm sm:text-base text-axelo-muted leading-relaxed max-w-2xl">
        {activeCategoryObj?.description ||
          'Thoughtfully engineered technology and desk accessories designed for clarity, everyday performance, and lasting value.'}
      </p>
    </div>

    <!-- Dynamic Category Filters & Search -->
    <div class="py-6 border-b border-axelo-border flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div class="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0" role="tablist" aria-label="Product categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'all'}
          on:click={() => selectCategory('all')}
          class="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 {activeCategory === 'all'
            ? 'bg-axelo-dark text-white'
            : 'bg-axelo-neutral text-axelo-graphite hover:text-axelo-dark hover:bg-axelo-surface'}"
        >
          All Products
        </button>

        {#each data.categories as cat (cat.id)}
          {@const selected = activeCategory === cat.slug || activeCategory === cat.id}
          <button
            type="button"
            role="tab"
            aria-selected={selected}
            on:click={() => selectCategory(cat.slug)}
            class="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 {selected
              ? 'bg-axelo-dark text-white'
              : 'bg-axelo-neutral text-axelo-graphite hover:text-axelo-dark hover:bg-axelo-surface'}"
          >
            {cat.name}
          </button>
        {/each}
      </div>

      <div class="relative w-full md:w-72 shrink-0">
        <Search class="w-4 h-4 text-axelo-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          bind:value={searchQuery}
          placeholder="Search products..."
          aria-label="Search products"
          class="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-full border border-axelo-border bg-axelo-offwhite focus:bg-white focus:border-axelo-blue focus:outline-none transition-colors"
        />
        {#if searchQuery}
          <button
            type="button"
            on:click={() => (searchQuery = '')}
            aria-label="Clear search"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-axelo-muted hover:text-axelo-dark"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        {/if}
      </div>
    </div>

    <!-- Product Grid / Empty State -->
    {#if filteredProducts.length === 0}
      <div class="py-20 px-6 rounded-2xl border border-dashed border-axelo-border bg-axelo-offwhite text-center space-y-3">
        <h2 class="text-lg font-bold text-axelo-dark">No products found</h2>
        <p class="text-sm text-axelo-muted max-w-md mx-auto">
          {#if searchQuery.trim()}
            No published products match "{searchQuery.trim()}".
          {:else}
            There are currently no published products in this category.
          {/if}
        </p>
        {#if activeCategory !== 'all' || searchQuery.trim()}
          <div class="pt-2">
            <button
              type="button"
              on:click={() => {
                searchQuery = '';
                selectCategory('all');
              }}
              class="px-5 py-2.5 rounded-xl bg-axelo-dark text-white text-xs font-semibold hover:bg-axelo-blue transition-colors"
            >
              View All Products
            </button>
          </div>
        {/if}
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {#each filteredProducts as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {/if}
  </div>
</section>
