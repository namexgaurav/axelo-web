# AXELO E-Commerce Platform — Supabase Authentication, Customer Accounts, Cart, Checkout & Future Admin Architecture

## 1. Your Role

Act as a senior full-stack engineer, Supabase architect, database designer, security engineer, and premium e-commerce UX specialist.

Your task is to integrate Supabase into the existing AXELO website and transform it into a secure, scalable, production-oriented e-commerce platform.

Do not simply create a login page and connect a database. Design the entire foundation so that AXELO can grow from a product showcase website into a complete e-commerce business with customer accounts, product management, inventory, offers, orders, and a future admin dashboard.

Work directly with the existing project. First inspect its architecture, dependencies, routing, design system, and current components. Preserve the existing visual identity and working features.

Do not rebuild the website unnecessarily, introduce a second frontend framework, or replace working code without a clear reason.

---

## 2. Project Overview

**Brand:** AXELO

**Brand positioning:** Premium, modern, minimal, professional, accessible technology and desk-accessory brand.

**Brand tagline:** DEFINE YOUR OWN POWER.

**Business:** Selling desk setup and computer accessories, including mouse pads, keyboards, mice, cable-management accessories, and future related products.

**Frontend stack:**
- Svelte
- TypeScript
- Tailwind CSS
- Existing routing and component architecture, retained wherever practical

**Backend platform:** Supabase

**Required Supabase services:**
- Supabase Authentication
- PostgreSQL database
- Row Level Security (RLS)
- Supabase Storage
- Database migrations
- Database functions or secure server-side functions where required

Use the existing Svelte framework and its appropriate rendering/runtime conventions. If the project uses SvelteKit, use its server-side routes, server load functions, hooks, and form actions where appropriate. If it uses a different Svelte setup, adapt the architecture to that project instead of forcing a migration.

### Primary objective

Implement a complete customer authentication and shopping foundation that works now and supports a future admin panel without major architectural changes.

### Important constraints

1. Visitors can browse publicly available products and content.
2. Only authenticated users can add products to a persistent cart.
3. Only authenticated users can access checkout and place orders.
4. Authentication must be verified securely, not merely inferred from frontend state.
5. Product data, pricing, stock, offers, and homepage content must come from the database rather than hardcoded component arrays.
6. Customers must never be able to grant themselves administrator privileges.
7. Do not expose Supabase service-role keys or other privileged secrets in browser code.
8. Do not create fake authentication, mock checkout success, or pretend an order has been placed when the backend operation fails.

---

# 3. Phase One: Inspect and Plan the Existing Project

Before writing implementation code:

1. Inspect the complete project structure.
2. Identify the Svelte version, TypeScript configuration, routing system, package manager, and build tool.
3. Review the existing homepage, product pages, header, footer, navigation, and responsive layouts.
4. Identify reusable buttons, inputs, modals, cards, icons, and typography styles.
5. Check whether authentication, cart state, product data, or database integration already exists.
6. Inspect existing environment variable conventions.
7. Identify potential server-side and client-side rendering issues.
8. Review current dependencies and avoid installing duplicate libraries.
9. Identify which existing pages need modification and which new routes are required.

Create a concise implementation plan and proposed database schema before making major changes.

Keep existing designs, animations, transitions, whitespace, and brand styling intact unless a specific change is necessary.

Do not stop after producing a plan. Proceed with implementation in logical stages, validating each stage before continuing.

---

# 4. Supabase Project Setup

Integrate the existing website with Supabase using the official Supabase client libraries appropriate to the installed Svelte environment.

Configure:

- Supabase project URL
- Supabase publishable/anonymous client key as appropriate
- Authentication configuration
- Database access
- Storage buckets
- Database migrations
- RLS policies
- Server-side operations for privileged tasks

Create a clean Supabase integration module instead of initializing the client independently throughout the application.

Suggested organization, adapted to the existing project:

src/
  lib/
    supabase/
      client.ts
      types.ts
    auth/
      auth.service.ts
      auth.store.ts
      auth.validation.ts
    products/
      product.service.ts
      product.types.ts
    cart/
      cart.service.ts
      cart.store.ts
    addresses/
      address.service.ts
    orders/
      order.service.ts
    components/
      auth/
      cart/
      account/
      checkout/
  routes/
    login/
    signup/
    account/
    cart/
    checkout/
    orders/

