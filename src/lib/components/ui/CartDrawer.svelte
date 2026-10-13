<script lang="ts">
  import { cart, cartDrawerOpen, cartSubtotal, cartCount } from '../../stores/cart';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';
  import { goto } from '$app/navigation';
  import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Check, ShoppingBag, Sparkles } from 'lucide-svelte';

  $: supabase = page.data.supabase;

  const freeShippingThreshold = 100;
  $: progress = Math.min(100, Math.round(($cartSubtotal / freeShippingThreshold) * 100));
  $: remainingForFree = Math.max(0, freeShippingThreshold - $cartSubtotal);

  function handleProceedToCheckout() {
    cartDrawerOpen.set(false);
    goto('/checkout');
  }
</script>

{#if $cartDrawerOpen}
  <!-- Backdrop with Smooth Blur -->
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity animate-fade-in"
    on:click={() => cartDrawerOpen.set(false)}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === 'Escape' && cartDrawerOpen.set(false)}
  ></div>

  <!-- Slide Drawer -->
  <aside
    class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-black/[0.08] animate-fade-in"
    aria-label="Shopping Bag Drawer"
  >
    <!-- Header with Generous Padding -->
    <div class="p-6 sm:p-7 border-b border-axelo-border/80 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h2 class="text-base sm:text-lg font-extrabold uppercase tracking-[-0.02em] text-axelo-dark">
          Your Studio Bag
        </h2>
        <span class="px-2.5 py-0.5 rounded-full bg-axelo-neutral text-xs font-mono font-bold text-axelo-muted border border-axelo-border/80">
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

    <!-- Free Express Shipping Milestone Bar -->
    <div class="px-6 sm:px-7 py-3.5 bg-axelo-neutral/80 border-b border-axelo-border/70">
      <div class="flex items-center justify-between text-xs mb-2 font-mono">
        {#if remainingForFree === 0}
          <span class="text-emerald-600 font-bold flex items-center gap-1.5 text-[11px]">
            <Check class="w-3.5 h-3.5 stroke-[3]" /> Free Express Shipping Unlocked
          </span>
        {:else}
          <span class="text-axelo-muted text-[11px]">
            Add <span class="font-bold text-axelo-dark">${remainingForFree.toFixed(0)}</span> for complimentary freight
          </span>
        {/if}
        <span class="text-[10px] text-axelo-dark font-bold">{progress}%</span>
      </div>
      <div class="w-full bg-axelo-border/80 h-1.5 rounded-full overflow-hidden">
        <div
          class="h-full bg-axelo-blue rounded-full transition-all duration-500 ease-out"
          style="width: {progress}%"
        ></div>
      </div>
    </div>

    <!-- Items List with Smooth Layout -->
    <div class="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
      {#if $cart.length === 0}
        <div class="h-full flex flex-col items-center justify-center text-center py-16">
          <div class="w-16 h-16 rounded-2xl bg-axelo-neutral flex items-center justify-center text-axelo-muted mb-5 border border-axelo-border">
            <ShoppingBag class="w-7 h-7 stroke-1 text-axelo-dark" />
          </div>
          <h3 class="text-base font-bold text-axelo-dark mb-1.5">Your bag is empty</h3>
          <p class="text-xs text-axelo-muted max-w-xs mb-6 leading-relaxed">
            Explore our curated desk essentials and precision hardware to anchor your workspace.
          </p>
          <button
            type="button"
            on:click={() => cartDrawerOpen.set(false)}
            class="px-6 py-3 bg-axelo-dark hover:bg-axelo-blue text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
          >
            Explore Catalog
          </button>
        </div>
      {:else}
        {#each $cart as item}
          <div class="flex gap-4 pb-6 border-b border-axelo-border/70 last:border-b-0">
            <!-- Thumbnail -->
            <div class="w-20 h-20 rounded-xl overflow-hidden bg-axelo-neutral flex-shrink-0 border border-axelo-border/60">
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
                  <h4 class="text-sm font-bold text-axelo-dark line-clamp-1">
                    {item.product.name}
                  </h4>
                  <button
                    type="button"
                    on:click={() => cart.removeItem(item.product.id, item.selectedColor, supabase, $user?.id)}
                    class="text-axelo-muted hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div class="text-xs text-axelo-muted font-mono mt-0.5">
                  Finish: <span class="text-axelo-dark font-medium">{item.selectedColor}</span>
                </div>
              </div>

              <!-- Price & Quantity Micro-controls -->
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center border border-axelo-border rounded-lg bg-axelo-neutral p-0.5">
                  <button
                    type="button"
                    on:click={() => cart.updateQuantity(item.product.id, item.selectedColor, -1, supabase, $user?.id)}
                    class="p-1 text-axelo-muted hover:text-axelo-dark transition-colors rounded hover:bg-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="px-2.5 text-xs font-mono font-bold text-axelo-dark">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    on:click={() => cart.updateQuantity(item.product.id, item.selectedColor, 1, supabase, $user?.id)}
                    class="p-1 text-axelo-muted hover:text-axelo-dark transition-colors rounded hover:bg-white"
                    aria-label="Increase quantity"
                  >
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
                <span class="text-sm font-bold text-axelo-dark font-mono">
                  ${(item.product.price * item.quantity).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>

    <!-- Bottom Checkout Area with Generous Spacing -->
    {#if $cart.length > 0}
      <div class="p-6 sm:p-7 bg-axelo-neutral/80 border-t border-axelo-border space-y-4">
        <div class="space-y-2 text-xs text-axelo-muted">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span class="text-axelo-dark font-mono font-bold">${$cartSubtotal.toFixed(0)}.00</span>
          </div>
          <div class="flex justify-between">
            <span>Carbon-Neutral Freight</span>
            <span class="text-axelo-dark font-mono font-medium">{remainingForFree === 0 ? 'Free' : '$10.00'}</span>
          </div>
          <div class="flex justify-between text-sm font-bold text-axelo-dark pt-2.5 border-t border-axelo-border/80">
            <span>Estimated Total</span>
            <span class="font-mono text-base text-axelo-dark">
              ${($cartSubtotal + (remainingForFree === 0 ? 0 : 10)).toFixed(0)}.00
            </span>
          </div>
        </div>

        <button
          type="button"
          on:click={handleProceedToCheckout}
          class="w-full py-4 bg-axelo-dark hover:bg-axelo-blue text-white rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group shadow-subtle"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>

        <div class="flex items-center justify-center gap-2 text-[11px] text-axelo-muted pt-1">
          <ShieldCheck class="w-3.5 h-3.5 text-axelo-dark" />
          <span>2-Year Warranty & 30-Day Setup Trial</span>
        </div>
      </div>
    {/if}
  </aside>
{/if}
