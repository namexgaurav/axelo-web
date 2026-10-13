<script lang="ts">
  import type { Product } from '../../types';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';
  import { Star, Plus, Eye, Check } from 'lucide-svelte';

  export let product: Product;

  let selectedColorIdx = 0;
  let added = false;
  let hoveredColorIdx: number | null = null;

  $: supabase = page.data.supabase;

  function handleAdd(e: MouseEvent) {
    e.stopPropagation();
    const color = product.colors[selectedColorIdx]?.name || 'Standard';
    cart.addItem(product, color, supabase, $user?.id);
    added = true;
    setTimeout(() => (added = false), 1400);
  }

  function handleQuickView(e: MouseEvent) {
    e.stopPropagation();
    quickViewProduct.set(product);
  }

  $: displayImage = (hoveredColorIdx !== null && product.colors[hoveredColorIdx]?.image)
    ? product.colors[hoveredColorIdx].image
    : (product.colors[selectedColorIdx]?.image || product.primaryImage);
</script>

<div
  class="bg-white rounded-3xl overflow-hidden border border-black/[0.07] shadow-subtle hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
  on:click={() => quickViewProduct.set(product)}
  role="button"
  tabindex="0"
  on:keydown={(e) => e.key === 'Enter' && quickViewProduct.set(product)}
>
  <!-- Top image container -->
  <div class="aspect-[4/3] bg-axelo-neutral overflow-hidden relative">
    <img
      src={displayImage}
      alt={product.name}
      class="w-full h-full object-cover img-zoom-hover transition-all duration-500"
      loading="lazy"
    />

    <!-- Quiet Status Badge -->
    {#if product.badge}
      <div class="absolute top-3.5 left-3.5 glass-panel text-axelo-dark text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-2xs">
        {product.badge}
      </div>
    {/if}

    <!-- Quick action buttons overlay -->
    <div class="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
      <button
        type="button"
        on:click={handleQuickView}
        class="px-3.5 py-2 glass-panel hover:bg-white rounded-lg text-[11px] font-semibold text-axelo-dark shadow-sm transition-all flex items-center gap-1.5"
      >
        <Eye class="w-3.5 h-3.5 text-axelo-muted" />
        <span>Inspect</span>
      </button>

      <button
        type="button"
        on:click={handleAdd}
        class="px-3.5 py-2 bg-axelo-dark hover:bg-axelo-blue rounded-lg text-[11px] font-semibold text-white shadow-sm transition-all flex items-center gap-1.5"
      >
        {#if added}
          <Check class="w-3.5 h-3.5 text-emerald-400" />
          <span>Added</span>
        {:else}
          <Plus class="w-3.5 h-3.5" />
          <span>Add</span>
        {/if}
      </button>
    </div>
  </div>

  <!-- Content block with High Typographic Clarity -->
  <div class="p-5 sm:p-6 flex flex-col justify-between flex-1">
    <div>
      <!-- Category & Rating -->
      <div class="flex items-center justify-between text-[11px] mb-2">
        <span class="text-axelo-muted uppercase font-mono font-medium tracking-wider text-[10px]">
          {product.categoryLabel}
        </span>
        <div class="flex items-center gap-1 text-amber-500 font-medium font-mono text-[10px]">
          <Star class="w-3 h-3 fill-amber-500" />
          <span>{product.rating}</span>
          <span class="text-axelo-muted">({product.ratingCount})</span>
        </div>
      </div>

      <!-- Title & Tagline -->
      <h4 class="text-sm sm:text-base font-bold text-axelo-dark group-hover:text-axelo-blue transition-colors line-clamp-1 tracking-tight">
        {product.name}
      </h4>
      <p class="text-xs text-axelo-muted mt-1 line-clamp-2 leading-relaxed">
        {product.tagline}
      </p>
    </div>

    <!-- Color selector & Price with Micro-interactions -->
    <div class="pt-4 mt-4 border-t border-axelo-border/60 flex items-center justify-between">
      <!-- Color Swatches with instant feedback -->
      <div
        class="flex items-center gap-1.5"
        on:click|stopPropagation
        role="none"
      >
        {#each product.colors as color, idx}
          <button
            type="button"
            on:click={() => (selectedColorIdx = idx)}
            on:mouseenter={() => (hoveredColorIdx = idx)}
            on:mouseleave={() => (hoveredColorIdx = null)}
            class="w-4 h-4 rounded-full border transition-all p-0.2 relative {selectedColorIdx === idx ? 'border-axelo-dark scale-110 shadow-2xs' : 'border-axelo-border/70 hover:scale-105'}"
            title={color.name}
          >
            <span class="w-full h-full rounded-full block" style="background-color: {color.hex};"></span>
          </button>
        {/each}
        {#if product.colors.length > 0}
          <span class="text-[10px] font-mono text-axelo-muted ml-1 hidden sm:inline">
            {hoveredColorIdx !== null ? product.colors[hoveredColorIdx]?.name : product.colors[selectedColorIdx]?.name}
          </span>
        {/if}
      </div>

      <!-- Price in JetBrains Mono -->
      <div class="flex items-baseline gap-1.5 font-mono">
        <span class="text-sm sm:text-base font-bold text-axelo-dark">
          ${product.price}
        </span>
        {#if product.originalPrice}
          <span class="text-xs text-axelo-muted line-through">
            ${product.originalPrice}
          </span>
        {/if}
      </div>
    </div>
  </div>
</div>
