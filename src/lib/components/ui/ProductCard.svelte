<script lang="ts">
  import type { Product } from '../../types';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { Star, Plus, Eye, Check } from 'lucide-svelte';

  export let product: Product;

  let selectedColorIdx = 0;
  let added = false;

  function handleAdd(e: MouseEvent) {
    e.stopPropagation();
    const color = product.colors[selectedColorIdx]?.name || 'Standard';
    cart.addItem(product, color);
    added = true;
    setTimeout(() => (added = false), 1200);
  }

  function handleQuickView(e: MouseEvent) {
    e.stopPropagation();
    quickViewProduct.set(product);
  }
</script>

<div
  class="bg-white rounded-2xl overflow-hidden border border-axelo-border/70 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group cursor-pointer relative"
  on:click={() => quickViewProduct.set(product)}
  role="button"
  tabindex="0"
  on:keydown={(e) => e.key === 'Enter' && quickViewProduct.set(product)}
>
  <!-- Top image container -->
  <div class="aspect-[4/3] bg-axelo-neutral overflow-hidden relative">
    <img
      src={product.colors[selectedColorIdx]?.image || product.primaryImage}
      alt={product.name}
      class="w-full h-full object-cover img-zoom-hover transition-opacity duration-300"
      loading="lazy"
    />

    <!-- Badge -->
    {#if product.badge}
      <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-axelo-dark text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs border border-axelo-border/60">
        {product.badge}
      </div>
    {/if}

    <!-- Quick action buttons overlay -->
    <div class="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        type="button"
        on:click={handleQuickView}
        class="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-md text-[11px] font-semibold text-axelo-dark hover:bg-white shadow-xs transition-colors flex items-center gap-1.5"
      >
        <Eye class="w-3.5 h-3.5 text-axelo-muted" />
        <span>Quick View</span>
      </button>

      <button
        type="button"
        on:click={handleAdd}
        class="px-3 py-1.5 bg-axelo-dark rounded-md text-[11px] font-semibold text-white hover:bg-axelo-blue shadow-xs transition-colors flex items-center gap-1.5"
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

  <!-- Content block -->
  <div class="p-5 flex flex-col justify-between flex-1">
    <div>
      <!-- Category & Rating -->
      <div class="flex items-center justify-between text-[11px] mb-1.5">
        <span class="text-axelo-muted uppercase font-mono font-medium tracking-wider">
          {product.categoryLabel}
        </span>
        <div class="flex items-center gap-1 text-amber-500 font-medium font-mono text-[10px]">
          <Star class="w-3 h-3 fill-amber-500" />
          <span>{product.rating}</span>
        </div>
      </div>

      <!-- Title & Tagline -->
      <h4 class="text-sm font-bold text-axelo-dark group-hover:text-axelo-blue transition-colors line-clamp-1">
        {product.name}
      </h4>
      <p class="text-xs text-axelo-muted mt-1 line-clamp-2 leading-relaxed">
        {product.tagline}
      </p>
    </div>

    <!-- Color selector & Price -->
    <div class="pt-4 mt-4 border-t border-axelo-border/50 flex items-center justify-between">
      <!-- Color Swatches -->
      <div class="flex items-center gap-1.5" on:click|stopPropagation role="none">
        {#each product.colors as color, idx}
          <button
            type="button"
            on:click={() => (selectedColorIdx = idx)}
            class="w-4 h-4 rounded-full border transition-all p-0.2 {selectedColorIdx === idx ? 'border-axelo-dark scale-110 shadow-2xs' : 'border-axelo-border/70 hover:scale-105'}"
            title={color.name}
          >
            <span class="w-full h-full rounded-full block" style="background-color: {color.hex};"></span>
          </button>
        {/each}
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-1.5 font-mono">
        <span class="text-sm font-bold text-axelo-dark">
          ${product.price}
        </span>
        {#if product.originalPrice}
          <span class="text-[11px] text-axelo-muted line-through">
            ${product.originalPrice}
          </span>
        {/if}
      </div>
    </div>
  </div>
</div>
