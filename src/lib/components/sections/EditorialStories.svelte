<script lang="ts">
  import { ArrowRight, BookOpen, Clock, X } from 'lucide-svelte';
  import { stories } from '../../data/products';
  import { reveal } from '../../animations/reveal';

  let activeModalStory: any = null;
</script>

<section id="stories" class="py-28 md:py-40 bg-[#F7F7F5] border-t border-axelo-border/70">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Header with Generous Whitespace -->
    <div class="max-w-2xl mb-16 md:mb-24" use:reveal={{ duration: 700 }}>
      <div class="flex items-center gap-2 mb-3.5">
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
        <span class="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-axelo-blue">
          EDITORIAL STORIES // 07
        </span>
        <span class="text-axelo-border">•</span>
        <span class="text-[11px] font-mono text-axelo-muted uppercase tracking-wider">MAGAZINE JOURNAL</span>
      </div>
      <h2 class="editorial-title text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-axelo-dark">
        Essays on Space & Craft.
      </h2>
      <p class="text-sm sm:text-base text-axelo-muted mt-4 leading-relaxed">
        Investigations into ergonomic posture, tactile acoustics, and the quiet beauty of purposeful tools.
      </p>
    </div>

    <!-- Magazine-style Spread -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <!-- Story 1: Prominent Feature with Pull Quote (Span 7 cols) -->
      <article
        class="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col justify-between"
        use:reveal={{ delay: 100, duration: 800 }}
      >
        <div class="aspect-[16/10] overflow-hidden bg-axelo-neutral relative">
          <img
            src={stories[0].image}
            alt={stories[0].title}
            class="w-full h-full object-cover img-zoom-hover"
          />
          <div class="absolute top-4 left-4 glass-panel px-3 py-1 rounded-md text-[10px] font-mono font-bold text-axelo-dark uppercase">
            {stories[0].eyebrow}
          </div>
        </div>

        <div class="p-8 sm:p-12">
          <div class="flex items-center gap-2 text-xs text-axelo-muted mb-3 font-mono">
            <Clock class="w-3.5 h-3.5" />
            <span>5 MIN READ</span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-extrabold text-axelo-dark tracking-tight mb-4 group-hover:text-axelo-blue transition-colors">
            {stories[0].title}
          </h3>

          <p class="text-xs sm:text-sm text-axelo-muted leading-relaxed mb-6">
            {stories[0].summary}
          </p>

          {#if stories[0].quote}
            <blockquote class="pl-5 border-l-2 border-axelo-blue my-6 text-sm sm:text-base font-medium italic text-axelo-dark leading-relaxed">
              "{stories[0].quote}"
            </blockquote>
          {/if}

          <div class="flex items-center justify-between pt-5 border-t border-axelo-border/60 text-xs">
            <span class="text-axelo-muted font-mono text-[11px]">{stories[0].author}</span>
            <button
              type="button"
              on:click={() => (activeModalStory = stories[0])}
              class="font-semibold text-axelo-dark group-hover:text-axelo-blue flex items-center gap-1.5 transition-colors"
            >
              <span>Read Essay</span>
              <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </article>

      <!-- Story 2: Secondary Editorial Feature (Span 5 cols) -->
      <article
        class="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-axelo-border/80 shadow-subtle hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col justify-between"
        use:reveal={{ delay: 200, duration: 800 }}
      >
        <div class="aspect-[4/3] overflow-hidden bg-axelo-neutral relative">
          <img
            src={stories[1].image}
            alt={stories[1].title}
            class="w-full h-full object-cover img-zoom-hover"
          />
          <div class="absolute top-4 left-4 glass-panel px-3 py-1 rounded-md text-[10px] font-mono font-bold text-axelo-dark uppercase">
            {stories[1].eyebrow}
          </div>
        </div>

        <div class="p-7 sm:p-9">
          <div class="flex items-center gap-2 text-xs text-axelo-muted mb-3 font-mono">
            <Clock class="w-3.5 h-3.5" />
            <span>4 MIN READ</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-axelo-dark tracking-tight mb-3 group-hover:text-axelo-blue transition-colors">
            {stories[1].title}
          </h3>

          <p class="text-xs sm:text-sm text-axelo-muted leading-relaxed mb-6">
            {stories[1].summary}
          </p>

          <div class="flex items-center justify-between pt-5 border-t border-axelo-border/60 text-xs">
            <span class="text-axelo-muted font-mono text-[11px]">MATERIALS LAB</span>
            <button
              type="button"
              on:click={() => (activeModalStory = stories[1])}
              class="font-semibold text-axelo-dark group-hover:text-axelo-blue flex items-center gap-1.5 transition-colors"
            >
              <span>Read Essay</span>
              <ArrowRight class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>

  <!-- Story Reader Modal with Accessible Esc Handling -->
  {#if activeModalStory}
    <div
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      on:click={(e) => { if (e.target === e.currentTarget) activeModalStory = null; }}
      on:keydown={(e) => e.key === 'Escape' && (activeModalStory = null)}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div
        class="bg-white rounded-3xl max-w-2xl w-full p-7 sm:p-12 max-h-[85vh] overflow-y-auto relative shadow-2xl"
      >
        <button
          type="button"
          on:click={() => (activeModalStory = null)}
          class="absolute top-6 right-6 text-axelo-muted hover:text-axelo-dark text-xs font-bold font-mono px-2.5 py-1.5 bg-axelo-neutral rounded-lg flex items-center gap-1"
        >
          <X class="w-3.5 h-3.5" />
          <span>ESC</span>
        </button>

        <span class="text-[10px] font-mono uppercase tracking-wider text-axelo-blue block mb-2 font-bold">
          {activeModalStory.eyebrow}
        </span>
        <h3 class="text-2xl sm:text-4xl font-extrabold text-axelo-dark tracking-tight mb-4">
          {activeModalStory.title}
        </h3>
        <p class="text-xs sm:text-sm text-axelo-muted leading-relaxed mb-6">
          {activeModalStory.summary}
        </p>
        <div class="rounded-2xl overflow-hidden mb-8 aspect-[16/9]">
          <img src={activeModalStory.image} alt={activeModalStory.title} class="w-full h-full object-cover" />
        </div>
        <div class="prose text-xs sm:text-sm text-axelo-dark space-y-4 leading-relaxed font-sans">
          <p>
            Modern workspaces are overwhelmingly flooded with disposable plastics, uncalibrated spring tensions, and noisy visual clutter. When every surface around your computer reflects poor craftsmanship, cognitive strain multiplies without your awareness.
          </p>
          <p>
            At AXELO, we start with raw aerospace billets of 6063 aluminum and sustainably harvested Merino wool. The acoustic absorption of our 4mm felt cushions each stroke of the Apex 75, while the non-slip hexagonal backing ensures your desk mat stays locked even during intense focus periods.
          </p>
          <p>
            When your physical setup respects your attention, you define your own power.
          </p>
        </div>
      </div>
    </div>
  {/if}
</section>
