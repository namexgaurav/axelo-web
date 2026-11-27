<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight } from 'lucide-svelte';
  import gsap from 'gsap';
  import FallbackImage from '$lib/components/common/FallbackImage.svelte';
  import type { HeroContent, ProductView } from '$lib/types/website';

  export let hero: HeroContent;
  export let featuredProducts: ProductView[] = [];

  let heroRoot: HTMLElement;

  // Use DB site_media hero image if available, otherwise lead featured product image from DB
  $: visualUrl = hero.imageUrl || featuredProducts[0]?.primaryImage?.url || null;
  $: visualAlt = hero.imageUrl
    ? (hero.imageAlt || hero.headline)
    : (featuredProducts[0]?.primaryImage?.alt || featuredProducts[0]?.name || 'AXELO Hardware');
  $: spotlightProduct = featuredProducts[0] || null;

  onMount(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroRoot) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-stagger]', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });

      gsap.from('[data-hero-visual]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        delay: 0.18,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }, heroRoot);

    return () => ctx.revert();
  });
</script>

<section
  bind:this={heroRoot}
  class="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white border-b border-axelo-border overflow-hidden"
>
  <!-- Subtle Futuristic Ambient Geometry -->
  <div class="absolute inset-0 axelo-grid-bg opacity-45 pointer-events-none"></div>
  <div
    class="absolute -top-32 right-[-10%] w-[520px] h-[520px] rounded-full bg-axelo-blue/[0.06] blur-[120px] pointer-events-none"
  ></div>
  <div
    class="absolute bottom-[-20%] left-[-8%] w-[400px] h-[400px] rounded-full bg-axelo-surface blur-[100px] pointer-events-none"
  ></div>

  <div class="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
      <!-- Left Editorial Copy -->
      <div class="lg:col-span-6 space-y-7">
        {#if hero.eyebrow}
          <div data-hero-stagger class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-axelo-neutral border border-axelo-border">
            <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
            <span class="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-axelo-dark">
              {hero.eyebrow}
            </span>
          </div>
        {/if}

        <h1
          data-hero-stagger
          class="editorial-title text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-axelo-dark"
        >
          {hero.headline}
        </h1>

        <p
          data-hero-stagger
          class="text-base sm:text-lg text-axelo-muted max-w-xl leading-relaxed"
        >
          {hero.supportingText}
        </p>

        <div data-hero-stagger class="flex flex-wrap items-center gap-4 pt-1">
          <a
            href={hero.primaryCtaHref}
            class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-axelo-dark hover:bg-axelo-blue text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-subtle group"
          >
            <span>{hero.primaryCtaLabel}</span>
            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {#if hero.secondaryCtaLabel && hero.secondaryCtaHref}
            <a
              href={hero.secondaryCtaHref}
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-axelo-border hover:border-axelo-dark bg-white text-xs sm:text-sm font-semibold text-axelo-dark transition-colors"
            >
              <span>{hero.secondaryCtaLabel}</span>
            </a>
          {/if}
        </div>
      </div>

      <!-- Right Visual Stage -->
      <div data-hero-visual class="lg:col-span-6">
        <div class="relative rounded-3xl bg-axelo-offwhite border border-axelo-border p-3 sm:p-4 shadow-product">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-axelo-neutral relative">
            <FallbackImage
              src={visualUrl}
              alt={visualAlt}
              className="w-full h-full object-cover"
              loading="eager"
              fallbackLabel="AXELO"
            />
          </div>

          {#if spotlightProduct}
            <a
              href="/products/{spotlightProduct.slug}"
              class="mt-3 sm:mt-4 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-white border border-axelo-border hover:border-axelo-dark transition-colors group"
            >
              <div class="min-w-0">
                <span class="block font-mono text-[10px] uppercase tracking-[0.16em] text-axelo-blue font-semibold">
                  {spotlightProduct.categoryName || 'Featured Hardware'}
                </span>
                <span class="block text-sm font-semibold text-axelo-dark truncate">
                  {spotlightProduct.name}
                </span>
              </div>
              <span class="inline-flex items-center gap-1 text-xs font-semibold text-axelo-dark group-hover:text-axelo-blue shrink-0">
                <span>View</span>
                <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
