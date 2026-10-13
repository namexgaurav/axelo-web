<script lang="ts">
  import { ArrowRight, Check, Sparkles } from 'lucide-svelte';

  let email = '';
  let subscribed = false;

  function handleSubscribe(e: Event) {
    e.preventDefault();
    if (email) {
      subscribed = true;
      setTimeout(() => {
        email = '';
      }, 4000);
    }
  }
</script>

<footer class="bg-white border-t border-axelo-border/80 pt-24 pb-14 text-axelo-dark">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Top Grid with Generous Spacing -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-axelo-border/70">
      <!-- Col 1: Brand Manifesto & Newsletter (Span 5 cols) -->
      <div class="md:col-span-5 space-y-7">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 bg-axelo-dark rounded-md flex items-center justify-center shadow-xs">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 2 22 8.5 22 12 13 15.5 22 22 22 12 2" fill="white" stroke="none" />
              <circle cx="12" cy="7" r="1.5" fill="#0052FF" />
            </svg>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-xl font-extrabold tracking-[-0.03em] uppercase">AXELO</span>
            <span class="text-[10px] font-mono text-axelo-muted border-l border-axelo-border pl-2">STUDIO</span>
          </div>
        </div>

        <p class="text-sm text-axelo-muted max-w-sm leading-relaxed">
          AXELO engineers premium desk essentials, tactile mechanical hardware, and architectural workspace tools designed to quiet distraction and amplify deep output.
        </p>

        <!-- Newsletter Subscription Card -->
        <div class="pt-2">
          <span class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark block mb-2">
            The AXELO Dispatch
          </span>
          <p class="text-xs text-axelo-muted mb-3.5 leading-relaxed">
            Receive hardware development logs, setup curation, and private release access. No marketing spam.
          </p>
          {#if subscribed}
            <div class="flex items-center gap-2.5 py-3 px-4 bg-axelo-blueLight text-axelo-blue rounded-xl text-xs font-semibold animate-fade-in border border-axelo-blue/20">
              <Check class="w-4 h-4 text-axelo-blue" />
              <span>You have been added to the AXELO Dispatch.</span>
            </div>
          {:else}
            <form on:submit={handleSubscribe} class="flex items-center gap-2 max-w-md">
              <input
                type="email"
                bind:value={email}
                required
                placeholder="your.email@workspace.com"
                class="flex-1 px-4 py-3 bg-axelo-neutral text-xs rounded-xl border border-axelo-border focus:border-axelo-blue focus:outline-none transition-all"
              />
              <button
                type="submit"
                class="px-5 py-3 bg-axelo-dark hover:bg-axelo-blue text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Join</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
            </form>
          {/if}
        </div>
      </div>

      <!-- Col 2: Hardware & Essentials (Span 2 cols) -->
      <div class="md:col-span-2 space-y-4">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark">
          Hardware
        </h4>
        <ul class="space-y-3 text-xs text-axelo-muted">
          <li><a href="/collections" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">All Collections & Store</a></li>
          <li><a href="/collections/desk-mats" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Desk Mats & Surfaces</a></li>
          <li><a href="/collections/keyboards" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Mechanical Keyboards</a></li>
          <li><a href="/collections/mice" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Precision Mice</a></li>
          <li><a href="/collections/organization" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Desk Organization</a></li>
          <li><a href="/products/studio-desk-mat-pro" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Flagship Mat Pro</a></li>
        </ul>
      </div>

      <!-- Col 3: Brand & Editorial (Span 2 cols) -->
      <div class="md:col-span-2 space-y-4">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark">
          Philosophy
        </h4>
        <ul class="space-y-3 text-xs text-axelo-muted">
          <li><a href="/philosophy" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Design Manifesto</a></li>
          <li><a href="/stories" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Acoustic Architecture</a></li>
          <li><a href="/philosophy" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Material Standards</a></li>
          <li><a href="/stories" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Field Notes & Journal</a></li>
          <li><a href="/collections" class="hover:text-axelo-dark hover:translate-x-0.5 transition-all inline-block">Shop All Products</a></li>
        </ul>
      </div>

      <!-- Col 4: Service & Standards (Span 3 cols) -->
      <div class="md:col-span-3 space-y-4">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark">
          Assurance
        </h4>
        <ul class="space-y-3 text-xs text-axelo-muted">
          <li><span class="text-axelo-dark font-medium">Global Express:</span> Carbon-neutral transit</li>
          <li><span class="text-axelo-dark font-medium">Warranty:</span> 2-Year Studio Hardware Guarantee</li>
          <li><span class="text-axelo-dark font-medium">Evaluation:</span> 30-Day Setup Trial Period</li>
          <li><span class="text-axelo-dark font-medium">Support:</span> support@axelo-studio.com</li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar with Clean Swiss Typography -->
    <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-axelo-muted">
      <div class="flex items-center gap-6">
        <span>© {new Date().getFullYear()} AXELO Technology Inc. All rights reserved.</span>
        <span class="hidden md:inline font-mono text-[10px] bg-axelo-neutral px-2.5 py-1 rounded-md border border-axelo-border/80 text-axelo-dark font-semibold">
          DEFINE YOUR OWN POWER.
        </span>
      </div>
      <div class="flex items-center gap-6 font-mono text-[10px]">
        <a href="#privacy" class="hover:text-axelo-dark transition-colors">PRIVACY POLICY</a>
        <a href="#terms" class="hover:text-axelo-dark transition-colors">TERMS OF SERVICE</a>
        <a href="#compliance" class="hover:text-axelo-dark transition-colors">COMPLIANCE</a>
      </div>
    </div>
  </div>
</footer>
