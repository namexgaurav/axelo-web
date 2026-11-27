<script lang="ts">
  import { enhance } from '$app/forms';
  import { CheckCircle2, AlertCircle, Mail, MapPin, Phone, Clock, Send } from 'lucide-svelte';
  import SeoHead from '$lib/components/common/SeoHead.svelte';
  import { buildCanonicalUrl } from '$lib/utils/seo';

  export let data;
  export let form;

  let submitting = false;

  $: contact = data.site.contact;
  $: socialLinks = data.site.socialLinks;
  $: hasInfo = Boolean(contact.email || contact.phone || contact.location || contact.hours || socialLinks.length > 0);

  $: canonicalUrl = buildCanonicalUrl(data.origin, '/contact');
  $: seo = {
    title: 'Contact AXELO | Get in Touch',
    description:
      contact.introDescription ||
      'Contact the AXELO team for product inquiries, partnerships, or support.',
    canonicalUrl,
    ogType: 'website' as const
  };
</script>

<SeoHead {seo} />

<section class="min-h-screen pt-32 pb-24 bg-white">
  <div class="max-w-7xl mx-auto px-5 sm:px-8">
    <div class="max-w-3xl space-y-4 pb-12 border-b border-axelo-border mb-14">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-axelo-blue"></span>
        <span class="eyebrow-text font-mono text-axelo-blue">Contact</span>
      </div>
      <h1 class="editorial-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-axelo-dark">
        {contact.introTitle || 'Get in Touch.'}
      </h1>
      <p class="text-base sm:text-lg text-axelo-muted leading-relaxed">
        {contact.introDescription ||
          'Have a question about AXELO products, availability, or brand partnerships? Send us a direct note below.'}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <!-- Left: Contact Details -->
      <div class="lg:col-span-5 space-y-8">
        <div class="p-7 sm:p-8 rounded-2xl bg-axelo-offwhite border border-axelo-border space-y-6">
          <h2 class="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-axelo-dark">
            Business Information
          </h2>

          {#if hasInfo}
            <ul class="space-y-4 text-sm text-axelo-graphite">
              {#if contact.email}
                <li class="flex items-start gap-3">
                  <Mail class="w-4 h-4 text-axelo-blue shrink-0 mt-0.5" />
                  <div>
                    <span class="block font-mono text-[10px] uppercase tracking-wider text-axelo-muted">Email</span>
                    <a href="mailto:{contact.email}" class="font-medium text-axelo-dark hover:text-axelo-blue transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </li>
              {/if}

              {#if contact.phone}
                <li class="flex items-start gap-3">
                  <Phone class="w-4 h-4 text-axelo-blue shrink-0 mt-0.5" />
                  <div>
                    <span class="block font-mono text-[10px] uppercase tracking-wider text-axelo-muted">Phone</span>
                    <span class="font-medium text-axelo-dark">{contact.phone}</span>
                  </div>
                </li>
              {/if}

              {#if contact.location}
                <li class="flex items-start gap-3">
                  <MapPin class="w-4 h-4 text-axelo-blue shrink-0 mt-0.5" />
                  <div>
                    <span class="block font-mono text-[10px] uppercase tracking-wider text-axelo-muted">Location</span>
                    <span class="font-medium text-axelo-dark">{contact.location}</span>
                  </div>
                </li>
              {/if}

              {#if contact.hours}
                <li class="flex items-start gap-3">
                  <Clock class="w-4 h-4 text-axelo-blue shrink-0 mt-0.5" />
                  <div>
                    <span class="block font-mono text-[10px] uppercase tracking-wider text-axelo-muted">Hours</span>
                    <span class="font-medium text-axelo-dark">{contact.hours}</span>
                  </div>
                </li>
              {/if}
            </ul>

            {#if socialLinks.length > 0}
              <div class="pt-4 border-t border-axelo-border space-y-3">
                <span class="block font-mono text-[10px] uppercase tracking-wider text-axelo-muted">
                  Social Channels
                </span>
                <div class="flex flex-wrap gap-2">
                  {#each socialLinks as social}
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-3.5 py-1.5 rounded-full bg-white border border-axelo-border hover:border-axelo-dark text-xs font-medium text-axelo-dark transition-colors"
                    >
                      {social.label}
                    </a>
                  {/each}
                </div>
              </div>
            {/if}
          {:else}
            <p class="text-sm text-axelo-muted leading-relaxed">
              Use the contact form to reach our team directly. All inquiries are reviewed and routed by the AXELO team.
            </p>
          {/if}
        </div>
      </div>

      <!-- Right: Contact Form -->
      <div class="lg:col-span-7">
        <div class="p-7 sm:p-10 rounded-3xl bg-white border border-axelo-border shadow-subtle">
          {#if form?.success}
            <div class="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2" role="status">
              <div class="flex items-center gap-2.5 font-semibold text-sm">
                <CheckCircle2 class="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Message Received</span>
              </div>
              <p class="text-sm text-emerald-800">{form.message}</p>
            </div>
          {:else}
            <form
              method="POST"
              use:enhance={() => {
                submitting = true;
                return async ({ update }) => {
                  await update();
                  submitting = false;
                };
              }}
              class="space-y-5"
              novalidate
            >
              <!-- Honeypot field for spam bots -->
              <div class="hidden" aria-hidden="true">
                <label for="website">Website</label>
                <input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
              </div>
              <input type="hidden" name="formLoadedAt" value={data.formLoadedAt} />

              {#if form?.errors?.form || (form?.success === false && form?.message && !form?.errors?.name && !form?.errors?.email && !form?.errors?.subject && !form?.errors?.message)}
                <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-2.5 text-sm" role="alert">
                  <AlertCircle class="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  <span>{form.errors?.form || form.message}</span>
                </div>
              {/if}

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label for="contact-name" class="block text-xs font-mono uppercase tracking-wider text-axelo-dark font-medium">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form?.values?.name ?? ''}
                    placeholder="Your name"
                    class="w-full px-4 py-3 rounded-xl border bg-axelo-offwhite focus:bg-white text-sm text-axelo-dark focus:outline-none transition-colors {form?.errors?.name
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-axelo-border focus:border-axelo-blue'}"
                  />
                  {#if form?.errors?.name}
                    <p class="text-xs text-red-700">{form.errors.name}</p>
                  {/if}
                </div>

                <div class="space-y-1.5">
                  <label for="contact-email" class="block text-xs font-mono uppercase tracking-wider text-axelo-dark font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form?.values?.email ?? ''}
                    placeholder="you@example.com"
                    class="w-full px-4 py-3 rounded-xl border bg-axelo-offwhite focus:bg-white text-sm text-axelo-dark focus:outline-none transition-colors {form?.errors?.email
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-axelo-border focus:border-axelo-blue'}"
                  />
                  {#if form?.errors?.email}
                    <p class="text-xs text-red-700">{form.errors.email}</p>
                  {/if}
                </div>
              </div>

              <div class="space-y-1.5">
                <label for="contact-subject" class="block text-xs font-mono uppercase tracking-wider text-axelo-dark font-medium">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={form?.values?.subject ?? ''}
                  placeholder="How can we help?"
                  class="w-full px-4 py-3 rounded-xl border bg-axelo-offwhite focus:bg-white text-sm text-axelo-dark focus:outline-none transition-colors {form?.errors?.subject
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-axelo-border focus:border-axelo-blue'}"
                />
                {#if form?.errors?.subject}
                  <p class="text-xs text-red-700">{form.errors.subject}</p>
                {/if}
              </div>

              <div class="space-y-1.5">
                <label for="contact-message" class="block text-xs font-mono uppercase tracking-wider text-axelo-dark font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Tell us about your inquiry..."
                  class="w-full px-4 py-3 rounded-xl border bg-axelo-offwhite focus:bg-white text-sm text-axelo-dark focus:outline-none transition-colors resize-y {form?.errors?.message
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-axelo-border focus:border-axelo-blue'}"
                >{form?.values?.message ?? ''}</textarea>
                {#if form?.errors?.message}
                  <p class="text-xs text-red-700">{form.errors.message}</p>
                {/if}
              </div>

              <button
                type="submit"
                disabled={submitting}
                class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-axelo-dark hover:bg-axelo-blue disabled:opacity-60 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
              >
                <Send class="w-4 h-4" />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
