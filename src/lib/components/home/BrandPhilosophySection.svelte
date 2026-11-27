<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import FallbackImage from '$lib/components/common/FallbackImage.svelte';
  import { reveal } from '$lib/animations/reveal';
  import type { PhilosophyContent, ProductView } from '$lib/types/website';

  export let philosophy: PhilosophyContent;
  export let fallbackProduct: ProductView | null = null;

  $: mediaUrl = philosophy.imageUrl || fallbackProduct?.images[1]?.url || fallbackProduct?.primaryImage?.url || null;
  $: mediaAlt = philosophy.imageUrl
    ? (philosophy.imageAlt || philosophy.title)
    : (fallbackProduct?.name || 'AXELO craft and materials');
</script>

<section class="py-24 sm:py-32 bg-axelo-offwhite border-b border-axelo-border">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div class="lg:col-span-6 space-y-6" use:reveal>
        {#if philosophy.eyebrow}
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
            <span class="eyebrow-text font-mono text-axelo-blue">{philosophy.eyebrow}</span>
          </div>
        {/if}

        <h2 class="editorial-title text-3xl sm:text-5xl font-extrabold text-axelo-dark">
          {philosophy.title}
        </h2>

        <p class="text-base sm:text-lg text-axelo-graphite leading-relaxed">
          {philosophy.summary}
        </p>

        {#each philosophy.paragraphs as paragraph}
          <p class="text-sm sm:text-base text-axelo-muted leading-relaxed">
            {paragraph}
          </p>
        {/each}

        <div class="pt-2">
          <a
            href="/about"
            class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-axelo-dark hover:text-axelo-blue transition-colors group"
          >
            <span>Discover AXELO</span>
            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div class="lg:col-span-6" use:reveal={{ delay: 120 }}>
        <div class="rounded-3xl bg-white p-3 border border-axelo-border shadow-elevated">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-axelo-neutral">
            <FallbackImage
              src={mediaUrl}
              alt={mediaAlt}
              className="w-full h-full object-cover"
              fallbackLabel="AXELO"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
