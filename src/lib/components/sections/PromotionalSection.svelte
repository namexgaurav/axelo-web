<script lang="ts">
  import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';
  import { reveal } from '../../animations/reveal';

  const keyboard = products.find(p => p.id === 'apex-75-keyboard')!;
</script>

<section class="py-24 md:py-32 bg-[#080E1E] text-white relative overflow-hidden">
  <!-- Radiant Ambient Glow -->
  <div class="absolute -top-32 -right-32 w-[600px] h-[600px] bg-axelo-blue/30 rounded-full blur-[140px] pointer-events-none"></div>
  <div class="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <!-- Left Content (Span 6 cols) -->
      <div class="lg:col-span-6 space-y-6" use:reveal={{ duration: 700 }}>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-[0.16em] text-blue-200">
          <Sparkles class="w-3.5 h-3.5 text-blue-400" />
          <span>EDITORIAL TURNING POINT // 09</span>
        </div>

        <h2 class="editorial-title text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
          Make Your <br />
          Setup <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">Your Own.</span>
        </h2>

        <p class="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
          Discover essentials that bring your workspace together. Every detail tuned for acoustic purity, frictionless motion, and timeless industrial form.
        </p>

        <!-- Feature List -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
          <div class="flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Aircraft-grade 6063 Aluminum</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>True 4000Hz Sub-1ms Wireless</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Merino Wool Acoustic Dampening</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>Universal Magnetic Docking</span>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="pt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            on:click={() => cart.addItem(keyboard)}
            class="px-7 py-3.5 bg-axelo-blue hover:bg-blue-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-300 shadow-elevated flex items-center gap-2 group"
          >
            <span>Claim Apex 75 Bundle ($189)</span>
            <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#products"
            class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
          >
            View All Series →
          </a>
        </div>
      </div>

      <!-- Right Visual Feature (Span 6 cols) -->
      <div class="lg:col-span-6 relative" use:reveal={{ delay: 150, duration: 800 }}>
        <div class="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md shadow-2xl p-4 sm:p-6 group">
          <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 relative">
            <img
              src="https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1200&q=85"
              alt="AXELO Apex Series Hardware Close-up"
              class="w-full h-full object-cover img-zoom-hover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span class="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">EDITION SPEC</span>
                <span class="text-sm font-bold text-white">Apex 75 Acoustic Edition</span>
              </div>
              <span class="text-xs font-mono font-semibold px-2.5 py-1 bg-white/10 rounded border border-white/20 text-white">
                Limited Batch
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
