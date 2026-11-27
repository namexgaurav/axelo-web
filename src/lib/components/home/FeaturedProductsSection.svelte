<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import ProductCard from '$lib/components/products/ProductCard.svelte';
  import { reveal } from '$lib/animations/reveal';
  import type { FeaturedSectionContent, ProductView } from '$lib/types/website';

  export let section: FeaturedSectionContent;
  export let products: ProductView[] = [];
</script>

<section class="py-24 sm:py-32 bg-white border-b border-axelo-border">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14" use:reveal>
      <div class="max-w-2xl space-y-3">
        {#if section.eyebrow}
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
            <span class="eyebrow-text font-mono text-axelo-blue">{section.eyebrow}</span>
          </div>
        {/if}
        <h2 class="editorial-title text-3xl sm:text-5xl font-extrabold text-axelo-dark">
          {section.title}
        </h2>
        {#if section.subtitle}
          <p class="text-sm sm:text-base text-axelo-muted leading-relaxed">
            {section.subtitle}
          </p>
        {/if}
      </div>

      <a
        href="/products"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-axelo-border hover:border-axelo-dark text-xs font-semibold text-axelo-dark transition-colors shrink-0 self-start md:self-auto group"
      >
        <span>{section.ctaLabel || 'View All Products'}</span>
        <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>

    {#if products.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {#each products as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    {:else}
      <div class="py-16 px-6 rounded-2xl border border-dashed border-axelo-border bg-axelo-offwhite text-center space-y-3">
        <p class="text-base font-semibold text-axelo-dark">No featured products are currently published.</p>
        <p class="text-sm text-axelo-muted max-w-md mx-auto">
          Explore the complete AXELO catalogue to view all available desk and technology accessories.
        </p>
        <div class="pt-2">
          <a
            href="/products"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-axelo-dark text-white text-xs font-semibold hover:bg-axelo-blue transition-colors"
          >
            <span>Browse All Products</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    {/if}
  </div>
</section>
