# 🗄️ Supabase Database Setup Guide

This guide will help you set up Supabase as the persistent database for the User Profile App.

---

## 📋 Table of Contents

1. [Create Supabase Account](#1-create-supabase-account)
2. [Create New Project](#2-create-new-project)
3. [Set Up Database Tables](#3-set-up-database-tables)
4. [Get API Keys](#4-get-api-keys)
5. [Configure Netlify Environment](#5-configure-netlify-environment)
6. [Test the Connection](#6-test-the-connection)

---

## 1. Create Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with:
   - GitHub (recommended)
   - Email
   - Google
4. Verify your email if required

---

## 2. Create New Project

1. Click **"New Project"**
2. Fill in the details:
   - **Name:** `user-profile-app` (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier works fine
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete

---

## 3. Set Up Database Tables

### Option A: Using SQL Editor (Recommended)

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy and paste the following SQL:

```sql
-- =============================================
-- USER PROFILE APP - DATABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  title VARCHAR(100),
  location VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  phone VARCHAR(20),
  website VARCHAR(255),
  twitter VARCHAR(100),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  stats_posts INTEGER DEFAULT 0,
  stats_followers INTEGER DEFAULT 0,
  stats_following INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- =============================================
-- POINTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total INTEGER DEFAULT 0,
  donated INTEGER DEFAULT 0,
  utilized INTEGER DEFAULT 0,
  available INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_points_user_id ON points(user_id);

-- =============================================
-- POINTS HISTORY TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS points_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- earned, donated, utilized, transferred, received, converted
  amount INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_points_history_user_id ON points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_points_history_created_at ON points_history(created_at DESC);

-- =============================================
-- USER SETTINGS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notifications_email BOOLEAN DEFAULT true,
  notifications_push BOOLEAN DEFAULT false,
  notifications_sms BOOLEAN DEFAULT false,
  notifications_weekly_digest BOOLEAN DEFAULT true,
  notifications_marketing BOOLEAN DEFAULT false,
  privacy_profile_visibility VARCHAR(20) DEFAULT 'public',
  privacy_show_email BOOLEAN DEFAULT false,
  privacy_show_phone BOOLEAN DEFAULT false,
  account_language VARCHAR(10) DEFAULT 'en',
  account_timezone VARCHAR(50) DEFAULT 'UTC',
  account_theme VARCHAR(20) DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- =============================================
-- ACTIVITIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'general', -- fitness, social, volunteer, education, general
  date DATE NOT NULL,
  time TIME DEFAULT '12:00:00',
  location VARCHAR(255),
  max_participants INTEGER DEFAULT 10,
  current_participants INTEGER DEFAULT 0,
  points_reward INTEGER DEFAULT 50,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, completed, cancelled
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_created_by ON activities(created_by);

-- =============================================
-- ACTIVITY PARTICIPANTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS activity_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_activity_participants_activity ON activity_participants(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_participants_user ON activity_participants(user_id);

-- =============================================
-- ACTIVITY INVITATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS activity_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  inviter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  invitee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, declined
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_invitations_activity ON activity_invitations(activity_id);
CREATE INDEX IF NOT EXISTS idx_invitations_invitee ON activity_invitations(invitee_id);

-- =============================================
-- LEADERBOARD VIEW (Country)
-- =============================================
CREATE OR REPLACE VIEW leaderboard_by_country AS
SELECT 
  u.id,
  u.name,
  u.location,
  COALESCE(p.total, 0) as total_points,
  ROW_NUMBER() OVER (PARTITION BY u.location ORDER BY COALESCE(p.total, 0) DESC) as country_rank
FROM users u
LEFT JOIN points p ON u.id = p.user_id
WHERE u.location IS NOT NULL AND u.location != '';

-- =============================================
-- LEADERBOARD VIEW (World)
-- =============================================
CREATE OR REPLACE VIEW leaderboard_world AS
SELECT 
  u.id,
  u.name,
  u.location,
  COALESCE(p.total, 0) as total_points,
  ROW_NUMBER() OVER (ORDER BY COALESCE(p.total, 0) DESC) as world_rank
FROM users u
LEFT JOIN points p ON u.id = p.user_id;

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE points ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_invitations ENABLE ROW LEVEL SECURITY;

-- Users policies (public read, authenticated write)
CREATE POLICY "Users are viewable by everyone" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Points policies
CREATE POLICY "Points are viewable by everyone" ON points
  FOR SELECT USING (true);

CREATE POLICY "Users can update own points" ON points
  FOR ALL USING (auth.uid()::text = user_id::text);

-- Points history policies
CREATE POLICY "Points history viewable by owner" ON points_history
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Activities policies (public read, authenticated create)
CREATE POLICY "Activities are viewable by everyone" ON activities
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create activities" ON activities
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Activity creators can update" ON activities
  FOR UPDATE USING (auth.uid()::text = created_by::text);

-- For development/demo: Allow anonymous access
CREATE POLICY "Allow anonymous read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read points" ON points FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read activities" ON activities FOR SELECT USING (true);

-- =============================================
-- INSERT SAMPLE DATA
-- =============================================

-- Insert demo user
INSERT INTO users (id, username, email, password, name, title, location, bio, stats_posts, stats_followers, stats_following)
VALUES (
  'demo-user-001',
  'johndoe',
  'john@example.com',
  'demo-password-hash',
  'John Doe',
  'Software Engineer',
  'San Francisco, CA',
  'Passionate software engineer with 5+ years of experience building scalable web applications.',
  127,
  1203,
  342
) ON CONFLICT (id) DO NOTHING;

-- Insert demo points
INSERT INTO points (user_id, total, donated, utilized, available)
VALUES ('demo-user-001', 1500, 250, 700, 550)
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample activities
INSERT INTO activities (id, name, description, type, date, time, location, max_participants, current_participants, points_reward, status, created_by)
VALUES 
  ('act-001', 'Morning Yoga Session', 'A refreshing 30-minute yoga session', 'fitness', '2024-12-10', '07:00', 'Central Park', 20, 12, 50, 'approved', 'demo-user-001'),
  ('act-002', 'Tech Meetup', 'Monthly tech enthusiasts gathering', 'social', '2024-12-15', '18:00', 'Community Center', 50, 35, 75, 'approved', 'demo-user-001'),
  ('act-003', 'Beach Cleanup', 'Help clean up the local beach', 'volunteer', '2024-12-20', '09:00', 'Sunset Beach', 30, 18, 100, 'pending', 'demo-user-001'),
  ('act-004', 'Coding Workshop', 'Learn React basics', 'education', '2024-12-25', '14:00', 'Online', 100, 67, 150, 'approved', 'demo-user-001')
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- DONE!
-- =============================================
SELECT 'Database setup complete!' as status;
```

4. Click **"Run"** or press `Ctrl+Enter`
5. You should see **"Database setup complete!"**

### Option B: Using Table Editor (Visual)

If you prefer the visual editor:
1. Go to **Table Editor** (left sidebar)
2. Create each table manually with the fields described above
3. This is more time-consuming but gives you a visual overview

---

## 4. Get API Keys

1. In your Supabase project, go to **Settings** (gear icon)
2. Click **API** in the left menu
3. Copy these values:

```
Project URL: https://xxxxxxxxxxxx.supabase.co
anon (public) key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Important:** Keep these keys safe! The `anon` key is public-safe for frontend use.

---

## 5. Configure Netlify Environment

### Option A: Netlify Dashboard (Recommended)

1. Go to **https://app.netlify.com**
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add these variables:

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://xxxxxxxxxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `PASSWORD_SALT` | `your-random-secret-string` |

5. Click **Save**
6. **Redeploy** your site for changes to take effect

### Option B: Local Development (.env file)

Create a `.env` file in your project root:

```env
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PASSWORD_SALT=your-random-secret-string
```

**⚠️ Important:** Add `.env` to your `.gitignore` file!

---

## 6. Test the Connection

### Test locally:

```bash
# Start Netlify dev server
netlify dev

# Test the API
curl http://localhost:8888/api/users/demo
```

### Test in browser console:

```javascript
// After deployment
fetch('/api/users/demo')
  .then(r => r.json())
  .then(console.log);
```

### Expected response:

```json
{
  "success": true,
  "user": {
    "id": "demo-user-001",
    "username": "johndoe",
    "name": "John Doe",
    "points": { "total": 1500, "available": 550 }
  }
}
```

---

## 📊 Database Schema Diagram

```
┌─────────────────┐     ┌─────────────────┐
│     users       │     │     points      │
├─────────────────┤     ├─────────────────┤
│ id (PK)         │◄────│ user_id (FK)    │
│ username        │     │ total           │
│ email           │     │ donated         │
│ password        │     │ utilized        │
│ name            │     │ available       │
│ title           │     └─────────────────┘
│ location        │
│ bio             │     ┌─────────────────┐
│ avatar_url      │     │ points_history  │
│ phone           │     ├─────────────────┤
│ website         │◄────│ user_id (FK)    │
│ twitter         │     │ type            │
│ linkedin        │     │ amount          │
│ github          │     │ description     │
│ stats_*         │     │ created_at      │
│ created_at      │     └─────────────────┘
│ updated_at      │
└─────────────────┘     ┌─────────────────┐
        │               │  user_settings  │
        │               ├─────────────────┤
        └──────────────►│ user_id (FK)    │
                        │ notifications_* │
                        │ privacy_*       │
                        │ account_*       │
                        └─────────────────┘

┌─────────────────┐     ┌─────────────────────┐
│   activities    │     │ activity_participants│
├─────────────────┤     ├─────────────────────┤
│ id (PK)         │◄────│ activity_id (FK)    │
│ name            │     │ user_id (FK)        │
│ description     │     │ joined_at           │
│ type            │     └─────────────────────┘
│ date            │
│ time            │     ┌─────────────────────┐
│ location        │     │ activity_invitations │
│ max_participants│     ├─────────────────────┤
│ current_*       │◄────│ activity_id (FK)    │
│ points_reward   │     │ inviter_id (FK)     │
│ status          │     │ invitee_id (FK)     │
│ created_by (FK) │     │ message             │
│ created_at      │     │ status              │
└─────────────────┘     └─────────────────────┘
```

---

## 🔒 Security Best Practices

1. **Never expose the `service_role` key** - Only use `anon` key in frontend
2. **Enable Row Level Security (RLS)** - Already configured in SQL above
3. **Use environment variables** - Never commit keys to Git
4. **Validate input** - Server-side validation in Netlify functions
5. **Hash passwords** - Already implemented with SHA-256 + salt

---

## 🆘 Troubleshooting

### "Supabase credentials not found"
- Check environment variables are set correctly
- Redeploy after adding environment variables
- Verify variable names: `SUPABASE_URL`, `SUPABASE_ANON_KEY`

### "PGRST116: Row not found"
- This is normal for non-existent records
- The code handles this gracefully

### "Permission denied"
- Check RLS policies are created
- Verify the `anon` key has correct permissions

### "Connection refused"
- Check Supabase project is active (not paused)
- Verify URL is correct (no typos)

---

## ✅ Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Ran SQL schema in SQL Editor
- [ ] Copied API URL and anon key
- [ ] Added environment variables to Netlify
- [ ] Redeployed the site
- [ ] Tested API endpoints

---

## 🎉 Done!

Your app now has **persistent database storage**!

All data (users, points, activities) will be saved permanently in Supabase and won't reset between deployments or function cold starts.

---

**Support Resources:**
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

