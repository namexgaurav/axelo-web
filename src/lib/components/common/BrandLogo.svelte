<script lang="ts">
  export let variant: 'dark' | 'light' = 'dark';
  export let showSubmark = true;
</script>

<span class="inline-flex items-center gap-2.5 select-none">
  <span
    class="w-7 h-7 rounded-md flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 {variant === 'dark'
      ? 'bg-axelo-dark border-axelo-dark text-white'
      : 'bg-white border-white/20 text-axelo-dark'}"
  >
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon
        points="12 3 3 21 8.5 21 12 13.5 15.5 21 21 21 12 3"
        fill="currentColor"
      />
      <circle cx="12" cy="8.5" r="1.5" fill="#0066FF" />
    </svg>
  </span>
  <span class="flex items-baseline gap-2">
    <span
      class="text-base sm:text-lg font-extrabold tracking-[-0.03em] uppercase {variant === 'dark'
        ? 'text-axelo-dark'
        : 'text-white'}"
    >
      AXELO
    </span>
    {#if showSubmark}
      <span
        class="hidden sm:inline-block text-[10px] font-mono tracking-[0.16em] uppercase pl-2 border-l {variant === 'dark'
          ? 'text-axelo-muted border-axelo-border'
          : 'text-white/60 border-white/20'}"
      >
        HARDWARE
      </span>
    {/if}
  </span>
</span>
