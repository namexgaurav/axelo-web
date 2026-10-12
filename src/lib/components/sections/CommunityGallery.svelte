<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';

  const setups = [
    {
      archetype: 'The Systems Architect',
      tools: 'Studio Desk Mat Pro • Dual Display Shelf',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
      aspect: 'aspect-[4/3]'
    },
    {
      archetype: 'The Creative Technologist',
      tools: 'Apex 75 Keyboard • Rotary Studio Dial',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      aspect: 'aspect-[4/5]'
    },
    {
      archetype: 'The Minimalist Builder',
      tools: 'Contour 58g Wireless Mouse • Core Pad',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
      aspect: 'aspect-[4/5]'
    },
    {
      archetype: 'The Editorial Author',
      tools: 'Acoustic Merino Pad • Magnetic Cable Kit',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
      aspect: 'aspect-[4/3]'
    }
  ];
</script>

<section id="community" class="py-24 md:py-36 bg-[#FFFFFF]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Header -->
    <div class="max-w-2xl mb-14 md:mb-20" use:reveal={{ duration: 700 }}>
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-axelo-blue">
          COMMUNITY & ARCHETYPES // 10
        </span>
        <span class="text-axelo-border">•</span>
        <span class="text-[11px] font-mono text-axelo-muted uppercase">SETUPS IN FOCUS</span>
      </div>
      <h2 class="editorial-title text-3xl sm:text-5xl font-extrabold tracking-tight text-axelo-dark">
        Spaces in the Wild.
      </h2>
      <p class="text-sm sm:text-base text-axelo-muted mt-3 leading-relaxed">
        Curated glimpses into modern workstations around the world where AXELO essentials anchor daily flow.
      </p>
    </div>

    <!-- Asymmetric Editorial Mosaic -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each setups as setup, i}
        <div
          class="group rounded-2xl overflow-hidden bg-axelo-neutral border border-axelo-border/70 hover:shadow-elevated transition-all flex flex-col justify-between"
          use:reveal={{ delay: i * 80, duration: 600 }}
        >
          <div class="{setup.aspect} overflow-hidden relative">
            <img
              src={setup.image}
              alt={setup.archetype}
              class="w-full h-full object-cover img-zoom-hover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div class="p-5 bg-white flex flex-col justify-between flex-1">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-blue font-semibold block mb-1">
                SETUP ARCHETYPE
              </span>
              <h4 class="text-sm font-bold text-axelo-dark">
                {setup.archetype}
              </h4>
            </div>
            <p class="text-xs text-axelo-muted mt-2 font-mono text-[11px]">
              {setup.tools}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
