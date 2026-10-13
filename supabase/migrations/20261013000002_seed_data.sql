-- ============================================================================
-- AXELO E-Commerce Platform — Seed Data Migration
-- ============================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, subtitle, description, image_path, sort_order, is_active, is_featured)
VALUES
(
    'desk-mats',
    'Desk Mats & Surfaces',
    'desk-mats',
    'Tactile foundation',
    'Precision wool felt and micro-grain leather pads engineered for effortless gliding and acoustic dampening.',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=85',
    1,
    TRUE,
    TRUE
),
(
    'keyboards',
    'Keyboards & Dials',
    'keyboards',
    'Haptic feedback',
    'Acoustically tuned gasket-mounted mechanical keyboards and precision rotary controllers.',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=85',
    2,
    TRUE,
    FALSE
),
(
    'mice',
    'Precision Mice',
    'mice',
    'Ergonomic speed',
    'Sub-60g ultralight wireless peripherals with pixel-perfect tracking for work and high-dexterity tasks.',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=85',
    3,
    TRUE,
    FALSE
),
(
    'organization',
    'Desk Organization',
    'organization',
    'Zero clutter',
    'Architectural aluminum shelves, magnetic cable routes, and weighted device risers.',
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=85',
    4,
    TRUE,
    FALSE
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    image_path = EXCLUDED.image_path;

-- 2. SEED PRODUCTS
INSERT INTO public.products (
    id, name, slug, tagline, short_description, description, sku, category_id,
    status, base_price, sale_price, currency, stock_quantity, rating, rating_count,
    badge, is_featured, is_new_arrival, is_best_seller, sort_order, specs, details
)
VALUES
(
    'studio-desk-mat-pro',
    'AXELO Studio Desk Mat Pro',
    'studio-desk-mat-pro',
    'Dual-surface precision mat with magnetic cable anchor',
    'Designed as the foundational layer for high-focus desks.',
    'Designed as the foundational layer for high-focus desks. Crafted from high-density Merino wool felt backed with pebble-grain vegan leather. Features an integrated neodymium magnetic anchor for zero-slip cable docking.',
    'AX-DMP-01',
    'desk-mats',
    'published',
    84.00,
    68.00,
    'USD',
    120,
    4.9,
    142,
    'Flagship Essential',
    TRUE,
    FALSE,
    TRUE,
    1,
    '[
        {"label": "Dimensions", "value": "900 × 400 × 4 mm"},
        {"label": "Material", "value": "Recycled Wool Felt & Vegan Leather"},
        {"label": "Coating", "value": "Hydrophobic Nanotech Shield"},
        {"label": "Base", "value": "Non-Slip Hexagonal Silicone Mesh"}
    ]'::jsonb,
    '[
        "Dual-texture reversibility for changing seasons or workflows",
        "Integrated hidden magnetic channel for AXELO cable guides",
        "Ultra-dense precision stitched edge prevents peeling and fraying",
        "Micro-textured tracking surface tested with optical 26,000 DPI sensors"
    ]'::jsonb
),
(
    'apex-75-keyboard',
    'AXELO Apex 75 Mechanical Keyboard',
    'apex-75-keyboard',
    'Gasket-mounted CNC aluminum chassis with tactile acoustics',
    'An acoustic-tuned 75% mechanical keyboard designed for coders and writers.',
    'An acoustic-tuned 75% mechanical keyboard designed for coders and writers. Features hot-swappable tactile switches, double-shot PBT keycaps with crisp legends, and ultra-low latency wireless Tri-Mode connectivity.',
    'AX-KB75-01',
    'keyboards',
    'published',
    219.00,
    189.00,
    'USD',
    45,
    5.0,
    98,
    'Acoustic Tuned',
    TRUE,
    TRUE,
    FALSE,
    2,
    '[
        {"label": "Layout", "value": "75% Compact (82 Keys + Rotary Dial)"},
        {"label": "Chassis", "value": "6063 Anodized CNC Aluminum"},
        {"label": "Connectivity", "value": "2.4GHz / Bluetooth 5.3 / USB-C"},
        {"label": "Battery Life", "value": "Up to 240 Hours (RGB Off)"}
    ]'::jsonb,
    '[
        "Poron multi-layer sound dampening with IXPE switch pads for a deep, thocky sound profile",
        "Hot-swappable 5-pin PCB supports all MX-style switches without soldering",
        "Rotary encoder dial for tactile media & zoom controls",
        "Compatible with macOS, Windows, Linux, and iOS"
    ]'::jsonb
),
(
    'contour-wireless-mouse',
    'AXELO Contour Wireless Precision Mouse',
    'contour-wireless-mouse',
    'Ultralight 58g ergonomic form with dual sensor modes',
    'Sculpted to eliminate wrist fatigue during 12-hour engineering and design sessions.',
    'Sculpted to eliminate wrist fatigue during 12-hour engineering and design sessions. Boasts the PixArt 3395 flagship sensor, instant-response optical switches, and zero-drag pure PTFE glide skates.',
    'AX-MS01-01',
    'mice',
    'published',
    105.00,
    89.00,
    'USD',
    60,
    4.8,
    76,
    'Ultralight 58g',
    TRUE,
    TRUE,
    FALSE,
    3,
    '[
        {"label": "Sensor", "value": "PixArt PAW3395 (26,000 DPI, 650 IPS)"},
        {"label": "Weight", "value": "58 grams"},
        {"label": "Polling Rate", "value": "True 4000Hz Wireless"},
        {"label": "Switches", "value": "Optical Huano 80M clicks"}
    ]'::jsonb,
    '[
        "Ergonomic asymmetry tailored for palm and claw grips",
        "Sub-1ms wireless latency with custom Nordic RF transceiver",
        "Rapid USB-C fast charge: 15 minutes provides 35 hours of usage",
        "Onboard memory profiles for DPI, lift-off distance, and custom macros"
    ]'::jsonb
),
(
    'modular-desk-shelf',
    'AXELO Modular Aluminum Desk Shelf',
    'modular-desk-shelf',
    'Architectural monitor riser with modular under-deck storage',
    'Elevates dual displays or an ultra-wide monitor to ergonomic eye level.',
    'Elevates dual displays or an ultra-wide monitor to ergonomic eye level while reclaiming 60% of lost desk real estate. Solid extruded aluminum profile with dark American walnut accent blocks.',
    'AX-SH01-01',
    'organization',
    'published',
    165.00,
    139.00,
    'USD',
    35,
    4.9,
    114,
    'Structural Craft',
    TRUE,
    FALSE,
    FALSE,
    4,
    '[
        {"label": "Weight Capacity", "value": "60 kg (Supports 2x 32 screens)"},
        {"label": "Dimensions", "value": "1100 × 240 × 115 mm"},
        {"label": "Structure", "value": "Aircraft-grade 6061 Extruded Aluminum"},
        {"label": "Finish", "value": "Bead-blasted anodized anti-scratch"}
    ]'::jsonb,
    '[
        "Continuous underside magnetic slot for dock, hub, and cable mounting",
        "Soft felt-lined slide tray for pens, notebooks, and hardware tokens",
        "Integrated rear cable pass-through channel",
        "Solid non-slip silicone feet protect desk finishes"
    ]'::jsonb
),
(
    'magnetic-cable-kit',
    'AXELO Magnetic Cable Routing System',
    'magnetic-cable-kit',
    'Precision weighted anchors with snapping magnetic collars',
    'Eliminates dropped cables, tangled adapters, and chaotic desk edges.',
    'Eliminates dropped cables, tangled adapters, and chaotic desk edges. Set of four CNC-machined steel weighted anchors with snap-fit silicone cable collars.',
    'AX-CB01-01',
    'organization',
    'published',
    45.00,
    36.00,
    'USD',
    150,
    4.9,
    204,
    'Best Seller',
    FALSE,
    FALSE,
    TRUE,
    5,
    '[
        {"label": "Pack Quantity", "value": "4 Magnetic Anchors + 6 Collars"},
        {"label": "Cable Compatibility", "value": "2.5mm to 6.5mm diameter"},
        {"label": "Base Weight", "value": "110g per solid anchor"},
        {"label": "Magnet", "value": "N52 Neodymium rare-earth core"}
    ]'::jsonb,
    '[
        "Heavy weighted core stays in place without sticky adhesive residues",
        "Micro-suction silicone base can be repositioned infinitely",
        "Universal collars fit Thunderbolt, USB-C, Braided, and MagSafe cords",
        "Color-matched to the AXELO Studio Desk Mat Pro magnetic channel"
    ]'::jsonb
),
(
    'studio-numpad-dial',
    'AXELO Dial & Macropad Studio',
    'studio-numpad-dial',
    'Programmable rotary dial with 9 hot-swap mechanical keys',
    'Fine-tuned scrub control for timelines, audio gain, CAD navigation, and developer macros.',
    'Fine-tuned scrub control for timelines, audio gain, CAD navigation, and developer macros. Solid solid-block brass weight encased in matte anodized aluminum.',
    'AX-MP01-01',
    'keyboards',
    'published',
    89.00,
    74.00,
    'USD',
    40,
    4.8,
    52,
    'Creator Tool',
    FALSE,
    TRUE,
    FALSE,
    6,
    '[
        {"label": "Knob Encoder", "value": "Alps Stepped / Smooth Click Switchable"},
        {"label": "Firmware", "value": "QMK & VIA Open Source Support"},
        {"label": "Illumination", "value": "Per-key south-facing white LED"},
        {"label": "Weight", "value": "380g weighted desktop stay"}
    ]'::jsonb,
    '[
        "Instant toggle between scrubbing, scroll, brush sizing, and volume",
        "Full layer mapping via browser-based configurator without installs",
        "Tactile stepped detents or smooth cinematic free-spin",
        "Matches the height profile of the AXELO Apex 75 keyboard"
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    base_price = EXCLUDED.base_price,
    sale_price = EXCLUDED.sale_price,
    description = EXCLUDED.description;

