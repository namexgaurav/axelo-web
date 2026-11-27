# AXELO Public Website — Work Tracker

**Last Updated:** 2026-11-27  
**Positioning:** Premium. Yet Affordable.  
**Purpose:** Brand showcase and product discovery website powered by Supabase + SvelteKit + Tailwind CSS + Cloudflare Pages (purchases redirect externally to Amazon).

---

## Phase Checklist

- [x] **Phase 0: Discovery & Live Schema Inspection**
  - Inspected workspace files, SvelteKit 3 + `@sveltejs/adapter-cloudflare` setup, Tailwind config, `.env`, `wrangler.jsonc`.
  - Audited legacy codebase: identified e-commerce/auth/cart/checkout routes and hardcoded `src/lib/data/products.ts` that must be removed.
  - Queried live Supabase (`https://gymjbdhxqdkljinhanmp.supabase.co`) using `PUBLIC_SUPABASE_ANON_KEY`.
  - Verified exact schema of all tables:
    - `products` (6 published rows; includes `amazon_url`, `amazon_button_label`, `brand_name`, `highlights`, `seo_og_image_path`, `specs`, `details`, `base_price`, `sale_price`, `currency`, etc.)
    - `categories` (4 active rows: `desk-mats`, `keyboards`, `mice`, `organization`)
    - `product_images` (10 rows; `storage_path` supports both full URLs and storage paths in `product-images` bucket)
    - `product_variants` (7 rows; columns: `id, product_id, name, color_hex, image_url, price_adjustment, stock_quantity, created_at`)
    - `site_content` (`content_key, content_value, description, is_published, created_at, updated_at` — currently 0 rows)
    - `site_pages` (`id, slug, title, content, excerpt, status, seo_title, seo_description, og_image_path, sort_order, created_at, updated_at, published_at` — currently 0 rows)
    - `site_media` (`id, storage_path, alt_text, width, height, display_order, is_active, media_type, created_at` — currently 0 rows)
    - `contact_messages` (`id, name, email, subject, message, status, created_at` — anon INSERT blocked by RLS `42501`, requires server-side endpoint using private `SUPABASE_SERVICE_ROLE_KEY` when configured)
    - Storage buckets verified: `product-images` and `site-media` both exist.

- [x] **Phase 1: Foundation, Types, Security & Cleanup**
  - Removed legacy e-commerce routes/stores (`cart`, `checkout`, `login`, `signup`, `account`, `auth`, `orders`, `addresses`, `collections`, `philosophy`, `stories`, `src/lib/data/products.ts`, `@supabase/ssr`).
  - Updated `src/lib/supabase/types.ts`, `client.ts`, `server.ts`, `storage.ts`.
  - Updated `src/hooks.server.ts` (public Supabase client, defense-in-depth security headers, `Cache-Control: public, max-age=0, must-revalidate` for HTML SSR responses).
  - Updated `src/app.d.ts`, `src/app.html`, `src/app.css`, `tailwind.config.js`, `.env.example`.

- [x] **Phase 2: Repositories & Services**
  - Implemented `product.repository.ts`, `category.repository.ts`, `content.repository.ts`, `page.repository.ts`, `media.repository.ts`.
  - Implemented `catalog.service.ts`, `site.service.ts`, `contact.service.ts`.
  - Implemented `url.ts`, `format.ts`, `seo.ts` utilities.

- [x] **Phase 3: Shared UI, Navigation & Public Pages**
  - Built shared components (`BrandLogo`, `FallbackImage`, `SeoHead`, `RichContent`).
  - Built navigation (`Header`, `MobileMenu`, `Footer`) driven by `site_content` and `site_pages`.
  - Built `/` homepage (Hero with GSAP entrance, Featured Products, Brand Philosophy, Brand Highlights, Closing CTA).
  - Built `/products` catalogue with dynamic category filters from DB, search, and clean empty states.
  - Built `/products/[slug]` detail page with gallery, highlights, specs, related products, factual JSON-LD, and validated Amazon CTA (`target="_blank"` + `rel="noopener noreferrer"`).
  - Built `/about`, `/contact` (with `/api/contact` + sliding-window rate limit + honeypot + server validation), `/privacy-policy`, `/terms-and-conditions`, dynamic `/[slug]` for future `site_pages`, plus `+error.svelte` (404/error page).

- [x] **Phase 4: SEO & Production Hardening**
  - Implemented `/sitemap.xml` (dynamically pulling published products & pages) and `/robots.txt` endpoints.
  - Added `prefers-reduced-motion` support, keyboard navigation, responsive mobile/tablet/desktop layouts, and fallback states.

- [x] **Phase 5: Verification & Build**
  - Updated `tests/unit.spec.ts` and `tests/e2e.spec.ts` for the public showcase architecture.
  - `npm run check`: 0 errors, 0 warnings.
  - `npm test` (Playwright Desktop Chromium & Mobile Viewport): 64/64 passed.
  - `npm run build` (`@sveltejs/adapter-cloudflare`): succeeded cleanly.
  - Verified live SSR routes against Supabase (`/` 200, `/products` 200, `/products/studio-desk-mat-pro` 200, `/about` 200, `/contact` 200, `/privacy-policy` 200, `/terms-and-conditions` 200, `/sitemap.xml` 200, `/robots.txt` 200, `/nonexistent-slug` 404).
