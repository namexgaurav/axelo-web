<script lang="ts">
  import { quickViewProduct, cart } from '../../stores/cart';
  import { X, Check, Star, Shield, ArrowRight } from 'lucide-svelte';

  $: product = $quickViewProduct;
  let selectedColorIndex = 0;
  let added = false;

  $: if (product) {
    selectedColorIndex = 0;
    added = false;
  }

  function handleAddToCart() {
    if (!product) return;
    const color = product.colors[selectedColorIndex]?.name || 'Standard';
    cart.addItem(product, color);
    added = true;
    setTimeout(() => {
      added = false;
      quickViewProduct.set(null);
    }, 800);
  }
</script>

{#if product}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    on:click={(e) => { if (e.target === e.currentTarget) quickViewProduct.set(null); }}
    on:keydown={(e) => e.key === 'Escape' && quickViewProduct.set(null)}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <!-- Modal Container -->
    <div
      class="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
    >
      <!-- Close button -->
      <button
        type="button"
        on:click={() => quickViewProduct.set(null)}
        class="absolute top-4 right-4 z-10 p-2 text-axelo-muted hover:text-axelo-dark rounded-full bg-white/80 hover:bg-white shadow-xs transition-colors"
        aria-label="Close details"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Left Media Column -->
      <div class="md:w-1/2 bg-axelo-neutral relative min-h-[260px] md:min-h-full">
        <img
          src={product.colors[selectedColorIndex]?.image || product.primaryImage}
          alt={product.name}
          class="w-full h-full object-cover transition-opacity duration-300"
        />
        {#if product.badge}
          <div class="absolute top-4 left-4 bg-axelo-dark text-white px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider">
            {product.badge}
          </div>
        {/if}
      </div>

      <!-- Right Content Column -->
      <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div class="space-y-4">
          <!-- Category & Rating -->
          <div class="flex items-center justify-between text-xs">
            <span class="text-axelo-blue font-semibold uppercase tracking-wider font-mono">
              {product.categoryLabel}
            </span>
            <div class="flex items-center gap-1 text-amber-500 font-medium">
              <Star class="w-3.5 h-3.5 fill-amber-500" />
              <span>{product.rating}</span>
              <span class="text-axelo-muted text-[11px]">({product.ratingCount})</span>
            </div>
          </div>

          <!-- Title & Price -->
          <div>
            <h3 class="text-xl font-bold text-axelo-dark tracking-tight leading-snug">
              {product.name}
            </h3>
            <p class="text-xs text-axelo-muted mt-1 leading-relaxed">
              {product.tagline}
            </p>
            <div class="flex items-baseline gap-3 mt-3">
              <span class="text-2xl font-bold font-mono text-axelo-dark">
                ${product.price}
              </span>
              {#if product.originalPrice}
                <span class="text-sm font-mono text-axelo-muted line-through">
                  ${product.originalPrice}
                </span>
                <span class="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save ${product.originalPrice - product.price}
                </span>
              {/if}
            </div>
          </div>

          <!-- Color Swatches -->
          {#if product.colors.length > 0}
            <div class="pt-2">
              <span class="text-xs font-semibold text-axelo-dark block mb-2 font-mono">
                Finish: <span class="text-axelo-muted font-normal">{product.colors[selectedColorIndex].name}</span>
              </span>
              <div class="flex items-center gap-2.5">
                {#each product.colors as color, i}
                  <button
                    type="button"
                    on:click={() => (selectedColorIndex = i)}
                    class="w-7 h-7 rounded-full border-2 transition-all p-0.5 relative {selectedColorIndex === i ? 'border-axelo-dark scale-110 shadow-xs' : 'border-axelo-border hover:border-axelo-muted'}"
                    title={color.name}
                  >
                    <span
                      class="w-full h-full rounded-full block"
                      style="background-color: {color.hex};"
                    ></span>
                  </button>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Hardware Specs -->
          {#if product.specs && product.specs.length > 0}
            <div class="pt-3 border-t border-axelo-border/70">
              <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-axelo-muted block mb-2">
                Engineering Specifications
              </span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                {#each product.specs as spec}
                  <div class="bg-axelo-neutral/80 p-2 rounded border border-axelo-border/50">
                    <span class="text-[10px] text-axelo-muted block">{spec.label}</span>
                    <span class="font-medium text-axelo-dark text-[11px]">{spec.value}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Details list -->
          <ul class="space-y-1.5 pt-2 text-xs text-axelo-muted">
            {#each product.details as detail}
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue mt-1.5 flex-shrink-0"></span>
                <span>{detail}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Add to Cart CTA -->
        <div class="pt-6 border-t border-axelo-border/70 mt-6 space-y-2">
          <button
            type="button"
            on:click={handleAddToCart}
            class="w-full py-3 bg-axelo-dark hover:bg-axelo-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-subtle"
          >
            {#if added}
              <Check class="w-4 h-4 text-emerald-400" />
              <span>Added to Studio Bag</span>
            {:else}
              <span>Add to Bag — ${product.price}</span>
              <ArrowRight class="w-3.5 h-3.5" />
            {/if}
          </button>
          <p class="text-[11px] text-center text-axelo-muted">
            Complimentary shipping on orders over $100 • 30-day setup evaluation
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}
