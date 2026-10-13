<script lang="ts">
  import { cart } from '$lib/stores/cart';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';
  import { Star, Shield, ArrowRight, Check, CheckCircle2, ChevronRight, Truck, RotateCcw } from 'lucide-svelte';

  export let data;

  $: product = data.product;
  $: supabase = page.data.supabase;

  let selectedColorIdx = 0;
  let activeImageIdx = 0;
  let added = false;

  $: activeColor = product.colors[selectedColorIdx] || product.colors[0];

  $: galleryImages = [
    activeColor?.image || product.primaryImage,
    product.secondaryImage,
    ...(product.colors.map(c => c.image).filter(img => img !== product.primaryImage && img !== product.secondaryImage))
  ].filter(Boolean);

  function handleAddToCart() {
    const color = activeColor?.name || 'Standard';
    cart.addItem(product, color, supabase, $user?.id);
    added = true;
    setTimeout(() => (added = false), 1500);
  }
</script>

<svelte:head>
  <title>{product.name} | AXELO Hardware</title>
  <meta name="description" content={product.tagline || product.description} />
</svelte:head>

<section class="min-h-screen pt-28 pb-20 px-5 sm:px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs font-mono text-axelo-muted mb-8 uppercase tracking-wider">
      <a href="/" class="hover:text-axelo-dark transition-colors">Studio</a>
      <ChevronRight class="w-3 h-3 text-axelo-border" />
      <a href="/products" class="hover:text-axelo-dark transition-colors">Hardware</a>
      <ChevronRight class="w-3 h-3 text-axelo-border" />
      <span class="text-axelo-dark font-medium">{product.categoryLabel}</span>
    </nav>

    <!-- Product Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      
      <!-- Left Column: Gallery (7 Cols) -->
      <div class="lg:col-span-7 space-y-4">
        <!-- Main Stage Image -->
        <div class="aspect-[4/3] bg-axelo-neutral rounded-2xl overflow-hidden border border-axelo-border relative">
          <img
            src={galleryImages[activeImageIdx] || product.primaryImage}
            alt={product.name}
            class="w-full h-full object-cover transition-all duration-300"
          />
          {#if product.badge}
            <div class="absolute top-4 left-4 bg-axelo-dark text-white px-3 py-1 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider shadow-sm">
              {product.badge}
            </div>
          {/if}
        </div>

        <!-- Thumbnails Strip -->
        {#if galleryImages.length > 1}
          <div class="flex gap-3 overflow-x-auto pb-2">
            {#each galleryImages as img, idx}
              <button
                type="button"
                on:click={() => (activeImageIdx = idx)}
                class="w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 {activeImageIdx === idx ? 'border-axelo-blue shadow-xs' : 'border-axelo-border hover:border-axelo-dark/50'}"
              >
                <img src={img} alt="Thumbnail {idx + 1}" class="w-full h-full object-cover" />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Right Column: Purchasing & Details (5 Cols) -->
      <div class="lg:col-span-5 flex flex-col justify-start space-y-6">
        <div>
          <span class="eyebrow-text text-axelo-blue font-mono">{product.categoryLabel}</span>
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-axelo-dark uppercase mt-1 leading-tight">
            {product.name}
          </h1>
          <p class="text-xs sm:text-sm text-axelo-muted leading-relaxed mt-2">
            {product.tagline}
          </p>

          <!-- Rating -->
          <div class="flex items-center gap-2 mt-3 text-xs font-mono">
            <div class="flex items-center text-amber-500">
              {#each Array(5) as _, i}
                <Star class="w-3.5 h-3.5 {i < Math.floor(product.rating) ? 'fill-current' : 'text-axelo-border'}" />
              {/each}
            </div>
            <span class="font-bold text-axelo-dark">{product.rating}</span>
            <span class="text-axelo-muted">({product.ratingCount} reviews)</span>
          </div>
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-3 pb-6 border-b border-axelo-border">
          <span class="text-3xl font-bold text-axelo-dark font-mono">${product.price}</span>
          {#if product.originalPrice}
            <span class="text-base text-axelo-muted line-through font-mono">${product.originalPrice}</span>
            <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Save ${product.originalPrice - product.price}
            </span>
          {/if}
        </div>

        <!-- Color / Finish Selector -->
        {#if product.colors.length > 0}
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-mono uppercase text-axelo-muted tracking-wider">Finish: <strong class="text-axelo-dark">{activeColor.name}</strong></span>
              <span class="font-mono text-[11px] text-axelo-muted">Precision Coated</span>
            </div>
            <div class="flex gap-2.5">
              {#each product.colors as col, idx}
                <button
                  type="button"
                  on:click={() => { selectedColorIdx = idx; activeImageIdx = 0; }}
                  class="w-8 h-8 rounded-full border-2 transition-transform relative flex items-center justify-center {selectedColorIdx === idx ? 'border-axelo-blue scale-110 shadow-sm' : 'border-axelo-border hover:scale-105'}"
                  style="background-color: {col.hex}"
                  title={col.name}
                >
                  {#if selectedColorIdx === idx}
                    <div class="w-2 h-2 rounded-full {col.hex === '#FFFFFF' || col.hex === '#EBEBEB' ? 'bg-black' : 'bg-white'}"></div>
                  {/if}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Description Paragraph -->
        <p class="text-xs text-axelo-muted leading-relaxed font-sans">
          {product.description}
        </p>

        <!-- Add to Bag CTA -->
        <div class="pt-2">
          <button
            type="button"
            on:click={handleAddToCart}
            class="w-full py-4 px-6 rounded-xl bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group shadow-md"
          >
            {#if added}
              <CheckCircle2 class="w-4 h-4 text-emerald-400" />
              <span>Added to Studio Bag</span>
            {:else}
              <span>Add to Studio Bag — ${product.price}</span>
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            {/if}
          </button>
          <p class="text-center text-[11px] text-axelo-muted mt-2 font-mono">
            Complimentary shipping over $100 • 30-Day Setup Trial
          </p>
        </div>

        <!-- Trust Badges -->
        <div class="grid grid-cols-3 gap-3 pt-4 border-t border-axelo-border text-center text-xs font-mono">
          <div class="p-3 rounded-lg bg-axelo-neutral/60 border border-axelo-border/70">
            <Truck class="w-4 h-4 mx-auto mb-1 text-axelo-dark" />
            <span class="block text-[10px] text-axelo-muted uppercase">Fast Track</span>
            <span class="text-axelo-dark font-semibold text-[11px]">Dispatch in 24h</span>
          </div>
          <div class="p-3 rounded-lg bg-axelo-neutral/60 border border-axelo-border/70">
            <Shield class="w-4 h-4 mx-auto mb-1 text-axelo-dark" />
            <span class="block text-[10px] text-axelo-muted uppercase">Warranty</span>
            <span class="text-axelo-dark font-semibold text-[11px]">2-Year Studio</span>
          </div>
          <div class="p-3 rounded-lg bg-axelo-neutral/60 border border-axelo-border/70">
            <RotateCcw class="w-4 h-4 mx-auto mb-1 text-axelo-dark" />
            <span class="block text-[10px] text-axelo-muted uppercase">Trial</span>
            <span class="text-axelo-dark font-semibold text-[11px]">30-Day Returns</span>
          </div>
        </div>

        <!-- Technical Specs Accordion -->
        {#if product.specs && product.specs.length > 0}
          <div class="pt-4 border-t border-axelo-border">
            <h3 class="text-xs font-mono uppercase tracking-wider text-axelo-dark font-bold mb-3">
              Hardware Specifications
            </h3>
            <div class="divide-y divide-axelo-border/60 border-t border-b border-axelo-border/60">
              {#each product.specs as spec}
                <div class="py-2.5 flex items-center justify-between text-xs">
                  <span class="text-axelo-muted font-mono">{spec.label}</span>
                  <span class="text-axelo-dark font-medium text-right">{spec.value}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Details Checklist -->
        {#if product.details && product.details.length > 0}
          <div class="pt-2">
            <h3 class="text-xs font-mono uppercase tracking-wider text-axelo-dark font-bold mb-3">
              Engineering Pillars
            </h3>
            <ul class="space-y-2 text-xs text-axelo-muted">
              {#each product.details as detail}
                <li class="flex items-start gap-2">
                  <Check class="w-3.5 h-3.5 text-axelo-blue shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

      </div>
    </div>

  </div>
</section>