This is a conceptual structure, not a requirement to reorganize the entire existing application.

### Environment variables

Provide an `.env.example` file containing placeholder values for the variables actually used by the project.

For example:

PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_PUBLISHABLE_KEY=

Use the framework's supported public environment-variable mechanism. Do not assume every Svelte project uses the same environment variable syntax.

If a server-side privileged operation requires a secret key, use a server-only environment variable and keep it entirely out of browser bundles.

Never commit real credentials, API secrets, OTP provider secrets, or production keys.

Document the setup steps in the project README.

---

# 5. Authentication System

Implement complete email OTP and mobile OTP authentication using Supabase Auth.

The experience should support both new and returning customers.

## 5.1 Authentication methods

### A. Email OTP

Users should be able to:

1. Enter their email address.
2. Request a one-time verification code.
3. Receive the OTP through their email.
4. Enter the code on a dedicated verification screen.
5. Verify the code with Supabase.
6. Create a new account if this is their first successful authentication.
7. Sign in if they already have an account.
8. Be redirected to the appropriate destination after authentication.

Use Supabase's email OTP flow with the appropriate `signInWithOtp` and `verifyOtp` methods.

Configure email templates to deliver an actual OTP code, rather than relying on a magic link when the requested experience is code-based.

Clearly display the email address to which the code was sent.

### B. Mobile OTP

Users should be able to:

1. Select their country code.
2. Enter their mobile number.
3. Request an SMS OTP.
4. Receive a real verification code through the configured SMS provider.
5. Enter the code.
6. Verify their phone number.
7. Sign in or create an account as appropriate.
8. Continue to their intended destination.

Use Supabase's phone authentication flow with `signInWithOtp` and `verifyOtp` configured for phone verification.

Default the country selector to India (+91), while allowing other supported country codes.

Normalize phone numbers consistently and validate them before sending OTP requests.

### SMS and email provider setup

Document the provider requirements.

- Email OTP requires correctly configured Supabase email delivery.
- Phone OTP requires an enabled SMS provider and valid provider credentials.
- Explain any provider-specific sender, template, or Indian SMS compliance requirements that apply.
- Never simulate a successful OTP delivery when the provider is not configured.

If the production SMS provider is unavailable, report the configuration requirement clearly rather than creating a fake working flow.

## 5.2 Authentication UI

Create a premium authentication experience consistent with AXELO's design language.

Required screens:

- Sign in
- Create account / first-time authentication
- Enter email OTP
- Enter mobile OTP
- Resend OTP
- Change email or phone number
- Authentication error state
- Successful verification state

Use a simple segmented control or equivalent interface to switch between Email and Mobile.

Keep the screens uncluttered, with refined typography, generous whitespace, clear labels, subtle borders, restrained motion, and accessible contrast.

Include:

- Loading indicators
- Disabled buttons during requests
- Inline validation
- OTP input validation
- Resend countdown
- Clear error messages
- Expired-code handling
- Invalid-code handling
- Network-error handling
- Duplicate-request prevention
- Keyboard navigation and focus management
- Mobile-friendly layouts

Do not expose whether a particular private account exists through unnecessarily revealing error messages.

### OTP rules

- Never log OTP values.
- Never store OTP values in the application's database.
- Use Supabase's verification mechanisms rather than creating an independent OTP implementation.
- Respect provider rate limits and authentication throttling.
- Prevent repeated OTP requests from creating confusing UI states.
- Keep resend behavior consistent with the configured Supabase/provider limits.

## 5.3 Session management

Implement secure authentication session handling.

Requirements:

- Maintain the correct authenticated state across navigation and page refreshes.
- Listen for Supabase authentication state changes.
- Avoid duplicate session subscriptions.
- Handle expired or invalid sessions.
- Provide a proper sign-out action.
- Ensure the account menu updates immediately after login or logout.
- Handle server-side rendering without accessing browser-only APIs on the server.
- Avoid briefly displaying authenticated-only content to an unauthenticated user during initialization.
- Ensure server-side protected routes validate the session using supported Supabase authentication APIs.

For a SvelteKit project, use a supported server-side session approach and secure cookies where appropriate. Follow current Supabase SSR guidance rather than assuming that browser local storage alone is sufficient for server-protected routes.

