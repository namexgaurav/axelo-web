<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowRight, ChevronDown, Sparkles, Check, Plus, Eye, Layers } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';

  let isLoaded = false;
  let activeHotspot: string | null = null;
  let selectedTheme = 'charcoal';

  $: supabase = page.data.supabase;

  onMount(() => {
    const timer = setTimeout(() => {
      isLoaded = true;
    }, 80);
    return () => clearTimeout(timer);
  });

  const flagshipMat = products.find(p => p.id === 'studio-desk-mat-pro')!;
  const apexKeyboard = products.find(p => p.id === 'apex-75-keyboard')!;
  const precisionMouse = products.find(p => p.id === 'contour-wireless-mouse')!;
  const cableAnchor = products.find(p => p.id === 'magnetic-cable-anchor-kit')!;

  const hotspots = [
    {
      id: 'mat',
      product: flagshipMat,
      top: '68%',
      left: '26%',
      label: 'Studio Desk Mat Pro',
      spec: 'Merino Felt & Vegan Grain',
      price: '$68'
    },
    {
      id: 'keyboard',
      product: apexKeyboard,
      top: '46%',
      left: '46%',
      label: 'Apex 75 Keyboard',
      spec: 'CNC 6063 Aluminum • Poron',
      price: '$189'
    },
    {
      id: 'mouse',
      product: precisionMouse,
      top: '58%',
      left: '74%',
      label: 'Contour Wireless Mouse',
      spec: '58g Ultralight • 4000Hz',
      price: '$89'
    }
  ];

  function handleAddHotspot(p: any, e: MouseEvent) {
    e.stopPropagation();
    cart.addItem(p, p.colors[0]?.name || 'Standard', supabase, $user?.id);
    activeHotspot = null;
  }
</script>

