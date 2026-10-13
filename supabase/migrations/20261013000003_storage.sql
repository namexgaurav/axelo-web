-- ============================================================================
-- AXELO E-Commerce Platform — Supabase Storage Setup
-- ============================================================================

-- Create product-images storage bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Public can view/download images from product-images bucket
CREATE POLICY "Public can view product images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'product-images');

-- Only admins or authenticated users can upload product images
CREATE POLICY "Admins can upload product images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'product-images'
        AND public.is_admin()
    );

-- Only admins can update product images
CREATE POLICY "Admins can update product images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'product-images'
        AND public.is_admin()
    )
    WITH CHECK (
        bucket_id = 'product-images'
        AND public.is_admin()
    );

-- Only admins can delete product images
CREATE POLICY "Admins can delete product images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'product-images'
        AND public.is_admin()
    );
