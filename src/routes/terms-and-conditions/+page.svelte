<script lang="ts">
  import SeoHead from '$lib/components/common/SeoHead.svelte';
  import RichContent from '$lib/components/common/RichContent.svelte';
  import { buildCanonicalUrl } from '$lib/utils/seo';

  export let data;

  $: pageRecord = data.page;
  $: canonicalUrl = buildCanonicalUrl(data.origin, '/terms-and-conditions');
  $: seo = {
    title: pageRecord?.seoTitle || `${pageRecord?.title || 'Terms and Conditions'} | AXELO`,
    description:
      pageRecord?.seoDescription ||
      pageRecord?.excerpt ||
      'Terms and Conditions for the AXELO public website.',
    canonicalUrl,
    ogType: 'article' as const
  };
</script>

<SeoHead {seo} />

<section class="min-h-[70vh] pt-32 pb-24 bg-white">
  <div class="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
    <div class="space-y-4 pb-8 border-b border-axelo-border">
      <span class="eyebrow-text font-mono text-axelo-blue">Legal</span>
      <h1 class="editorial-title text-3xl sm:text-5xl font-extrabold text-axelo-dark">
        {pageRecord?.title || 'Terms and Conditions'}
      </h1>
      {#if pageRecord?.updatedAt}
        <p class="font-mono text-xs text-axelo-muted">
          Updated {new Date(pageRecord.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      {/if}
    </div>

    {#if pageRecord?.content}
      <RichContent content={pageRecord.content} />
    {:else}
      <div class="p-8 rounded-2xl border border-dashed border-axelo-border bg-axelo-offwhite space-y-2">
        <h2 class="text-base font-semibold text-axelo-dark">Terms and Conditions Currently Unavailable</h2>
        <p class="text-sm text-axelo-muted leading-relaxed">
          The published Terms and Conditions document has not yet been added to the website content repository. Please check back soon or <a href="/contact" class="text-axelo-blue underline">contact us</a> for assistance.
        </p>
      </div>
    {/if}
  </div>
</section>
