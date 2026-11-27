<script lang="ts">
  import type { SeoMetadata } from '$lib/utils/seo';

  export let seo: SeoMetadata;
  export let jsonLd: Record<string, unknown> | null = null;
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <link rel="canonical" href={seo.canonicalUrl} />
  {#if seo.noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}

  <meta property="og:site_name" content="AXELO" />
  <meta property="og:type" content={seo.ogType || 'website'} />
  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.description} />
  <meta property="og:url" content={seo.canonicalUrl} />
  {#if seo.ogImage}
    <meta property="og:image" content={seo.ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={seo.ogImage} />
  {:else}
    <meta name="twitter:card" content="summary" />
  {/if}
  <meta name="twitter:title" content={seo.title} />
  <meta name="twitter:description" content={seo.description} />

  {#if jsonLd}
    {@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<\/script>`}
  {/if}
</svelte:head>
