<script lang="ts">
  import { Check, ChevronRight } from 'lucide-svelte';
  import SeoHead from '$lib/components/common/SeoHead.svelte';
  import ProductGallery from '$lib/components/products/ProductGallery.svelte';
  import AmazonBuyButton from '$lib/components/products/AmazonBuyButton.svelte';
  import ProductCard from '$lib/components/products/ProductCard.svelte';
  import { buildCanonicalUrl, buildProductJsonLd } from '$lib/utils/seo';
  import { formatProductPrice } from '$lib/utils/format';

  export let data;

  $: product = data.product;
  $: relatedProducts = data.relatedProducts;

  let selectedVariantIdx = 0;

  $: if (product?.id) {
    selectedVariantIdx = 0;
  }

  $: selectedVariant = product.variants[selectedVariantIdx] || null;
  $: formattedPrice = formatProductPrice(product.price, product.currency);
  $: summaryText = product.shortDescription || product.tagline || '';

  $: canonicalUrl = buildCanonicalUrl(data.origin, `/products/${product.slug}`);
  $: seo = {
    title: product.seoTitle || `${product.name} | AXELO`,
    description:
      product.seoDescription ||
      summaryText ||
      product.description ||
      `${product.name} by ${product.brandName}`,
    canonicalUrl,
    ogType: 'product' as const,
    ogImage: product.seoOgImage || product.primaryImage?.url || null
  };
  $: jsonLd = buildProductJsonLd(product, canonicalUrl);
</script>

<SeoHead {seo} {jsonLd} />