Do not treat a client-side store or hidden UI element as a security boundary.

---

# 6. Customer Profile and Account Management

A successfully authenticated user must have a customer profile.

Design the profile system so that authentication identity and customer business data remain separate.

Use Supabase Auth as the source of truth for identity, and a separate `profiles` table for customer information.

## 6.1 Customer profile fields

Include:

- User ID linked to `auth.users`
- Full name
- Display name, if needed
- Email address, where available
- Phone number, where available
- Profile completion status
- Created timestamp
- Updated timestamp

Use the authenticated Supabase user ID as the profile's primary key.

Create the profile automatically after the user's first successful authentication, using a secure and idempotent mechanism.

If a database trigger is used, ensure it handles repeated events safely and does not block account creation unnecessarily.

Do not assume that email and phone will always be present or verified at the same time.

Treat authentication metadata as optional input, not as a trusted source of authorization.

## 6.2 First-time customer onboarding

After the first successful OTP verification, determine whether the customer's profile is complete.

If the customer is new or has incomplete details, show a profile completion screen asking for:

- Full name
- Email, if not already provided
- Mobile number, if not already provided
- Any other essential information required by the checkout flow

Clearly distinguish verified contact information from information that the customer has merely entered.

Do not force users to enter the same information again if it is already available and verified.

Allow users to complete their profile later where it does not block checkout requirements.

## 6.3 Account dashboard

Create an account area with the following sections:

- Overview
- Personal information
- Saved addresses
- My orders
- Order details
- Sign out

Use a premium, uncluttered account layout with responsive navigation.

Provide edit and save actions, loading states, field validation, and confirmation messages.

Allow customers to update their own profile only. Do not let customers change their own role, account permissions, or privileged metadata.

---

# 7. Address Management

Build a proper address-management system rather than storing a single unstructured address string.

Create an `addresses` table containing:

- Address ID
- Customer user ID
- Recipient full name
- Recipient phone number
- Address label, such as Home or Work
- Address line 1
- Address line 2, optional
- Landmark, optional
- City
- State
- Postal/PIN code
- Country code
- Default-address flag
- Created timestamp
- Updated timestamp

Use UUIDs for address identifiers where appropriate.

## Required functionality

Customers must be able to:

- Add a new delivery address.
- Edit an existing address.
- Delete an address.
- View saved addresses.
- Select a default address.
- Select an address during checkout.
- Save a new address during checkout.
- Use different addresses for different orders.

For the Indian market, validate PIN-code format, state, city, and phone number appropriately without making the form unnecessarily restrictive.

If external address lookup is not configured, do not pretend that a PIN code automatically verifies an address.

Ensure that customers can only read, create, update, or delete their own addresses.

If an address is used in a placed order, preserve the historical shipping details in the order record even if the customer later edits or deletes their saved address.

---

# 8. Product Database Architecture

All product data must be managed through Supabase.

Do not hardcode the product catalog, pricing, homepage hero products, or promotional offers into the frontend.

The database must support the future admin panel without requiring a complete schema redesign.

Create appropriate tables and relationships.

## 8.1 Products

Suggested `products` table:

- `id`
- `name`
- `slug`
- `short_description`
- `description`
- `sku`
- `category_id`
- `status`
- `base_price`
- `sale_price`, nullable
- `currency`
- `stock_quantity`
- `track_inventory`
- `is_featured`
- `is_new_arrival`
- `is_best_seller`
- `sort_order`
- `seo_title`
- `seo_description`
- `created_at`
- `updated_at`
- `published_at`

Use suitable PostgreSQL types and constraints. Store prices as integer minor units or an appropriately precise numeric type, and be consistent throughout the application.

For Indian pricing, support INR and format amounts using Indian currency formatting.

Treat publication status as an explicit field, such as draft, published, or archived.

Only published products should be publicly visible.

The frontend must display only fields intended for public consumption.

## 8.2 Product categories

Create a `categories` table with fields such as:

- ID
- Name
- Slug
- Description
- Image
- Parent category, optional
- Sort order
- Active status
- Created timestamp
- Updated timestamp

Support future categories such as mouse pads, keyboards, mice, desk accessories, and new product categories.

Do not hardcode the available category list into the UI.

## 8.3 Product images

Create a `product_images` table containing:

- Image ID
- Product ID
- Storage path
- Alt text
- Display order
- Primary-image flag
- Created timestamp

