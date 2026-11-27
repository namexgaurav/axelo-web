<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import SeoHead from '$lib/components/common/SeoHead.svelte';
  import RichContent from '$lib/components/common/RichContent.svelte';
  import FallbackImage from '$lib/components/common/FallbackImage.svelte';
  import { buildCanonicalUrl } from '$lib/utils/seo';

  export let data;

  $: pageRecord = data.about.page;
  $: aboutJson = data.about.aboutContent;
  $: philosophy = data.about.philosophy;
  $: highlights = data.about.highlights;
  $: heroImage = data.about.media[0]?.url || philosophy.imageUrl || null;

  $: sections = Array.isArray(aboutJson?.sections)
    ? aboutJson.sections.filter((s: unknown): s is { title: string; body: string } =>
        Boolean(s && typeof s === 'object' && 'title' in s && 'body' in s)
      )
    : [];

  $: canonicalUrl = buildCanonicalUrl(data.origin, '/about');
  $: seo = {
    title: pageRecord?.seoTitle || 'About AXELO | Premium. Yet Affordable.',
    description:
      pageRecord?.seoDescription ||
      pageRecord?.excerpt ||
      'Learn about AXELO — thoughtfully designed technology and desk accessories built around minimal aesthetics and everyday performance.',
    canonicalUrl,
    ogType: 'website' as const,
    ogImage: pageRecord?.ogImageUrl || heroImage || null
  };
</script>

<SeoHead {seo} />

<section class="pt-32 pb-24 bg-white">
  <div class="max-w-7xl mx-auto px-5 sm:px-8 space-y-20">
    <!-- Header -->
    <div class="max-w-3xl space-y-5 pb-12 border-b border-axelo-border">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
        <span class="eyebrow-text font-mono text-axelo-blue">About AXELO</span>
      </div>
      <h1 class="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-axelo-dark">
        {pageRecord?.title ||
          (typeof aboutJson?.headline === 'string' && aboutJson.headline) ||
          'Premium. Yet Affordable.'}
      </h1>
      <p class="text-base sm:text-lg text-axelo-muted leading-relaxed">
        {pageRecord?.excerpt ||
          (typeof aboutJson?.subtitle === 'string' && aboutJson.subtitle) ||
          'AXELO designs technology and desk accessories that bring minimal aesthetics, everyday functionality, and dependable performance within reach.'}
      </p>
    </div>

    <!-- Optional Database Media Banner -->
    {#if heroImage}
      <div class="rounded-3xl overflow-hidden border border-axelo-border bg-axelo-neutral aspect-[16/7]">
        <FallbackImage
          src={heroImage}
          alt={pageRecord?.title || 'About AXELO'}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    {/if}

    <!-- Database-managed site_pages content OR site_content sections -->
    {#if pageRecord?.content}
      <div class="max-w-3xl">
        <RichContent content={pageRecord.content} />
      </div>
    {:else if sections.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each sections as section, idx}
          <div class="p-8 rounded-2xl bg-axelo-offwhite border border-axelo-border space-y-3">
            <span class="font-mono text-xs text-axelo-blue font-semibold">0{idx + 1}</span>
            <h2 class="text-xl font-bold text-axelo-dark">{section.title}</h2>
            <p class="text-sm text-axelo-graphite leading-relaxed">{section.body}</p>
          </div>
        {/each}
      </div>
    {:else}
      <!-- Clean non-fabricated brand philosophy & principles -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div class="lg:col-span-5 space-y-4">
          <span class="eyebrow-text font-mono text-axelo-blue">{philosophy.eyebrow || 'Philosophy'}</span>
          <h2 class="editorial-title text-3xl sm:text-4xl font-extrabold text-axelo-dark">
            {philosophy.title}
          </h2>
          <p class="text-sm sm:text-base text-axelo-muted leading-relaxed">
            {philosophy.summary}
          </p>
          {#each philosophy.paragraphs as p}
            <p class="text-sm text-axelo-muted leading-relaxed">{p}</p>
          {/each}
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {#each highlights.items as item, idx}
            <div class="p-6 rounded-2xl bg-axelo-offwhite border border-axelo-border space-y-2.5">
              <span class="font-mono text-xs text-axelo-blue font-semibold">{item.eyebrow || `0${idx + 1}`}</span>
              <h3 class="text-base font-bold text-axelo-dark">{item.title}</h3>
              <p class="text-sm text-axelo-muted leading-relaxed">{item.description}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Closing Link to Catalogue -->
    <div class="p-8 sm:p-12 rounded-3xl bg-axelo-dark text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-2 max-w-xl">
        <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-axelo-cyan">
          Explore the Lineup
        </span>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
          Discover AXELO Accessories
        </h2>
        <p class="text-sm text-white/70">
          Browse our published collection of desk and technology accessories.
        </p>
      </div>
      <a
        href="/products"
        class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-axelo-blue text-axelo-dark hover:text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 self-start md:self-auto"
      >
        <span>Explore Products</span>
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>
  </div>
</section>
