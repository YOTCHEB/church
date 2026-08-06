# Supabase Setup Guide for Jehovah Jire Ministry

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **Sign Up** and create an account (free tier available)
3. Verify your email address

## Step 2: Create a New Project

1. Click **New Project** in your Supabase dashboard
2. Fill in the project details:
   - **Name**: `jehovah-jire-ministry` (or your preferred name)
   - **Database Password**: Choose a strong password (save it securely!)
   - **Region**: Choose the closest region to your location
3. Click **Create new project**
4. Wait 2-3 minutes for the project to be provisioned

## Step 3: Run the Database Setup Script

1. In your Supabase project dashboard, click on **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy the entire contents of `supabase_setup.sql` from this project
4. Paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned" for each statement

## Step 4: Get Your Supabase Credentials

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Click on **API** under Configuration
3. Copy these two values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)

## Step 5: Configure Your Environment Files

### Frontend Configuration

1. Open `frontend/src/supabase.js`
2. Replace the placeholder values:

```javascript
const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseAnonKey = "your-anon-key";
```

With your actual credentials:

```javascript
const supabaseUrl = "https://xxxxxxxxxxxxx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

### Backend Configuration

1. Create a `.env` file in the `backend` folder (copy from `.env.example`)
2. Add your Supabase credentials:

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=1440

CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

> **Note**: For the backend, you can use either the `anon` key or the `service_role` key. The `service_role` key bypasses RLS policies and should only be used on the server-side (never in the frontend!).

## Step 6: Install Dependencies

### Backend

```bash
cd backend
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Step 7: Verify the Setup

### Check Database Tables

1. In Supabase dashboard, go to **Table Editor**
2. You should see three tables: `staff`, `programs`, `donations`

### Test the Backend

1. Start the backend server:

```bash
cd backend
python main.py
```

2. Open your browser and go to: `http://localhost:8000/api/health`
3. You should see: `{"status": "healthy", "database": "connected"}`

### Test the Frontend

1. Start the frontend dev server:

```bash
cd frontend
npm run dev
```

2. Open the URL shown (usually `http://localhost:5173`)
3. Navigate through the pages to verify data is loading

## Step 8: (Optional) Create Admin Authentication

If you want to add admin login functionality:

1. Go to **Authentication** > **Providers** in Supabase
2. Enable **Email** authentication
3. Configure email templates under **Authentication** > **Email Templates**
4. Update the backend to use Supabase Auth for admin login

## Troubleshooting

### "Database not initialized" Error

- Check that your `SUPABASE_URL` and `SUPABASE_KEY` are correct in `.env`
- Make sure the `.env` file is in the `backend` folder
- Restart the backend server after changing `.env`

### Data Not Loading in Frontend

- Verify `supabase.js` has the correct credentials
- Check browser console for errors
- Ensure RLS policies allow public read access

### CORS Errors

- Make sure your backend `CORS_ORIGINS` includes your frontend URL
- Default is `http://localhost:5173` for Vite

## Database Schema Reference

### `staff` Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Staff member's name |
| position | VARCHAR | Job title/position |
| email | VARCHAR | Email address |
| phone | VARCHAR | Phone number |
| bio | TEXT | Biography |
| image_url | TEXT | Profile image URL |
| order | INTEGER | Display order |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

### `programs` Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR | Program title |
| description | TEXT | Program description |
| icon | VARCHAR | Icon name (e.g., FaHome) |
| image_url | TEXT | Program image URL |
| order | INTEGER | Display order |
| is_active | BOOLEAN | Show on website |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

### `donations` Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| donor_name | VARCHAR | Donor's name |
| donor_email | VARCHAR | Donor's email |
| donor_phone | VARCHAR | Donor's phone |
| amount | DECIMAL | Donation amount |
| donation_type | VARCHAR | Financial/Material/Volunteer |
| message | TEXT | Optional message |
| is_anonymous | BOOLEAN | Hide donor name |
| status | VARCHAR | pending/completed/cancelled |
| created_at | TIMESTAMP | Donation time |

## Need Help?

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
