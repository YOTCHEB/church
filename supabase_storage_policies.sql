-- =============================================
-- SUPABASE STORAGE POLICIES
-- =============================================
-- Run this AFTER creating buckets via Storage UI
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
-- SETUP COMPLETE!
-- =============================================
