<script lang="ts">
  export let src: string | null | undefined = null;
  export let alt: string = 'AXELO product';
  export let className: string = 'w-full h-full object-cover';
  export let loading: 'eager' | 'lazy' = 'lazy';
  export let fallbackLabel: string = 'AXELO';

  let failed = false;

  $: if (src) {
    failed = false;
  }
</script>

{#if src && !failed}
  <img
    {src}
    {alt}
    {loading}
    decoding="async"
    class={className}
    on:error={() => (failed = true)}
  />
{:else}
  <div
    class="w-full h-full flex flex-col items-center justify-center bg-axelo-neutral text-axelo-muted relative overflow-hidden p-6 text-center"
    role="img"
    aria-label={alt}
  >
    <div class="absolute inset-0 axelo-grid-bg opacity-60 pointer-events-none"></div>
    <div class="relative z-10 flex flex-col items-center gap-2.5">
      <div class="w-10 h-10 rounded-xl bg-white border border-axelo-border flex items-center justify-center shadow-subtle">
        <svg class="w-5 h-5 text-axelo-dark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polygon points="12 3 3 21 8.5 21 12 13.5 15.5 21 21 21 12 3" fill="currentColor" />
          <circle cx="12" cy="8.5" r="1.5" fill="#0066FF" />
        </svg>
      </div>
      <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-axelo-graphite">
        {fallbackLabel}
      </span>
    </div>
  </div>
{/if}
