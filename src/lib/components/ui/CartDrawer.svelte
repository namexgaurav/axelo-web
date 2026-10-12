<script lang="ts">
  import { cart, cartDrawerOpen, cartSubtotal, cartCount } from '../../stores/cart';
  import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Check } from 'lucide-svelte';

  const freeShippingThreshold = 100;
  $: progress = Math.min(100, Math.round(($cartSubtotal / freeShippingThreshold) * 100));
  $: remainingForFree = Math.max(0, freeShippingThreshold - $cartSubtotal);

  let checkingOut = false;
  let orderSuccess = false;

  function handleCheckout() {
    checkingOut = true;
    setTimeout(() => {
      checkingOut = false;
      orderSuccess = true;
      setTimeout(() => {
        cart.clear();
        orderSuccess = false;
        cartDrawerOpen.set(false);
      }, 2500);
    }, 1200);
  }
</script>

{#if $cartDrawerOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
    on:click={() => cartDrawerOpen.set(false)}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === 'Escape' && cartDrawerOpen.set(false)}
  ></div>

  <!-- Slide Drawer -->
  <aside
    class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-fade-in"
    aria-label="Shopping Bag Drawer"
  >
    <!-- Header -->
    <div class="p-6 border-b border-axelo-border flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h2 class="text-base font-bold uppercase tracking-tight text-axelo-dark">
          Your Studio Bag
        </h2>
        <span class="px-2 py-0.5 rounded-full bg-axelo-neutral text-xs font-mono font-medium text-axelo-muted border border-axelo-border">
          {$cartCount} {$cartCount === 1 ? 'item' : 'items'}
        </span>
      </div>
      <button
        type="button"
        on:click={() => cartDrawerOpen.set(false)}
        class="p-2 text-axelo-muted hover:text-axelo-dark rounded-full hover:bg-axelo-neutral transition-colors"
        aria-label="Close bag"
      >
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Free Shipping Bar -->
    <div class="px-6 py-3 bg-axelo-neutral border-b border-axelo-border">
      <div class="flex items-center justify-between text-xs mb-1.5">
        {#if remainingForFree === 0}
          <span class="text-emerald-600 font-semibold flex items-center gap-1">
            <Check class="w-3.5 h-3.5" /> Free Express Shipping Unlocked
          </span>
        {:else}
          <span class="text-axelo-muted">
            Add <span class="font-semibold text-axelo-dark">${remainingForFree.toFixed(0)}</span> for complimentary carbon-neutral shipping
          </span>
        {/if}
        <span class="font-mono text-[10px] text-axelo-muted">{progress}%</span>
      </div>
      <div class="w-full bg-axelo-border h-1.5 rounded-full overflow-hidden">
        <div
          class="h-full bg-axelo-blue rounded-full transition-all duration-500 ease-out"
          style="width: {progress}%"
        ></div>
      </div>
    </div>

    <!-- Items List -->
    <div class="flex-1 overflow-y-auto p-6 space-y-6">
      {#if $cart.length === 0}
        <div class="h-full flex flex-col items-center justify-center text-center py-12">
          <div class="w-16 h-16 rounded-full bg-axelo-neutral flex items-center justify-center text-axelo-muted mb-4 border border-axelo-border">
            <svg class="w-8 h-8 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 class="text-base font-semibold text-axelo-dark mb-1">Your bag is empty</h3>
          <p class="text-xs text-axelo-muted max-w-xs mb-6">
            Explore the flagship Studio Desk Mat Pro or Apex 75 to anchor your workstation.
          </p>
          <button
            type="button"
            on:click={() => cartDrawerOpen.set(false)}
            class="px-5 py-2.5 bg-axelo-dark hover:bg-axelo-blue text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      {:else}
        {#each $cart as item}
          <div class="flex gap-4 pb-6 border-b border-axelo-border/70 last:border-b-0">
            <!-- Thumbnail -->
            <div class="w-20 h-20 rounded-lg overflow-hidden bg-axelo-neutral flex-shrink-0 border border-axelo-border/60">
              <img
                src={item.product.primaryImage}
                alt={item.product.name}
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Details -->
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-2">
                  <h4 class="text-sm font-semibold text-axelo-dark line-clamp-1">
                    {item.product.name}
                  </h4>
                  <button
                    type="button"
                    on:click={() => cart.removeItem(item.product.id, item.selectedColor)}
                    class="text-axelo-muted hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div class="text-xs text-axelo-muted font-mono mt-0.5">
                  Color: <span class="text-axelo-dark">{item.selectedColor}</span>
                </div>
              </div>

              <!-- Price & Quantity -->
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center border border-axelo-border rounded-md bg-axelo-neutral">
                  <button
                    type="button"
                    on:click={() => cart.updateQuantity(item.product.id, item.selectedColor, -1)}
                    class="px-2 py-1 text-axelo-muted hover:text-axelo-dark transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="px-2 text-xs font-mono font-medium text-axelo-dark">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    on:click={() => cart.updateQuantity(item.product.id, item.selectedColor, 1)}
                    class="px-2 py-1 text-axelo-muted hover:text-axelo-dark transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
                <span class="text-sm font-semibold text-axelo-dark font-mono">
                  ${(item.product.price * item.quantity).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>

    <!-- Bottom Checkout Area -->
    {#if $cart.length > 0}
      <div class="p-6 bg-axelo-neutral border-t border-axelo-border space-y-4">
        <div class="space-y-1.5 text-xs text-axelo-muted">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="text-axelo-dark font-mono font-semibold">${$cartSubtotal.toFixed(0)}.00</span>
          </div>
          <div class="flex justify-between">
            <span>Carbon-Neutral Shipping</span>
            <span class="text-axelo-dark font-mono">{remainingForFree === 0 ? 'Free' : '$8.00'}</span>
          </div>
          <div class="flex justify-between text-sm font-bold text-axelo-dark pt-2 border-t border-axelo-border">
            <span>Estimated Total</span>
            <span class="font-mono text-base text-axelo-dark">
              ${($cartSubtotal + (remainingForFree === 0 ? 0 : 8)).toFixed(0)}.00
            </span>
          </div>
        </div>

        {#if orderSuccess}
          <div class="w-full py-3.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2 animate-fade-in">
            <Check class="w-4 h-4" />
            <span>Order Confirmed! Dispatching from Studio.</span>
          </div>
        {:else}
          <button
            type="button"
            on:click={handleCheckout}
            disabled={checkingOut}
            class="w-full py-3.5 bg-axelo-dark hover:bg-axelo-blue disabled:bg-axelo-muted text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group shadow-subtle"
          >
            {#if checkingOut}
              <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing Studio Order...</span>
            {:else}
              <span>Proceed to Checkout</span>
              <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            {/if}
          </button>
        {/if}

        <div class="flex items-center justify-center gap-2 text-[11px] text-axelo-muted pt-1">
          <ShieldCheck class="w-3.5 h-3.5 text-axelo-dark" />
          <span>2-Year Warranty & 30-Day Setup Trial</span>
        </div>
      </div>
    {/if}
  </aside>
{/if}
