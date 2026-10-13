<script lang="ts">
  import '../app.css';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { setAuthState, clearAuthState } from '$lib/auth/auth.store';
  import { fetchProfile, fetchUserRole } from '$lib/auth/auth.service';
  import Header from '$lib/components/layout/Header.svelte';
  import MobileMenu from '$lib/components/layout/MobileMenu.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import CartDrawer from '$lib/components/ui/CartDrawer.svelte';
  import QuickViewModal from '$lib/components/ui/QuickViewModal.svelte';
  import AuthPromptModal from '$lib/components/ui/AuthPromptModal.svelte';
  import { cart } from '$lib/stores/cart';

  export let data;

  let mobileMenuOpen = false;

  $: ({ supabase, session, user } = data);

  $: if (user && session) {
    setAuthState(session, user);
    cart.syncFromDb(supabase, user.id);
    fetchProfile(supabase, user.id).then(({ data: profileData }) => {
      fetchUserRole(supabase, user.id).then(({ role: roleData }) => {
        setAuthState(session, user, profileData, roleData);
      });
    }).catch(() => {
      // Graceful fallback if tables not yet populated
    });
  } else {
    clearAuthState();
    cart.set([]);
  }

  onMount(() => {
    const { data: authData } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => {
      authData.subscription.unsubscribe();
    };
  });
</script>

<div class="min-h-screen bg-white text-axelo-dark flex flex-col font-sans selection:bg-axelo-blue selection:text-white">
  <!-- Top Navigation Header -->
  <Header onOpenMobileMenu={() => (mobileMenuOpen = true)} />

  <!-- Mobile Drawer Menu -->
  <MobileMenu
    isOpen={mobileMenuOpen}
    onClose={() => (mobileMenuOpen = false)}
  />

  <!-- Main Content Area -->
  <main class="flex-1 w-full overflow-x-hidden">
    <slot />
  </main>

  <!-- Site Footer -->
  <Footer />

  <!-- Interactive Overlays -->
  <CartDrawer />
  <QuickViewModal />
  <AuthPromptModal />
</div>
