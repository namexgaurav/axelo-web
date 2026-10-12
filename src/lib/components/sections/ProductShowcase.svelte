<script lang="ts">
  import { ArrowRight, Layers, ShieldCheck, Sparkles, MoveHorizontal } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';
  import { reveal } from '../../animations/reveal';

  const studioMat = products.find(p => p.id === 'studio-desk-mat-pro')!;
  let activeSide: 'felt' | 'leather' = 'felt';

  const specs = [
    { label: 'Footprint', value: '900 × 400 × 4 mm' },
    { label: 'Architecture', value: 'Dual-Layer Reversible' },
    { label: 'Glide Coefficient', value: '0.18 Optimized for Optical Sensors' },
    { label: 'Cable Management', value: 'Direct Magnetic Anchor Channel' }
  ];
</script>

<section id="showcase" class="py-24 md:py-36 bg-[#F7F7F5] border-y border-axelo-border/70 relative">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Header Block -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6" use:reveal={{ duration: 700 }}>
      <div class="max-w-2xl">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-axelo-blue">
            DESK ESSENTIALS // 02
          </span>
          <span class="w-1.5 h-1.5 rounded-full bg-axelo-dark"></span>
          <span class="text-[11px] font-mono text-axelo-muted uppercase">FLAGSHIP FOUNDATION</span>
        </div>
        <h2 class="editorial-title text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-axelo-dark">
          The Foundation of <br />
          Your Setup.
        </h2>
      </div>

      <div class="max-w-md">
        <p class="text-sm sm:text-base text-axelo-muted leading-relaxed mb-6">
          Designed to bring comfort, acoustic clarity, and architectural character to the space where your best work happens.
        </p>

        <!-- Toggle Surfaces -->
        <div class="inline-flex p-1 bg-white rounded-lg border border-axelo-border text-xs">
          <button
            type="button"
            on:click={() => (activeSide = 'felt')}
            class="px-3.5 py-1.5 rounded-md font-medium transition-all {activeSide === 'felt'
              ? 'bg-axelo-dark text-white shadow-xs'
              : 'text-axelo-muted hover:text-axelo-dark'}"
          >
            Acoustic Merino Felt
          </button>
          <button
            type="button"
            on:click={() => (activeSide = 'leather')}
            class="px-3.5 py-1.5 rounded-md font-medium transition-all {activeSide === 'leather'
              ? 'bg-axelo-dark text-white shadow-xs'
              : 'text-axelo-muted hover:text-axelo-dark'}"
          >
            Vegan Micro-Grain Leather
          </button>
        </div>
      </div>
    </div>

    <!-- Monumental Landscape Product Visual -->
    <div
      class="relative rounded-2xl overflow-hidden bg-white border border-axelo-border/80 shadow-product mb-12 group"
      use:reveal={{ delay: 120, duration: 800 }}
    >
      <div class="aspect-[16/9] md:aspect-[21/9] w-full relative overflow-hidden">
        <img
          src={activeSide === 'felt'
            ? 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=2000&q=85'
            : 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=2000&q=85'}
          alt="AXELO Studio Desk Mat Pro in high resolution"
          class="w-full h-full object-cover img-zoom-hover transition-all duration-700"
        />

        <!-- Subtle Gradient Bottom Shade -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

        <!-- In-Image Specs Floating Callout -->
        <div class="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md bg-white/95 backdrop-blur-md p-5 rounded-xl border border-axelo-border shadow-elevated">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-axelo-dark uppercase">
              AXELO Studio Desk Mat Pro
            </span>
            <span class="text-sm font-mono font-bold text-axelo-blue">$68</span>
          </div>
          <p class="text-xs text-axelo-muted leading-relaxed mb-4">
            {activeSide === 'felt'
              ? 'Dense 4mm wool felt dampens keystroke resonance while providing soft arm support.'
              : 'Pebbled microfiber leather provides water-resistant protection and effortless mouse travel.'}
          </p>
          <div class="flex items-center gap-3">
            <button
              type="button"
              on:click={() => cart.addItem(studioMat)}
              class="flex-1 py-2.5 bg-axelo-dark hover:bg-axelo-blue text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Add to Bag</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              on:click={() => quickViewProduct.set(studioMat)}
              class="px-3.5 py-2.5 border border-axelo-border hover:border-axelo-dark rounded-md text-xs font-medium text-axelo-dark transition-colors"
            >
              Specifications
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Metadata Grid below image -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {#each specs as spec}
        <div class="p-4 sm:p-5 rounded-xl bg-white border border-axelo-border/70 shadow-xs">
          <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-muted block mb-1">
            {spec.label}
          </span>
          <span class="text-xs sm:text-sm font-semibold text-axelo-dark block">
            {spec.value}
          </span>
        </div>
      {/each}
    </div>
  </div>
</section>