Use Supabase Storage for the actual image files.

Design the system to support:

- Main product image
- Gallery images
- Thumbnail images
- Future variant-specific images

Use storage paths and database records rather than manually maintained external image URLs.

Do not expose unpublished product images through public access policies.

## 8.4 Product variants

Design for products that may have sizes, colors, thicknesses, or other options.

Use a `product_variants` table if the current catalog or future product roadmap requires variants.

Suggested fields:

- Variant ID
- Product ID
- Variant name
- SKU
- Price override, optional
- Sale price override, optional
- Stock quantity
- Active status
- Variant attributes stored in a structured JSONB field where appropriate

Keep product-level and variant-level pricing rules unambiguous.

A customer must not be able to submit a fabricated variant ID, price, or stock quantity and bypass server-side validation.

## 8.5 Public product queries

Create reusable product service functions for:

- Listing published products
- Getting a product by slug
- Getting latest arrivals
- Getting featured products
- Getting best sellers
- Getting products by category
- Searching products
- Filtering and sorting products
- Retrieving related products

Use pagination and appropriate indexes.

Do not fetch the entire catalog on every page load.

Use reusable TypeScript types and validate data at important boundaries.

---

# 9. Homepage Content and Future Admin-Managed Sections

AXELO's homepage must be database-driven.

Design a flexible system so that an administrator can eventually manage the following without a developer editing frontend components:

- Hero banners
- Hero products
- Featured products
- Latest arrivals
- Best sellers
- Promotional offers
- Discount campaigns
- Product categories
- Announcement bar
- Promotional strips
- Homepage sections
- Section ordering
- Section visibility
- Call-to-action labels and destinations
- Supporting text and marketing content

## 9.1 Hero banners

Create a `banners` table with fields such as:

- ID
- Internal name
- Headline
- Subtitle
- Image storage path
- Mobile image path, optional
- CTA label
- CTA destination
- Placement
- Display order
- Active status
- Start time
- End time
- Created timestamp
- Updated timestamp

Support scheduling and automatic exclusion of expired or inactive banners.

Validate destinations to avoid unsafe redirect behavior.

## 9.2 Homepage sections

Create a `homepage_sections` table with fields such as:

- ID
- Section key
- Section title
- Section subtitle
- Section type
- Display order
- Active status
- Configuration stored as validated JSONB where useful
- Created timestamp
- Updated timestamp

The section type could represent hero, featured products, latest arrivals, categories, offers, or editorial content.

Create reusable frontend section components that render data according to the section type.

Do not execute arbitrary HTML or JavaScript from database content.

Validate section configuration and use an allowlist of supported section types.

## 9.3 Offers and discounts

Create a dedicated `offers` table rather than embedding all promotional logic in product descriptions.

Support future offers such as:

- Percentage discounts
- Fixed-amount discounts
- Product-specific promotions
- Category-specific promotions
- Coupon codes
- Minimum cart value
- Maximum discount
- Start and expiry times
- Usage limits
- Per-customer limits
- Active/inactive status

Keep eligibility rules explicit and validated.

Do not rely on frontend calculations to determine the final payable amount.

If offers are not yet implemented in the checkout, establish the database foundation and a clear extension point without displaying fake discounts.

---

# 10. Shopping Cart

Implement a persistent, user-specific cart.

A guest may browse products, but adding items to the cart must require authentication.

## 10.1 Cart database

Create a `carts` table with:

- Cart ID
- Customer user ID
- Created timestamp
- Updated timestamp

Create a `cart_items` table with:

- Cart item ID
- Cart ID
- Product ID
- Product variant ID, nullable
- Quantity
- Created timestamp
- Updated timestamp

Use appropriate foreign keys and uniqueness constraints to prevent duplicate entries for the same product/variant in a cart.

Ensure quantities are positive integers and reject invalid values.

A user should have one active cart at a time unless the business explicitly requires multiple carts.

## 10.2 Cart behavior

Implement the following:

- Add a product to cart.
- Increase quantity.
- Decrease quantity.
- Remove an item.
- Clear the cart.
- View the cart.
- Display item quantity and subtotal.
- Display the estimated total.
- Show a cart-item count in the website header.
- Handle out-of-stock products.
- Handle products that become unavailable.
- Revalidate pricing and stock before checkout.

