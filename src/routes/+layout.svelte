<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/navigation/Header.svelte';
  import MobileMenu from '$lib/components/navigation/MobileMenu.svelte';
  import Footer from '$lib/components/navigation/Footer.svelte';

  export let data;

  let mobileMenuOpen = false;
</script>

<div class="min-h-screen bg-white text-axelo-dark flex flex-col font-sans">
  <Header onOpenMobileMenu={() => (mobileMenuOpen = true)} />

  <MobileMenu isOpen={mobileMenuOpen} onClose={() => (mobileMenuOpen = false)} />

  <main class="flex-1 w-full">
    <slot />
  </main>

  <Footer site={data.site} />
</div>
