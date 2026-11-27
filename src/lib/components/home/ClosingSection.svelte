<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import { reveal } from '$lib/animations/reveal';
  import type { ClosingSectionContent } from '$lib/types/website';

  export let closing: ClosingSectionContent;
</script>

<section class="py-24 sm:py-32 bg-axelo-obsidian text-white relative overflow-hidden">
  <!-- Restrained futuristic orbital lines & cool blue glow -->
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
    <div class="w-[540px] h-[540px] rounded-full border border-white/15"></div>
    <div class="w-[840px] h-[840px] rounded-full border border-white/10 absolute"></div>
  </div>
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[220px] bg-axelo-blue/20 blur-[120px] pointer-events-none"></div>

  <div class="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10 space-y-8" use:reveal>
    {#if closing.eyebrow}
      <span class="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-axelo-cyan font-semibold">
        {closing.eyebrow}
      </span>
    {/if}

    <h2 class="editorial-title text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white">
      {closing.title}
    </h2>

    <p class="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
      {closing.description}
    </p>

    <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
      <a
        href={closing.primaryCtaHref}
        class="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-axelo-blue text-axelo-dark hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 group"
      >
        <span>{closing.primaryCtaLabel}</span>
        <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>

      {#if closing.secondaryCtaLabel && closing.secondaryCtaHref}
        <a
          href={closing.secondaryCtaHref}
          class="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/20 hover:border-white/50 text-white text-xs sm:text-sm font-semibold transition-colors"
        >
          <span>{closing.secondaryCtaLabel}</span>
        </a>
      {/if}
    </div>
  </div>
</section>