Fetch current product prices from the database when calculating displayed cart totals.

Do not trust client-supplied prices or totals.

Cart rows must be protected by RLS so that a customer can only access their own cart and its items.

Validate ownership across related records, not merely the cart ID supplied by the browser.

## 10.3 Authentication enforcement

When a logged-out visitor clicks Add to Cart:

1. Do not create an unauthorized persistent cart entry.
2. Open the AXELO login interface or redirect to login.
3. Preserve the intended destination and selected product where appropriate.
4. After successful authentication, return the customer to the product page or cart.
5. Allow them to add the product after authentication.

If implementing temporary guest cart behavior later, keep it separate from the persistent authenticated cart and explicitly validate any merge operation.

Do not silently discard cart contents or create duplicate quantities during login.

---

# 11. Checkout and Order Placement

Implement a functional order-creation workflow with a clear separation between cart management and order placement.

Checkout must be available only to authenticated customers.

## 11.1 Checkout page

Include:

- Customer contact information
- Delivery address selection
- Add-address form
- Order summary
- Product images and names
- Selected variants
- Quantities
- Item subtotals
- Discounts, when implemented
- Shipping charges, when configured
- Final payable amount
- Payment method selection when supported
- Place Order button

Validate required fields and prevent repeated submissions.

Show a clear summary before final confirmation.

## 11.2 Database tables

Create an `orders` table containing fields such as:

- Order ID
- Human-readable order number
- Customer user ID
- Order status
- Payment status
- Currency
- Item subtotal
- Discount amount
- Shipping amount
- Tax amount, if applicable
- Final total
- Shipping address snapshot
- Customer contact snapshot
- Payment provider reference, nullable
- Created timestamp
- Updated timestamp

Create an `order_items` table containing:

- Order item ID
- Order ID
- Product ID, nullable if product deletion must not break historical records
- Variant ID, nullable
- Product name snapshot
- SKU snapshot
- Selected variant snapshot
- Unit price snapshot
- Quantity
- Line subtotal

Preserve historical product names, prices, and shipping details even when the original product or address changes later.

Use an explicit order status lifecycle, for example:

- pending
- confirmed
- processing
- shipped
- delivered
- cancelled

Payment status should be separate, for example:

- pending
- paid
- failed
- refunded

Define allowed status transitions instead of permitting arbitrary status changes from the frontend.

## 11.3 Secure order creation

Order creation must be handled by a trusted server-side endpoint or a carefully designed PostgreSQL function with transactional behavior.

The operation must:

1. Verify the authenticated user.
2. Load the user's cart and items.
3. Validate that the selected address belongs to the user.
4. Load current product and variant records.
5. Confirm that all products are published and purchasable.
6. Validate quantities and stock availability.
7. Recalculate product prices, discounts, shipping, and totals using trusted data.
8. Reject invalid or expired offers.
9. Create the order.
10. Create order-item snapshots.
11. Update inventory safely if the business workflow requires inventory reservation or deduction at order placement.
12. Clear or update the cart only after successful order creation.
13. Return the created order details.

Use a database transaction or equivalent atomic operation so a partial order is not created if any step fails.

Prevent overselling by using transactional stock checks and safe inventory updates.

Implement idempotency for order submissions to avoid duplicate orders caused by double-clicks, network retries, or repeated requests.

Do not accept a final order total, payment status, discount amount, or unit price as trusted input from the browser.

If no payment gateway is configured yet, implement a clearly defined payment integration boundary. Do not mark an order as paid merely because the order-creation endpoint succeeded.

Never simulate payment success.

## 11.4 Payment gateway readiness

Prepare the architecture for a future Indian payment gateway such as Razorpay or another supported provider.

Do not implement a fake payment flow.

When payment integration is introduced, require trusted payment-order creation, signature verification, webhook verification, idempotent payment updates, and reconciliation.

Never store raw card details.

## 11.5 Order confirmation and history

After successful order creation:

- Show a confirmation page.
- Display the order number.
- Display a summary of purchased items.
- Display payment status and order status.
- Link to the order details page.
- Send the customer to their order history.

Implement account routes for listing previous orders and viewing individual orders.

Customers must only be able to access orders belonging to their own user ID.

---

# 12. Future Admin Panel — Design the Foundation Now

