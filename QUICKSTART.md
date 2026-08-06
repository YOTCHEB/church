# Quick Start Guide

## Step 1: Supabase Setup (Required)

1. Go to https://supabase.com
2. Sign up for a free account
3. Create a new project:
   - **Name**: `jehovah-jire-ministry`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your location
4. Wait 2-3 minutes for project setup

5. Run the database setup:
   - In your Supabase dashboard, click **SQL Editor**
   - Click **New query**
   - Copy the entire contents of `supabase_setup.sql` from this project
   - Paste and click **Run**

6. Get your credentials:
   - Go to **Project Settings** > **API**
   - Copy **Project URL** and **anon/public key**

## Step 2: Frontend Setup

```bash
cd frontend
npm install
```

Update `src/supabase.js` with your credentials:

```javascript
const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseAnonKey = "your-anon-key";
```

Start the development server:

```bash
npm run dev
```

The website will be available at: **http://localhost:5173**

## Step 3: Access Admin Dashboard

1. Go to http://localhost:5173/admin
2. Login with:
   - Email: `admin@jehovahjireh.org`
   - Password: `admin123`

3. Start adding your content!

## Step 4: Add Initial Data

Use the Admin Dashboard to add:

### Staff Members
- Coordinator
- Vice President
- Secretary
- Treasurer

### Programs
- Housing Support
- Food Distribution
- Education Support
- Healthcare Ministry
- Spiritual Guidance
- Community Empowerment

## Verify Setup

### Check Database Tables
1. In Supabase dashboard, go to **Table Editor**
2. You should see: `staff`, `programs`, `donations`

### Test Real-time Updates
1. Open the website in two browser tabs
2. In one tab, go to admin and add a staff member
3. Watch it appear automatically in the other tab!

## Troubleshooting

### Data not loading?
- Verify `supabase.js` has correct credentials
- Check browser console for errors
- Ensure tables exist in Supabase Table Editor

### "Database not initialized" error?
- Check that `supabase.js` has valid Supabase URL and key
- Make sure your Supabase project is active

### Real-time updates not working?
- Check browser console for connection errors
- Verify Supabase project is not paused

## Next Steps

1. Replace demo images in `photos/` folder with actual photos
2. Update contact information (phone, email, WhatsApp)
3. Customize colors in `frontend/src/index.css`
4. Set up Supabase Auth for production admin access
5. Deploy to Vercel or Netlify

## Deploy to Vercel

```bash
# In frontend folder
npm run build
# Connect your GitHub repo to Vercel
# Vercel will auto-deploy
```

---

**Need Help?** Check the main README.md for detailed documentation.