<section class="min-h-screen pt-28 pb-24 bg-white">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Breadcrumb -->
    <nav class="flex flex-wrap items-center gap-2 text-xs font-mono text-axelo-muted mb-8" aria-label="Breadcrumb">
      <a href="/" class="hover:text-axelo-dark transition-colors">Home</a>
      <ChevronRight class="w-3.5 h-3.5 text-axelo-silver" />
      <a href="/products" class="hover:text-axelo-dark transition-colors">Products</a>
      {#if product.categoryName && product.categorySlug}
        <ChevronRight class="w-3.5 h-3.5 text-axelo-silver" />
        <a
          href="/products?category={encodeURIComponent(product.categorySlug)}"
          class="hover:text-axelo-dark transition-colors"
        >
          {product.categoryName}
        </a>
      {/if}
      <ChevronRight class="w-3.5 h-3.5 text-axelo-silver" />
      <span class="text-axelo-dark font-medium truncate">{product.name}</span>
    </nav>

    <!-- Main Product Showcase Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <!-- Left: Product Gallery -->
      <div class="lg:col-span-7">
        <ProductGallery
          images={product.images}
          productName={product.name}
          badge={product.badge}
          selectedOverrideUrl={selectedVariant?.imageUrl || null}
        />
      </div>

      <!-- Right: Details & Amazon CTA -->
      <div class="lg:col-span-5 space-y-6">
        <div class="space-y-3">
          <div class="flex items-center gap-2.5">
            {#if product.categoryName}
              <span class="eyebrow-text font-mono text-axelo-blue">{product.categoryName}</span>
            {:else}
              <span class="eyebrow-text font-mono text-axelo-blue">{product.brandName}</span>
            {/if}
            {#if product.sku}
              <span class="text-axelo-silver">•</span>
              <span class="font-mono text-[11px] text-axelo-muted">{product.sku}</span>
            {/if}
          </div>

          <h1 class="editorial-title text-3xl sm:text-4xl font-extrabold text-axelo-dark">
            {product.name}
          </h1>

          {#if summaryText}
            <p class="text-sm sm:text-base text-axelo-muted leading-relaxed">
              {summaryText}
            </p>
          {/if}
        </div>

        <!-- Price (Only when populated in DB) -->
        {#if formattedPrice}
          <div class="pb-5 border-b border-axelo-border">
            <span class="font-mono text-2xl font-bold text-axelo-dark">{formattedPrice}</span>
          </div>
        {/if}

        <!-- Variant Selector (Finishes if present in DB) -->
        {#if product.variants.length > 0}
          <div class="space-y-3 pb-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-mono uppercase tracking-wider text-axelo-muted">
                Option: <strong class="text-axelo-dark">{selectedVariant?.name}</strong>
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2.5">
              {#each product.variants as variant, idx (variant.id)}
                <button
                  type="button"
                  on:click={() => (selectedVariantIdx = idx)}
                  aria-label="Select finish {variant.name}"
                  aria-pressed={selectedVariantIdx === idx}
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all {selectedVariantIdx === idx
                    ? 'border-axelo-dark bg-axelo-offwhite text-axelo-dark'
                    : 'border-axelo-border text-axelo-muted hover:border-axelo-dark/50'}"
                >
                  {#if variant.colorHex}
                    <span
                      class="w-3.5 h-3.5 rounded-full border border-black/10"
                      style="background-color: {variant.colorHex}"
                    ></span>
                  {/if}
                  <span>{variant.name}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Full Description -->
        {#if product.description}
          <div class="text-sm sm:text-base text-axelo-graphite leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        {/if}

        <!-- External Amazon Purchase CTA -->
        <div class="pt-2 space-y-2.5">
          <AmazonBuyButton
            amazonUrl={product.amazonUrl}
            label={product.amazonButtonLabel}
          />
          {#if product.amazonUrl}
            <p class="text-xs text-axelo-muted text-center">
              Fulfilled externally via Amazon. Opens in a new tab.
            </p>
          {/if}
        </div>

        <!-- Product Highlights (from highlights or details columns) -->
        {#if product.highlights.length > 0}
          <div class="pt-6 border-t border-axelo-border space-y-3">
            <h2 class="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-axelo-dark">
              Highlights
            </h2>
            <ul class="space-y-2.5">
              {#each product.highlights as item}
                <li class="flex items-start gap-2.5 text-sm text-axelo-graphite">
                  <Check class="w-4 h-4 text-axelo-blue shrink-0 mt-0.5" />
                  <div>
                    <span class="font-medium text-axelo-dark">{item.title}</span>
                    {#if item.description}
                      <p class="text-xs text-axelo-muted mt-0.5">{item.description}</p>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if product.details.length > 0}
          <div class="pt-6 border-t border-axelo-border space-y-3">
            <h2 class="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-axelo-dark">
              Key Features
            </h2>
            <ul class="space-y-2.5">
              {#each product.details as detail}
                <li class="flex items-start gap-2.5 text-sm text-axelo-graphite">
                  <Check class="w-4 h-4 text-axelo-blue shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Specifications -->
        {#if product.specs.length > 0}
          <div class="pt-6 border-t border-axelo-border space-y-3">
            <h2 class="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-axelo-dark">
              Specifications
            </h2>
            <dl class="divide-y divide-axelo-border border-y border-axelo-border">
              {#each product.specs as spec}
                <div class="py-3 flex items-baseline justify-between gap-4 text-xs sm:text-sm">
                  <dt class="font-mono text-axelo-muted shrink-0">{spec.label}</dt>
                  <dd class="text-axelo-dark font-medium text-right">{spec.value}</dd>
                </div>
              {/each}
            </dl>
          </div>
        {/if}
      </div>
    </div>

    <!-- Related Published Products -->
    {#if relatedProducts.length > 0}
      <div class="mt-24 pt-16 border-t border-axelo-border">
        <div class="flex items-end justify-between gap-4 mb-10">
          <div>
            <span class="eyebrow-text font-mono text-axelo-blue">Related Hardware</span>
            <h2 class="editorial-title text-2xl sm:text-3xl font-extrabold text-axelo-dark mt-1">
              More in {product.categoryName || 'This Collection'}
            </h2>
          </div>
          <a
            href="/products"
            class="text-xs font-semibold text-axelo-dark hover:text-axelo-blue transition-colors"
          >
            View All →
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {#each relatedProducts as rel (rel.id)}
            <ProductCard product={rel} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
