# Complete Supabase Setup Guide

## 📋 Overview

This guide covers the complete setup for Jehovah Jireh Ministry web application with Supabase.

---

## 🔧 Part 1: Database Setup

### Step 1: Run Database Schema

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `supabase_setup.sql`
4. Paste and click **Run**

This creates:
- ✅ `staff` table
- ✅ `programs` table  
- ✅ `donations` table
- ✅ `videos` table
- ✅ Indexes for performance
- ✅ Row Level Security policies
- ✅ Automatic timestamp triggers

---

## 🗄️ Part 2: Storage Setup

### Step 1: Create Storage Buckets (Via UI)

**Important:** Buckets must be created via the Dashboard UI, not SQL.

1. Go to Supabase Dashboard → **Storage**
2. Click **New Bucket**
3. Create these 4 buckets:

| Bucket Name | Public? | Purpose |
|-------------|---------|---------|
| `staff-images` | ✅ Yes | Staff profile photos |
| `program-images` | ✅ Yes | Program images |
| `video-thumbnails` | ✅ Yes | Video thumbnails |
| `videos` | ✅ Yes | Video files |

### Step 2: Add Storage Policies

After creating buckets, run the SQL policy script:

1. Go to **SQL Editor**
2. Copy contents of `supabase_storage_policies.sql`
3. Paste and click **Run**

This adds policies for:
- ✅ Public read access
- ✅ Authenticated upload/delete

---

## 👤 Part 3: Create Admin User

### Option 1: Via Dashboard (Recommended)

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create New User**
3. Fill in:
   - **Email**: `admin@jehovahjireh.org`
   - **Password**: Your secure password
   - ✅ **Auto Confirm User**: Check this
4. Click **Create User**

### Option 2: Via SQL (Advanced)

```sql
-- Run in SQL Editor
-- Note: Email confirmation may be required
```

---

## 🔑 Part 4: Configure Environment

### Step 1: Get Supabase Credentials

1. Go to **Project Settings** (gear icon)
2. Click **API**
3. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbG...`

### Step 2: Create .env File

In the `frontend` folder:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 🚀 Part 5: Test the Application

### Start Development Server

```bash
cd frontend
npm run dev
```

Open: http://localhost:5173

### Test Admin Login

1. Go to http://localhost:5173/admin
2. Login with your Supabase credentials
3. You should see the admin dashboard!

---

## 📁 Storage Usage

### Uploading Images

The admin dashboard now supports direct uploads to Supabase Storage:

**Staff Images:**
- Uploads to: `staff-images/` bucket
- URL format: `https://xxxxx.supabase.co/storage/v1/object/public/staff-images/filename.jpg`
- Automatically used in staff profiles

**Program Images:**
- Uploads to: `program-images/` bucket
- Used in programs display

**Video Thumbnails:**
- Uploads to: `video-thumbnails/` bucket
- Used in videos page

### File Size Limits

- **Images**: 10 MB max
- **Videos**: 100 MB max

---

## 🔒 Security Policies

### Database Policies

| Table | Public Read | Authenticated Write |
|-------|-------------|---------------------|
| staff | ✅ Yes | ✅ Yes |
| programs | ✅ Active only | ✅ Yes |
| donations | ❌ No | ✅ Yes (insert public) |
| videos | ✅ Yes | ✅ Yes |

### Storage Policies

| Bucket | Public Read | Authenticated Upload |
|--------|-------------|---------------------|
| staff-images | ✅ Yes | ✅ Yes |
| program-images | ✅ Yes | ✅ Yes |
| video-thumbnails | ✅ Yes | ✅ Yes |
| videos | ✅ Yes | ✅ Yes |

---

## 🛠️ Troubleshooting

### "Supabase not configured"

**Solution:**
- Check `.env` file exists in `frontend/`
- Verify credentials are correct
- Restart dev server

### Can't login

**Solution:**
- Verify user exists in Authentication → Users
- Check user is confirmed (green checkmark)
- Try password reset

### Storage upload fails

**Solution:**
- Verify buckets exist in Storage
- Check RLS policies are enabled
- Ensure user is authenticated

### Images not showing

**Solution:**
- Check bucket is public
- Verify file URL is correct
- Clear browser cache

---

## 📊 Database Schema Reference

### Tables

```
staff
├── id (UUID, PK)
├── name (VARCHAR)
├── position (VARCHAR)
├── email (VARCHAR)
├── phone (VARCHAR)
├── bio (TEXT)
├── image_url (TEXT)
├── sort_order (INTEGER)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

programs
├── id (UUID, PK)
├── title (VARCHAR)
├── description (TEXT)
├── icon (VARCHAR)
├── image_url (TEXT)
├── sort_order (INTEGER)
├── is_active (BOOLEAN)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

donations
├── id (UUID, PK)
├── donor_name (VARCHAR)
├── donor_email (VARCHAR)
├── donor_phone (VARCHAR)
├── amount (DECIMAL)
├── donation_type (VARCHAR)
├── message (TEXT)
├── is_anonymous (BOOLEAN)
├── status (VARCHAR)
└── created_at (TIMESTAMP)

videos
├── id (UUID, PK)
├── title (VARCHAR)
├── description (TEXT)
├── video_url (TEXT)
├── thumbnail_url (TEXT)
├── category (VARCHAR)
├── duration (VARCHAR)
├── sort_order (INTEGER)
├── is_featured (BOOLEAN)
├── views (INTEGER)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

---

## 🎯 Next Steps

1. ✅ Add staff members via Admin Dashboard
2. ✅ Add programs
3. ✅ Upload videos to `frontend/videos/` folder
4. ✅ Add videos via Admin Dashboard
5. ✅ Test donation form
6. ✅ Deploy to production

---

## 📞 Support Resources

- [Supabase Docs](https://supabase.com/docs)
- [Storage Docs](https://supabase.com/docs/guides/storage)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Discord Community](https://discord.supabase.com)

---

**Built with ❤️ for Jehovah Jireh Ministry**