The admin panel will be developed in a later phase, but the current database and security architecture must already support it.

Do not hardcode administrative data in the frontend.

Do not give the first authenticated customer administrative privileges.

## 12.1 Role and permissions

Create a secure role-management model.

For example:

`user_roles`
- ID
- User ID
- Role
- Created timestamp

Initially support roles such as:

- customer
- admin

Keep role assignment restricted to a trusted administrative process.

Never allow a customer to change their own role through profile updates, client-side metadata, or direct table access.

Use RLS and trusted server-side authorization checks for all privileged operations.

For high-risk operations, such as refunds, inventory changes, and publishing products, verify authorization on the server even if the admin UI already hides those controls.

## 12.2 Future admin capabilities

Design the schema and service layer to support:

### Dashboard
- Total orders
- Revenue summaries
- Recent orders
- Low-stock products
- Top-selling products
- Customer statistics

### Product management
- Create product
- Edit product
- Delete or archive product
- Publish or unpublish product
- Upload product images
- Manage categories
- Manage SKUs
- Manage variants
- Set prices and discounts
- Update inventory

### Homepage management
- Upload hero banners
- Edit hero headlines and descriptions
- Select featured products
- Select latest arrivals
- Change section order
- Enable or disable sections
- Schedule promotional content

### Offer management
- Create and edit offers
- Configure coupon codes
- Set eligibility rules
- Configure start and expiry dates
- Set usage limits
- Activate and deactivate promotions

### Order management
- View orders
- Inspect order details
- Update allowed fulfillment statuses
- View payment status
- Manage cancellation and refund workflows
- Record tracking information when shipping integration is added

### Customer management
- Search customers
- View appropriate customer details
- Review order history
- Avoid exposing passwords, OTPs, session tokens, or unnecessary private information

### Audit trail
- Record important administrative actions
- Record who performed an action
- Record the affected entity and timestamp
- Keep audit records protected from unauthorized modification

Do not build all of the admin screens now unless required by the existing scope. Build the data model, permissions, storage policies, and service boundaries that allow those screens to be added later.

---

# 13. Database Security and Row Level Security

Treat database security as a core implementation requirement, not a later improvement.

Enable RLS on all tables accessible through the Supabase Data API.

Create and test explicit policies.

## Customer permissions

- Customers can read and update their own profile, excluding privileged fields.
- Customers can manage their own saved addresses.
- Customers can read and modify their own cart.
- Customers can read their own orders and order items.
- Customers cannot create arbitrary paid orders by inserting directly into tables.
- Customers cannot change order totals, payment status, fulfillment status, or administrator roles.
- Customers cannot modify product prices, stock, publication status, offers, banners, or homepage sections.
- Customers cannot access another customer's personal information, cart, or order history.

## Public permissions

Unauthenticated visitors may read only the published catalog and currently active public content.

They must not be able to read private customer information, internal order data, unpublished product records, or privileged configuration.

## Admin permissions

Only authorized administrators can perform permitted administrative operations.

Check roles using a secure database or server-side authorization mechanism. Prevent recursive RLS policy problems when role lookups involve protected tables.

If using a database function with elevated privileges, carefully fix its `search_path`, restrict execution permissions, validate the caller, and expose only the minimum required functionality.

## Storage security

Use appropriate storage policies for product images and other files.

- Public visitors can read only assets intended for public publication.
- Authorized administrators can upload and manage product assets.
- Customers cannot upload into privileged product-management paths.
- Validate file type and size.
- Do not use publicly accessible buckets for private customer documents.

Never expose the Supabase service-role key in frontend code, public repositories, browser storage, or client-side environment variables.

Do not rely on obscurity, hidden routes, or UI-only role checks.

---

# 14. Premium AXELO UI/UX Requirements

Maintain the existing AXELO design identity throughout authentication, account management, cart, checkout, and order history.

## Visual direction

- Premium minimalism
- Refined typography
- Generous whitespace
- Neutral black, white, and restrained grey palette
- Consistent spacing system
- Thin borders and subtle separators
- Carefully balanced product imagery
- Clean, professional layouts
- Subtle micro-interactions
- Minimal visual clutter

Avoid generic dashboard templates, excessive gradients, unnecessary glassmorphism, oversized rounded cards, excessive shadows, and distracting animations.

## Header behavior