-- 3. SEED PRODUCT IMAGES
INSERT INTO public.product_images (product_id, storage_path, alt_text, display_order, is_primary)
VALUES
('studio-desk-mat-pro', 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85', 'AXELO Studio Desk Mat Pro Onyx Black', 1, TRUE),
('studio-desk-mat-pro', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85', 'AXELO Studio Desk Mat Pro Slate Gray', 2, FALSE),
('apex-75-keyboard', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85', 'AXELO Apex 75 Mechanical Keyboard Matte Charcoal', 1, TRUE),
('apex-75-keyboard', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85', 'AXELO Apex 75 Acoustic Profile', 2, FALSE),
('contour-wireless-mouse', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85', 'AXELO Contour Wireless Precision Mouse Stealth Black', 1, TRUE),
('contour-wireless-mouse', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85', 'AXELO Contour Mouse Lunar White', 2, FALSE),
('modular-desk-shelf', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85', 'AXELO Modular Desk Shelf Matte Black Walnut', 1, TRUE),
('modular-desk-shelf', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85', 'AXELO Modular Desk Shelf Angle View', 2, FALSE),
('magnetic-cable-kit', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85', 'AXELO Magnetic Cable Routing System Space Gray', 1, TRUE),
('studio-numpad-dial', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85', 'AXELO Dial & Macropad Studio', 1, TRUE)
ON CONFLICT DO NOTHING;

-- 4. SEED PRODUCT VARIANTS (COLORS)
INSERT INTO public.product_variants (product_id, name, color_hex, image_url, price_adjustment, stock_quantity)
VALUES
('studio-desk-mat-pro', 'Onyx Black', '#1C1C1E', 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85', 0, 50),
('studio-desk-mat-pro', 'Slate Gray', '#4A4D52', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85', 0, 40),
('studio-desk-mat-pro', 'Electric Cobalt', '#0052FF', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85', 0, 30),
('apex-75-keyboard', 'Matte Charcoal', '#1F2023', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85', 0, 25),
('apex-75-keyboard', 'Anodized Silver', '#D2D4D8', 'https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=1200&q=85', 0, 20),
('contour-wireless-mouse', 'Stealth Black', '#111111', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85', 0, 35),
('contour-wireless-mouse', 'Lunar White', '#EBEBEB', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85', 0, 25)
ON CONFLICT DO NOTHING;

-- 5. SEED OFFERS
INSERT INTO public.offers (code, discount_type, discount_value, min_order_amount, is_active)
VALUES
('AXELO10', 'percentage', 10.00, 50.00, TRUE),
('WELCOME20', 'fixed', 20.00, 100.00, TRUE)
ON CONFLICT (code) DO NOTHING;
