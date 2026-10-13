<script lang="ts">
  import { authPromptOpen } from '$lib/stores/cart';
  import { X, ArrowRight, ShieldCheck } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  function handleSignIn() {
    authPromptOpen.set(false);
    goto('/login');
  }
</script>

{#if $authPromptOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
    <!-- Backdrop dismiss -->
    <button
      type="button"
      class="absolute inset-0 w-full h-full cursor-default"
      on:click={() => authPromptOpen.set(false)}
      aria-label="Close dialog"
    ></button>

    <!-- Modal Card -->
    <div class="relative w-full max-w-md bg-white border border-axelo-border rounded-xl shadow-2xl p-6 sm:p-8 z-10 animate-scaleUp">
      <button
        type="button"
        on:click={() => authPromptOpen.set(false)}
        class="absolute top-5 right-5 p-1.5 rounded-full text-axelo-muted hover:text-axelo-dark hover:bg-axelo-neutral transition-colors"
        aria-label="Close"
      >
        <X class="w-4 h-4" />
      </button>

      <div class="text-center">
        <div class="w-12 h-12 bg-axelo-dark rounded-xl mx-auto flex items-center justify-center mb-4 text-white">
          <ShieldCheck class="w-6 h-6 text-axelo-blue" />
        </div>

        <span class="eyebrow-text text-axelo-blue font-mono">Customer Authentication</span>
        <h2 class="text-xl font-bold tracking-tight text-axelo-dark uppercase mt-1">
          SIGN IN TO SAVE CART
        </h2>

        <p class="text-xs text-axelo-muted leading-relaxed mt-3">
          To maintain your persistent hardware selection across devices and proceed to checkout, please authenticate via instant Email or Mobile OTP.
        </p>

        <div class="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            on:click={handleSignIn}
            class="w-full py-3.5 px-6 rounded-lg bg-axelo-dark hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group shadow-sm"
          >
            <span>Sign In with OTP</span>
            <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            on:click={() => authPromptOpen.set(false)}
            class="w-full py-2.5 text-xs font-mono uppercase tracking-wider text-axelo-muted hover:text-axelo-dark transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
