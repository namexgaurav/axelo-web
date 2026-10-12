<script lang="ts">
  import { ArrowRight, Check } from 'lucide-svelte';

  let email = '';
  let subscribed = false;

  function handleSubscribe(e: Event) {
    e.preventDefault();
    if (email) {
      subscribed = true;
      setTimeout(() => {
        email = '';
      }, 3000);
    }
  }
</script>

<footer class="bg-white border-t border-axelo-border pt-20 pb-12 text-axelo-dark">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <!-- Top Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-axelo-border">
      <!-- Col 1: Brand Manifesto & Newsletter -->
      <div class="md:col-span-5 space-y-6">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 bg-axelo-dark rounded-md flex items-center justify-center">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 2 22 8.5 22 12 13 15.5 22 22 22 12 2" fill="white" stroke="none" />
              <circle cx="12" cy="7" r="1.5" fill="#0052FF" />
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tight uppercase">AXELO</span>
        </div>
        <p class="text-sm text-axelo-muted max-w-sm leading-relaxed">
          AXELO engineers premium desk essentials, tactile mechanical hardware, and architectural workspace tools designed to quiet distraction and amplify deep output.
        </p>

        <!-- Newsletter -->
        <div class="pt-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-axelo-dark block mb-2">
            The AXELO Dispatch
          </span>
          <p class="text-xs text-axelo-muted mb-3">
            Receive hardware development logs, setup curation, and private release access.
          </p>
          {#if subscribed}
            <div class="flex items-center gap-2 py-2 px-3 bg-axelo-blueLight text-axelo-blue rounded-md text-xs font-medium">
              <Check class="w-4 h-4" />
              <span>You have been subscribed to the AXELO Dispatch.</span>
            </div>
          {:else}
            <form on:submit={handleSubscribe} class="flex items-center gap-2">
              <input
                type="email"
                bind:value={email}
                required
                placeholder="your.email@workspace.com"
                class="flex-1 px-3.5 py-2.5 bg-axelo-neutral text-xs rounded-md border border-axelo-border focus:border-axelo-blue focus:outline-none transition-colors"
              />
              <button
                type="submit"
                class="px-4 py-2.5 bg-axelo-dark hover:bg-axelo-blue text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <span>Join</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
            </form>
          {/if}
        </div>
      </div>

      <!-- Col 2: Hardware & Essentials -->
      <div class="md:col-span-2 space-y-4">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark">
          Hardware
        </h4>
        <ul class="space-y-2.5 text-xs text-axelo-muted">
          <li><a href="#products" class="hover:text-axelo-blue transition-colors">Studio Desk Mat Pro</a></li>
          <li><a href="#products" class="hover:text-axelo-blue transition-colors">Apex 75 Keyboard</a></li>
          <li><a href="#products" class="hover:text-axelo-blue transition-colors">Contour 58g Mouse</a></li>
          <li><a href="#products" class="hover:text-axelo-blue transition-colors">Aluminum Desk Shelf</a></li>
          <li><a href="#products" class="hover:text-axelo-blue transition-colors">Magnetic Cable System</a></li>
          <li><a href="#products" class="hover:text-axelo-blue transition-colors">Macropad & Dial</a></li>
        </ul>
      </div>

      <!-- Col 3: Brand & Editorial -->
      <div class="md:col-span-2 space-y-4">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark">
          Philosophy
        </h4>
        <ul class="space-y-2.5 text-xs text-axelo-muted">
          <li><a href="#philosophy" class="hover:text-axelo-blue transition-colors">Design Manifesto</a></li>
          <li><a href="#stories" class="hover:text-axelo-blue transition-colors">Acoustic Architecture</a></li>
          <li><a href="#stories" class="hover:text-axelo-blue transition-colors">Material Standards</a></li>
          <li><a href="#community" class="hover:text-axelo-blue transition-colors">Setup Gallery</a></li>
          <li><a href="#trust" class="hover:text-axelo-blue transition-colors">Quality Assurance</a></li>
        </ul>
      </div>

      <!-- Col 4: Service & Legal -->
      <div class="md:col-span-3 space-y-4">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-axelo-dark">
          Assurance
        </h4>
        <ul class="space-y-2.5 text-xs text-axelo-muted">
          <li><span class="text-axelo-dark font-medium">Global Express:</span> Carbon-neutral transit</li>
          <li><span class="text-axelo-dark font-medium">Warranty:</span> 2-Year Studio Hardware Guarantee</li>
          <li><span class="text-axelo-dark font-medium">Returns:</span> 30-Day Setup Trial Period</li>
          <li><span class="text-axelo-dark font-medium">Support:</span> support@axelo-studio.com</li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-axelo-muted">
      <div class="flex items-center gap-6">
        <span>© {new Date().getFullYear()} AXELO Technology Inc. All rights reserved.</span>
        <span class="hidden md:inline font-mono text-[10px] bg-axelo-neutral px-2 py-0.5 rounded border border-axelo-border">
          DEFINE YOUR OWN POWER.
        </span>
      </div>
      <div class="flex items-center gap-5">
        <a href="#privacy" class="hover:text-axelo-dark transition-colors">Privacy Policy</a>
        <a href="#terms" class="hover:text-axelo-dark transition-colors">Terms of Service</a>
        <a href="#compliance" class="hover:text-axelo-dark transition-colors">Hardware Compliance</a>
      </div>
    </div>
  </div>
</footer>
