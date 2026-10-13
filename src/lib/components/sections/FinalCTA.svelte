<script lang="ts">
  import { ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';
</script>

<section class="py-36 md:py-48 bg-[#F7F7F5] border-t border-axelo-border/70 relative overflow-hidden text-center">
  <!-- Subtle circular geometry -->
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
    <div class="w-[700px] h-[700px] rounded-full border border-axelo-border"></div>
    <div class="w-[1000px] h-[1000px] rounded-full border border-axelo-border/60 absolute"></div>
  </div>

  <div class="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 space-y-10" use:reveal={{ duration: 700 }}>
    <!-- Brand Seal -->
    <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-axelo-dark text-white mx-auto shadow-elevated transition-transform hover:scale-105 duration-300">
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polygon points="12 2 2 22 8.5 22 12 13 15.5 22 22 22 12 2" fill="white" stroke="none" />
        <circle cx="12" cy="7" r="1.5" fill="#0052FF" />
      </svg>
    </div>

    <!-- Monumental Tagline Headline -->
    <div>
      <span class="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-axelo-blue block mb-4">
        THE AXELO INVITATION // 11
      </span>
      <h2 class="editorial-title text-4xl sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-[-0.04em] text-axelo-dark leading-[0.98]">
        Define Your Own Power.
      </h2>
      <p class="text-base sm:text-lg text-axelo-muted max-w-xl mx-auto mt-5 leading-relaxed">
        Find the details that make your workspace yours. Precision desk mats, tactile keyboards, and acoustic tools crafted for deep focus.
      </p>
    </div>

    <!-- Action Buttons with Smooth Interactions -->
    <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
      <a
        href="#products"
        class="px-9 py-4 bg-axelo-dark hover:bg-axelo-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-elevated flex items-center gap-2.5 group"
      >
        <span>Explore AXELO Gear</span>
        <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </a>
      <a
        href="#philosophy"
        class="px-7 py-4 bg-white hover:bg-axelo-neutral text-axelo-dark border border-axelo-border rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
      >
        Read the Manifesto
      </a>
    </div>

    <!-- Guarantees Row with Refined Alignment -->
    <div class="pt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-xs text-axelo-muted font-mono">
      <div class="flex items-center gap-2.5">
        <Truck class="w-4 h-4 text-axelo-dark" />
        <span>Free Express Freight &gt; $100</span>
      </div>
      <div class="flex items-center gap-2.5">
        <RefreshCw class="w-4 h-4 text-axelo-dark" />
        <span>30-Day Setup Trial</span>
      </div>
      <div class="flex items-center gap-2.5">
        <ShieldCheck class="w-4 h-4 text-axelo-dark" />
        <span>2-Year Studio Hardware Guarantee</span>
      </div>
    </div>
  </div>
</section>
