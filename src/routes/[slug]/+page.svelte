<script lang="ts">
  import SeoHead from '$lib/components/common/SeoHead.svelte';
  import RichContent from '$lib/components/common/RichContent.svelte';
  import FallbackImage from '$lib/components/common/FallbackImage.svelte';
  import { buildCanonicalUrl } from '$lib/utils/seo';

  export let data;

  $: pageRecord = data.page;
  $: canonicalUrl = buildCanonicalUrl(data.origin, `/${pageRecord.slug}`);
  $: seo = {
    title: pageRecord.seoTitle || `${pageRecord.title} | AXELO`,
    description: pageRecord.seoDescription || pageRecord.excerpt || `${pageRecord.title} — AXELO`,
    canonicalUrl,
    ogType: 'article' as const,
    ogImage: pageRecord.ogImageUrl || null
  };
</script>

<SeoHead {seo} />

<section class="min-h-[70vh] pt-32 pb-24 bg-white">
  <div class="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
    <div class="space-y-4 pb-8 border-b border-axelo-border">
      <span class="eyebrow-text font-mono text-axelo-blue">AXELO</span>
      <h1 class="editorial-title text-3xl sm:text-5xl font-extrabold text-axelo-dark">
        {pageRecord.title}
      </h1>
      {#if pageRecord.excerpt}
        <p class="text-base text-axelo-muted leading-relaxed">{pageRecord.excerpt}</p>
      {/if}
    </div>

    {#if pageRecord.ogImageUrl}
      <div class="rounded-2xl overflow-hidden border border-axelo-border aspect-[16/9] bg-axelo-neutral">
        <FallbackImage src={pageRecord.ogImageUrl} alt={pageRecord.title} className="w-full h-full object-cover" />
      </div>
    {/if}

    {#if pageRecord.content}
      <RichContent content={pageRecord.content} />
    {/if}
  </div>
</section>
