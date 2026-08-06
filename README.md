# Jehovah Jireh Ministry - Modern Web Application

A professional, responsive React + Supabase web application for Jehovah Jireh Ministry - a Christ-centered organization dedicated to serving widows, orphans, and the vulnerable in Dzaleka Refugee Camp.

## ✨ Features

### Public Website
- **Modern Hero Section** - Eye-catching gradient hero with animated elements
- **Home Page** - Stats showcase, vision/mission cards, programs overview, staff showcase
- **About Us** - Organization story, core values, leadership team
- **Programs** - Interactive program cards with impact metrics
- **Donate** - Multiple donation options with form validation
- **Contact** - Contact form, info cards, FAQ section, social links

### Admin Dashboard
- **Overview** - Real-time statistics and recent donations
- **Staff Management** - Add, edit, delete staff members with image upload
- **Programs Management** - Manage ministry programs with icons and descriptions
- **Donations Management** - Track and manage all donations

### Technical Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **PWA Ready** - Progressive Web App capabilities for app-like experience
- **Real-time Updates** - Supabase real-time subscriptions for live data
- **Modern UI/UX** - Professional design with smooth animations and transitions
- **Mobile Navigation** - Slide-out menu for mobile devices
- **Form Validation** - Client-side validation for all forms

## 🎨 Design System

### Color Palette
| Color | Variable | Hex |
|-------|----------|-----|
| Primary Gold | `--primary-gold` | #c9a227 |
| Primary Blue | `--primary-blue` | #1a365d |
| Accent Green | `--accent-green` | #38a169 |
| Accent Coral | `--accent-coral` | #ed8936 |

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Gradient buttons with hover effects
- Card-based layouts with shadows
- Animated hero sections
- Responsive grid systems
- Modal dialogs for forms
- Toast notifications

## 🚀 Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Supabase JS Client** - Database connectivity
- **React Icons** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Row Level Security (RLS)** - Data protection
- **Real-time Channels** - Live updates

## 📁 Project Structure

```
jehovah-jire/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx/css      # Navigation with mobile menu
│   │   │   └── Footer.jsx/css      # Footer with social links
│   │   ├── pages/
│   │   │   ├── Home.jsx/css        # Landing page
│   │   │   ├── About.jsx/css       # About page
│   │   │   ├── Programs.jsx/css    # Programs page
│   │   │   ├── Donate.jsx/css      # Donation page
│   │   │   ├── Contact.jsx/css     # Contact page
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx/css    # Login page
│   │   │       └── AdminDashboard.jsx/css # Dashboard
│   │   ├── supabase.js             # Supabase client config
│   │   ├── supabaseService.js      # Data services
│   │   ├── index.css               # Global styles & design system
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── index.html                  # HTML template with PWA tags
│   ├── package.json
│   └── vite.config.js
├── photos/                         # Staff and program images
├── videos/                         # Ministry videos
└── supabase_setup.sql              # Database setup script
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Step 1: Supabase Setup

1. Go to [Supabase](https://supabase.com) and create an account
2. Create a new project named "jehovah-jire-ministry"
3. Save your database password securely
4. Once the project is ready, go to **SQL Editor**
5. Copy the entire contents of `supabase_setup.sql` and run it
6. Go to **Project Settings** > **API** and copy:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 2: Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `src/supabase.js` with your Supabase credentials:
   ```javascript
   const supabaseUrl = "https://your-project-id.supabase.co";
   const supabaseAnonKey = "your-anon-key";
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open your browser to: `http://localhost:5173`

## 🔐 Admin Access

- **URL**: `http://localhost:5173/admin`
- **Demo Credentials**:
  - Email: `admin@jehovahjireh.org`
  - Password: `admin123`

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎯 Key Pages Overview

### Home Page
- Animated hero section with gradient background
- Statistics cards showing impact metrics
- Vision/Mission/Purpose cards
- Programs grid with icons
- Scripture quote section
- Staff/Leadership showcase
- Call-to-action sections
- Ways to give section

### About Page
- Hero section with badge
- Mission, Vision, Purpose cards
- Organization story section
- Core values grid (6 values)
- Scripture banner
- Leadership team with images
- Partner CTA section

### Programs Page
- Hero section
- Programs grid (6 programs)
- Impact statistics section
- Donation CTA

### Donate Page
- Hero section
- Donation type selector (Financial/Material/Volunteer)
- Impact information
- Donation form with validation
- WhatsApp donation option
- Scripture banner

### Contact Page
- Hero section
- Contact info cards (4 cards)
- Contact form with subject selector
- Social media links
- Map placeholder
- FAQ section

### Admin Dashboard
- Sidebar navigation (collapsible on mobile)
- Overview with stats cards
- Recent donations list
- Staff management with images
- Programs management
- Donations table

## 🔧 Customization

### Colors
Edit CSS variables in `frontend/src/index.css`:
```css
:root {
  --primary-gold: #c9a227;
  --primary-blue: #1a365d;
  --accent-green: #38a169;
  /* ... */
}
```

### Fonts
Google Fonts are loaded in `index.html`. To change:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### Images
Place your photos in the `photos/` folder and reference them in:
- Staff profiles (via Admin Dashboard)
- Program images (via Admin Dashboard)

## 🚢 Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Supabase Security (Production)

Before going live, update RLS policies:
```sql
-- Enable RLS
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for staff" ON staff FOR SELECT USING (true);
CREATE POLICY "Public read access for programs" ON programs FOR SELECT USING (true);

-- Authenticated write access (requires Supabase Auth setup)
CREATE POLICY "Authenticated users can manage staff" ON staff FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
```

## 🐛 Troubleshooting

### Data not loading?
- Check if Supabase credentials are correct in `src/supabase.js`
- Verify database tables exist in Supabase Table Editor
- Check browser console for errors

### Build errors?
- Run `npm install` again
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

### Mobile menu not working?
- Ensure you're testing on a mobile device or using browser dev tools
- Check that viewport meta tag is present in index.html

## 📖 Scripture References

- **Vision**: Genesis 22:14 - "The LORD will provide"
- **Mission**: James 1:27 - "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress"
- **Giving**: 2 Corinthians 9:7 - "God loves a cheerful giver"

## 🤝 Support

For questions or support:
- Email: info@jehovahjirehministry.org
- Phone/WhatsApp: +265 993 506 106
- Location: Dzaleka Refugee Camp, Malawi

---

**Built with ❤️ for Jehovah Jireh Ministry**

*"The LORD will provide" - Genesis 22:14*
