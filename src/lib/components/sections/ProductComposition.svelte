<script lang="ts">
  import { ArrowRight, Volume2, Sliders, Activity, Sparkles, Plus, Check, Play } from 'lucide-svelte';
  import { quickViewProduct, cart } from '../../stores/cart';
  import { products } from '../../data/products';
  import { reveal } from '../../animations/reveal';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';

  const keyboard = products.find(p => p.id === 'apex-75-keyboard')!;
  const dial = products.find(p => p.id === 'studio-numpad-dial')!;

  $: supabase = page.data.supabase;

  let activeTab: 'gasket' | 'acoustic' | 'wireless' = 'acoustic';
  let isPlayingAudio = false;
  let addedKeyboard = false;
  let addedDial = false;

  // Web Audio API mechanical switch acoustic thock generator
  function playThockSound() {
    isPlayingAudio = true;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Fundamental body frequency (160Hz -> 65Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(170, now);
        osc.frequency.exponentialRampToValueAtTime(62, now + 0.08);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);
        filter.frequency.exponentialRampToValueAtTime(140, now + 0.09);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // AudioContext fallback
    }

    setTimeout(() => {
      isPlayingAudio = false;
    }, 450);
  }

  function handleAddKeyboard() {
    cart.addItem(keyboard, keyboard.colors[0]?.name || 'Standard', supabase, $user?.id);
    addedKeyboard = true;
    setTimeout(() => (addedKeyboard = false), 1500);
  }

  function handleAddDial(e: MouseEvent) {
    e.stopPropagation();
    cart.addItem(dial, dial.colors[0]?.name || 'Standard', supabase, $user?.id);
    addedDial = true;
    setTimeout(() => (addedDial = false), 1500);
  }

  const layerDetails = {
    gasket: {
      tag: 'CNC CHASSIS',
      title: '6063 Aluminum Unibody with Silicone Leaf Springs',
      desc: 'Milled from a solid aerospace billet and bead-blasted to 120-mesh for a velvet satin texture. Silicone suspension dampers isolate typing shock from desk vibrations.'
    },
    acoustic: {
      tag: '5-STAGE ACOUSTIC DAMPENING',
      title: 'Dense Poron Sheets & IXPE Switch Film',
      desc: 'Eliminates high-pitch hollow echo while preserving the deep, marble-like tactile thock. Custom molded silicone case base dampens bottom-out vibration.'
    },
    wireless: {
      tag: 'NORDIC RF TRI-MODE',
      title: 'True 4000Hz Wireless with Sub-1ms Latency',
      desc: 'Seamless switching between 2.4GHz RF, Bluetooth 5.3, and braided USB-C. On-board memory preserves custom remaps and layer macros without companion apps.'
    }
  };
</script>

