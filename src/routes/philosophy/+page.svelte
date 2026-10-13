<script lang="ts">
  import { Home, ChevronRight, ArrowRight, ShieldCheck, Layers, Gauge, Cpu, Compass, Sliders } from 'lucide-svelte';

  const benchmarks = [
    {
      material: '6063 Aerospace Aluminum',
      tolerance: '±0.02 mm',
      treatment: 'Type II Bead-blasted & Anodized',
      role: 'Chassis rigidity, thermal neutrality, zero acoustic vibration',
      spec: '98.5% Pure alloy'
    },
    {
      material: 'High-Density Merino Wool Felt',
      tolerance: '4.0 mm uniform',
      treatment: 'Hydrophobic Nanotech Impregnation',
      role: 'Acoustic absorption, tactile wrist rest friction, thermal comfort',
      spec: '100% Biodegradable fiber'
    },
    {
      material: 'Virgin Grade PTFE Skates',
      tolerance: '0.8 mm rounded edges',
      treatment: 'Heat-polished curved bevels',
      role: 'Ultra-low static friction coefficient (0.04 µk) on all textiles',
      spec: 'Zero additive pure polymer'
    },
    {
      material: 'N52 Neodymium Magnets',
      tolerance: '1.2 Tesla flux',
      treatment: 'Nickel-Copper-Nickel Triple Plating',
      role: 'Tactile cable docking, secure modular modularity without adhesive',
      spec: 'High-temperature stability'
    }
  ];

  const pillars = [
    {
      number: '01',
      title: 'Restraint as Power',
      body: 'AXELO products do not shout. We deliberately discard blinding RGB diodes, aggressive angular geometries, and neon plastics. True hardware confidence recedes into the room and lets your thoughts take priority.'
    },
    {
      number: '02',
      title: 'Tactile & Acoustic Honesty',
      body: 'Every mechanical switch, rotary dial click, and magnetic snap is calibrated for satisfying haptic feedback. We treat sound not as a byproduct, but as a deliberate frequency signature that deepens flow state.'
    },
    {
      number: '03',
      title: 'Enduring Materiality',
      body: 'We reject planned obsolescence. Machined aluminum blocks, thick merino wool, and heavy mechanical stabilizers are selected to patina gracefully through decades of intense keystrokes.'
    },
    {
      number: '04',
      title: 'Ergonomic Calibration',
      body: 'From the 58-gram weight distribution of our precision mouse to the natural 6.5° typing angle of our 75% mechanical chassis, every curve respects human biomechanics.'
    }
  ];
</script>

<svelte:head>
  <title>Design Philosophy & Manifesto | AXELO Hardware</title>
  <meta name="description" content="Discover the industrial design ethos, physical tolerances, and material benchmarks behind AXELO workspace hardware." />
</svelte:head>

<div class="min-h-screen pt-28 pb-28 bg-[#FFFFFF]">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    
    <!-- Breadcrumb Hierarchy -->
    <nav class="flex items-center gap-2 text-xs font-mono text-axelo-muted mb-8" aria-label="Breadcrumb">
      <a href="/" class="flex items-center gap-1.5 hover:text-axelo-dark transition-colors">
        <Home class="w-3.5 h-3.5" />
        <span>Home</span>
      </a>
      <ChevronRight class="w-3.5 h-3.5 text-axelo-border" />
      <span class="text-axelo-dark font-medium">Design Philosophy</span>
    </nav>

    <!-- Monumental Header -->
    <div class="pb-14 border-b border-black/[0.06] mb-16">
      <div class="inline-flex items-center gap-2 mb-4">
        <span class="w-2 h-2 rounded-full bg-axelo-blue"></span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-widest text-axelo-muted">
          AXELO MANIFESTO // REVISION 2.0
        </span>
      </div>
      <h1 class="editorial-title text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold text-axelo-dark tracking-[-0.04em] leading-[0.95] max-w-4xl">
        Quiet Tools for High-Density Minds.
      </h1>
      <p class="text-base sm:text-lg text-axelo-muted mt-6 max-w-2xl leading-relaxed">
        We believe the physical objects on your desk shape the texture of your thoughts. Distraction is visual noise; precision is physical peace.
      </p>
    </div>

    <!-- Core Philosophy Pillars -->
    <section class="mb-24">
      <div class="flex items-center gap-2 mb-8 font-mono text-xs text-axelo-muted font-semibold uppercase tracking-wider">
        <span>01 // CORE ETHOS</span>
        <span class="text-axelo-border">•</span>
        <span>Four Foundational Principles</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each pillars as pillar}
          <div class="p-8 sm:p-10 rounded-3xl bg-[#F7F7F5] border border-black/[0.05] hover:border-black/15 transition-all">
            <span class="font-mono text-xs text-axelo-blue font-bold">{pillar.number}</span>
            <h3 class="text-2xl font-bold text-axelo-dark tracking-tight mt-2 mb-4">
              {pillar.title}
            </h3>
            <p class="text-sm text-axelo-muted leading-relaxed font-sans">
              {pillar.body}
            </p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Material & Engineering Benchmarks Matrix -->
    <section class="mb-24">
      <div class="flex items-center gap-2 mb-8 font-mono text-xs text-axelo-muted font-semibold uppercase tracking-wider">
        <span>02 // PHYSICAL TOLERANCES</span>
        <span class="text-axelo-border">•</span>
        <span>Engineered Material Benchmarks</span>
      </div>

      <div class="rounded-3xl border border-black/[0.06] overflow-hidden bg-white shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-[#F7F7F5] border-b border-black/[0.06] font-mono uppercase text-[11px] text-axelo-muted">
              <tr>
                <th class="py-4 px-6 font-bold">Substance</th>
                <th class="py-4 px-6 font-bold">Machine Tolerance</th>
                <th class="py-4 px-6 font-bold">Surface Finishing</th>
                <th class="py-4 px-6 font-bold">Acoustic & Haptic Role</th>
                <th class="py-4 px-6 font-bold">Benchmark</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-black/[0.04]">
              {#each benchmarks as row}
                <tr class="hover:bg-black/[0.01] transition-colors">
                  <td class="py-4 px-6 font-bold text-axelo-dark whitespace-nowrap">{row.material}</td>
                  <td class="py-4 px-6 font-mono text-axelo-blue font-semibold">{row.tolerance}</td>
                  <td class="py-4 px-6 text-axelo-dark">{row.treatment}</td>
                  <td class="py-4 px-6 text-axelo-muted max-w-xs">{row.role}</td>
                  <td class="py-4 px-6 font-mono text-[11px] text-axelo-dark whitespace-nowrap">{row.spec}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Call to action -->
    <div class="p-10 sm:p-14 rounded-3xl bg-[#111111] text-white flex flex-col md:flex-row items-center justify-between gap-8">
      <div>
        <span class="text-[11px] font-mono uppercase tracking-widest text-axelo-blue font-bold">
          EXPERIENCE THE ARCHITECTURE
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
          See How Our Hardware Is Made.
        </h2>
        <p class="text-xs sm:text-sm text-white/60 mt-2 max-w-xl">
          Explore our complete collection of desk mats, keyboards, and precision mice engineered according to these principles.
        </p>
      </div>
      <div class="flex items-center gap-4 shrink-0">
        <a
          href="/collections"
          class="px-7 py-3.5 rounded-full bg-white text-axelo-dark hover:bg-axelo-neutral font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
        >
          <span>Explore Collections</span>
          <ArrowRight class="w-4 h-4 text-axelo-blue" />
        </a>
      </div>
    </div>

  </div>
</div>
