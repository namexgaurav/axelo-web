<script lang="ts">
  import { quickViewProduct, cart } from '../../stores/cart';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';
  import { X, Check, Star, Shield, ArrowRight } from 'lucide-svelte';

  $: product = $quickViewProduct;
  $: supabase = page.data.supabase;

  let selectedColorIndex = 0;
  let added = false;

  $: if (product) {
    selectedColorIndex = 0;
    added = false;
  }

  function handleAddToCart() {
    if (!product) return;
    const color = product.colors[selectedColorIndex]?.name || 'Standard';
    cart.addItem(product, color, supabase, $user?.id);
    added = true;
    setTimeout(() => {
      added = false;
      quickViewProduct.set(null);
    }, 1000);
  }
</script>

{#if product}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-fade-in"
    on:click={(e) => { if (e.target === e.currentTarget) quickViewProduct.set(null); }}
    on:keydown={(e) => e.key === 'Escape' && quickViewProduct.set(null)}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <!-- Modal Container: 75vw wide -->
    <div
      class="bg-white rounded-3xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-black/[0.08]"
      style="max-width: 78vw; max-height: 88vh;"
    >
      <!-- Close button -->
      <button
        type="button"
        on:click={() => quickViewProduct.set(null)}
        class="absolute top-5 right-5 z-20 p-2 text-axelo-muted hover:text-axelo-dark rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
        aria-label="Close details"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Left Media Column: 55% width -->
      <div class="md:w-[55%] bg-[#F7F7F5] relative min-h-[320px] md:min-h-full flex-shrink-0">
        <img
          src={product.colors[selectedColorIndex]?.image || product.primaryImage}
          alt={product.name}
          class="w-full h-full object-cover object-center transition-all duration-500"
          style="min-height: 420px;"
        />
        {#if product.badge}
          <div class="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-axelo-dark px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm border border-black/[0.08]">
            {product.badge}
          </div>
        {/if}
        <!-- Thumbnail strip if multiple colors -->
        {#if product.colors.length > 1}
          <div class="absolute bottom-4 left-4 right-4 flex items-center gap-2 justify-center">
            {#each product.colors as color, i}
              <button
                type="button"
                on:click={() => (selectedColorIndex = i)}
                class="w-12 h-12 rounded-xl overflow-hidden border-2 transition-all {selectedColorIndex === i ? 'border-axelo-blue shadow-md scale-110' : 'border-white/60 opacity-70 hover:opacity-100'}"
                title={color.name}
              >
                <img src={color.image} alt={color.name} class="w-full h-full object-cover" />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Right Content Column: 45% width, fully scrollable -->
      <div class="md:w-[45%] p-7 sm:p-10 flex flex-col justify-between overflow-y-auto" style="max-height: 88vh;">
        <div class="space-y-4">
          <!-- Category & Rating -->
          <div class="flex items-center justify-between text-xs">
            <span class="text-axelo-blue font-bold uppercase tracking-wider font-mono text-[10px]">
              {product.categoryLabel}
            </span>
            <div class="flex items-center gap-1 text-amber-500 font-medium font-mono text-[11px]">
              <Star class="w-3.5 h-3.5 fill-amber-500" />
              <span>{product.rating}</span>
              <span class="text-axelo-muted text-[10px]">({product.ratingCount} reviews)</span>
            </div>
          </div>

          <!-- Title & Price -->
          <div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-axelo-dark tracking-tight leading-snug">
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
                <span class="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  Save ${product.originalPrice - product.price}
                </span>
              {/if}
            </div>
          </div>

          <!-- Color Swatches -->
          {#if product.colors.length > 0}
            <div class="pt-2">
              <span class="text-xs font-semibold text-axelo-dark block mb-2 font-mono text-[11px]">
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
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-axelo-dark block mb-2">
                Engineering Specifications
              </span>
              <div class="grid grid-cols-2 gap-2 text-xs">
                {#each product.specs as spec}
                  <div class="bg-axelo-neutral/80 p-2.5 rounded-xl border border-axelo-border/60">
                    <span class="text-[10px] text-axelo-muted font-mono block">{spec.label}</span>
                    <span class="font-bold text-axelo-dark text-[11px] block mt-0.5">{spec.value}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Details list -->
          <ul class="space-y-2 pt-2 text-xs text-axelo-muted">
            {#each product.details as detail}
              <li class="flex items-start gap-2.5 leading-relaxed">
                <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue mt-1.5 flex-shrink-0"></span>
                <span>{detail}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Add to Cart CTA -->
        <div class="pt-6 border-t border-axelo-border/70 mt-6 space-y-3">
          <button
            type="button"
            on:click={handleAddToCart}
            class="w-full py-4 bg-axelo-dark hover:bg-axelo-blue text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-subtle"
          >
            {#if added}
              <Check class="w-4 h-4 text-emerald-400" />
              <span>Added to Studio Bag</span>
            {:else}
              <span>Add to Bag — ${product.price}</span>
              <ArrowRight class="w-4 h-4" />
            {/if}
          </button>
          <a
            href="/products/{product.id}"
            on:click={() => quickViewProduct.set(null)}
            class="w-full py-3 rounded-xl border border-black/10 hover:border-axelo-dark text-xs font-mono font-semibold text-axelo-dark uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <span>View Full Product Page</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </a>
          <p class="text-[11px] text-center text-axelo-muted font-mono">
            Free shipping over $100 • 30-day setup trial
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}
