<script lang="ts">
  import FallbackImage from '$lib/components/common/FallbackImage.svelte';
  import type { ProductImageView } from '$lib/types/website';

  export let images: ProductImageView[] = [];
  export let productName: string;
  export let badge: string | null = null;
  export let selectedOverrideUrl: string | null = null;

  let activeIndex = 0;

  $: if (selectedOverrideUrl) {
    const matchIdx = images.findIndex((img) => img.url === selectedOverrideUrl);
    if (matchIdx >= 0) {
      activeIndex = matchIdx;
    }
  }

  $: activeImage =
    images[activeIndex] ||
    (selectedOverrideUrl ? { id: 'override', url: selectedOverrideUrl, alt: productName, displayOrder: 0, isPrimary: true } : null) ||
    images[0] ||
    null;

  $: displaySrc = selectedOverrideUrl && !images.some((i) => i.url === selectedOverrideUrl)
    ? selectedOverrideUrl
    : activeImage?.url;
</script>

<div class="space-y-4">
  <div class="aspect-[4/3] bg-axelo-neutral rounded-2xl overflow-hidden border border-axelo-border relative">
    <FallbackImage
      src={displaySrc}
      alt={activeImage?.alt || productName}
      className="w-full h-full object-cover transition-all duration-300"
      loading="eager"
    />

    {#if badge}
      <div class="absolute top-4 left-4 bg-white/92 backdrop-blur-md text-axelo-dark border border-axelo-border px-3 py-1 rounded-md text-[11px] font-mono font-semibold uppercase tracking-[0.14em]">
        {badge}
      </div>
    {/if}
  </div>

  {#if images.length > 1}
    <div class="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Product gallery thumbnails">
      {#each images as img, idx (img.id)}
        <button
          type="button"
          on:click={() => {
            selectedOverrideUrl = null;
            activeIndex = idx;
          }}
          aria-label="View image {idx + 1} of {productName}"
          aria-pressed={activeIndex === idx && !selectedOverrideUrl}
          class="w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-axelo-neutral {activeIndex === idx && !selectedOverrideUrl
            ? 'border-axelo-blue shadow-subtle'
            : 'border-axelo-border hover:border-axelo-dark/50'}"
        >
          <FallbackImage src={img.url} alt={img.alt} className="w-full h-full object-cover" />
        </button>
      {/each}
    </div>
  {/if}
</div>
