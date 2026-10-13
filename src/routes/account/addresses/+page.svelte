<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import {
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    type Address
  } from '$lib/addresses/address.service';
  import { MapPin, Plus, Trash2, Edit3, Star, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-svelte';

  export let data;

  $: user = data.user;
  $: supabase = page.data.supabase;

  let addresses: Address[] = [];
  let loading = true;
  let saving = false;
  let errorMsg = '';
  let successMsg = '';

  // Form modal state
  let modalOpen = false;
  let editingAddressId: string | null = null;
  let formFullName = '';
  let formPhone = '';
  let formStreet1 = '';
  let formStreet2 = '';
  let formCity = '';
  let formState = '';
  let formPostalCode = '';
  let formCountry = 'IN';
  let formIsDefault = false;

  async function loadAddresses() {
    loading = true;
    errorMsg = '';
    try {
      const { data: list, error } = await fetchAddresses(supabase, user.id);
      if (error) {
        errorMsg = error.message;
      } else {
        addresses = list;
      }
    } catch (err: any) {
      errorMsg = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadAddresses();
  });

  function openCreateModal() {
    editingAddressId = null;
    formFullName = data.profile?.full_name || '';
    formPhone = data.profile?.phone || '';
    formStreet1 = '';
    formStreet2 = '';
    formCity = '';
    formState = '';
    formPostalCode = '';
    formCountry = 'IN';
    formIsDefault = addresses.length === 0;
    modalOpen = true;
    errorMsg = '';
    successMsg = '';
  }

  function openEditModal(addr: Address) {
    editingAddressId = addr.id;
    formFullName = addr.full_name;
    formPhone = addr.phone;
    formStreet1 = addr.street_line_1;
    formStreet2 = addr.street_line_2 || '';
    formCity = addr.city;
    formState = addr.state;
    formPostalCode = addr.postal_code;
    formCountry = addr.country;
    formIsDefault = addr.is_default;
    modalOpen = true;
    errorMsg = '';
    successMsg = '';
  }

  async function handleSaveAddress() {
    if (!formFullName || !formPhone || !formStreet1 || !formCity || !formState || !formPostalCode) {
      errorMsg = 'Please complete all required address fields.';
      return;
    }

    saving = true;
    errorMsg = '';

    try {
      if (editingAddressId) {
        const { error } = await updateAddress(supabase, editingAddressId, {
          full_name: formFullName.trim(),
          phone: formPhone.trim(),
          street_line_1: formStreet1.trim(),
          street_line_2: formStreet2.trim() || null,
          city: formCity.trim(),
          state: formState.trim(),
          postal_code: formPostalCode.trim(),
          country: formCountry,
          is_default: formIsDefault
        });
        if (error) throw error;
        successMsg = 'Address updated successfully.';
      } else {
        const { error } = await createAddress(supabase, {
          user_id: user.id,
          full_name: formFullName.trim(),
          phone: formPhone.trim(),
          street_line_1: formStreet1.trim(),
          street_line_2: formStreet2.trim() || null,
          city: formCity.trim(),
          state: formState.trim(),
          postal_code: formPostalCode.trim(),
          country: formCountry,
          is_default: formIsDefault
        });
        if (error) throw error;
        successMsg = 'New delivery address created.';
      }

      modalOpen = false;
      await loadAddresses();
    } catch (err: any) {
      errorMsg = err.message || 'Failed to save address.';
    } finally {
      saving = false;
    }
  }

  async function handleDeleteAddress(id: string) {
    if (!confirm('Are you sure you want to remove this delivery address?')) return;

    try {
      const { error } = await deleteAddress(supabase, id);
      if (error) throw error;
      successMsg = 'Address deleted.';
      await loadAddresses();
    } catch (err: any) {
      errorMsg = err.message;
    }
  }

  async function handleSetDefault(id: string) {
    try {
      const { error } = await setDefaultAddress(supabase, user.id, id);
      if (error) throw error;
      successMsg = 'Default delivery address updated.';
      await loadAddresses();
    } catch (err: any) {
      errorMsg = err.message;
    }
  }
</script>

<div class="bg-white border border-axelo-border rounded-xl p-6 sm:p-8 shadow-subtle">
  <div class="border-b border-axelo-border/70 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h2 class="text-base font-bold tracking-tight text-axelo-dark uppercase">
        Saved Delivery Addresses
      </h2>
      <p class="text-xs text-axelo-muted mt-0.5 font-mono">
        Addresses used for zero-friction order dispatch and checkout
      </p>
    </div>

    <button
      type="button"
      on:click={openCreateModal}
      class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-xs"
    >
      <Plus class="w-3.5 h-3.5" />
      <span>Add New Address</span>
    </button>
  </div>

  {#if successMsg}
    <div class="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
      <CheckCircle2 class="w-4 h-4 shrink-0 text-emerald-600" />
      <span>{successMsg}</span>
    </div>
  {/if}

  {#if errorMsg}
    <div class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-fadeIn">
      <AlertCircle class="w-4 h-4 shrink-0 text-red-600" />
      <span>{errorMsg}</span>
    </div>
  {/if}

  {#if loading}
    <div class="py-12 flex flex-col items-center justify-center text-axelo-muted gap-2">
      <RefreshCw class="w-5 h-5 animate-spin" />
      <span class="text-xs font-mono uppercase">Retrieving addresses...</span>
    </div>
  {:else if addresses.length === 0}
    <div class="py-12 text-center border-2 border-dashed border-axelo-border rounded-xl p-8">
      <MapPin class="w-8 h-8 text-axelo-muted mx-auto mb-3" />
      <p class="text-sm font-semibold text-axelo-dark uppercase tracking-wide">No addresses saved yet</p>
      <p class="text-xs text-axelo-muted mt-1 max-w-sm mx-auto">
        Add your delivery location for fast, seamless one-click ordering during checkout.
      </p>
      <button
        type="button"
        on:click={openCreateModal}
        class="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-axelo-neutral border border-axelo-border hover:bg-axelo-border text-axelo-dark text-xs font-mono uppercase tracking-wider transition-colors"
      >
        <Plus class="w-3.5 h-3.5" />
        <span>Add Address</span>
      </button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each addresses as addr}
        <div class="border rounded-xl p-5 transition-all {addr.is_default ? 'border-axelo-blue/70 bg-axelo-blue/[0.02] shadow-xs' : 'border-axelo-border hover:border-axelo-dark/40 bg-white'}">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm text-axelo-dark">{addr.full_name}</span>
              {#if addr.is_default}
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-axelo-blue text-white uppercase">
                  Default
                </span>
              {/if}
            </div>

            <div class="flex items-center gap-1">
              <button
                type="button"
                on:click={() => openEditModal(addr)}
                class="p-1.5 text-axelo-muted hover:text-axelo-dark rounded hover:bg-axelo-neutral transition-colors"
                title="Edit address"
              >
                <Edit3 class="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                on:click={() => handleDeleteAddress(addr.id)}
                class="p-1.5 text-axelo-muted hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                title="Delete address"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p class="text-xs text-axelo-muted font-mono mb-2">Phone: {addr.phone}</p>
          <div class="text-xs text-axelo-dark leading-relaxed">
            <p>{addr.street_line_1}</p>
            {#if addr.street_line_2}
              <p>{addr.street_line_2}</p>
            {/if}
            <p>{addr.city}, {addr.state} — {addr.postal_code}</p>
            <p class="text-[11px] font-mono text-axelo-muted uppercase">{addr.country}</p>
          </div>

          {#if !addr.is_default}
            <div class="mt-4 pt-3 border-t border-axelo-border/60">
              <button
                type="button"
                on:click={() => handleSetDefault(addr.id)}
                class="inline-flex items-center gap-1.5 text-xs text-axelo-blue hover:underline font-mono uppercase tracking-wider font-semibold"
              >
                <Star class="w-3 h-3" />
                <span>Set as Default</span>
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Modal Dialog for Add / Edit Address -->
{#if modalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
    <div class="relative w-full max-w-lg bg-white border border-axelo-border rounded-xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-4 border-b border-axelo-border mb-5">
        <h3 class="text-base font-bold tracking-tight text-axelo-dark uppercase">
          {editingAddressId ? 'Edit Address' : 'New Delivery Address'}
        </h3>
        <button
          type="button"
          on:click={() => (modalOpen = false)}
          class="p-1.5 rounded-full text-axelo-muted hover:text-axelo-dark hover:bg-axelo-neutral"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <form on:submit|preventDefault={handleSaveAddress} class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="addr-modal-name" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
              Recipient Name *
            </label>
            <input
              id="addr-modal-name"
              type="text"
              bind:value={formFullName}
              required
              class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
            />
          </div>

          <div>
            <label for="addr-modal-phone" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
              Contact Phone *
            </label>
            <input
              id="addr-modal-phone"
              type="tel"
              bind:value={formPhone}
              required
              class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
            />
          </div>
        </div>

        <div>
          <label for="addr-modal-street1" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
            Street Address *
          </label>
          <input
            id="addr-modal-street1"
            type="text"
            bind:value={formStreet1}
            required
            placeholder="Flat / House / Suite, Street Name"
            class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
          />
        </div>

        <div>
          <label for="addr-modal-street2" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
            Apartment / Landmark (Optional)
          </label>
          <input
            id="addr-modal-street2"
            type="text"
            bind:value={formStreet2}
            placeholder="Floor, building, landmark"
            class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="addr-modal-city" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
              City *
            </label>
            <input
              id="addr-modal-city"
              type="text"
              bind:value={formCity}
              required
              class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
            />
          </div>

          <div>
            <label for="addr-modal-state" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
              State / Province *
            </label>
            <input
              id="addr-modal-state"
              type="text"
              bind:value={formState}
              required
              class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="addr-modal-zip" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
              Postal / PIN Code *
            </label>
            <input
              id="addr-modal-zip"
              type="text"
              bind:value={formPostalCode}
              required
              class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
            />
          </div>

          <div>
            <label for="addr-modal-country" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1">
              Country *
            </label>
            <select
              id="addr-modal-country"
              bind:value={formCountry}
              class="w-full px-3 py-2 text-xs rounded-lg border border-axelo-border bg-white text-axelo-dark focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue"
            >
              <option value="IN">India (+91)</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="SG">Singapore</option>
              <option value="AE">United Arab Emirates</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>

        <div class="pt-2">
          <label class="flex items-center gap-2 cursor-pointer text-xs text-axelo-dark font-medium">
            <input
              type="checkbox"
              bind:checked={formIsDefault}
              class="rounded border-axelo-border text-axelo-blue focus:ring-axelo-blue"
            />
            <span>Set as default delivery address</span>
          </label>
        </div>

        <div class="pt-4 border-t border-axelo-border flex justify-end gap-3">
          <button
            type="button"
            on:click={() => (modalOpen = false)}
            class="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-axelo-muted hover:text-axelo-dark transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            class="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-xs disabled:opacity-50"
          >
            {#if saving}
              <RefreshCw class="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            {:else}
              <span>Save Address</span>
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
