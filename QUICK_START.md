# 🚀 Quick Start Guide

## For First-Time Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project named "jehovah-jire-ministry"
3. Go to SQL Editor and run the entire `supabase_setup.sql` file
4. Go to Authentication > Users and create an admin user
5. Copy your Project URL and anon key from Project Settings > API

### 3. Configure Environment
```bash
# In the frontend folder:
copy .env.example .env
# Edit .env with your Supabase credentials
```

### 4. Run Development Server
```bash
npm run dev
```

Open: http://localhost:5173

---

## 📁 Files You Need to Configure

### `frontend/.env` (create from .env.example)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

---

## 🎯 Admin Dashboard Features

| Feature | Description |
|---------|-------------|
| **Overview** | Stats dashboard with recent donations |
| **Staff** | Add/edit/delete staff with photo upload |
| **Programs** | Manage ministry programs |
| **Donations** | Track, filter, approve/reject, export CSV |
| **Videos** | Manage ministry videos |

---

## 🔧 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📋 Next Steps After Setup

1. ✅ Add your staff members via Admin Dashboard
2. ✅ Add your programs
3. ✅ Upload videos to `frontend/videos/` folder
4. ✅ Add videos via Admin Dashboard
5. ✅ Test donation form
6. ✅ Deploy to production (Vercel/Netlify)

---

## 🌐 Deploy to Production

### Vercel (Recommended)
```bash
# Push to GitHub first
# Then import project at vercel.com
# Add environment variables in Vercel dashboard
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
# Or connect GitHub for auto-deploy
```

---

## 📞 Support

- **Documentation**: See `SETUP_GUIDE.md` for detailed setup
- **Database**: Run `supabase_setup.sql` in Supabase SQL Editor
- **Issues**: Check browser console for errors

---

**Built with ❤️ for Jehovah Jireh Ministry**
