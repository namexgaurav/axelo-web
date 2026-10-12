<script lang="ts">
  import { ArrowRight, Volume2, Sliders, Activity, Sparkles } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';
  import { reveal } from '../../animations/reveal';

  const keyboard = products.find(p => p.id === 'apex-75-keyboard')!;
  const dial = products.find(p => p.id === 'studio-numpad-dial')!;
</script>

<section class="py-24 md:py-36 bg-[#FFFFFF] overflow-hidden">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Eyebrow & Headline -->
    <div class="max-w-3xl mb-14 md:mb-20" use:reveal={{ duration: 700 }}>
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-axelo-blue">
          LAYERED COMPOSITION // 04
        </span>
        <span class="text-axelo-border">•</span>
        <span class="text-[11px] font-mono text-axelo-muted uppercase">HARDWARE SYSTEM</span>
      </div>
      <h2 class="editorial-title text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-axelo-dark">
        Tactile Acoustics. <br />
        Engineered Feedback.
      </h2>
      <p class="text-sm sm:text-base text-axelo-muted max-w-xl leading-relaxed mt-4">
        Every keypress produces a calibrated acoustic resonance. CNC-milled 6063 aluminum chassis paired with internal multi-layer Poron dampening sheets.
      </p>
    </div>

    <!-- Asymmetrical Layered Composition Container -->
    <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <!-- Dominant Main Product Image (Left 7 cols) -->
      <div class="lg:col-span-7 relative" use:reveal={{ delay: 100, duration: 800 }}>
        <div class="relative rounded-2xl overflow-hidden bg-axelo-neutral border border-axelo-border/80 shadow-product aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1400&q=85"
            alt="AXELO Apex 75 Anodized Aluminum Keyboard"
            class="w-full h-full object-cover img-zoom-hover"
          />

          <!-- Inset Spec Pill -->
          <div class="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-axelo-border shadow-xs flex items-center gap-2">
            <Volume2 class="w-3.5 h-3.5 text-axelo-blue" />
            <span class="text-[11px] font-mono font-semibold text-axelo-dark">Deep Thock Profile (42dB)</span>
          </div>
        </div>

        <!-- Floating Overlapping Badge 1: Hot-swap Plate -->
        <div class="hidden sm:flex absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-axelo-border shadow-elevated items-center gap-3 max-w-xs transform -rotate-1 hover:rotate-0 transition-transform">
          <div class="w-9 h-9 rounded-lg bg-axelo-neutral flex items-center justify-center text-axelo-dark font-mono text-xs font-bold border border-axelo-border">
            75%
          </div>
          <div>
            <h5 class="text-xs font-bold text-axelo-dark">Gasket Leaf Spring</h5>
            <p class="text-[10px] text-axelo-muted">Custom silicone gaskets decouple the switch plate from the case.</p>
          </div>
        </div>
      </div>

      <!-- Right Supporting Staggered Cards (Right 5 cols) -->
      <div class="lg:col-span-5 flex flex-col gap-6 lg:-ml-6 relative z-10" use:reveal={{ delay: 200, duration: 800 }}>
        <!-- Floating Supporting Card 1: Dial & Macropad -->
        <div
          class="bg-white rounded-2xl p-6 border border-axelo-border shadow-elevated hover:shadow-product transition-all cursor-pointer group"
          on:click={() => quickViewProduct.set(dial)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && quickViewProduct.set(dial)}
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-axelo-blue">
              Modular Companion
            </span>
            <span class="text-xs font-mono font-bold text-axelo-dark">$74</span>
          </div>

          <div class="aspect-[16/9] rounded-xl overflow-hidden bg-axelo-neutral mb-4 border border-axelo-border/60">
            <img
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
              alt="AXELO Macropad & Dial Studio"
              class="w-full h-full object-cover img-zoom-hover"
            />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-bold text-axelo-dark group-hover:text-axelo-blue transition-colors">
                Dial & Macropad Studio
              </h4>
              <p class="text-xs text-axelo-muted mt-0.5">CNC rotary encoder dial + 9 macro keys</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-axelo-neutral group-hover:bg-axelo-dark group-hover:text-white flex items-center justify-center text-axelo-dark transition-colors">
              <ArrowRight class="w-4 h-4" />
            </div>
          </div>
        </div>

        <!-- Technical Spec Pill Callout -->
        <div class="bg-axelo-neutral rounded-xl p-5 border border-axelo-border/70 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full bg-axelo-blue"></div>
            <div>
              <span class="text-xs font-bold text-axelo-dark block">Apex 75 Flagship Bundle</span>
              <span class="text-[11px] text-axelo-muted">Includes wireless dongle, coiled aviator cable & switch puller</span>
            </div>
          </div>
          <button
            type="button"
            on:click={() => cart.addItem(keyboard)}
            class="px-4 py-2 bg-axelo-dark hover:bg-axelo-blue text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Add $189
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