For logged-out visitors:

- Show the existing brand navigation.
- Show a Login or Account entry point.
- Show product categories and other existing navigation.
- If a cart icon is visible, clicking it should request authentication when no authenticated cart exists.

For authenticated customers:

- Show the account entry point.
- Display the persistent cart count.
- Provide account and sign-out actions.
- Preserve the existing responsive mobile navigation.

## Responsive behavior

Ensure all pages work correctly on:

- Mobile phones
- Tablets
- Laptops
- Desktop screens

The OTP form, address forms, cart table/list, checkout summary, and account navigation must adapt to small screens.

## Accessibility

Implement:

- Semantic HTML
- Associated form labels
- Keyboard-accessible controls
- Visible focus states
- Screen-reader-friendly validation messages
- Appropriate contrast
- Reduced-motion support
- Accessible modal and dialog behavior

## Interaction quality

Provide meaningful loading, success, empty, and error states.

Examples:

- Sending verification code
- Verifying code
- Loading account
- Saving profile
- Adding to cart
- Updating quantity
- Loading order details
- Submitting order

Disable duplicate submissions during in-flight operations.

Use subtle, purposeful motion without delaying essential user actions.

---

# 15. Error Handling and Reliability

Implement a consistent error-handling strategy.

Handle:

- Supabase network errors
- Expired sessions
- Invalid OTPs
- Rate limits
- SMS delivery failures
- Email delivery failures
- Missing customer profiles
- Invalid addresses
- Out-of-stock products
- Changed prices
- Expired promotions
- Failed database transactions
- Duplicate order submissions
- Unauthorized access
- Storage upload failures

Show customers a concise, useful message.

Keep technical details in appropriate development/server logs without leaking credentials, OTPs, access tokens, sensitive SQL details, or private customer data.

Do not swallow errors silently.

Do not show success notifications unless the operation actually succeeded.

Make retries safe for operations that can be repeated.

---

# 16. Performance and Maintainability

Use a modular service layer with typed inputs and outputs.

Requirements:

- Avoid duplicating Supabase queries throughout components.
- Use pagination for products and orders.
- Add indexes to frequently queried foreign keys, slugs, status fields, and timestamps where appropriate.
- Add database constraints for important business rules.
- Avoid N+1 database queries.
- Avoid unnecessary authentication requests during every component render.
- Use suitable caching and revalidation for public catalog content.
- Do not cache private customer data in a way that can leak between users.
- Keep public product fetching separate from privileged order and admin operations.
- Use schema migrations committed to version control.
- Keep database-generated types synchronized with the actual schema.
- Avoid using `any` to bypass TypeScript errors.
- Reuse existing project conventions instead of introducing unnecessary dependencies.

Prefer database constraints and server-side validation over frontend-only checks.

---

# 17. Testing Requirements

Add meaningful tests for the critical customer journey and security boundaries.

## Authentication

- Email OTP request
- Email OTP verification
- Mobile OTP request
- Mobile OTP verification
- New customer profile creation
- Returning customer login
- Session persistence
- Logout
- Invalid and expired OTP handling
- Rate-limit handling

## Profile and addresses

- Create and update profile
- Save address
- Update default address
- Delete address
- Reject access to another user's address

## Products and cart

- List published products
- Exclude unpublished products
- Add a product to cart
- Update quantity
- Remove cart item
- Reject invalid quantities
- Reject access to another user's cart
- Handle unavailable products
- Recalculate prices correctly

## Orders

- Create an order with valid data
- Reject unauthenticated order requests
- Reject another user's address
- Reject fabricated prices and totals
- Reject insufficient stock
- Prevent overselling during concurrent requests
- Prevent duplicate order creation
- Preserve historical order snapshots
- Verify order ownership
- Ensure failed transactions do not leave partial orders
- Ensure an order is not marked paid without verified payment confirmation

## Admin readiness

- Customer cannot grant themselves the admin role.
- Customer cannot publish products.
- Customer cannot modify offers or inventory.
- Unauthenticated users cannot perform administrative actions.
- Unauthorized users cannot upload to protected storage paths.

Use unit, integration, or end-to-end tests appropriate to the project. Where live SMS or email providers are required, mock the external delivery boundary in automated tests without pretending that a production OTP was sent.

Provide reproducible instructions for running the tests.

---

