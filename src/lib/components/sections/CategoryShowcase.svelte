<script lang="ts">
  import { ArrowUpRight, ArrowRight } from 'lucide-svelte';
  import { categories } from '../../data/products';
  import { reveal } from '../../animations/reveal';

  export let onSelectCategory: (categoryId: string) => void = () => {};
</script>

<section id="categories" class="py-24 md:py-36 bg-[#F7F7F5] border-y border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6" use:reveal={{ duration: 700 }}>
      <div>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-axelo-blue block mb-3">
          CATEGORIES // 05
        </span>
        <h2 class="editorial-title text-3xl sm:text-5xl font-extrabold tracking-tight text-axelo-dark">
          Curated Product Systems.
        </h2>
      </div>
      <p class="text-sm text-axelo-muted max-w-md leading-relaxed">
        Every AXELO category is built with matching materials, finishes, and dimensions so individual components interlock seamlessly.
      </p>
    </div>

    <!-- Editorial Asymmetrical Category Layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
      <!-- Large Featured Category: Desk Mats (Span 7 cols) -->
      <div
        id="category-desk-mats"
        class="md:col-span-7 bg-white rounded-2xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group cursor-pointer"
        on:click={() => onSelectCategory('desk-mats')}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && onSelectCategory('desk-mats')}
        use:reveal={{ delay: 100, duration: 700 }}
      >
        <div class="p-8 sm:p-10 pb-4">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono font-bold text-axelo-blue uppercase tracking-wider">
              {categories[0].subtitle}
            </span>
            <div class="w-8 h-8 rounded-full bg-axelo-neutral flex items-center justify-center text-axelo-dark group-hover:bg-axelo-dark group-hover:text-white transition-colors">
              <ArrowUpRight class="w-4 h-4" />
            </div>
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-axelo-dark tracking-tight mb-2">
            {categories[0].title}
          </h3>
          <p class="text-xs sm:text-sm text-axelo-muted max-w-md leading-relaxed">
            {categories[0].description}
          </p>
        </div>

        <div class="aspect-[16/10] overflow-hidden bg-axelo-neutral m-4 rounded-xl relative">
          <img
            src={categories[0].image}
            alt={categories[0].title}
            class="w-full h-full object-cover img-zoom-hover"
          />
          <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-axelo-dark">
            06 Studio Models
          </div>
        </div>
      </div>

      <!-- Right Column: 2 Stacked Categories (Span 5 cols) -->
      <div class="md:col-span-5 flex flex-col gap-6 lg:gap-8" use:reveal={{ delay: 180, duration: 700 }}>
        <!-- Keyboards Category -->
        <div
          id="category-keyboards"
          class="bg-white rounded-2xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group cursor-pointer flex-1"
          on:click={() => onSelectCategory('keyboards')}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && onSelectCategory('keyboards')}
        >
          <div class="p-6 sm:p-8 pb-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono font-bold text-axelo-muted uppercase tracking-wider">
                {categories[1].subtitle}
              </span>
              <div class="w-7 h-7 rounded-full bg-axelo-neutral flex items-center justify-center text-axelo-dark group-hover:bg-axelo-dark group-hover:text-white transition-colors">
                <ArrowUpRight class="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 class="text-xl font-bold text-axelo-dark tracking-tight">
              {categories[1].title}
            </h3>
            <p class="text-xs text-axelo-muted mt-1 leading-relaxed">
              {categories[1].description}
            </p>
          </div>

          <div class="aspect-[16/8] overflow-hidden bg-axelo-neutral m-4 mt-0 rounded-xl">
            <img
              src={categories[1].image}
              alt={categories[1].title}
              class="w-full h-full object-cover img-zoom-hover"
            />
          </div>
        </div>

        <!-- Precision Mice Category -->
        <div
          id="category-mice"
          class="bg-white rounded-2xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group cursor-pointer flex-1"
          on:click={() => onSelectCategory('mice')}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' && onSelectCategory('mice')}
        >
          <div class="p-6 sm:p-8 pb-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono font-bold text-axelo-muted uppercase tracking-wider">
                {categories[2].subtitle}
              </span>
              <div class="w-7 h-7 rounded-full bg-axelo-neutral flex items-center justify-center text-axelo-dark group-hover:bg-axelo-dark group-hover:text-white transition-colors">
                <ArrowUpRight class="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 class="text-xl font-bold text-axelo-dark tracking-tight">
              {categories[2].title}
            </h3>
            <p class="text-xs text-axelo-muted mt-1 leading-relaxed">
              {categories[2].description}
            </p>
          </div>

          <div class="aspect-[16/8] overflow-hidden bg-axelo-neutral m-4 mt-0 rounded-xl">
            <img
              src={categories[2].image}
              alt={categories[2].title}
              class="w-full h-full object-cover img-zoom-hover"
            />
          </div>
        </div>
      </div>

      <!-- Wide Bottom Banner: Desk Organization (Span 12 cols) -->
      <div
        class="md:col-span-12 bg-white rounded-2xl p-6 sm:p-8 border border-axelo-border/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer"
        on:click={() => onSelectCategory('organization')}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && onSelectCategory('organization')}
        use:reveal={{ delay: 240, duration: 700 }}
      >
        <div class="flex items-center gap-6">
          <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-axelo-neutral flex-shrink-0 border border-axelo-border">
            <img
              src={categories[3].image}
              alt={categories[3].title}
              class="w-full h-full object-cover img-zoom-hover"
            />
          </div>
          <div>
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-axelo-blue block mb-1">
              STRUCTURAL HARMONY
            </span>
            <h3 class="text-lg sm:text-2xl font-bold text-axelo-dark tracking-tight">
              {categories[3].title} & Magnetic Cable Routes
            </h3>
            <p class="text-xs sm:text-sm text-axelo-muted mt-1 max-w-xl">
              {categories[3].description}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-axelo-dark text-white text-xs font-semibold uppercase tracking-wider group-hover:bg-axelo-blue transition-colors flex-shrink-0">
          <span>Explore 08 Items</span>
          <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </div>
</section>
