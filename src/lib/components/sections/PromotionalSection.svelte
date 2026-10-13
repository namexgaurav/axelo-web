<script lang="ts">
  import { ArrowRight, Sparkles, CheckCircle2, Check } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';
  import { reveal } from '../../animations/reveal';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';

  const keyboard = products.find(p => p.id === 'apex-75-keyboard')!;
  let added = false;

  $: supabase = page.data.supabase;

  function handleClaimBundle() {
    cart.addItem(keyboard, 'Matte Charcoal', supabase, $user?.id);
    added = true;
    setTimeout(() => (added = false), 1500);
  }
</script>

<section class="py-32 md:py-44 bg-[#090C15] text-white relative overflow-hidden border-y border-white/10">
  <!-- Restrained Technology Horizon Glow -->
  <div class="absolute -top-32 -right-32 w-[650px] h-[650px] bg-axelo-blue/20 rounded-full blur-[160px] pointer-events-none"></div>
  <div class="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-900/15 rounded-full blur-[140px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <!-- Left Content (Span 6 cols) -->
      <div class="lg:col-span-6 space-y-7" use:reveal={{ duration: 700 }}>
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300">
          <Sparkles class="w-3.5 h-3.5 text-blue-400" />
          <span>EDITORIAL TURNING POINT // 09</span>
        </div>

        <h2 class="editorial-title text-4xl sm:text-6xl lg:text-[4.75rem] font-extrabold tracking-[-0.04em] text-white leading-[0.98]">
          Make Your <br />
          Setup <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-100">Your Own.</span>
        </h2>

        <p class="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
          Discover essentials that bring your workspace together. Every detail tuned for acoustic purity, frictionless motion, and timeless industrial form.
        </p>

        <!-- Feature List with Refined Hairline Icons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs text-slate-300 font-medium">
          <div class="flex items-center gap-2.5">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Aircraft-grade 6063 Aluminum</span>
          </div>
          <div class="flex items-center gap-2.5">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>True 4000Hz Sub-1ms Wireless</span>
          </div>
          <div class="flex items-center gap-2.5">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Merino Wool Acoustic Dampening</span>
          </div>
          <div class="flex items-center gap-2.5">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Universal Magnetic Docking</span>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="pt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            on:click={handleClaimBundle}
            class="px-8 py-4 bg-axelo-blue hover:bg-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-elevated flex items-center gap-2.5 group"
          >
            {#if added}
              <Check class="w-4 h-4 text-emerald-300" />
              <span>Added Apex 75 to Bag</span>
            {:else}
              <span>Claim Apex 75 Bundle ($189)</span>
              <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            {/if}
          </button>
          <a
            href="#products"
            class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            View All Hardware →
          </a>
        </div>
      </div>

      <!-- Right Visual Feature (Span 6 cols) -->
      <div class="lg:col-span-6 relative" use:reveal={{ delay: 150, duration: 800 }}>
        <div class="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl p-4 sm:p-7 group">
          <div class="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 relative border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1400&q=85"
              alt="AXELO Apex Series Hardware Close-up"
              class="w-full h-full object-cover img-zoom-hover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none"></div>
            <div class="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span class="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">EDITION SPEC</span>
                <span class="text-base font-bold text-white">Apex 75 Acoustic Studio Edition</span>
              </div>
              <span class="text-xs font-mono font-semibold px-3 py-1.5 bg-white/10 rounded-lg border border-white/20 text-white">
                Limited Batch
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
