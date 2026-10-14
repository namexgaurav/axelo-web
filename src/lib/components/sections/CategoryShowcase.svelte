<script lang="ts">
  import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-svelte';
  import { categories } from '../../data/products';
  import { reveal } from '../../animations/reveal';

  export const onSelectCategory = (_categoryId: string) => {};
</script>


<section id="categories" class="py-28 md:py-40 bg-[#F7F7F5] border-y border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Header with Expansive Whitespace -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8" use:reveal={{ duration: 700 }}>
      <div>
        <div class="flex items-center gap-2 mb-3.5">
          <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
          <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-blue">
            CATEGORIES // 05
          </span>
        </div>
        <h2 class="editorial-title text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.04em] text-axelo-dark">
          Curated Product Systems.
        </h2>
      </div>
      <p class="text-sm sm:text-base text-axelo-muted max-w-md leading-relaxed">
        Every AXELO category is built with matching materials, finishes, and dimensions so individual components interlock seamlessly.
      </p>
    </div>

    <!-- Editorial Asymmetrical Category Layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
      <!-- Large Featured Category: Desk Mats (Span 7 cols) -->
      <a
        id="category-desk-mats"
        href="/collections/desk-mats"
        class="md:col-span-7 bg-white rounded-3xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
        use:reveal={{ delay: 100, duration: 700 }}
      >
        <div class="p-8 sm:p-12 pb-4">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono font-bold text-axelo-blue uppercase tracking-wider">
              {categories[0].subtitle}
            </span>
            <div class="w-9 h-9 rounded-full bg-axelo-neutral flex items-center justify-center text-axelo-dark group-hover:bg-axelo-dark group-hover:text-white transition-colors duration-200 shadow-2xs">
              <ArrowUpRight class="w-4 h-4" />
            </div>
          </div>
          <h3 class="text-2xl sm:text-4xl font-extrabold text-axelo-dark tracking-[-0.03em] mb-3">
            {categories[0].title}
          </h3>
          <p class="text-xs sm:text-sm text-axelo-muted max-w-md leading-relaxed">
            {categories[0].description}
          </p>
        </div>

        <div class="aspect-[16/10] overflow-hidden bg-axelo-neutral m-4 sm:m-6 mt-0 rounded-2xl relative border border-axelo-border/50">
          <img
            src={categories[0].image}
            alt={categories[0].title}
            class="w-full h-full object-cover img-zoom-hover"
          />
          <div class="absolute bottom-4 left-4 glass-panel px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-axelo-dark shadow-xs">
            06 Studio Models Available →
          </div>
        </div>
      </a>

      <!-- Right Column: 2 Stacked Categories (Span 5 cols) -->
      <div class="md:col-span-5 flex flex-col gap-6 lg:gap-8" use:reveal={{ delay: 180, duration: 700 }}>
        <!-- Keyboards Category -->
        <a
          id="category-keyboards"
          href="/collections/keyboards"
          class="bg-white rounded-3xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer flex-1"
        >
          <div class="p-6 sm:p-8 pb-3">
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-xs font-mono font-bold text-axelo-muted uppercase tracking-wider">
                {categories[1].subtitle}
              </span>
              <div class="w-8 h-8 rounded-full bg-axelo-neutral flex items-center justify-center text-axelo-dark group-hover:bg-axelo-dark group-hover:text-white transition-colors duration-200 shadow-2xs">
                <ArrowUpRight class="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-axelo-dark tracking-tight">
              {categories[1].title}
            </h3>
            <p class="text-xs text-axelo-muted mt-1 leading-relaxed">
              {categories[1].description}
            </p>
          </div>

          <div class="aspect-[16/8] overflow-hidden bg-axelo-neutral m-4 sm:m-6 mt-0 rounded-2xl border border-axelo-border/50">
            <img
              src={categories[1].image}
              alt={categories[1].title}
              class="w-full h-full object-cover img-zoom-hover"
            />
          </div>
        </a>

        <!-- Precision Mice Category -->
        <a
          id="category-mice"
          href="/collections/mice"
          class="bg-white rounded-3xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group cursor-pointer flex-1"
        >
          <div class="p-6 sm:p-8 pb-3">
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-xs font-mono font-bold text-axelo-muted uppercase tracking-wider">
                {categories[2].subtitle}
              </span>
              <div class="w-8 h-8 rounded-full bg-axelo-neutral flex items-center justify-center text-axelo-dark group-hover:bg-axelo-dark group-hover:text-white transition-colors duration-200 shadow-2xs">
                <ArrowUpRight class="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-axelo-dark tracking-tight">
              {categories[2].title}
            </h3>
            <p class="text-xs text-axelo-muted mt-1 leading-relaxed">
              {categories[2].description}
            </p>
          </div>

          <div class="aspect-[16/8] overflow-hidden bg-axelo-neutral m-4 sm:m-6 mt-0 rounded-2xl border border-axelo-border/50">
            <img
              src={categories[2].image}
              alt={categories[2].title}
              class="w-full h-full object-cover img-zoom-hover"
            />
          </div>
        </a>
      </div>

      <!-- Wide Bottom Banner: Desk Organization (Span 12 cols) -->
      <a
        href="/collections/organization"
        class="md:col-span-12 bg-white rounded-3xl p-6 sm:p-9 border border-axelo-border/80 shadow-subtle hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer"
        use:reveal={{ delay: 240, duration: 700 }}
      >
        <div class="flex items-center gap-6">
          <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-axelo-neutral flex-shrink-0 border border-axelo-border">
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
            <p class="text-xs sm:text-sm text-axelo-muted mt-1 max-w-xl leading-relaxed">
              {categories[3].description}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 px-6 py-3 rounded-xl bg-axelo-dark text-white text-xs font-semibold uppercase tracking-wider group-hover:bg-axelo-blue transition-colors flex-shrink-0 shadow-xs">
          <span>Explore 08 Items</span>
          <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </a>
    </div>
  </div>
</section>
