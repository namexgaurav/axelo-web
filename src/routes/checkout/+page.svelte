<script lang="ts">
  import { cart, cartSubtotal } from '$lib/stores/cart';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { placeSecureOrder } from '$lib/orders/order.service';
  import { createAddress, type Address } from '$lib/addresses/address.service';
  import {
    ShieldCheck,
    CreditCard,
    MapPin,
    Plus,
    Check,
    ArrowRight,
    AlertCircle,
    RefreshCw,
    Lock,
    Truck
  } from 'lucide-svelte';

  export let data;

  $: user = data.user;
  $: supabase = page.data.supabase;

  let addresses: Address[] = data.addresses || [];
  let selectedAddressId = addresses.find(a => a.is_default)?.id || addresses[0]?.id || '';

  // New address inline form
  let showNewAddressForm = addresses.length === 0;
  let newFullName = '';
  let newPhone = '';
  let newStreet1 = '';
  let newStreet2 = '';
  let newCity = '';
  let newState = '';
  let newPostalCode = '';
  let newCountry = 'IN';

  // Checkout states
  let paymentMethod = 'card';
  let promoCode = '';
  let discountAmount = 0;
  let promoApplied = false;
  let promoMessage = '';
  let submittingOrder = false;
  let errorMessage = '';

  $: selectedAddress = addresses.find(a => a.id === selectedAddressId);

  // Calculations
  const shippingThreshold = 100;
  $: shippingFee = $cartSubtotal >= shippingThreshold ? 0 : 10;
  $: finalTotal = Math.max(0, $cartSubtotal + shippingFee - discountAmount);

  function applyPromo() {
    promoMessage = '';
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'AXELO10') {
      discountAmount = Math.round($cartSubtotal * 0.1);
      promoApplied = true;
      promoMessage = '10% promotional discount applied!';
    } else if (cleanCode === 'WELCOME20') {
      discountAmount = 20;
      promoApplied = true;
      promoMessage = '$20 welcome discount applied!';
    } else {
      promoMessage = 'Invalid promo code.';
    }
  }

  async function handleCreateInlineAddress() {
    if (!newFullName || !newPhone || !newStreet1 || !newCity || !newState || !newPostalCode) {
      errorMessage = 'Please complete all address fields.';
      return;
    }

    try {
      const { data: created, error } = await createAddress(supabase, {
        user_id: user.id,
        full_name: newFullName.trim(),
        phone: newPhone.trim(),
        street_line_1: newStreet1.trim(),
        street_line_2: newStreet2.trim() || null,
        city: newCity.trim(),
        state: newState.trim(),
        postal_code: newPostalCode.trim(),
        country: newCountry,
        is_default: addresses.length === 0
      });

      if (error) throw error;
      if (created) {
        addresses = [created, ...addresses];
        selectedAddressId = created.id;
        showNewAddressForm = false;
      }
    } catch (err: any) {
      errorMessage = err.message || 'Failed to save address.';
    }
  }

  async function handlePlaceOrder() {
    errorMessage = '';

    if (!selectedAddress) {
      errorMessage = 'Please select or add a shipping destination.';
      return;
    }

    if ($cart.length === 0) {
      errorMessage = 'Your cart is empty.';
      return;
    }

    submittingOrder = true;

    try {
      const { data: result, error } = await placeSecureOrder(
        supabase,
        {
          id: selectedAddress.id,
          full_name: selectedAddress.full_name,
          phone: selectedAddress.phone,
          street_line_1: selectedAddress.street_line_1,
          street_line_2: selectedAddress.street_line_2,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postal_code: selectedAddress.postal_code,
          country: selectedAddress.country
        },
        paymentMethod
      );

      if (error) {
        throw error;
      }

      // Order successfully placed on server
      cart.clear();
      goto('/account/orders');
    } catch (err: any) {
      errorMessage = err.message || 'Order creation failed. Please verify inventory and try again.';
    } finally {
      submittingOrder = false;
    }
  }
</script>

<svelte:head>
  <title>Secure Checkout | AXELO Studio</title>
</svelte:head>

