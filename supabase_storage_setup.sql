-- =============================================
-- SUPABASE STORAGE SETUP
-- =============================================
-- This script creates storage buckets and policies
-- for storing images and videos
-- =============================================

-- =============================================
-- 1. CREATE STORAGE BUCKETS
-- =============================================

-- Create bucket for staff images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('staff-images', 'staff-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for program images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('program-images', 'program-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for video thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('video-thumbnails', 'video-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for videos (if storing videos in Supabase)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 2. ENABLE ROW LEVEL SECURITY ON STORAGE
-- =============================================

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 3. CREATE STORAGE POLICIES
-- =============================================

-- =============================================
-- Staff Images Policies
-- =============================================

-- Allow public to read staff images
CREATE POLICY "Public Read Access for Staff Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'staff-images');

-- Allow authenticated users to upload staff images
CREATE POLICY "Authenticated Users Can Upload Staff Images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'staff-images' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update staff images
CREATE POLICY "Authenticated Users Can Update Staff Images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'staff-images' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete staff images
CREATE POLICY "Authenticated Users Can Delete Staff Images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'staff-images' 
    AND auth.role() = 'authenticated'
);

-- =============================================
-- Program Images Policies
-- =============================================

-- Allow public to read program images
CREATE POLICY "Public Read Access for Program Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'program-images');

-- Allow authenticated users to upload program images
CREATE POLICY "Authenticated Users Can Upload Program Images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'program-images' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update program images
CREATE POLICY "Authenticated Users Can Update Program Images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'program-images' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete program images
CREATE POLICY "Authenticated Users Can Delete Program Images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'program-images' 
    AND auth.role() = 'authenticated'
);

-- =============================================
-- Video Thumbnails Policies
-- =============================================

-- Allow public to read video thumbnails
CREATE POLICY "Public Read Access for Video Thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'video-thumbnails');

-- Allow authenticated users to upload video thumbnails
CREATE POLICY "Authenticated Users Can Upload Video Thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'video-thumbnails' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update video thumbnails
CREATE POLICY "Authenticated Users Can Update Video Thumbnails"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'video-thumbnails' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete video thumbnails
CREATE POLICY "Authenticated Users Can Delete Video Thumbnails"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'video-thumbnails' 
    AND auth.role() = 'authenticated'
);

-- =============================================
-- Videos Policies
-- =============================================

-- Allow public to read videos
CREATE POLICY "Public Read Access for Videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated Users Can Upload Videos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'videos' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update videos
CREATE POLICY "Authenticated Users Can Update Videos"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'videos' 
    AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete videos
CREATE POLICY "Authenticated Users Can Delete Videos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'videos' 
    AND auth.role() = 'authenticated'
);

-- =============================================
-- 4. CREATE STORAGE HELPER FUNCTIONS
-- =============================================

-- Function to get storage URL for a file
CREATE OR REPLACE FUNCTION get_storage_url(bucket_name TEXT, file_path TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN storage.storage_url(bucket_name, file_path);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 5. SET BUCKET SIZE LIMITS (Optional)
-- =============================================

-- Update bucket file size limits (in bytes)
-- 100MB limit for videos, 10MB for images
UPDATE storage.buckets 
SET file_size_limit = 104857600 -- 100MB
WHERE id = 'videos';

UPDATE storage.buckets 
SET file_size_limit = 10485760 -- 10MB
WHERE id IN ('staff-images', 'program-images', 'video-thumbnails');

-- =============================================
-- SETUP COMPLETE!
-- =============================================
-- You can now upload files to:
-- - staff-images/
-- - program-images/
-- - video-thumbnails/
-- - videos/
-- =============================================
