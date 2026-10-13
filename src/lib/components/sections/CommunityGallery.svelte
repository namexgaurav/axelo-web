<script lang="ts">
  import { ArrowUpRight, ArrowRight, X, Plus, Check, ShoppingBag } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';
  import { products } from '../../data/products';
  import { cart } from '../../stores/cart';
  import { page } from '$app/state';
  import { user } from '$lib/auth/auth.store';

  $: supabase = page.data.supabase;

  let activeSetup: any = null;
  let bundleAdded = false;

  const setups = [
    {
      archetype: 'The Systems Architect',
      subtitle: 'Full-stack engineering & multi-display focus',
      tools: 'Studio Desk Mat Pro • Apex 75 Keyboard',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
      aspect: 'aspect-[4/3]',
      items: [
        products.find(p => p.id === 'studio-desk-mat-pro')!,
        products.find(p => p.id === 'apex-75-keyboard')!
      ]
    },
    {
      archetype: 'The Creative Technologist',
      subtitle: 'Audio haptics, generative visuals & code',
      tools: 'Apex 75 Keyboard • Rotary Studio Dial',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
      aspect: 'aspect-[4/5]',
      items: [
        products.find(p => p.id === 'apex-75-keyboard')!,
        products.find(p => p.id === 'studio-numpad-dial')!
      ]
    },
    {
      archetype: 'The Minimalist Builder',
      subtitle: 'Zero cable clutter, maximum velocity',
      tools: 'Contour 58g Wireless Mouse • Core Mat',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      aspect: 'aspect-[4/5]',
      items: [
        products.find(p => p.id === 'contour-wireless-mouse')!,
        products.find(p => p.id === 'studio-desk-mat-pro')!
      ]
    },
    {
      archetype: 'The Editorial Author',
      subtitle: 'Acoustic dampening & tactile rhythm',
      tools: 'Acoustic Merino Pad • Magnetic Cable Kit',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
      aspect: 'aspect-[4/3]',
      items: [
        products.find(p => p.id === 'studio-desk-mat-pro')!,
        products.find(p => p.id === 'magnetic-cable-anchor-kit')!
      ]
    }
  ];

  function handleAddSetupBundle(items: any[]) {
    items.forEach(item => {
      if (item) {
        cart.addItem(item, item.colors[0]?.name || 'Standard', supabase, $user?.id);
      }
    });
    bundleAdded = true;
    setTimeout(() => {
      bundleAdded = false;
      activeSetup = null;
    }, 1500);
  }
</script>

<section id="community" class="py-28 md:py-40 bg-[#FFFFFF] border-b border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Header with Generous Negative Space -->
    <div class="max-w-2xl mb-16 md:mb-24" use:reveal={{ duration: 700 }}>
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-blue">
          COMMUNITY & ARCHETYPES // 10
        </span>
        <span class="text-axelo-border">•</span>
        <span class="text-[11px] font-mono text-axelo-muted uppercase tracking-wider">SETUPS IN FOCUS</span>
      </div>
      <h2 class="editorial-title text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-axelo-dark">
        Spaces in the Wild.
      </h2>
      <p class="text-sm sm:text-base text-axelo-muted mt-4 leading-relaxed">
        Curated glimpses into modern workstations around the world where AXELO essentials anchor daily flow.
      </p>
    </div>

    <!-- Asymmetric Editorial Mosaic with Interactive Inspection -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {#each setups as setup, i}
        <div
          class="group rounded-3xl overflow-hidden bg-axelo-neutral border border-axelo-border/80 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          on:click={() => (activeSetup = setup)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && (activeSetup = setup)}
          use:reveal={{ delay: i * 80, duration: 600 }}
        >
          <div class="{setup.aspect} overflow-hidden relative">
            <img
              src={setup.image}
              alt={setup.archetype}
              class="w-full h-full object-cover img-zoom-hover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span class="glass-panel text-axelo-dark text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <span>Shop This Setup</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div class="p-6 bg-white flex flex-col justify-between flex-1 border-t border-axelo-border/60">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-blue font-bold block mb-1">
                SETUP ARCHETYPE
              </span>
              <h4 class="text-sm sm:text-base font-bold text-axelo-dark group-hover:text-axelo-blue transition-colors">
                {setup.archetype}
              </h4>
            </div>
            <p class="text-xs text-axelo-muted mt-3 font-mono text-[11px] leading-relaxed">
              {setup.tools}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Interactive "Shop The Setup" Modal -->
  {#if activeSetup}
    <div
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      on:click={(e) => { if (e.target === e.currentTarget) activeSetup = null; }}
      on:keydown={(e) => e.key === 'Escape' && (activeSetup = null)}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div
        class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-10 max-h-[90vh] overflow-y-auto relative shadow-2xl"
      >
        <button
          type="button"
          on:click={() => (activeSetup = null)}
          class="absolute top-6 right-6 text-axelo-muted hover:text-axelo-dark text-xs font-mono px-2.5 py-1.5 bg-axelo-neutral rounded-lg flex items-center gap-1"
        >
          <X class="w-4 h-4" />
          <span>ESC</span>
        </button>

        <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-blue block mb-2 font-bold">
          SHOP THE SETUP BUNDLE
        </span>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-axelo-dark tracking-tight mb-2">
          {activeSetup.archetype}
        </h3>
        <p class="text-xs sm:text-sm text-axelo-muted mb-6">
          {activeSetup.subtitle}
        </p>

        <div class="rounded-2xl overflow-hidden mb-6 aspect-[16/9] border border-axelo-border">
          <img src={activeSetup.image} alt={activeSetup.archetype} class="w-full h-full object-cover" />
        </div>

        <div class="space-y-3 mb-6">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark block">
            Featured Hardware in Setup:
          </span>
          {#each activeSetup.items as item}
            {#if item}
              <div class="p-3.5 rounded-xl bg-axelo-neutral/80 border border-axelo-border flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src={item.primaryImage} alt={item.name} class="w-12 h-12 rounded-lg object-cover bg-white border border-axelo-border" />
                  <div>
                    <h5 class="text-xs font-bold text-axelo-dark">{item.name}</h5>
                    <span class="text-[11px] text-axelo-muted font-mono">{item.categoryLabel}</span>
                  </div>
                </div>
                <span class="text-xs font-mono font-bold text-axelo-dark">${item.price}</span>
              </div>
            {/if}
          {/each}
        </div>

        <button
          type="button"
          on:click={() => handleAddSetupBundle(activeSetup.items)}
          class="w-full py-3.5 bg-axelo-dark hover:bg-axelo-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-subtle"
        >
          {#if bundleAdded}
            <Check class="w-4 h-4 text-emerald-400" />
            <span>Setup Bundle Added to Bag!</span>
          {:else}
            <ShoppingBag class="w-4 h-4" />
            <span>Add Complete Setup to Bag</span>
          {/if}
        </button>
      </div>
    </div>
  {/if}
</section>
