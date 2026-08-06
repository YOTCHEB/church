# 🚀 Quick Deploy to Vercel

## Step 1: Push to GitHub

```bash
cd C:\Users\Student.LAPTOP-46MOQA5A\Desktop\projects\jehovah-jire
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/yourusername/jehovah-jire.git
git push -u origin main
```

## Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select your `jehovah-jire` repository
5. **Root Directory**: Enter `frontend`
6. Click **"Deploy"**

## Step 3: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Done! ✅

Your site is live! 🎉

---

**For detailed instructions, see:** [DEPLOYMENT.md](./DEPLOYMENT.md)
