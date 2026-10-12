<script lang="ts">
  import { Check, Sparkles, Sliders, Shield, Zap } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';

  const pillars = [
    {
      title: 'Zero Extraneous Ornamentation',
      desc: 'No flashing novelty RGB strips, no exaggerated gamer fins. Pure geometric silhouettes that mature alongside your interior decor.'
    },
    {
      title: 'Calibrated Tactile Resistance',
      desc: 'Whether rotating the aluminum dial or actuating an optical switch, every tactile breakpoint is mathematically modeled for feedback confidence.'
    },
    {
      title: 'Acoustic Sound Dampening',
      desc: 'High-frequency clicks cause subconscious mental friction. AXELO products prioritize low-frequency absorption and thocky resonance.'
    },
    {
      title: 'Magnetic Cable Disappearance',
      desc: 'Cables should serve data and power, not visually clutter your desk plane. Our magnetic anchoring seamlessly tucks cords out of line-of-sight.'
    }
  ];
</script>

<section id="philosophy" class="py-24 md:py-36 bg-[#FFFFFF]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <!-- Left Column: Editorial Manifesto (Span 5 cols) -->
      <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-28" use:reveal={{ duration: 700 }}>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-axelo-blue block">
          PHILOSOPHY // 06
        </span>
        <h2 class="editorial-title text-3xl sm:text-5xl font-extrabold tracking-tight text-axelo-dark">
          Better Setups <br />
          Begin with <br />
          <span class="text-axelo-blue">Better Details.</span>
        </h2>
        <p class="text-sm sm:text-base text-axelo-muted leading-relaxed">
          We believe your workspace is not merely where software gets compiled or emails get answered—it is the direct physical extension of your attention.
        </p>
        <p class="text-sm text-axelo-muted leading-relaxed">
          When the tools at your fingertips feel substantial, predictable, and quiet, distraction melts into effortless momentum. AXELO engineers that friction out of existence.
        </p>

        <div class="pt-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-axelo-neutral flex items-center justify-center font-mono font-bold text-xs text-axelo-dark border border-axelo-border">
            01
          </div>
          <div class="text-xs">
            <span class="font-bold text-axelo-dark block">The AXELO Standard</span>
            <span class="text-axelo-muted font-mono text-[11px]">Mil-spec 6063 Aluminum & Felt</span>
          </div>
        </div>
      </div>

      <!-- Right Column: 4 Strategic Pillars & Detail Cards (Span 7 cols) -->
      <div class="lg:col-span-7 space-y-6" use:reveal={{ delay: 150, duration: 800 }}>
        <!-- Visual Detail Showcase Card -->
        <div class="rounded-2xl overflow-hidden bg-axelo-neutral border border-axelo-border/80 shadow-subtle aspect-[16/9] mb-8 relative">
          <img
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85"
            alt="AXELO Workspace Architecture"
            class="w-full h-full object-cover"
          />
          <div class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-axelo-border shadow-xs flex items-center justify-between">
            <span class="text-xs font-mono font-semibold text-axelo-dark">
              Precision Workspace Benchmark
            </span>
            <span class="text-[11px] font-mono text-axelo-blue uppercase font-bold">
              AXELO LABS
            </span>
          </div>
        </div>

        <!-- 4 Pillars List -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each pillars as pillar, idx}
            <div class="p-5 rounded-xl bg-axelo-neutral/60 border border-axelo-border/70 hover:bg-white hover:shadow-subtle transition-all">
              <div class="w-6 h-6 rounded-md bg-white border border-axelo-border flex items-center justify-center text-axelo-blue mb-3">
                <Check class="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <h4 class="text-xs font-bold text-axelo-dark mb-1.5">
                {pillar.title}
              </h4>
              <p class="text-[11px] text-axelo-muted leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