<section class="py-28 md:py-40 bg-[#FFFFFF] overflow-hidden border-b border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Eyebrow & Headline with Generous Whitespace -->
    <div class="max-w-3xl mb-16 md:mb-24" use:reveal={{ duration: 700 }}>
      <div class="flex items-center gap-2 mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-blue">
          LAYERED COMPOSITION // 04
        </span>
        <span class="text-axelo-border">•</span>
        <span class="text-[11px] font-mono text-axelo-muted uppercase tracking-wider">HARDWARE SYSTEM</span>
      </div>

      <h2 class="editorial-title text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-[-0.04em] text-axelo-dark">
        Tactile Acoustics. <br />
        Engineered Feedback.
      </h2>

      <p class="text-sm sm:text-base text-axelo-muted max-w-xl leading-relaxed mt-5">
        Every keypress produces a calibrated acoustic resonance. CNC-milled 6063 aluminum chassis paired with internal multi-layer Poron dampening sheets.
      </p>

      <!-- Architecture Layer Switcher Tabs -->
      <div class="flex flex-wrap items-center gap-2 mt-8">
        <button
          type="button"
          on:click={() => (activeTab = 'acoustic')}
          class="px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all {activeTab === 'acoustic'
            ? 'bg-axelo-dark text-white font-bold shadow-xs'
            : 'bg-axelo-neutral text-axelo-muted hover:text-axelo-dark'}"
        >
          01 // Acoustic Dampening
        </button>
        <button
          type="button"
          on:click={() => (activeTab = 'gasket')}
          class="px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all {activeTab === 'gasket'
            ? 'bg-axelo-dark text-white font-bold shadow-xs'
            : 'bg-axelo-neutral text-axelo-muted hover:text-axelo-dark'}"
        >
          02 // Gasket Leaf Spring
        </button>
        <button
          type="button"
          on:click={() => (activeTab = 'wireless')}
          class="px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all {activeTab === 'wireless'
            ? 'bg-axelo-dark text-white font-bold shadow-xs'
            : 'bg-axelo-neutral text-axelo-muted hover:text-axelo-dark'}"
        >
          03 // 4000Hz Tri-Mode
        </button>
      </div>
    </div>

    <!-- Asymmetrical Layered Composition Container -->
    <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <!-- Dominant Main Product Image (Left 7 cols) -->
      <div class="lg:col-span-7 relative" use:reveal={{ delay: 100, duration: 800 }}>
        <div class="relative rounded-3xl overflow-hidden bg-axelo-neutral border border-axelo-border/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1600&q=85"
            alt="AXELO Apex 75 Anodized Aluminum Keyboard"
            class="w-full h-full object-cover img-zoom-hover"
          />

          <!-- Interactive Acoustic Simulator Pill in corner -->
          <div class="absolute top-5 left-5 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-xl border border-axelo-border shadow-elevated flex items-center gap-3">
            <button
              type="button"
              on:click={playThockSound}
              class="w-7 h-7 rounded-full bg-axelo-blue text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xs"
              title="Click to test mechanical switch acoustic profile"
            >
              <Volume2 class="w-3.5 h-3.5" />
            </button>

            <div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-muted block">Acoustic Profile</span>
              <span class="text-xs font-bold text-axelo-dark flex items-center gap-1.5">
                <span>Calibrated 42dB Thock</span>
                {#if isPlayingAudio}
                  <span class="flex items-center gap-0.5 ml-1">
                    <span class="w-1 h-3 bg-axelo-blue rounded-full waveform-bar-1"></span>
                    <span class="w-1 h-4 bg-axelo-blue rounded-full waveform-bar-2"></span>
                    <span class="w-1 h-2 bg-axelo-blue rounded-full waveform-bar-3"></span>
                  </span>
                {/if}
              </span>
            </div>
          </div>

          <!-- Bottom Annotation Banner according to activeTab -->
          <div class="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl p-4 rounded-xl border border-axelo-border/80 shadow-xs">
            <span class="text-[10px] font-mono font-bold text-axelo-blue uppercase tracking-wider block mb-1">
              {layerDetails[activeTab].tag}
            </span>
            <h4 class="text-xs sm:text-sm font-bold text-axelo-dark mb-1">
              {layerDetails[activeTab].title}
            </h4>
            <p class="text-[11px] text-axelo-muted leading-relaxed">
              {layerDetails[activeTab].desc}
            </p>
          </div>
        </div>

        <!-- Floating Overlapping Badge: Hot-swap Plate -->
        <div class="hidden sm:flex absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-axelo-border shadow-elevated items-center gap-3.5 max-w-xs transform -rotate-1 hover:rotate-0 transition-transform">
          <div class="w-10 h-10 rounded-xl bg-axelo-neutral flex items-center justify-center text-axelo-dark font-mono text-xs font-bold border border-axelo-border">
            75%
          </div>
          <div>
            <h5 class="text-xs font-bold text-axelo-dark">Hot-Swappable 5-Pin PCB</h5>
            <p class="text-[11px] text-axelo-muted">Compatible with tactile, linear, and silent switch architectures.</p>
          </div>
        </div>
      </div>

      <!-- Right Supporting Staggered Cards (Right 5 cols) -->
      <div class="lg:col-span-5 flex flex-col gap-6 lg:-ml-4 relative z-10" use:reveal={{ delay: 200, duration: 800 }}>
        <!-- Floating Supporting Card 1: Dial & Macropad -->
        <div
          class="bg-white rounded-3xl p-6 sm:p-7 border border-axelo-border shadow-elevated hover:shadow-product transition-all cursor-pointer group"
          on:click={() => quickViewProduct.set(dial)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && quickViewProduct.set(dial)}
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-axelo-blue">
              Modular Companion
            </span>
            <span class="text-sm font-mono font-bold text-axelo-dark">$74</span>
          </div>

          <div class="aspect-[16/9] rounded-2xl overflow-hidden bg-axelo-neutral mb-5 border border-axelo-border/60">
            <img
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80"
              alt="AXELO Macropad & Dial Studio"
              class="w-full h-full object-cover img-zoom-hover"
            />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm sm:text-base font-bold text-axelo-dark group-hover:text-axelo-blue transition-colors">
                Studio Dial & Macropad
              </h4>
              <p class="text-xs text-axelo-muted mt-0.5">CNC rotary encoder dial + 9 tactile macro switches</p>
            </div>
            <button
              type="button"
              on:click={handleAddDial}
              class="px-3 py-1.5 rounded-lg bg-axelo-neutral hover:bg-axelo-dark hover:text-white text-xs font-semibold font-mono transition-colors flex items-center gap-1.5"
            >
              {#if addedDial}
                <Check class="w-3.5 h-3.5 text-emerald-500" />
                <span>Added</span>
              {:else}
                <Plus class="w-3.5 h-3.5" />
                <span>$74</span>
              {/if}
            </button>
          </div>
        </div>

        <!-- Apex 75 Keyboard Direct Add Callout -->
        <div class="bg-axelo-neutral/80 rounded-2xl p-5 border border-axelo-border/80 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full bg-axelo-blue"></div>
            <div>
              <span class="text-xs font-bold text-axelo-dark block">Apex 75 Complete Architecture</span>
              <span class="text-[11px] text-axelo-muted">Aviator cable, 2.4G dongle & switch tool included</span>
            </div>
          </div>
          <button
            type="button"
            on:click={handleAddKeyboard}
            class="px-5 py-2.5 bg-axelo-dark hover:bg-axelo-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {#if addedKeyboard}
              <Check class="w-3.5 h-3.5 text-emerald-400" />
              <span>Added</span>
            {:else}
              <span>Claim $189</span>
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
