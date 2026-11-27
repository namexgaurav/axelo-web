<script lang="ts">
  import BrandLogo from '$lib/components/common/BrandLogo.svelte';
  import type { SiteGlobalData } from '$lib/types/website';

  export let site: SiteGlobalData;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  $: hasContactDetails = Boolean(site.contact.email || site.contact.phone || site.contact.location);
</script>

<footer class="bg-axelo-offwhite border-t border-axelo-border pt-16 pb-12 text-axelo-dark">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-axelo-border">
      <!-- Brand Summary -->
      <div class="md:col-span-5 space-y-5">
        <a href="/" class="inline-block group" aria-label="AXELO Home">
          <BrandLogo variant="dark" />
        </a>
        <p class="text-sm text-axelo-muted max-w-sm leading-relaxed">
          {site.footer.brandDescription}
        </p>
        {#if site.footer.tagline}
          <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-axelo-blue font-semibold">
            {site.footer.tagline}
          </p>
        {/if}
      </div>

      <!-- Navigation -->
      <div class="md:col-span-2 space-y-3.5">
        <h3 class="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-axelo-dark">
          Navigation
        </h3>
        <ul class="space-y-2.5 text-sm text-axelo-muted">
          {#each navLinks as link}
            <li>
              <a href={link.href} class="hover:text-axelo-dark transition-colors">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Legal & Info -->
      <div class="md:col-span-2 space-y-3.5">
        <h3 class="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-axelo-dark">
          Information
        </h3>
        <ul class="space-y-2.5 text-sm text-axelo-muted">
          <li><a href="/privacy-policy" class="hover:text-axelo-dark transition-colors">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions" class="hover:text-axelo-dark transition-colors">Terms &amp; Conditions</a></li>
        </ul>
      </div>

      <!-- Contact & Social (DB-managed when available) -->
      <div class="md:col-span-3 space-y-3.5">
        <h3 class="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-axelo-dark">
          Connect
        </h3>
        {#if hasContactDetails}
          <ul class="space-y-2 text-sm text-axelo-muted">
            {#if site.contact.email}
              <li>
                <a href="mailto:{site.contact.email}" class="hover:text-axelo-dark transition-colors">
                  {site.contact.email}
                </a>
              </li>
            {/if}
            {#if site.contact.phone}
              <li>{site.contact.phone}</li>
            {/if}
            {#if site.contact.location}
              <li>{site.contact.location}</li>
            {/if}
          </ul>
        {:else}
          <p class="text-sm text-axelo-muted">
            Questions about AXELO products? <a href="/contact" class="text-axelo-dark font-medium hover:text-axelo-blue underline underline-offset-4">Send us a message</a>.
          </p>
        {/if}

        {#if site.socialLinks.length > 0}
          <div class="flex flex-wrap items-center gap-3 pt-2">
            {#each site.socialLinks as social}
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                class="px-3 py-1.5 rounded-full border border-axelo-border bg-white text-xs font-medium text-axelo-dark hover:border-axelo-dark transition-colors"
              >
                {social.label}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Bottom Legal Bar -->
    <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-axelo-muted">
      <span>{site.footer.copyrightText}</span>
      <div class="flex items-center gap-6">
        <a href="/privacy-policy" class="hover:text-axelo-dark transition-colors">Privacy Policy</a>
        <a href="/terms-and-conditions" class="hover:text-axelo-dark transition-colors">Terms and Conditions</a>
      </div>
    </div>
  </div>
</footer>
