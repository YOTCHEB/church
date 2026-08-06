# 🚀 Deploy to Vercel Guide

## Quick Deploy

### Option 1: Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   cd C:\Users\Student.LAPTOP-46MOQA5A\Desktop\projects\jehovah-jire
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/jehovah-jire.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click **"Add New Project"**
   - Import your `jehovah-jire` repository
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - Click **"Deploy"**

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL` = Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
   - Redeploy

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to frontend folder
cd frontend

# Deploy
vercel

# For production
vercel --prod
```

---

## 📋 Pre-Deployment Checklist

### 1. Configure Supabase

**In Supabase Dashboard:**
- ✅ Run `supabase_setup.sql`
- ✅ Run `supabase_storage_policies.sql`
- ✅ Create storage buckets via UI:
  - `staff-images`
  - `program-images`
  - `video-thumbnails`
  - `videos`
- ✅ Create admin user in Authentication → Users

### 2. Environment Variables

**Create `.env` file in `frontend/` folder:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**For Vercel:**
- Add these in Vercel Dashboard → Settings → Environment Variables

### 3. Update Supabase Settings

**In Supabase Dashboard:**
- Go to Project Settings → API
- Add your Vercel domain to allowed URLs:
  - `https://your-app.vercel.app`

---

## 🔧 Vercel Configuration

The `vercel.json` file is already configured with:

- ✅ **Build command**: `npm run build`
- ✅ **Output directory**: `dist`
- ✅ **SPA rewrites**: All routes point to `index.html`
- ✅ **Asset caching**: Static assets cached for 1 year

---

## 🎯 Post-Deployment Steps

### 1. Test the Site

Visit your deployed URL:
- Homepage: `https://your-app.vercel.app/`
- Admin: `https://your-app.vercel.app/admin`

### 2. Test Admin Login

**If Supabase is configured:**
- Use your Supabase admin credentials

**If not configured yet:**
- Email: `admin@jehovahjireh.org`
- Password: `admin123`

### 3. Add Content

Go to admin dashboard and:
- ✅ Add staff members
- ✅ Add programs
- ✅ Add videos
- ✅ Test donation form

---

## 🐛 Troubleshooting

### Blank Page After Deploy

**Solution:**
- Check browser console for errors
- Verify environment variables are set
- Check Supabase credentials are correct

### Can't Login to Admin

**Solution:**
- Verify Supabase user exists
- Check user is confirmed (green checkmark)
- Verify Supabase URL allows your Vercel domain

### Images Not Loading

**Solution:**
- Check storage buckets are public
- Verify storage policies are set
- Clear browser cache

### API Errors

**Solution:**
- Check Supabase project is active
- Verify RLS policies are correct
- Check browser console for specific errors

---

## 📊 Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain: `jehovahjirehministry.org`
   - Follow DNS configuration instructions

2. **Update Supabase:**
   - Add custom domain to allowed URLs
   - Update environment variables if needed

---

## 🔄 Auto-Deploy

Vercel automatically deploys when you:
- ✅ Push to `main` branch
- ✅ Create a pull request (preview deployment)
- ✅ Merge a pull request

---

## 💰 Vercel Pricing

**Free Tier Includes:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Custom domains
- ✅ Serverless functions

**Perfect for this project!**

---

## 📞 Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Supabase Documentation](https://supabase.com/docs)

---

**Ready to deploy!** 🚀

Just push to GitHub and import in Vercel!
