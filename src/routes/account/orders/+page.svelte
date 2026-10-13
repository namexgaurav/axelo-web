<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { fetchUserOrders, type OrderWithItems } from '$lib/orders/order.service';
  import { Package, ArrowRight, RefreshCw, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-svelte';

  export let data;

  $: user = data.user;
  $: supabase = page.data.supabase;

  let orders: OrderWithItems[] = [];
  let loading = true;
  let errorMsg = '';

  async function loadOrders() {
    loading = true;
    errorMsg = '';
    try {
      const { data: list, error } = await fetchUserOrders(supabase, user.id);
      if (error) {
        errorMsg = error.message;
      } else {
        orders = list;
      }
    } catch (err: any) {
      errorMsg = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadOrders();
  });

  function getStatusBadge(status: string) {
    switch (status) {
      case 'delivered':
        return { label: 'Delivered', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'shipped':
        return { label: 'In Transit', class: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'processing':
        return { label: 'Processing', class: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      default:
        return { label: 'Confirmed / Pending', class: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  }
</script>

<div class="bg-white border border-axelo-border rounded-xl p-6 sm:p-8 shadow-subtle">
  <div class="border-b border-axelo-border/70 pb-4 mb-6">
    <h2 class="text-base font-bold tracking-tight text-axelo-dark uppercase">
      Order History & Shipments
    </h2>
    <p class="text-xs text-axelo-muted mt-0.5 font-mono">
      Track past hardware purchases, delivery statuses, and invoices
    </p>
  </div>

  {#if errorMsg}
    <div class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-fadeIn">
      <AlertCircle class="w-4 h-4 shrink-0 text-red-600" />
      <span>{errorMsg}</span>
    </div>
  {/if}

  {#if loading}
    <div class="py-12 flex flex-col items-center justify-center text-axelo-muted gap-2">
      <RefreshCw class="w-5 h-5 animate-spin" />
      <span class="text-xs font-mono uppercase">Retrieving your orders...</span>
    </div>
  {:else if orders.length === 0}
    <div class="py-12 text-center border-2 border-dashed border-axelo-border rounded-xl p-8">
      <Package class="w-8 h-8 text-axelo-muted mx-auto mb-3" />
      <p class="text-sm font-semibold text-axelo-dark uppercase tracking-wide">No orders placed yet</p>
      <p class="text-xs text-axelo-muted mt-1 max-w-sm mx-auto">
        When you place an order, your tracking details, line items, and fulfillment history will appear here.
      </p>
      <a
        href="/#products"
        class="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-xs"
      >
        <span>Explore Hardware Catalog</span>
        <ArrowRight class="w-3.5 h-3.5" />
      </a>
    </div>
  {:else}
    <div class="space-y-4">
      {#each orders as order}
        {@const badge = getStatusBadge(order.status)}
        <div class="border border-axelo-border rounded-xl p-5 hover:border-axelo-dark/40 transition-all bg-white shadow-xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-axelo-border/60 gap-3">
            <div>
              <div class="flex items-center gap-3">
                <span class="font-mono text-sm font-bold text-axelo-dark">{order.order_number}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border {badge.class}">
                  {badge.label}
                </span>
              </div>
              <p class="text-xs text-axelo-muted font-mono mt-1">
                Placed on {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div class="sm:text-right">
              <span class="text-base font-bold text-axelo-dark font-mono">${order.total.toFixed(2)}</span>
              <p class="text-[11px] font-mono text-axelo-muted uppercase">
                Payment: <span class="font-semibold text-axelo-dark">{order.payment_status}</span>
              </p>
            </div>
          </div>

          <!-- Items Preview -->
          {#if order.order_items && order.order_items.length > 0}
            <div class="py-4 space-y-2">
              {#each order.order_items as item}
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-axelo-neutral rounded border border-axelo-border flex items-center justify-center shrink-0 font-mono text-[11px] text-axelo-dark font-bold">
                      ×{item.quantity}
                    </div>
                    <div>
                      <span class="font-medium text-axelo-dark">{item.product_name}</span>
                      {#if item.variant_name}
                        <span class="text-axelo-muted block text-[11px]">{item.variant_name}</span>
                      {/if}
                    </div>
                  </div>
                  <span class="font-mono font-medium text-axelo-dark">${item.total_price.toFixed(2)}</span>
                </div>
              {/each}
            </div>
          {/if}

          <!-- Delivery Destination -->
          {#if order.shipping_address}
            <div class="pt-3 border-t border-axelo-border/60 flex items-center justify-between text-xs">
              <span class="text-axelo-muted font-mono truncate max-w-sm">
                Deliver to: <span class="text-axelo-dark font-medium">{(order.shipping_address as any)?.city || ''}, {(order.shipping_address as any)?.state || ''}</span>
              </span>
              <span class="text-[11px] font-mono text-axelo-blue uppercase font-semibold">
                Standard Insured Courier
              </span>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
