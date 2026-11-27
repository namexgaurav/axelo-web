<script lang="ts">
  import SeoHead from '$lib/components/common/SeoHead.svelte';
  import HeroSection from '$lib/components/home/HeroSection.svelte';
  import FeaturedProductsSection from '$lib/components/home/FeaturedProductsSection.svelte';
  import BrandPhilosophySection from '$lib/components/home/BrandPhilosophySection.svelte';
  import BrandHighlightsSection from '$lib/components/home/BrandHighlightsSection.svelte';
  import ClosingSection from '$lib/components/home/ClosingSection.svelte';
  import { buildCanonicalUrl, buildOrganizationJsonLd } from '$lib/utils/seo';

  export let data;

  $: canonicalUrl = buildCanonicalUrl(data.origin, '/');
  $: seo = {
    title: 'AXELO — Premium. Yet Affordable. | Thoughtful Technology & Desk Accessories',
    description:
      data.homepage.hero.supportingText ||
      'Thoughtfully designed technology and desk accessories combining minimal aesthetics, everyday functionality, and lasting value.',
    canonicalUrl,
    ogType: 'website' as const,
    ogImage: data.homepage.hero.imageUrl || data.featuredProducts[0]?.primaryImage?.url || null
  };
</script>

<SeoHead {seo} jsonLd={buildOrganizationJsonLd(data.origin)} />

<HeroSection hero={data.homepage.hero} featuredProducts={data.featuredProducts} />

<FeaturedProductsSection
  section={data.homepage.featuredSection}
  products={data.featuredProducts}
/>

<BrandPhilosophySection
  philosophy={data.homepage.philosophy}
  fallbackProduct={data.featuredProducts[1] || data.featuredProducts[0] || null}
/>

<BrandHighlightsSection highlights={data.homepage.highlights} />

<ClosingSection closing={data.homepage.closing} />
