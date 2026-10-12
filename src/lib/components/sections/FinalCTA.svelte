<script lang="ts">
  import { ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';
</script>

<section class="py-28 md:py-40 bg-[#F7F7F5] border-t border-axelo-border/70 relative overflow-hidden text-center">
  <!-- Subtle circular geometry -->
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
    <div class="w-[600px] h-[600px] rounded-full border border-axelo-border/80"></div>
    <div class="w-[900px] h-[900px] rounded-full border border-axelo-border/50 absolute"></div>
  </div>

  <div class="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 space-y-8" use:reveal={{ duration: 700 }}>
    <!-- Brand Seal -->
    <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-axelo-dark text-white mx-auto shadow-elevated">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polygon points="12 2 2 22 8.5 22 12 13 15.5 22 22 22 12 2" fill="white" stroke="none" />
        <circle cx="12" cy="7" r="1.5" fill="#0052FF" />
      </svg>
    </div>

    <!-- Monumental Tagline Headline -->
    <div>
      <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-blue block mb-4">
        THE AXELO INVITATION // 11
      </span>
      <h2 class="editorial-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-axelo-dark">
        Define Your Own Power.
      </h2>
      <p class="text-base sm:text-lg text-axelo-muted max-w-xl mx-auto mt-4 leading-relaxed">
        Find the details that make your workspace yours. Precision desk mats, tactile keyboards, and acoustic tools crafted for deep focus.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
      <a
        href="#products"
        class="px-8 py-4 bg-axelo-dark hover:bg-axelo-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-elevated flex items-center gap-2 group"
      >
        <span>Explore AXELO Gear</span>
        <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </a>
      <a
        href="#philosophy"
        class="px-6 py-4 bg-white hover:bg-axelo-neutral text-axelo-dark border border-axelo-border rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        Read the Manifesto
      </a>
    </div>

    <!-- Guarantees Row -->
    <div class="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-axelo-muted font-mono">
      <div class="flex items-center gap-2">
        <Truck class="w-4 h-4 text-axelo-dark" />
        <span>Free Global Freight > $100</span>
      </div>
      <div class="flex items-center gap-2">
        <RefreshCw class="w-4 h-4 text-axelo-dark" />
        <span>30-Day Setup Trial</span>
      </div>
      <div class="flex items-center gap-2">
        <ShieldCheck class="w-4 h-4 text-axelo-dark" />
        <span>2-Year Studio Hardware Guarantee</span>
      </div>
    </div>
  </div>
</section>
