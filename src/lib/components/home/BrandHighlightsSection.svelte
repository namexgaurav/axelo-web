<script lang="ts">
  import { reveal } from '$lib/animations/reveal';
  import type { HighlightsSectionContent } from '$lib/types/website';

  export let highlights: HighlightsSectionContent;
</script>

<section class="py-24 sm:py-32 bg-white border-b border-axelo-border">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="max-w-2xl space-y-3 mb-16" use:reveal>
      {#if highlights.eyebrow}
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
          <span class="eyebrow-text font-mono text-axelo-blue">{highlights.eyebrow}</span>
        </div>
      {/if}
      <h2 class="editorial-title text-3xl sm:text-5xl font-extrabold text-axelo-dark">
        {highlights.title}
      </h2>
      {#if highlights.subtitle}
        <p class="text-sm sm:text-base text-axelo-muted leading-relaxed">
          {highlights.subtitle}
        </p>
      {/if}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {#each highlights.items as item, idx}
        <div
          use:reveal={{ delay: idx * 70 }}
          class="pt-7 pb-6 border-t-2 border-axelo-border hover:border-axelo-dark transition-colors duration-300 flex flex-col justify-between gap-6"
        >
          <div class="space-y-3">
            <span class="font-mono text-xs font-semibold text-axelo-blue tracking-wider block">
              {item.eyebrow || `0${idx + 1}`}
            </span>
            <h3 class="text-lg font-bold tracking-tight text-axelo-dark">
              {item.title}
            </h3>
            <p class="text-sm text-axelo-muted leading-relaxed">
              {item.description}
            </p>
          </div>
          <div class="h-px w-full axelo-hairline-gradient opacity-50"></div>
        </div>
      {/each}
    </div>
  </div>
</section>
