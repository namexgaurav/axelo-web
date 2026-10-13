<script lang="ts">
  import { trustPoints } from '../../data/products';
  import { Shield, Compass, Cpu, Layers } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';

  const icons = [Cpu, Compass, Layers, Shield];
</script>

<section id="trust" class="py-28 md:py-40 bg-[#FFFFFF] border-b border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Breathing Editorial Statement with Expansive Whitespace -->
    <div class="max-w-3xl mb-20 md:mb-28" use:reveal={{ duration: 700 }}>
      <div class="flex items-center gap-2 mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-muted">
          DESIGN PRINCIPLES // 03
        </span>
      </div>
      <h3 class="editorial-title text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-axelo-dark tracking-[-0.035em] leading-[1.05]">
        Quiet tools built to disappear into your workflow—not demand your attention.
      </h3>
      <p class="text-sm sm:text-base text-axelo-muted max-w-xl mt-5 leading-relaxed">
        We eliminate novelty ornamentation, uncalibrated spring noise, and superficial branding. Every curve is justified by physical ergonomics.
      </p>
    </div>

    <!-- 4 Architectural Principles Grid with Hairline Dividers -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {#each trustPoints as point, i}
        <div
          class="flex flex-col justify-between pt-8 border-t-2 border-axelo-border/80 group hover:border-axelo-dark transition-all duration-300"
          use:reveal={{ delay: i * 80, duration: 600 }}
        >
          <div>
            <div class="flex items-center justify-between mb-6">
              <span class="text-xs font-mono font-bold text-axelo-blue tracking-wider">
                {point.number}
              </span>
              <div class="w-8 h-8 rounded-lg bg-axelo-neutral flex items-center justify-center group-hover:bg-axelo-dark group-hover:text-white transition-colors duration-200">
                <svelte:component
                  this={icons[i]}
                  class="w-4 h-4 text-axelo-dark group-hover:text-white transition-colors"
                />
              </div>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-axelo-dark mb-3 tracking-tight group-hover:text-axelo-blue transition-colors">
              {point.title}
            </h4>
            <p class="text-xs sm:text-[13px] text-axelo-muted leading-relaxed">
              {point.description}
            </p>
          </div>

          <div class="mt-8 pt-4 border-t border-axelo-border/50 text-[10px] font-mono text-axelo-muted uppercase tracking-widest flex items-center justify-between">
            <span>Verified Spec</span>
            <span class="text-axelo-dark opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
