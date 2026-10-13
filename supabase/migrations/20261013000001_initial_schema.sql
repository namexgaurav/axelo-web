-- ============================================================================
-- AXELO E-Commerce Platform — Initial Schema Migration
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. PROFILES & ROLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    display_name TEXT,
    email TEXT,
    phone TEXT,
    profile_complete BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('customer', 'admin')) DEFAULT 'customer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);

-- Automatic Profile Creation Trigger on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, profile_complete)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.email,
        NEW.phone,
        FALSE
    )
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'customer')
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 2. CATALOG: CATEGORIES, PRODUCTS, IMAGES, VARIANTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    subtitle TEXT,
    description TEXT,
    image_path TEXT,
    parent_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    short_description TEXT,
    description TEXT,
    sku TEXT,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    sale_price NUMERIC(10, 2) CHECK (sale_price IS NULL OR (sale_price >= 0 AND sale_price < base_price)),
    currency TEXT NOT NULL DEFAULT 'USD',
    stock_quantity INTEGER NOT NULL DEFAULT 50 CHECK (stock_quantity >= 0),
    track_inventory BOOLEAN NOT NULL DEFAULT TRUE,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    rating_count INTEGER NOT NULL DEFAULT 0,
    badge TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
    is_best_seller BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    specs JSONB NOT NULL DEFAULT '[]'::jsonb,
    details JSONB NOT NULL DEFAULT '[]'::jsonb,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);

CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color_hex TEXT,
    image_url TEXT,
    price_adjustment NUMERIC(10, 2) NOT NULL DEFAULT 0,
    stock_quantity INTEGER NOT NULL DEFAULT 25 CHECK (stock_quantity >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);

-- ============================================================================
-- 3. ADDRESSES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    street_line_1 TEXT NOT NULL,
    street_line_2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'IN',
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);

DROP TRIGGER IF EXISTS set_addresses_updated_at ON public.addresses;
CREATE TRIGGER set_addresses_updated_at
    BEFORE UPDATE ON public.addresses
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Ensure only one default address per user
CREATE OR REPLACE FUNCTION public.handle_default_address()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.is_default THEN
        UPDATE public.addresses
        SET is_default = FALSE
        WHERE user_id = NEW.user_id AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_address_default_changed ON public.addresses;
CREATE TRIGGER on_address_default_changed
    BEFORE INSERT OR UPDATE ON public.addresses
    FOR EACH ROW
    WHEN (NEW.is_default = TRUE)
    EXECUTE FUNCTION public.handle_default_address();

-- ============================================================================
-- 4. CARTS & CART ITEMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_carts_user_id ON public.carts(user_id);

DROP TRIGGER IF EXISTS set_carts_updated_at ON public.carts;
CREATE TRIGGER set_carts_updated_at
    BEFORE UPDATE ON public.carts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    selected_color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_cart_item UNIQUE (cart_id, product_id, variant_id, selected_color)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON public.cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON public.cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_variant_id ON public.cart_items(variant_id);

DROP TRIGGER IF EXISTS set_cart_items_updated_at ON public.cart_items;
CREATE TRIGGER set_cart_items_updated_at
    BEFORE UPDATE ON public.cart_items
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 5. ORDERS & ORDER ITEMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
    tax NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    currency TEXT NOT NULL DEFAULT 'USD',
    shipping_address JSONB NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'failed', 'refunded')),
    payment_method TEXT NOT NULL DEFAULT 'card',
    payment_gateway_order_id TEXT,
    payment_gateway_payment_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    variant_name TEXT,
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- ============================================================================
-- 6. PROMOTIONS & MARKETING
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    cta_text TEXT,
    cta_link TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
    min_order_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    starts_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_offers_code ON public.offers(code);

CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON public.audit_log(entity, entity_id);

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Helper to check if current caller is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = (SELECT auth.uid()) AND role = 'admin'
    );
$$;

-- PROFILES
CREATE POLICY "Profiles are viewable by owners"
    ON public.profiles FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = id);

CREATE POLICY "Profiles are updatable by owners"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = id)
    WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- USER ROLES
CREATE POLICY "Users can view their own role"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Only admins can manage roles"
    ON public.user_roles FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- CATEGORIES (Public Read, Admin Write)
