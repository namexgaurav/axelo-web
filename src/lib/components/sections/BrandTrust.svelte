<script lang="ts">
  import { trustPoints } from '../../data/products';
  import { Shield, Compass, Cpu, Layers } from 'lucide-svelte';
  import { reveal } from '../../animations/reveal';

  const icons = [Cpu, Compass, Layers, Shield];
</script>

<section id="trust" class="py-20 md:py-28 bg-[#FFFFFF] border-b border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Breathing Editorial Statement -->
    <div class="max-w-3xl mb-16 md:mb-20" use:reveal={{ duration: 700 }}>
      <span class="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-axelo-muted block mb-3">
        DESIGN PRINCIPLES // 03
      </span>
      <h3 class="editorial-title text-2xl sm:text-4xl lg:text-5xl font-extrabold text-axelo-dark tracking-tight leading-tight">
        Quiet tools built to disappear into your workflow—not demand your attention.
      </h3>
    </div>

    <!-- 4 Principles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {#each trustPoints as point, i}
        <div
          class="flex flex-col justify-between pt-6 border-t border-axelo-border group hover:border-axelo-dark transition-colors"
          use:reveal={{ delay: i * 90, duration: 600 }}
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-mono font-bold text-axelo-blue">
                {point.number}
              </span>
              <svelte:component
                this={icons[i]}
                class="w-4 h-4 text-axelo-muted group-hover:text-axelo-dark transition-colors"
              />
            </div>
            <h4 class="text-base font-bold text-axelo-dark mb-2 tracking-tight">
              {point.title}
            </h4>
            <p class="text-xs text-axelo-muted leading-relaxed">
              {point.description}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-axelo-border/40 text-[10px] font-mono text-axelo-muted uppercase tracking-wider">
            Verified Standard
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
