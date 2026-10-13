<script lang="ts">
  import { page } from '$app/state';
  import { updateProfile } from '$lib/auth/auth.service';
  import { CheckCircle2, AlertCircle, Save, RefreshCw, UserCheck } from 'lucide-svelte';

  export let data;

  $: user = data.user;
  $: profile = data.profile;
  $: supabase = page.data.supabase;

  let fullName = profile?.full_name || '';
  let displayName = profile?.display_name || '';
  let phone = profile?.phone || user?.phone || '';
  let saving = false;
  let successMsg = '';
  let errorMsg = '';

  async function handleSaveProfile() {
    saving = true;
    successMsg = '';
    errorMsg = '';

    try {
      const { data: updated, error } = await updateProfile(supabase, user.id, {
        full_name: fullName.trim(),
        display_name: displayName.trim(),
        phone: phone.trim(),
        profile_complete: Boolean(fullName.trim())
      });

      if (error) {
        errorMsg = error.message || 'Failed to update customer profile.';
      } else {
        successMsg = 'Profile successfully updated!';
      }
    } catch (err: any) {
      errorMsg = err.message || 'Unexpected error occurred.';
    } finally {
      saving = false;
    }
  }
</script>

<div class="bg-white border border-axelo-border rounded-xl p-6 sm:p-8 shadow-subtle">
  <div class="border-b border-axelo-border/70 pb-4 mb-6 flex items-center justify-between">
    <div>
      <h2 class="text-base font-bold tracking-tight text-axelo-dark uppercase">
        Personal Information
      </h2>
      <p class="text-xs text-axelo-muted mt-0.5 font-mono">
        Manage your contact details and identity credentials
      </p>
    </div>

    {#if profile?.profile_complete}
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
        <UserCheck class="w-3.5 h-3.5" />
        Verified Profile
      </span>
    {:else}
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-amber-50 text-amber-700 font-medium border border-amber-200">
        Profile Incomplete
      </span>
    {/if}
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

  <form on:submit|preventDefault={handleSaveProfile} class="space-y-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label for="fullName" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1.5">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          bind:value={fullName}
          placeholder="e.g. Maya Lin"
          class="w-full px-4 py-2.5 rounded-lg border border-axelo-border bg-white text-sm text-axelo-dark focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue transition-colors"
        />
      </div>

      <div>
        <label for="displayName" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1.5">
          Display / Studio Name
        </label>
        <input
          id="displayName"
          type="text"
          bind:value={displayName}
          placeholder="e.g. Studio Lin"
          class="w-full px-4 py-2.5 rounded-lg border border-axelo-border bg-white text-sm text-axelo-dark focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue transition-colors"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label for="email" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1.5">
          Primary Email (Auth Identity)
        </label>
        <input
          id="email"
          type="email"
          value={user?.email || 'No email bound'}
          disabled
          class="w-full px-4 py-2.5 rounded-lg border border-axelo-border bg-axelo-neutral/60 text-sm text-axelo-muted cursor-not-allowed font-mono"
        />
      </div>

      <div>
        <label for="phone" class="block text-xs font-mono uppercase tracking-wider text-axelo-muted mb-1.5">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          bind:value={phone}
          placeholder="+91 98765 43210"
          class="w-full px-4 py-2.5 rounded-lg border border-axelo-border bg-white text-sm text-axelo-dark focus:outline-none focus:ring-2 focus:ring-axelo-blue/30 focus:border-axelo-blue transition-colors"
        />
      </div>
    </div>

    <div class="pt-4 flex justify-end">
      <button
        type="submit"
        disabled={saving}
        class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all disabled:opacity-50 shadow-xs"
      >
        {#if saving}
          <RefreshCw class="w-3.5 h-3.5 animate-spin" />
          <span>Saving...</span>
        {:else}
          <Save class="w-3.5 h-3.5" />
          <span>Save Profile Changes</span>
        {/if}
      </button>
    </div>
  </form>

  <!-- Security & Audit Info -->
  <div class="mt-8 pt-6 border-t border-axelo-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-axelo-muted">
    <div>
      <span class="block text-[10px] uppercase">Account Created</span>
      <span class="text-axelo-dark">
        {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
      </span>
    </div>
    <div>
      <span class="block text-[10px] uppercase">Account ID</span>
      <span class="text-axelo-dark truncate block max-w-xs">{user?.id}</span>
    </div>
  </div>
</div>
