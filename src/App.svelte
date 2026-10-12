<script lang="ts">
  import Header from './lib/components/layout/Header.svelte';
  import MobileMenu from './lib/components/layout/MobileMenu.svelte';
  import Footer from './lib/components/layout/Footer.svelte';
  import Hero from './lib/components/sections/Hero.svelte';
  import ProductShowcase from './lib/components/sections/ProductShowcase.svelte';
  import BrandTrust from './lib/components/sections/BrandTrust.svelte';
  import ProductComposition from './lib/components/sections/ProductComposition.svelte';
  import CategoryShowcase from './lib/components/sections/CategoryShowcase.svelte';
  import BrandPhilosophy from './lib/components/sections/BrandPhilosophy.svelte';
  import EditorialStories from './lib/components/sections/EditorialStories.svelte';
  import FeaturedProducts from './lib/components/sections/FeaturedProducts.svelte';
  import PromotionalSection from './lib/components/sections/PromotionalSection.svelte';
  import CommunityGallery from './lib/components/sections/CommunityGallery.svelte';
  import FinalCTA from './lib/components/sections/FinalCTA.svelte';
  import CartDrawer from './lib/components/ui/CartDrawer.svelte';
  import QuickViewModal from './lib/components/ui/QuickViewModal.svelte';

  let mobileMenuOpen = false;
  let activeProductCategory = 'all';

  function handleSelectCategory(catId: string) {
    activeProductCategory = catId;
    const target = document.getElementById('products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<div class="min-h-screen bg-white text-axelo-dark flex flex-col font-sans selection:bg-axelo-blue selection:text-white">
  <!-- Top Navigation Header -->
  <Header onOpenMobileMenu={() => (mobileMenuOpen = true)} />

  <!-- Mobile Drawer Menu -->
  <MobileMenu
    isOpen={mobileMenuOpen}
    onClose={() => (mobileMenuOpen = false)}
  />

  <!-- Main Website Narrative Stream -->
  <main class="flex-1 w-full overflow-x-hidden">
    <!-- 01 // Introduction & Hero Composition -->
    <Hero />

    <!-- 02 // Large Landscape Product Feature -->
    <ProductShowcase />

    <!-- 03 // Brand Principles & Credibility -->
    <BrandTrust />

    <!-- 04 // Layered Acoustic Hardware Composition -->
    <ProductComposition />

    <!-- 05 // Asymmetric Category System -->
    <CategoryShowcase onSelectCategory={handleSelectCategory} />

    <!-- 06 // Brand Philosophy & Engineering Pillars -->
    <BrandPhilosophy />

    <!-- 07 // Magazine Journal & Editorial Stories -->
    <EditorialStories />

    <!-- 08 // Curated Hardware Catalog & Filters -->
    <FeaturedProducts bind:activeCategory={activeProductCategory} />

    <!-- 09 // Bold Color-Block Promotional Moment -->
    <PromotionalSection />

    <!-- 10 // Community Workspace Gallery -->
    <CommunityGallery />

    <!-- 11 // The AXELO Invitation (Final Conversion) -->
    <FinalCTA />
  </main>

  <!-- Site Footer -->
  <Footer />

  <!-- Interactive Overlays -->
  <CartDrawer />
  <QuickViewModal />
</div>
