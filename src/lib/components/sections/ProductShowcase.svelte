<script lang="ts">
  import { ArrowRight, Layers, ShieldCheck, Sparkles, Check, Droplets, VolumeX } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';
  import { reveal } from '../../animations/reveal';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';

  const studioMat = products.find(p => p.id === 'studio-desk-mat-pro')!;
  let activeSide: 'felt' | 'leather' = 'felt';
  let selectedColorIdx = 0;
  let added = false;

  $: supabase = page.data.supabase;

  function handleAddToCart() {
    const color = studioMat.colors[selectedColorIdx]?.name || 'Onyx Black';
    cart.addItem(studioMat, color, supabase, $user?.id);
    added = true;
    setTimeout(() => (added = false), 1500);
  }

  const surfaceMetrics = {
    felt: [
      { label: 'Surface Friction', value: 'High Control (0.35 μ)', desc: 'Precise mouse stopping power' },
      { label: 'Acoustic Absorption', value: '-14 dB Resonance', desc: 'Silences desk bounce and keystrokes' },
      { label: 'Thermal Touch', value: 'Warm Merino Fibers', desc: 'Soft wrist insulation for long sessions' },
      { label: 'Cable Docking', value: 'Magnetic Neodymium Channel', desc: 'Embedded zero-drag cable route' }
    ],
    leather: [
      { label: 'Surface Friction', value: 'Low Resistance (0.18 μ)', desc: 'Effortless fluid tracking speed' },
      { label: 'Fluid Resistance', value: '100% Hydrophobic Shield', desc: 'Instant wipe-clean spill barrier' },
      { label: 'Texture Grade', value: 'Pebbled Micro-Grain', desc: 'Wear-resistant vegan leather' },
      { label: 'Sensor Calibration', value: 'Tested to 26,000 DPI', desc: 'Sub-millimeter optical precision' }
    ]
  };
</script>

<section id="showcase" class="py-28 md:py-40 bg-[#F7F7F5] border-y border-axelo-border/70 relative">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Header Block with Generous Editorial Whitespace -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-8" use:reveal={{ duration: 700 }}>
      <div class="max-w-2xl">
        <div class="flex items-center gap-2 mb-3.5">
          <span class="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-axelo-blue">
            DESK ESSENTIALS // 02
          </span>
          <span class="w-1.5 h-1.5 rounded-full bg-axelo-dark"></span>
          <span class="text-[11px] font-mono text-axelo-muted uppercase tracking-wider">FLAGSHIP FOUNDATION</span>
        </div>
        <h2 class="editorial-title text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.04em] text-axelo-dark">
          The Foundation of <br />
          Your Setup.
        </h2>
      </div>

      <div class="max-w-md">
        <p class="text-sm sm:text-base text-axelo-muted leading-relaxed mb-6">
          Designed to bring comfort, acoustic clarity, and architectural character to the space where your best work happens.
        </p>

        <!-- Interactive Surface Switcher Toggle -->
        <div class="inline-flex p-1 bg-white rounded-xl border border-axelo-border text-xs shadow-2xs">
          <button
            type="button"
            on:click={() => (activeSide = 'felt')}
            class="px-4 py-2 rounded-lg font-medium transition-all {activeSide === 'felt'
              ? 'bg-axelo-dark text-white shadow-xs'
              : 'text-axelo-muted hover:text-axelo-dark'}"
          >
            Acoustic Merino Felt
          </button>
          <button
            type="button"
            on:click={() => (activeSide = 'leather')}
            class="px-4 py-2 rounded-lg font-medium transition-all {activeSide === 'leather'
              ? 'bg-axelo-dark text-white shadow-xs'
              : 'text-axelo-muted hover:text-axelo-dark'}"
          >
            Vegan Micro-Grain Leather
          </button>
        </div>
      </div>
    </div>

    <!-- Monumental Landscape Product Visual with Inset Glass Callout -->
    <div
      class="relative rounded-3xl overflow-hidden bg-white border border-axelo-border/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] mb-12 group"
      use:reveal={{ delay: 120, duration: 800 }}
    >
      <div class="aspect-[16/9] md:aspect-[21/9] w-full relative overflow-hidden">
        <img
          src={activeSide === 'felt'
            ? studioMat.primaryImage
            : studioMat.secondaryImage}
          alt="AXELO Studio Desk Mat Pro in high resolution"
          class="w-full h-full object-cover img-zoom-hover transition-all duration-700"
        />

        <!-- Subtle Gradient Bottom Shade -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

        <!-- In-Image Specs Floating Glass Callout -->
        <div class="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md glass-panel p-6 rounded-2xl shadow-elevated border border-white/80">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-axelo-dark uppercase tracking-wider">
              Studio Desk Mat Pro
            </span>
            <div class="flex items-baseline gap-2">
              <span class="text-sm font-mono font-bold text-axelo-blue">$68</span>
              <span class="text-xs font-mono text-axelo-muted line-through">$84</span>
            </div>
          </div>

          <p class="text-xs text-axelo-muted leading-relaxed mb-4">
            {activeSide === 'felt'
              ? 'Dense 4mm wool felt dampens keystroke resonance while providing soft, warm forearm support.'
              : 'Pebbled microfiber leather provides water-resistant protection and effortless mouse travel.'}
          </p>

          <!-- Color Swatches inside card -->
          <div class="flex items-center justify-between mb-4 pt-3 border-t border-axelo-border/60">
            <span class="text-[11px] font-mono text-axelo-muted">
              Finish: <strong class="text-axelo-dark">{studioMat.colors[selectedColorIdx].name}</strong>
            </span>
            <div class="flex items-center gap-1.5">
              {#each studioMat.colors as color, i}
                <button
                  type="button"
                  on:click={() => (selectedColorIdx = i)}
                  class="w-4 h-4 rounded-full border transition-all {selectedColorIdx === i ? 'border-axelo-dark scale-110 shadow-2xs' : 'border-axelo-border/70 hover:scale-105'}"
                  title={color.name}
                >
                  <span class="w-full h-full rounded-full block" style="background-color: {color.hex};"></span>
                </button>
              {/each}
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              on:click={handleAddToCart}
              class="flex-1 py-3 bg-axelo-dark hover:bg-axelo-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-subtle"
            >
              {#if added}
                <Check class="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              {:else}
                <span>Add to Bag — $68</span>
                <ArrowRight class="w-3.5 h-3.5" />
              {/if}
            </button>
            <button
              type="button"
              on:click={() => quickViewProduct.set(studioMat)}
              class="px-4 py-3 border border-axelo-border hover:border-axelo-dark rounded-lg text-xs font-medium text-axelo-dark bg-white transition-colors"
            >
              Specs
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Engineering Specs Grid below image -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {#each surfaceMetrics[activeSide] as metric}
        <div class="p-5 rounded-2xl bg-white border border-axelo-border/70 shadow-xs hover:border-axelo-dark transition-colors group">
          <span class="text-[10px] font-mono uppercase tracking-[0.14em] text-axelo-blue block mb-1.5 font-bold">
            {metric.label}
          </span>
          <span class="text-sm sm:text-base font-bold text-axelo-dark block mb-1">
            {metric.value}
          </span>
          <span class="text-xs text-axelo-muted block leading-relaxed">
            {metric.desc}
          </span>
        </div>
      {/each}
    </div>
  </div>
</section>
