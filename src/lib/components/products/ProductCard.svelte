<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import FallbackImage from '$lib/components/common/FallbackImage.svelte';
  import type { ProductView } from '$lib/types/website';
  import { formatProductPrice } from '$lib/utils/format';

  export let product: ProductView;

  $: formattedPrice = formatProductPrice(product.price, product.currency);
  $: summaryText = product.shortDescription || product.tagline || '';
</script>

<article class="group bg-white rounded-2xl border border-axelo-border hover:border-axelo-silver hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden">
  <a href="/products/{product.slug}" class="block focus:outline-none">
    <div class="aspect-[4/3] bg-axelo-neutral overflow-hidden relative border-b border-axelo-border/60">
      <FallbackImage
        src={product.primaryImage?.url}
        alt={product.primaryImage?.alt || product.name}
        className="w-full h-full object-cover img-zoom-hover"
        fallbackLabel={product.brandName}
      />

      {#if product.badge}
        <span class="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-white/92 backdrop-blur-md border border-axelo-border text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-axelo-dark">
          {product.badge}
        </span>
      {/if}
    </div>

    <div class="p-6 space-y-2.5">
      {#if product.categoryName}
        <span class="block font-mono text-[10px] uppercase tracking-[0.16em] text-axelo-blue font-semibold">
          {product.categoryName}
        </span>
      {/if}

      <h3 class="text-base sm:text-lg font-bold tracking-tight text-axelo-dark group-hover:text-axelo-blue transition-colors line-clamp-2">
        {product.name}
      </h3>

      {#if summaryText}
        <p class="text-xs sm:text-sm text-axelo-muted leading-relaxed line-clamp-2">
          {summaryText}
        </p>
      {/if}
    </div>
  </a>

  <div class="px-6 pb-6 pt-4 border-t border-axelo-border/60 flex items-center justify-between gap-4">
    <div class="flex items-center gap-2 min-w-0">
      {#if formattedPrice}
        <span class="font-mono text-sm font-semibold text-axelo-dark">{formattedPrice}</span>
      {:else if product.variants.length > 0}
        <div class="flex items-center gap-1.5" aria-label="Available finishes">
          {#each product.variants.slice(0, 4) as variant}
            {#if variant.colorHex}
              <span
                class="w-3.5 h-3.5 rounded-full border border-axelo-border"
                style="background-color: {variant.colorHex}"
                title={variant.name}
              ></span>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <a
      href="/products/{product.slug}"
      class="inline-flex items-center gap-1.5 text-xs font-semibold text-axelo-dark hover:text-axelo-blue transition-colors"
    >
      <span>View Details</span>
      <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </a>
  </div>
</article>
