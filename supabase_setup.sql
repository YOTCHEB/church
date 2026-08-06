-- Jehovah Jire Ministry Database Setup for Supabase
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)

-- =============================================
-- 1. CREATE TABLES
-- =============================================

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    bio TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255),
    donor_phone VARCHAR(50),
    amount DECIMAL(10, 2),
    donation_type VARCHAR(50) NOT NULL,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(50),
    duration VARCHAR(10),
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =============================================
-- 2. CREATE INDEXES FOR BETTER PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_staff_order ON staff(sort_order);
CREATE INDEX IF NOT EXISTS idx_programs_order ON programs(sort_order);
CREATE INDEX IF NOT EXISTS idx_programs_is_active ON programs(is_active);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_videos_order ON videos(sort_order);
CREATE INDEX IF NOT EXISTS idx_videos_is_featured ON videos(is_featured);

-- =============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE POLICIES
-- =============================================

-- Staff Policies
-- Allow anyone to read staff members
CREATE POLICY "Allow public read access to staff"
    ON staff FOR SELECT
    USING (true);

-- Allow authenticated users to insert/update/delete staff
CREATE POLICY "Allow authenticated users to manage staff"
    ON staff FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Programs Policies
-- Allow anyone to read active programs
CREATE POLICY "Allow public read access to active programs"
    ON programs FOR SELECT
    USING (is_active = true);

-- Allow authenticated users to manage programs
CREATE POLICY "Allow authenticated users to manage programs"
    ON programs FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Donations Policies
-- Allow anyone to insert donations
CREATE POLICY "Allow public to create donations"
    ON donations FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to manage donations
CREATE POLICY "Allow authenticated users to manage donations"
    ON donations FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Videos Policies
-- Allow anyone to read videos
CREATE POLICY "Allow public read access to videos"
    ON videos FOR SELECT
    USING (true);

-- Allow authenticated users to manage videos
CREATE POLICY "Allow authenticated users to manage videos"
    ON videos FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- =============================================
-- 5. INSERT SAMPLE DATA (OPTIONAL)
-- =============================================

-- Sample Staff Data
INSERT INTO staff (name, position, email, phone, bio, image_url, sort_order) VALUES
('John Banda', 'Coordinator', 'john@jehovahjire.org', '+265 123 456 789', 'Dedicated servant of God with over 10 years of ministry experience.', 'img/photos/coordinator.png', 1),
('Mary Phiri', 'Vice Coordinator', 'mary@jehovahjire.org', '+265 234 567 890', 'Passionate about serving widows and orphans in our community.', 'img/photos/vice _president.jpeg', 2),
('Grace Mwale', 'Secretary', 'grace@jehovahjire.org', '+265 345 678 901', 'Ensures smooth communication and documentation for the ministry.', 'img/photos/secre.jpeg', 3),
('Peter Kachale', 'Treasurer', 'peter@jehovahjire.org', '+265 456 789 012', 'Manages ministry finances with integrity and transparency.', 'img/photos/tressure.jpeg', 4);

-- Sample Programs Data
INSERT INTO programs (title, description, icon, image_url, sort_order, is_active) VALUES
('Housing Support', 'Providing safe, stable housing solutions for widows and orphans, ensuring they have a secure foundation to rebuild their lives.', 'FaHome', 'img/photos/1768200744111.jpg', 1, true),
('Food Distribution', 'Implementing sustainable food programs that provide nutritious meals to families facing hunger and poverty.', 'FaUtensils', 'img/photos/1768200744123.jpg', 2, true),
('Education Support', 'Creating pathways to education through scholarships, school supplies, and learning resources.', 'FaBook', 'img/photos/1768200744137.jpg', 3, true),
('Healthcare Ministry', 'Providing access to basic healthcare services, medical supplies, and health education to vulnerable families.', 'FaHeart', 'img/photos/1768200744159.jpg', 4, true),
('Spiritual Guidance', 'Sharing God''s Word and providing spiritual counseling to help individuals find hope and healing.', 'FaPrayingHands', 'img/photos/1768200744172.jpg', 5, true),
('Community Empowerment', 'Building sustainable communities through skills training and capacity building programs.', 'FaHandsHelping', 'img/photos/1768200744183.jpg', 6, true);

-- =============================================
-- 6. CREATE FUNCTION FOR UPDATED_AT TIMESTAMP
-- =============================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at
CREATE TRIGGER update_staff_updated_at
    BEFORE UPDATE ON staff
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SETUP COMPLETE!
-- =============================================
