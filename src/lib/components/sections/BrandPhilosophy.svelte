<script lang="ts">
  import { Check, Sparkles, Sliders, Shield, Zap, Cpu, Compass } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';

  const pillars = [
    {
      title: 'Zero Extraneous Ornamentation',
      desc: 'No flashing novelty RGB strips, no exaggerated gamer fins. Pure geometric silhouettes that mature alongside your interior decor.',
      tag: 'FORM PRINCIPLE'
    },
    {
      title: 'Calibrated Tactile Resistance',
      desc: 'Whether rotating the aluminum dial or actuating an optical switch, every tactile breakpoint is mathematically modeled for feedback confidence.',
      tag: 'HAPTIC FORCE'
    },
    {
      title: 'Acoustic Sound Dampening',
      desc: 'High-frequency clicks cause subconscious mental friction. AXELO products prioritize low-frequency absorption and thocky resonance.',
      tag: 'ACOUSTICS'
    },
    {
      title: 'Magnetic Cable Disappearance',
      desc: 'Cables should serve data and power, not visually clutter your desk plane. Our magnetic anchoring seamlessly tucks cords out of line-of-sight.',
      tag: 'MANAGEMENT'
    }
  ];

  const materials = [
    { label: 'Aerospace Billet', name: '6063 CNC Aluminum', note: '120-mesh velvet satin finish' },
    { label: 'Acoustic Fiber', name: '4mm Merino Wool Felt', note: 'Naturally dampens key resonance' },
    { label: 'Glide Skates', name: '100% Virgin Grade PTFE', note: 'Zero-friction optical traversal' },
    { label: 'Docking Core', name: 'N52 Neodymium Magnetic Grid', note: 'Zero-slip cable docking' }
  ];
</script>

<section id="philosophy" class="py-28 md:py-40 bg-[#FFFFFF] border-b border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <!-- Left Column: Editorial Manifesto (Span 5 cols) -->
      <div class="lg:col-span-5 space-y-7 lg:sticky lg:top-32" use:reveal={{ duration: 700 }}>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
          <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-blue">
            PHILOSOPHY // 06
          </span>
        </div>

        <h2 class="editorial-title text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-axelo-dark leading-[0.98]">
          Better Setups <br />
          Begin with <br />
          <span class="text-axelo-blue">Better Details.</span>
        </h2>

        <p class="text-sm sm:text-base text-axelo-muted leading-relaxed">
          We believe your workspace is not merely where code gets compiled or emails get answered—it is the direct physical extension of your attention.
        </p>

        <p class="text-sm text-axelo-muted leading-relaxed">
          When the tools at your fingertips feel substantial, predictable, and quiet, distraction melts into effortless momentum. AXELO engineers that friction out of existence.
        </p>

        <!-- Material Quality Matrix -->
        <div class="pt-4 border-t border-axelo-border/70">
          <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-dark font-bold block mb-3">
            MATERIALS & PHYSICAL BENCHMARKS
          </span>
          <div class="grid grid-cols-2 gap-3">
            {#each materials as mat}
              <div class="p-3 rounded-xl bg-axelo-neutral/80 border border-axelo-border/70 text-xs">
                <span class="text-[10px] font-mono text-axelo-muted block">{mat.label}</span>
                <span class="font-bold text-axelo-dark block mt-0.5">{mat.name}</span>
                <span class="text-[10px] text-axelo-muted block mt-1">{mat.note}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right Column: Visual Architecture & 4 Strategic Pillars (Span 7 cols) -->
      <div class="lg:col-span-7 space-y-8" use:reveal={{ delay: 150, duration: 800 }}>
        <!-- Visual Detail Showcase Card with Glass Badge -->
        <div class="rounded-3xl overflow-hidden bg-axelo-neutral border border-axelo-border/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] aspect-[16/10] relative group">
          <img
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85"
            alt="AXELO Workspace Architecture"
            class="w-full h-full object-cover img-zoom-hover"
          />
          <div class="absolute bottom-5 left-5 right-5 glass-panel p-4 sm:p-5 rounded-2xl shadow-elevated flex items-center justify-between">
            <div>
              <span class="text-xs sm:text-sm font-bold text-axelo-dark block">
                AXELO Physical Studio Standard
              </span>
              <span class="text-[11px] text-axelo-muted font-mono">
                Architectural geometry • Zero distraction tolerance
              </span>
            </div>
            <span class="text-[11px] font-mono text-axelo-blue uppercase font-bold px-2.5 py-1 bg-axelo-blueLight rounded-md">
              AXELO LABS
            </span>
          </div>
        </div>

        <!-- 4 Pillars Grid with High Polish Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each pillars as pillar, idx}
            <div class="p-6 rounded-2xl bg-axelo-neutral/70 border border-axelo-border/70 hover:bg-white hover:border-axelo-dark hover:shadow-subtle transition-all duration-300 group">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-axelo-blue">
                  {pillar.tag}
                </span>
                <div class="w-6 h-6 rounded-md bg-white border border-axelo-border flex items-center justify-center text-axelo-dark group-hover:bg-axelo-dark group-hover:text-white transition-colors">
                  <Check class="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
              <h4 class="text-xs sm:text-sm font-bold text-axelo-dark mb-2 tracking-tight group-hover:text-axelo-blue transition-colors">
                {pillar.title}
              </h4>
              <p class="text-xs text-axelo-muted leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