<section class="relative min-h-[96vh] pt-36 pb-20 md:pt-44 md:pb-28 bg-[#FFFFFF] overflow-hidden flex flex-col justify-between">
  <!-- Subtle Ambient Glow in background -->
  <div class="absolute -top-40 right-10 w-[600px] h-[600px] bg-axelo-blue/[0.04] rounded-full blur-[140px] pointer-events-none"></div>
  <div class="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-axelo-neutral rounded-full blur-[100px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
    <!-- Top Editorial Header & Manifesto with Generous Whitespace -->
    <div class="max-w-3xl mb-14 md:mb-20">
      <!-- Eyebrow label -->
      <div
        class="inline-flex items-center gap-2 mb-5 transition-all duration-700 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'}"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue animate-pulse"></span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-dark">
          DESIGNED FOR YOUR EVERYDAY
        </span>
        <span class="text-axelo-border">•</span>
        <span class="text-[11px] font-mono text-axelo-muted">
          AXELO REVISION 2.0
        </span>
      </div>

      <!-- Large Editorial Headline with Confident Negative Space -->
      <h1
        class="editorial-title text-4xl sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-[-0.04em] text-axelo-dark mb-6 leading-[0.98] transition-all duration-800 delay-100 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'}"
      >
        Your Space. <br class="hidden sm:block" />
        Your <span class="relative inline-block text-axelo-dark">
          Standard.
          <span class="absolute -bottom-1.5 left-0 right-0 h-1 bg-axelo-blue rounded-full"></span>
        </span>
      </h1>

      <!-- Supporting Statement -->
      <p
        class="text-base sm:text-lg text-axelo-muted max-w-xl leading-relaxed mb-9 transition-all duration-800 delay-200 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'}"
      >
        Thoughtfully designed essentials for better workspaces, focused minds, and modern setups. Built to quiet physical clutter and amplify creative flow.
      </p>

      <!-- Coordinated CTA Buttons with Refined Micro-Interactions -->
      <div
        class="flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 {isLoaded
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'}"
      >
        <a
          href="/collections"
          class="px-8 py-3.5 bg-axelo-dark hover:bg-axelo-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-elevated flex items-center gap-2.5 group"
        >
          <span>Explore the Collection</span>
          <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="/philosophy"
          class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-axelo-dark hover:text-axelo-blue transition-colors flex items-center gap-2"
        >
          <span>Discover AXELO</span>
          <span class="text-axelo-blue font-mono">→</span>
        </a>

        <!-- Interactive Hotspot Tutorial Hint -->
        <div class="hidden sm:inline-flex items-center gap-2 ml-4 px-3 py-1.5 rounded-full bg-axelo-neutral text-[11px] font-mono text-axelo-muted border border-axelo-border/70">
          <span class="w-2 h-2 rounded-full bg-axelo-blue animate-ping"></span>
          <span>Tap pins on the image to inspect hardware</span>
        </div>
      </div>
    </div>

    <!-- Expansive Art-Directed Product Composition with Interactive Hotspots -->
    <div
      class="relative w-full transition-all duration-1000 delay-300 {isLoaded
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-12'}"
    >
      <!-- Main Visual Container -->
      <div class="relative bg-axelo-neutral/80 rounded-3xl p-4 sm:p-7 md:p-10 border border-axelo-border/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden group">
        <!-- Subtle architectural grid background -->
        <div
          class="absolute inset-0 opacity-[0.025] pointer-events-none"
          style="background-image: radial-gradient(#111 1px, transparent 1px); background-size: 28px 28px;"
        ></div>

        <!-- Overlapping Product Trio / Composition -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          <!-- Primary Anchor: High-Resolution Studio Setup with Interactive Hotspot Pins -->
          <div class="lg:col-span-8 relative">
            <div class="relative rounded-2xl overflow-hidden shadow-product bg-white aspect-[16/10] border border-axelo-border/60">
              <img
                src="https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1800&q=85"
                alt="AXELO Studio Setup with Desk Mat and Apex 75 Keyboard"
                class="w-full h-full object-cover img-zoom-hover"
                loading="eager"
              />

              <!-- Interactive Hotspots Overlay -->
              {#each hotspots as spot}
                <div
                  class="absolute z-20"
                  style="top: {spot.top}; left: {spot.left};"
                >
                  <button
                    type="button"
                    on:click={() => (activeHotspot = activeHotspot === spot.id ? null : spot.id)}
                    class="hotspot-pin w-6 h-6 rounded-full bg-axelo-dark text-white border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-125 focus:outline-none"
                    aria-label="Inspect {spot.label}"
                  >
                    <span class="w-2 h-2 rounded-full bg-axelo-blue"></span>
                  </button>

                  <!-- Expanded Hotspot Micro-Card Popover -->
                  {#if activeHotspot === spot.id}
                    <div
                      class="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl p-3.5 rounded-xl border border-axelo-border shadow-2xl z-30 animate-fade-in text-left"
                    >
                      <div class="flex items-center justify-between mb-1.5">
                        <span class="text-[10px] font-mono text-axelo-blue uppercase tracking-wider font-bold">
                          {spot.spec}
                        </span>
                        <span class="text-xs font-mono font-bold text-axelo-dark">
                          {spot.price}
                        </span>
                      </div>
                      <h4 class="text-xs font-bold text-axelo-dark mb-2.5">
                        {spot.label}
                      </h4>
                      <div class="flex items-center gap-2">
                        <button
                          type="button"
                          on:click={() => { quickViewProduct.set(spot.product); activeHotspot = null; }}
                          class="flex-1 py-1.5 px-2 bg-axelo-neutral hover:bg-axelo-border text-axelo-dark rounded text-[11px] font-semibold text-center transition-colors flex items-center justify-center gap-1"
                        >
                          <Eye class="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                        <button
                          type="button"
                          on:click={(e) => handleAddHotspot(spot.product, e)}
                          class="py-1.5 px-3 bg-axelo-dark hover:bg-axelo-blue text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1"
                        >
                          <Plus class="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  {/if}
                </div>
              {/each}

              <!-- Bottom In-Image Badge -->
              <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-axelo-border/80 shadow-xs flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <div>
                  <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-muted block">Active Benchmark</span>
                  <span class="text-xs font-bold text-axelo-dark">Studio Mat Pro + Apex 75</span>
                </div>
                <button
                  type="button"
                  on:click={() => quickViewProduct.set(flagshipMat)}
                  class="ml-2 text-xs font-semibold text-axelo-blue hover:underline"
                >
                  Quick View
                </button>
              </div>
            </div>

            <!-- Floating Badge Card 1 (Top Left Overlap) -->
            <div class="hidden sm:flex absolute -top-5 -left-4 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-axelo-border shadow-elevated items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform">
              <div class="w-8 h-8 rounded-lg bg-axelo-blueLight flex items-center justify-center text-axelo-blue">
                <Sparkles class="w-4 h-4" />
              </div>
              <div>
                <span class="text-[10px] font-mono text-axelo-muted uppercase tracking-wider block">Material Benchmark</span>
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
              class="bg-white rounded-2xl p-5 border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all cursor-pointer group/card"
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
              <div class="aspect-[16/9] rounded-xl overflow-hidden bg-axelo-neutral mb-3">
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
              class="bg-white rounded-2xl p-5 border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all cursor-pointer group/card"
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
              <div class="aspect-[16/9] rounded-xl overflow-hidden bg-axelo-neutral mb-3">
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

  <!-- Bottom Scroll Cue with Generous Negative Space -->
  <div class="max-w-7xl mx-auto px-5 sm:px-8 w-full pt-10 flex items-center justify-between text-xs text-axelo-muted border-t border-axelo-border/50 mt-14">
    <div class="flex items-center gap-4 font-mono text-[11px]">
      <span class="text-axelo-dark font-medium">01 // INTRODUCTION</span>
      <span>•</span>
      <span>ENGINEERED FOR DEEP WORK</span>
    </div>
    <a href="#showcase" class="flex items-center gap-2 hover:text-axelo-dark transition-colors font-medium">
      <span>Scroll to Explore</span>
      <ChevronDown class="w-3.5 h-3.5 animate-bounce" />
    </a>
  </div>
</section>
