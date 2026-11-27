<script lang="ts">
  import { page } from '$app/state';
  import { ArrowLeft, ArrowRight } from 'lucide-svelte';
</script>

<svelte:head>
  <title>{page.status === 404 ? 'Page Not Found' : 'Error'} | AXELO</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="min-h-[75vh] pt-36 pb-24 flex items-center bg-white">
  <div class="max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-6">
    <span class="inline-block font-mono text-xs uppercase tracking-[0.2em] text-axelo-blue font-semibold">
      {page.status || 404} // {page.status === 404 ? 'Not Found' : 'Unexpected Error'}
    </span>

    <h1 class="editorial-title text-4xl sm:text-5xl font-extrabold text-axelo-dark">
      {page.status === 404 ? 'This page could not be found.' : 'Something went wrong.'}
    </h1>

    <p class="text-sm sm:text-base text-axelo-muted leading-relaxed max-w-md mx-auto">
      {page.status === 404
        ? 'The product or page you requested is unavailable or no longer published.'
        : page.error?.message || 'An unexpected error occurred while loading this page.'}
    </p>

    <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
      <a
        href="/"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-axelo-border hover:border-axelo-dark text-xs sm:text-sm font-semibold text-axelo-dark transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Back to Home</span>
      </a>
      <a
        href="/products"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-axelo-dark hover:bg-axelo-blue text-white text-xs sm:text-sm font-semibold transition-colors"
      >
        <span>Explore Products</span>
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>
  </div>
</section>
