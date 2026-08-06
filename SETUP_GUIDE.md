# Supabase Setup Guide for Jehovah Jireh Ministry

This guide will walk you through setting up Supabase for the Jehovah Jireh Ministry web application.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign up using GitHub, Google, or email

## Step 2: Create a New Project

1. Click **"New Project"** from the Supabase dashboard
2. Fill in the project details:
   - **Name**: `jehovah-jire-ministry`
   - **Database Password**: Choose a strong password (save this securely!)
   - **Region**: Choose the closest region to your users (e.g., Africa for Malawi)
   - **Pricing Plan**: Free tier is perfect for getting started
3. Click **"Create new project"**
4. Wait 2-3 minutes for your project to be set up

## Step 3: Run the Database Setup Script

1. In your Supabase project dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase_setup.sql` from this project
4. Copy the **entire contents** of the file
5. Paste it into the SQL Editor
6. Click **"Run"** or press `Ctrl+Enter`
7. You should see a success message: "SETUP COMPLETE!"

### Verify Tables Were Created

1. Click on **"Table Editor"** in the left sidebar
2. You should see 4 tables:
   - `staff`
   - `programs`
   - `donations`
   - `videos`

## Step 4: Get Your API Credentials

1. Click on **"Project Settings"** (gear icon) in the left sidebar
2. Click on **"API"**
3. You'll see two keys:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. **Copy both values** - you'll need them in the next step

## Step 5: Configure Your Environment Variables

1. Navigate to the `frontend` folder in this project
2. Copy the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open the `.env` file in a text editor
4. Replace the placeholder values with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. Save the file

**Important**: The `.env` file is gitignored and won't be committed to version control.

## Step 6: Create an Admin User

### Option A: Using Supabase Auth (Recommended)

1. In Supabase dashboard, go to **"Authentication"** > **"Users"**
2. Click **"Add user"** > **"Create new user"**
3. Fill in:
   - **Email**: `admin@jehovahjireh.org` (or your preferred email)
   - **Password**: Choose a secure password
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**

### Option B: Using SQL

Run this SQL in the SQL Editor:

```sql
-- Note: This requires additional setup with Supabase Auth
-- It's easier to create users via the Authentication UI
```

## Step 7: Test the Connection

1. Start the development server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open your browser to `http://localhost:5173`
3. Navigate to `/admin` (http://localhost:5173/admin)
4. Log in with the admin credentials you created
5. You should see the admin dashboard!

## Step 8: Add Initial Data

### Add Staff Members

1. In the admin dashboard, go to **Staff** tab
2. Click **"Add Staff"**
3. Fill in the details and upload a photo
4. Click **"Add"**

### Add Programs

1. Go to **Programs** tab
2. Click **"Add Program"**
3. Fill in program details
4. Click **"Add"**

### Add Videos

1. Go to **Videos** tab
2. Click **"Add Video"**
3. Upload your video files to the `frontend/videos` folder
4. Enter the video path (e.g., `videos/VID-20260110-WA0045.mp4`)
5. Add thumbnail and details
6. Click **"Add"**

## Troubleshooting

### "Supabase not configured" warning in console

- Make sure you created the `.env` file in the `frontend` folder
- Verify the credentials are correct (no extra spaces)
- Restart the dev server after changing `.env`

### Can't log in to admin dashboard

- Verify you created a user in Supabase Authentication
- Check that the email is confirmed (green checkmark in Users table)
- Try resetting the password in Supabase Auth

### Data not showing up

- Check that you ran the SQL setup script successfully
- Verify tables exist in Table Editor
- Check browser console for errors

### RLS (Row Level Security) errors

- Make sure you ran the complete SQL script including policies
- Check that RLS is enabled on all tables
- Verify the policies were created correctly

## Production Deployment

Before deploying to production:

### 1. Update RLS Policies

The current setup allows public read access. For production, you may want to:

```sql
-- Keep public read for staff and programs
-- But restrict writes to authenticated users only
```

### 2. Set Environment Variables in Production

- **Vercel**: Settings > Environment Variables
- **Netlify**: Site Settings > Build & Deploy > Environment
- **GitHub Pages**: Not supported (use a different platform)

### 3. Enable Email Authentication

In Supabase:
1. Go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Configure email templates for confirmation and password reset

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use strong passwords** for admin accounts
3. **Enable 2FA** for Supabase account
4. **Regular backups**: Supabase automatically backs up daily
5. **Monitor usage** in Supabase dashboard to stay within free tier limits

## Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Need Help?** 

Check the Supabase documentation or reach out to the development team.