CREATE POLICY "Categories are viewable by anyone"
    ON public.categories FOR SELECT
    TO public
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- PRODUCTS (Public Read, Admin Write)
CREATE POLICY "Published products are viewable by anyone"
    ON public.products FOR SELECT
    TO public
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admins can manage products"
    ON public.products FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- PRODUCT IMAGES (Public Read, Admin Write)
CREATE POLICY "Product images are viewable by anyone"
    ON public.product_images FOR SELECT
    TO public
    USING (TRUE);

CREATE POLICY "Admins can manage product images"
    ON public.product_images FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- PRODUCT VARIANTS (Public Read, Admin Write)
CREATE POLICY "Product variants are viewable by anyone"
    ON public.product_variants FOR SELECT
    TO public
    USING (TRUE);

CREATE POLICY "Admins can manage product variants"
    ON public.product_variants FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ADDRESSES (Authenticated User Owns Rows)
CREATE POLICY "Users can view their own addresses"
    ON public.addresses FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert their own addresses"
    ON public.addresses FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own addresses"
    ON public.addresses FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id)
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own addresses"
    ON public.addresses FOR DELETE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

-- CARTS (Authenticated User Owns Row)
CREATE POLICY "Users can view their own cart"
    ON public.carts FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create their own cart"
    ON public.carts FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own cart"
    ON public.carts FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id)
    WITH CHECK ((SELECT auth.uid()) = user_id);

-- CART ITEMS (Belongs to User's Cart)
CREATE POLICY "Users can view items in their cart"
    ON public.cart_items FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.carts
        WHERE carts.id = cart_items.cart_id AND carts.user_id = (SELECT auth.uid())
    ));

CREATE POLICY "Users can add items to their cart"
    ON public.cart_items FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.carts
        WHERE carts.id = cart_items.cart_id AND carts.user_id = (SELECT auth.uid())
    ));

CREATE POLICY "Users can update items in their cart"
    ON public.cart_items FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.carts
        WHERE carts.id = cart_items.cart_id AND carts.user_id = (SELECT auth.uid())
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.carts
        WHERE carts.id = cart_items.cart_id AND carts.user_id = (SELECT auth.uid())
    ));

CREATE POLICY "Users can remove items from their cart"
    ON public.cart_items FOR DELETE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.carts
        WHERE carts.id = cart_items.cart_id AND carts.user_id = (SELECT auth.uid())
    ));

-- ORDERS (User Owns Row or Admin)
CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id OR public.is_admin());

CREATE POLICY "Users can insert their own orders"
    ON public.orders FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Admins can update orders"
    ON public.orders FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ORDER ITEMS (Belongs to User's Order or Admin)
CREATE POLICY "Users can view their order items"
    ON public.order_items FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.orders
        WHERE orders.id = order_items.order_id AND (orders.user_id = (SELECT auth.uid()) OR public.is_admin())
    ));

CREATE POLICY "Users can insert order items for their order"
    ON public.order_items FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.orders
        WHERE orders.id = order_items.order_id AND orders.user_id = (SELECT auth.uid())
    ));

-- BANNERS & OFFERS (Public Read, Admin Write)
CREATE POLICY "Active banners are viewable by anyone"
    ON public.banners FOR SELECT
    TO public
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Active offers are viewable by anyone"
    ON public.offers FOR SELECT
    TO public
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage banners"
    ON public.banners FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can manage offers"
    ON public.offers FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- AUDIT LOG (Admin Read/Write Only)
CREATE POLICY "Only admins can view audit logs"
    ON public.audit_log FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- ============================================================================