<section class="min-h-screen pt-28 pb-20 px-5 sm:px-8 bg-axelo-neutral/20">
  <div class="max-w-6xl mx-auto">
    
    <!-- Checkout Header -->
    <div class="mb-8 flex items-center justify-between border-b border-axelo-border/70 pb-4">
      <div>
        <span class="eyebrow-text text-axelo-blue font-mono">STEP 02 // CONFIRMATION</span>
        <h1 class="text-2xl font-bold tracking-tight text-axelo-dark uppercase mt-1">
          STUDIO CHECKOUT
        </h1>
      </div>
      <div class="flex items-center gap-1.5 text-xs font-mono text-axelo-muted bg-white border border-axelo-border px-3 py-1.5 rounded-full shadow-2xs">
        <Lock class="w-3.5 h-3.5 text-emerald-600" />
        <span>End-to-End Encrypted</span>
      </div>
    </div>

    {#if errorMessage}
      <div class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-fadeIn">
        <AlertCircle class="w-4 h-4 shrink-0 text-red-600" />
        <span>{errorMessage}</span>
      </div>
    {/if}

    {#if $cart.length === 0}
      <div class="bg-white border border-axelo-border rounded-xl p-12 text-center shadow-subtle">
        <p class="text-base font-semibold text-axelo-dark uppercase">Your bag is currently empty</p>
        <p class="text-xs text-axelo-muted mt-1">Please add items from the hardware catalog to continue.</p>
        <a
          href="/#products"
          class="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
        >
          <span>Return to Catalog</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </a>
      </div>
    {:else}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left: Delivery Address & Payment (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Shipping Address Selection -->
          <div class="bg-white border border-axelo-border rounded-xl p-6 sm:p-8 shadow-subtle">
            <div class="flex items-center justify-between mb-5 pb-3 border-b border-axelo-border/70">
              <div class="flex items-center gap-2">
                <MapPin class="w-4 h-4 text-axelo-blue" />
                <h2 class="text-sm font-bold uppercase tracking-tight text-axelo-dark">
                  Delivery Destination
                </h2>
              </div>
              {#if addresses.length > 0 && !showNewAddressForm}
                <button
                  type="button"
                  on:click={() => (showNewAddressForm = true)}
                  class="text-xs font-mono uppercase tracking-wider text-axelo-blue hover:underline font-semibold flex items-center gap-1"
                >
                  <Plus class="w-3 h-3" />
                  <span>New Address</span>
                </button>
              {/if}
            </div>

            {#if showNewAddressForm}
              <div class="p-5 border border-axelo-border rounded-xl bg-axelo-neutral/40 mb-4 space-y-3">
                <h3 class="text-xs font-mono uppercase font-bold text-axelo-dark">Add Destination</h3>
                <div class="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    bind:value={newFullName}
                    placeholder="Full Name *"
                    class="px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white"
                  />
                  <input
                    type="tel"
                    bind:value={newPhone}
                    placeholder="Phone Number *"
                    class="px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white"
                  />
                </div>
                <input
                  type="text"
                  bind:value={newStreet1}
                  placeholder="Street Address *"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white"
                />
                <input
                  type="text"
                  bind:value={newStreet2}
                  placeholder="Apartment / Suite (Optional)"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white"
                />
                <div class="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    bind:value={newCity}
                    placeholder="City *"
                    class="px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white"
                  />
                  <input
                    type="text"
                    bind:value={newState}
                    placeholder="State *"
                    class="px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white"
                  />
                  <input
                    type="text"
                    bind:value={newPostalCode}
                    placeholder="Postal Code *"
                    class="px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white"
                  />
                </div>
                <div class="flex justify-end gap-2 pt-2">
                  {#if addresses.length > 0}
                    <button
                      type="button"
                      on:click={() => (showNewAddressForm = false)}
                      class="px-3 py-1.5 text-xs font-mono uppercase text-axelo-muted"
                    >
                      Cancel
                    </button>
                  {/if}
                  <button
                    type="button"
                    on:click={handleCreateInlineAddress}
                    class="px-4 py-1.5 text-xs font-mono uppercase bg-axelo-dark text-white rounded-lg font-semibold"
                  >
                    Save & Use Address
                  </button>
                </div>
              </div>
            {/if}

            <!-- Address Radio Cards -->
            <div class="space-y-3">
              {#each addresses as addr}
                <label class="block p-4 rounded-xl border cursor-pointer transition-all {selectedAddressId === addr.id ? 'border-axelo-blue bg-axelo-blue/[0.02] ring-1 ring-axelo-blue/30' : 'border-axelo-border hover:border-axelo-dark/30 bg-white'}">
                  <div class="flex items-start gap-3">
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      bind:group={selectedAddressId}
                      class="mt-1 text-axelo-blue focus:ring-axelo-blue"
                    />
                    <div class="flex-1 text-xs">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-axelo-dark">{addr.full_name}</span>
                        {#if addr.is_default}
                          <span class="px-1.5 py-0.2 rounded text-[9px] font-mono bg-axelo-blue text-white uppercase font-bold">Default</span>
                        {/if}
                      </div>
                      <p class="text-axelo-muted mt-0.5">{addr.phone}</p>
                      <p class="text-axelo-dark mt-1 leading-relaxed">
                        {addr.street_line_1}{addr.street_line_2 ? `, ${addr.street_line_2}` : ''}, {addr.city}, {addr.state} — {addr.postal_code}
                      </p>
                    </div>
                  </div>
                </label>
              {/each}
            </div>
          </div>

          <!-- Payment Gateway Selection -->
          <div class="bg-white border border-axelo-border rounded-xl p-6 sm:p-8 shadow-subtle">
            <div class="flex items-center gap-2 mb-4 pb-3 border-b border-axelo-border/70">
              <CreditCard class="w-4 h-4 text-axelo-blue" />
              <h2 class="text-sm font-bold uppercase tracking-tight text-axelo-dark">
                Payment Method
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                on:click={() => (paymentMethod = 'card')}
                class="p-4 rounded-xl border text-left transition-all {paymentMethod === 'card' ? 'border-axelo-blue bg-axelo-blue/[0.03] ring-1 ring-axelo-blue/30' : 'border-axelo-border hover:border-axelo-dark/30'}"
              >
                <span class="block font-bold text-xs text-axelo-dark uppercase">Credit / Debit Card</span>
                <span class="text-[11px] text-axelo-muted font-mono mt-1 block">Visa, Mastercard, Amex</span>
              </button>

              <button
                type="button"
                on:click={() => (paymentMethod = 'upi')}
                class="p-4 rounded-xl border text-left transition-all {paymentMethod === 'upi' ? 'border-axelo-blue bg-axelo-blue/[0.03] ring-1 ring-axelo-blue/30' : 'border-axelo-border hover:border-axelo-dark/30'}"
              >
                <span class="block font-bold text-xs text-axelo-dark uppercase">Instant UPI</span>
                <span class="text-[11px] text-axelo-muted font-mono mt-1 block">GPay, PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                on:click={() => (paymentMethod = 'cod')}
                class="p-4 rounded-xl border text-left transition-all {paymentMethod === 'cod' ? 'border-axelo-blue bg-axelo-blue/[0.03] ring-1 ring-axelo-blue/30' : 'border-axelo-border hover:border-axelo-dark/30'}"
              >
                <span class="block font-bold text-xs text-axelo-dark uppercase">Pay on Delivery</span>
                <span class="text-[11px] text-axelo-muted font-mono mt-1 block">Cash / Card on Arrival</span>
              </button>
            </div>
            <p class="text-[11px] text-axelo-muted mt-3 font-mono">
              Powered by Razorpay & Stripe unified payment gateway boundary.
            </p>
          </div>

        </div>

        <!-- Right: Order Summary (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white border border-axelo-border rounded-xl p-6 sm:p-8 shadow-subtle sticky top-28">
            <h2 class="text-sm font-bold uppercase tracking-tight text-axelo-dark pb-3 border-b border-axelo-border/70 mb-4">
              Studio Order Summary
            </h2>

            <!-- Cart Line Items -->
            <div class="divide-y divide-axelo-border/60 max-h-60 overflow-y-auto mb-5">
              {#each $cart as item}
                <div class="py-3 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-3">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      class="w-10 h-10 rounded-md object-cover border border-axelo-border shrink-0"
                    />
                    <div>
                      <span class="font-semibold text-axelo-dark line-clamp-1">{item.product.name}</span>
                      <span class="text-[11px] text-axelo-muted font-mono">{item.selectedColor} × {item.quantity}</span>
                    </div>
                  </div>
                  <span class="font-mono font-semibold text-axelo-dark">
                    ${(item.product.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              {/each}
            </div>

            <!-- Promo Input -->
            <div class="mb-5 pb-5 border-b border-axelo-border/70">
              <div class="flex gap-2">
                <input
                  type="text"
                  bind:value={promoCode}
                  placeholder="Promo code (e.g. AXELO10)"
                  class="flex-1 px-3 py-2 text-xs rounded-lg border border-axelo-border uppercase font-mono focus:border-axelo-blue focus:outline-none"
                />
                <button
                  type="button"
                  on:click={applyPromo}
                  class="px-4 py-2 bg-axelo-neutral border border-axelo-border rounded-lg text-xs font-mono uppercase font-semibold text-axelo-dark hover:bg-axelo-border transition-colors"
                >
                  Apply
                </button>
              </div>
              {#if promoMessage}
                <p class="text-[11px] font-mono mt-1.5 {promoApplied ? 'text-emerald-600' : 'text-red-500'}">
                  {promoMessage}
                </p>
              {/if}
            </div>

            <!-- Pricing Breakdown -->
            <div class="space-y-2 text-xs font-mono pb-5 border-b border-axelo-border/70">
              <div class="flex justify-between text-axelo-muted">
                <span>Subtotal</span>
                <span class="text-axelo-dark font-medium">${$cartSubtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-axelo-muted">
                <span>Insured Dispatch</span>
                <span class="text-axelo-dark font-medium">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              {#if discountAmount > 0}
                <div class="flex justify-between text-emerald-600">
                  <span>Promotional Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              {/if}
              <div class="flex justify-between text-sm font-bold text-axelo-dark pt-2 border-t border-axelo-border">
                <span>Total Amount</span>
                <span class="text-base font-mono">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <!-- Place Order CTA -->
            <button
              type="button"
              on:click={handlePlaceOrder}
              disabled={submittingOrder || !selectedAddress}
              class="w-full mt-6 py-4 px-6 rounded-xl bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if submittingOrder}
                <RefreshCw class="w-4 h-4 animate-spin" />
                <span>Authorizing Order...</span>
              {:else}
                <span>Authorize & Place Order</span>
                <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
              {/if}
            </button>

            <div class="flex items-center justify-center gap-2 text-[11px] text-axelo-muted mt-3">
              <ShieldCheck class="w-3.5 h-3.5 text-axelo-blue" />
              <span>30-Day Zero-Risk Setup Guarantee</span>
            </div>
          </div>
        </div>

      </div>
    {/if}

  </div>
</section>
