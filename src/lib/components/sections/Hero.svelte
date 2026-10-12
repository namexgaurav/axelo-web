<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, ChevronDown, Sparkles, SlidersHorizontal, Check } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';

  let isLoaded = false;

  onMount(() => {
    const timer = setTimeout(() => {
      isLoaded = true;
    }, 100);
    return () => clearTimeout(timer);
  });

  const flagshipMat = products.find(p => p.id === 'studio-desk-mat-pro')!;
  const apexKeyboard = products.find(p => p.id === 'apex-75-keyboard')!;
  const precisionMouse = products.find(p => p.id === 'contour-wireless-mouse')!;
</script>

<section class="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FFFFFF] overflow-hidden flex flex-col justify-between">
  <!-- Subtle Ambient Glow in background -->
  <div class="absolute -top-36 right-0 w-[550px] h-[550px] bg-axelo-blue/5 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute top-1/2 left-0 w-[400px] h-[400px] bg-axelo-neutral rounded-full blur-2xl pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
    <!-- Top Editorial Header & Manifesto -->
    <div class="max-w-3xl mb-12 md:mb-16">
      <!-- Eyebrow label -->
      <div
        class="inline-flex items-center gap-2 mb-4 transition-all duration-700 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'}"
      >
        <span class="w-2 h-2 rounded-full bg-axelo-blue animate-pulse"></span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-axelo-dark/80">
          DESIGNED FOR YOUR EVERYDAY
        </span>
        <span class="text-axelo-border">•</span>
        <span class="text-[11px] font-mono text-axelo-muted">
          AXELO REVISION 2.0
        </span>
      </div>

      <!-- Large Editorial Headline -->
      <h1
        class="editorial-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-axelo-dark mb-6 transition-all duration-800 delay-100 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'}"
      >
        Your Space. <br class="hidden sm:block" />
        Your <span class="relative inline-block text-axelo-dark">
          Standard.
          <span class="absolute -bottom-1 left-0 right-0 h-1 bg-axelo-blue rounded-full"></span>
        </span>
      </h1>

      <!-- Supporting Statement -->
      <p
        class="text-base sm:text-lg text-axelo-muted max-w-xl leading-relaxed mb-8 transition-all duration-800 delay-200 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'}"
      >
        Thoughtfully designed essentials for better workspaces, focused minds, and modern setups. Built to quiet physical clutter and amplify creative flow.
      </p>

      <!-- Coordinated CTA Buttons -->
      <div
        class="flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'}"
      >
        <a
          href="#products"
          class="px-7 py-3.5 bg-axelo-dark hover:bg-axelo-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-elevated flex items-center gap-2.5 group"
        >
          <span>Explore the Collection</span>
          <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="#philosophy"
          class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-axelo-dark hover:text-axelo-blue transition-colors flex items-center gap-2"
        >
          <span>Discover AXELO</span>
          <span class="text-axelo-blue font-mono">→</span>
        </a>
      </div>
    </div>

    <!-- Expansive Art-Directed Product Composition -->
    <div
      class="relative w-full transition-all duration-1000 delay-300 {isLoaded
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-12'}"
    >
      <!-- Main Visual Container -->
      <div class="relative bg-axelo-neutral rounded-2xl p-4 sm:p-8 md:p-12 border border-axelo-border/70 shadow-elevated overflow-hidden group">
        <!-- Background subtle blueprint grid pattern -->
        <div
          class="absolute inset-0 opacity-[0.03] pointer-events-none"
          style="background-image: radial-gradient(#111 1px, transparent 1px); background-size: 24px 24px;"
        ></div>

        <!-- Overlapping Product Trio / Composition -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <!-- Primary Anchor: High-Resolution Desk Mat & Setup Display -->
          <div class="lg:col-span-8 relative">
            <div class="relative rounded-xl overflow-hidden shadow-product bg-white aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1600&q=85"
                alt="AXELO Studio Setup with Desk Mat and Apex 75 Keyboard"
                class="w-full h-full object-cover img-zoom-hover"
                loading="eager"
              />

              <!-- Overlay Tag on main photo -->
              <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-axelo-border/80 shadow-xs flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <div>
                  <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-muted block">Anchor Layer</span>
                  <span class="text-xs font-bold text-axelo-dark">Studio Desk Mat Pro</span>
                </div>
                <button
                  type="button"
                  on:click={() => quickViewProduct.set(flagshipMat)}
                  class="ml-2 text-xs font-semibold text-axelo-blue hover:underline"
                >
                  Inspect
                </button>
              </div>
            </div>

            <!-- Floating Badge Card 1 (Top Left Overlap) -->
            <div class="hidden sm:flex absolute -top-5 -left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-axelo-border shadow-elevated items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform">
              <div class="w-8 h-8 rounded-lg bg-axelo-blueLight flex items-center justify-center text-axelo-blue">
                <Sparkles class="w-4 h-4" />
              </div>
              <div>
                <span class="text-[10px] font-mono text-axelo-muted uppercase tracking-wider block">Material Grade</span>
                <span class="text-xs font-bold text-axelo-dark">Merino Felt & Vegan Grain</span>
              </div>
            </div>

            <!-- Floating Badge Card 2 (Bottom Right Overlap) -->
            <div class="hidden sm:flex absolute -bottom-5 right-8 bg-axelo-dark text-white px-4 py-2.5 rounded-xl shadow-product items-center gap-3 transform rotate-1 hover:rotate-0 transition-transform">
              <div class="w-2 h-2 rounded-full bg-axelo-blue"></div>
              <div class="text-left">
                <span class="text-[10px] font-mono text-white/60 uppercase tracking-wider block">Zero Interference</span>
                <span class="text-xs font-bold text-white">Magnetic Cable Anchor System</span>
              </div>
            </div>
          </div>

          <!-- Secondary Side Composition: Coordinated Peripherals Stack -->
          <div class="lg:col-span-4 flex flex-col gap-5">
            <!-- Keyboard Card -->
            <div
              class="bg-white rounded-xl p-4 sm:p-5 border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all cursor-pointer group/card"
              on:click={() => quickViewProduct.set(apexKeyboard)}
              role="button"
              tabindex="0"
              on:keydown={(e) => e.key === 'Enter' && quickViewProduct.set(apexKeyboard)}
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-axelo-blue">
                  Acoustic Architecture
                </span>
                <span class="text-xs font-mono font-bold text-axelo-dark">$189</span>
              </div>
              <div class="aspect-[16/9] rounded-lg overflow-hidden bg-axelo-neutral mb-3">
                <img
                  src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
                  alt="AXELO Apex 75"
                  class="w-full h-full object-cover img-zoom-hover"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-axelo-dark group-hover/card:text-axelo-blue transition-colors">
                    Apex 75 Keyboard
                  </h4>
                  <p class="text-[11px] text-axelo-muted">Gasket-mount 6063 Aluminum</p>
                </div>
                <span class="text-[11px] font-semibold text-axelo-dark group-hover/card:translate-x-0.5 transition-transform">
                  View →
                </span>
              </div>
            </div>

            <!-- Precision Mouse Card -->
            <div
              class="bg-white rounded-xl p-4 sm:p-5 border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all cursor-pointer group/card"
              on:click={() => quickViewProduct.set(precisionMouse)}
              role="button"
              tabindex="0"
              on:keydown={(e) => e.key === 'Enter' && quickViewProduct.set(precisionMouse)}
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-axelo-muted">
                  Ultralight 58g
                </span>
                <span class="text-xs font-mono font-bold text-axelo-dark">$89</span>
              </div>
              <div class="aspect-[16/9] rounded-lg overflow-hidden bg-axelo-neutral mb-3">
                <img
                  src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
                  alt="AXELO Contour Precision Mouse"
                  class="w-full h-full object-cover img-zoom-hover"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-axelo-dark group-hover/card:text-axelo-blue transition-colors">
                    Contour Wireless Mouse
                  </h4>
                  <p class="text-[11px] text-axelo-muted">4000Hz polling • PAW3395</p>
                </div>
                <span class="text-[11px] font-semibold text-axelo-dark group-hover/card:translate-x-0.5 transition-transform">
                  View →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Scroll Cue -->
  <div class="max-w-7xl mx-auto px-5 sm:px-8 w-full pt-8 flex items-center justify-between text-xs text-axelo-muted border-t border-axelo-border/40 mt-12">
    <div class="flex items-center gap-4 font-mono text-[11px]">
      <span class="text-axelo-dark font-medium">01 // INTRODUCTION</span>
      <span>•</span>
      <span>ENGINEERED FOR DEEP WORK</span>
    </div>
    <a href="#showcase" class="flex items-center gap-1.5 hover:text-axelo-dark transition-colors">
      <span>Scroll to Explore</span>
      <ChevronDown class="w-3.5 h-3.5 animate-bounce" />
    </a>
  </div>
</section>
