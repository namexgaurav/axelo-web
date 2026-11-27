<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';

  export let amazonUrl: string | null;
  export let label: string = 'Buy on Amazon';
  export let fullWidth: boolean = true;
</script>

{#if amazonUrl}
  <a
    href={amazonUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-axelo-dark hover:bg-axelo-blue text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-subtle group {fullWidth ? 'w-full' : ''}"
  >
    <span>{label || 'Buy on Amazon'}</span>
    <ExternalLink class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </a>
{:else}
  <button
    type="button"
    disabled
    aria-disabled="true"
    class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-axelo-neutral text-axelo-muted border border-axelo-border text-xs sm:text-sm font-medium cursor-not-allowed {fullWidth ? 'w-full' : ''}"
  >
    <span>Amazon Link Unavailable</span>
  </button>
{/if}