# 18. Required Deliverables

At the end of implementation, provide:

1. A working Supabase client integration.
2. Email OTP authentication.
3. Mobile OTP authentication.
4. Session management and logout.
5. Customer profile creation and editing.
6. Saved address management.
7. Protected cart functionality.
8. A functional checkout and secure order-creation workflow.
9. Customer order history and order details.
10. Database migrations for all required tables and constraints.
11. RLS policies for all relevant tables.
12. Storage bucket setup and policies.
13. Product, category, image, banner, homepage section, and offer schemas.
14. A future-ready role and permission foundation.
15. Typed service modules and reusable UI components.
16. An `.env.example` file.
17. Supabase setup and deployment documentation.
18. Email and SMS provider configuration instructions.
19. Test coverage for critical flows and security restrictions.
20. A list of files created or modified.
21. A list of any required manual Supabase Dashboard actions.
22. A list of unfinished integrations and any limitations.

Include SQL migrations in the repository instead of relying only on manual SQL entered into the dashboard.

Document the steps for applying migrations to a development project and promoting them to production.

---

# 19. Implementation Sequence

Implement the work in this order.

### Phase A — Foundation
- Inspect the existing codebase.
- Set up Supabase integration.
- Configure environment variables.
- Create database migrations.
- Implement core types and services.
- Enable RLS and validate policies.

### Phase B — Authentication
- Implement email OTP.
- Implement mobile OTP.
- Implement session management.
- Implement protected routes and actions.
- Test both authentication methods.

### Phase C — Customer account
- Implement profile creation.
- Implement profile completion.
- Implement profile editing.
- Implement saved addresses.
- Test ownership restrictions.

### Phase D — Catalog
- Connect the existing product UI to Supabase.
- Implement categories, images, product details, and listing queries.
- Implement featured and latest product sections.
- Remove hardcoded production catalog data.

### Phase E — Cart
- Implement persistent cart storage.
- Implement cart operations.
- Protect cart access.
- Enforce authentication before adding products.
- Test quantity and stock handling.

### Phase F — Checkout and orders
- Implement checkout UI.
- Implement trusted order creation.
- Add transaction-safe inventory handling.
- Add order history and confirmation pages.
- Test duplicate requests, concurrency, and ownership.

### Phase G — Future admin readiness
- Implement role-management foundations.
- Implement admin authorization checks.
- Finalize banners, homepage sections, offers, and storage schemas.
- Document the future admin APIs and extension points.

### Phase H — Validation
- Run linting and type checks.
- Run tests.
- Run the production build.
- Fix regressions.
- Verify mobile and desktop layouts.
- Review RLS policies and database constraints.
- Document setup and deployment.

Do not mark a phase complete simply because its UI has been created. Its backend behavior and security requirements must also be implemented and tested.

---

# 20. Final Acceptance Criteria

The implementation is complete only when the following statements are true:

- A new customer can authenticate using a real email OTP.
- A customer can authenticate using a real mobile OTP when SMS is configured.
- Returning customers can sign in without creating duplicate profiles.
- Customer profile details persist in Supabase.
- Customers can add, edit, and manage delivery addresses.
- Published products are loaded from Supabase.
- Unpublished products are not publicly accessible.
- Logged-out visitors cannot add products to the persistent cart or place orders.
- Authenticated customers have persistent, private carts.
- Customers cannot manipulate prices or order totals through browser requests.
- Order creation validates stock and address ownership.
- Failed order creation does not produce partial orders.
- Customers cannot access another customer's account, cart, or orders.
- Customers cannot grant themselves administrator privileges.
- The database can support an admin panel for products, offers, hero banners, latest arrivals, homepage content, inventory, and orders.
- Sensitive credentials remain server-side.
- The existing AXELO visual design remains consistent.
- The application passes its type checks, tests, and production build.

## Final instruction

Think like an engineer building the foundation of a real e-commerce business, not a disposable prototype.

Prioritize security, maintainability, reliable transactions, and excellent UX. Make reasonable architectural decisions based on the existing codebase, document important trade-offs, and avoid unnecessary complexity.

Start by inspecting the existing repository, then implement the system step by step. If a required Supabase setting or external provider credential is unavailable, complete the code and migrations that can be implemented safely, clearly identify the missing configuration, and never claim that the unavailable integration has been tested successfully.