-- 8. SECURE ORDER CREATION DATABASE FUNCTION (TRANSACTIONAL)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.create_order_secure(
    p_shipping_address JSONB,
    p_payment_method TEXT DEFAULT 'card'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_cart_id UUID;
    v_order_id UUID;
    v_order_number TEXT;
    v_subtotal NUMERIC(10, 2) := 0;
    v_shipping_fee NUMERIC(10, 2) := 0;
    v_tax NUMERIC(10, 2) := 0;
    v_total NUMERIC(10, 2) := 0;
    v_item RECORD;
    v_product RECORD;
    v_item_price NUMERIC(10, 2);
    v_item_total NUMERIC(10, 2);
BEGIN
    -- 1. Identify caller
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required to create an order.';
    END IF;

    -- 2. Find user cart
    SELECT id INTO v_cart_id FROM public.carts WHERE user_id = v_user_id;
    IF v_cart_id IS NULL THEN
        RAISE EXCEPTION 'Cart not found.';
    END IF;

    -- Check if cart has items
    IF NOT EXISTS (SELECT 1 FROM public.cart_items WHERE cart_id = v_cart_id) THEN
        RAISE EXCEPTION 'Cannot place order with an empty cart.';
    END IF;

    -- 3. Generate unique order number (e.g. AX-20261013-XXXX)
    v_order_number := 'AX-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(gen_random_uuid()::text, 1, 6));

    -- 4. Calculate total and verify inventory under lock
    FOR v_item IN
        SELECT ci.id, ci.product_id, ci.variant_id, ci.quantity, ci.selected_color
        FROM public.cart_items ci
        WHERE ci.cart_id = v_cart_id
    LOOP
        -- Lock product row for inventory check
        SELECT id, name, base_price, sale_price, stock_quantity, track_inventory
        INTO v_product
        FROM public.products
        WHERE id = v_item.product_id
        FOR UPDATE;

        IF v_product.id IS NULL THEN
            RAISE EXCEPTION 'Product % is no longer available.', v_item.product_id;
        END IF;

        IF v_product.track_inventory AND v_product.stock_quantity < v_item.quantity THEN
            RAISE EXCEPTION 'Insufficient stock for product "%". Requested: %, available: %.',
                v_product.name, v_item.quantity, v_product.stock_quantity;
        END IF;

        -- Calculate verified item price
        v_item_price := COALESCE(v_product.sale_price, v_product.base_price);
        v_item_total := v_item_price * v_item.quantity;
        v_subtotal := v_subtotal + v_item_total;
    END LOOP;

    -- Standard shipping: free over $100, else $10
    IF v_subtotal >= 100 THEN
        v_shipping_fee := 0;
    ELSE
        v_shipping_fee := 10;
    END IF;

    v_total := v_subtotal + v_shipping_fee + v_tax;

    -- 5. Insert order
    INSERT INTO public.orders (
        order_number,
        user_id,
        status,
        subtotal,
        shipping_fee,
        tax,
        total,
        currency,
        shipping_address,
        payment_status,
        payment_method
    ) VALUES (
        v_order_number,
        v_user_id,
        'pending',
        v_subtotal,
        v_shipping_fee,
        v_tax,
        v_total,
        'USD',
        p_shipping_address,
        'unpaid',
        p_payment_method
    ) RETURNING id INTO v_order_id;

    -- 6. Insert order items & deduct stock
    FOR v_item IN
        SELECT ci.product_id, ci.variant_id, ci.quantity, ci.selected_color
        FROM public.cart_items ci
        WHERE ci.cart_id = v_cart_id
    LOOP
        SELECT id, name, base_price, sale_price, track_inventory
        INTO v_product
        FROM public.products
        WHERE id = v_item.product_id;

        v_item_price := COALESCE(v_product.sale_price, v_product.base_price);
        v_item_total := v_item_price * v_item.quantity;

        INSERT INTO public.order_items (
            order_id,
            product_id,
            variant_id,
            product_name,
            variant_name,
            unit_price,
            quantity,
            total_price
        ) VALUES (
            v_order_id,
            v_item.product_id,
            v_item.variant_id,
            v_product.name,
            v_item.selected_color,
            v_item_price,
            v_item.quantity,
            v_item_total
        );

        -- Deduct stock
        IF v_product.track_inventory THEN
            UPDATE public.products
            SET stock_quantity = stock_quantity - v_item.quantity
            WHERE id = v_item.product_id;
        END IF;
    END LOOP;

    -- 7. Empty cart
    DELETE FROM public.cart_items WHERE cart_id = v_cart_id;

    -- 8. Return created order summary
    RETURN jsonb_build_object(
        'success', TRUE,
        'order_id', v_order_id,
        'order_number', v_order_number,
        'total', v_total,
        'subtotal', v_subtotal,
        'shipping_fee', v_shipping_fee
    );
END;
$$;
