<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { signOut } from '$lib/auth/auth.service';
  import { User, MapPin, Package, LogOut, Shield } from 'lucide-svelte';

  export let data;

  $: user = data.user;
  $: profile = data.profile;
  $: supabase = page.data.supabase;
  $: currentPath = page.url.pathname;

  let signingOut = false;

  async function handleSignOut() {
    signingOut = true;
    try {
      await signOut(supabase);
      await fetch('/auth/logout', { method: 'POST' });
      goto('/', { invalidateAll: true });
    } catch (err) {
      console.error(err);
      goto('/');
    } finally {
      signingOut = false;
    }
  }

  const navItems = [
    { label: 'Profile & Identity', href: '/account', icon: User, exact: true },
    { label: 'Delivery Addresses', href: '/account/addresses', icon: MapPin },
    { label: 'Order History', href: '/account/orders', icon: Package }
  ];
</script>

<svelte:head>
  <title>Customer Dashboard | AXELO</title>
</svelte:head>

<section class="min-h-screen pt-28 pb-20 px-5 sm:px-8 bg-axelo-neutral/20">
  <div class="max-w-6xl mx-auto">
    
    <!-- Customer Header Profile Bar -->
    <div class="bg-white border border-axelo-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 bg-axelo-dark rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
          <span class="text-xl font-bold font-mono uppercase">
            {(profile?.full_name || user?.email || 'A').charAt(0)}
          </span>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-xl font-bold tracking-tight text-axelo-dark uppercase">
              {profile?.full_name || 'AXELO Member'}
            </h1>
            {#if data.role === 'admin'}
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-axelo-blue/10 text-axelo-blue font-bold uppercase">
                <Shield class="w-3 h-3" />
                Admin
              </span>
            {/if}
          </div>
          <p class="text-xs text-axelo-muted font-mono mt-0.5">
            {user?.email || user?.phone || 'Authenticated Customer'}
          </p>
        </div>
      </div>

      <button
        type="button"
        on:click={handleSignOut}
        disabled={signingOut}
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-axelo-border hover:border-red-300 hover:bg-red-50 text-axelo-dark hover:text-red-700 text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-50"
      >
        <LogOut class="w-3.5 h-3.5" />
        <span>{signingOut ? 'Signing out...' : 'Sign Out'}</span>
      </button>
    </div>

    <!-- Layout Grid: Navigation + Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Side Navigation -->
      <nav class="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
        {#each navItems as item}
          {@const isActive = item.exact ? currentPath === item.href : currentPath.startsWith(item.href)}
          <a
            href={item.href}
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-wider font-medium transition-all shrink-0 {isActive
              ? 'bg-axelo-dark text-white shadow-xs font-semibold'
              : 'bg-white border border-axelo-border/70 text-axelo-dark hover:bg-axelo-neutral'}"
          >
            <svelte:component this={item.icon} class="w-4 h-4 {isActive ? 'text-axelo-blue' : 'text-axelo-muted'}" />
            <span>{item.label}</span>
          </a>
        {/each}
      </nav>

      <!-- Main Content Pane -->
      <main class="lg:col-span-3">
        <slot />
      </main>
    </div>

  </div>
</section>
