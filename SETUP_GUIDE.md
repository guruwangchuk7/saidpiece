# 🚀 Complete Supabase Setup Guide - Step by Step

## 📝 Table of Contents
1. [Create Supabase Project](#1-create-supabase-project)
2. [Get Your API Keys](#2-get-your-api-keys)
3. [Configure Environment Variables](#3-configure-environment-variables)
4. [Create Database Table & Security](#4-create-database-table--security)
5. [Setup Google OAuth](#5-setup-google-oauth)
6. [Test Your Setup](#6-test-your-setup)

---

## 1. Create Supabase Project

### Step 1.1: Sign Up / Login
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign in with GitHub (recommended) or email

### Step 1.2: Create New Project
1. Click **"New Project"**
2. Fill in the details:
   - **Name**: `saidpiece` (or any name you prefer)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine to start
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup to complete

---

## 2. Get Your API Keys

### Step 2.1: Find Your Keys
1. In your Supabase project dashboard
2. Click the **⚙️ Settings** icon (bottom left)
3. Click **"API"** in the settings menu
4. You'll see:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 2.2: Copy Your Keys
```
Project URL: https://your-project-ref.supabase.co
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT**: Keep these safe! Don't share them publicly.

---

## 3. Configure Environment Variables

### Step 3.1: Update .env File
1. Open your `.env` file in the project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-actual-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here
```

### Step 3.2: Restart Dev Server
**CRITICAL**: You MUST restart your dev server after changing .env

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 4. Create Database Table & Security

### Step 4.1: Open SQL Editor
1. In Supabase dashboard, click **🗄️ SQL Editor** (left sidebar)
2. Click **"New query"**

### Step 4.2: Run This SQL Script
Copy and paste this ENTIRE script, then click **"Run"**:

```sql
-- ============================================
-- PROFILES TABLE SETUP
-- ============================================

-- 1. Create the profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Policy: Anyone can view profiles (optional - adjust as needed)
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 4. Create trigger function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, created_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'User'),
    now()
  );
  RETURN new;
END;
$$;

-- 5. Create trigger to call function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### Step 4.3: Verify Table Creation
1. Click **🗄️ Table Editor** (left sidebar)
2. You should see **"profiles"** table listed
3. Click on it to see the structure

✅ **Success Indicators**:
- Table has columns: `id`, `email`, `full_name`, `created_at`, `updated_at`
- RLS is enabled (green shield icon)

---

## 5. Setup Google OAuth

### Step 5.1: Get Supabase Callback URL
1. In Supabase dashboard: **🔐 Authentication** → **Providers**
2. Find **Google** in the list
3. Click to expand it
4. **COPY** the **"Callback URL (for OAuth)"**
   - It looks like: `https://xxxxx.supabase.co/auth/v1/callback`
   - ⚠️ You'll need this in the next steps!

### Step 5.2: Create Google OAuth App

#### A. Go to Google Cloud Console
1. Visit [https://console.cloud.google.com](https://console.cloud.google.com)
2. Sign in with your Google account

#### B. Create/Select Project
1. Click the project dropdown (top left, near "Google Cloud")
2. Click **"NEW PROJECT"**
3. Name it: `saidpiece-auth` (or any name)
4. Click **"CREATE"**
5. Wait for creation, then select it from the dropdown

#### C. Configure OAuth Consent Screen
1. In left sidebar: **APIs & Services** → **OAuth consent screen**
2. Choose **"External"** (unless you have Google Workspace)
3. Click **"CREATE"**
4. Fill in required fields:
   - **App name**: `Saidpiece`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click **"SAVE AND CONTINUE"**
6. **Scopes**: Click **"SAVE AND CONTINUE"** (no changes needed)
7. **Test users**: Click **"SAVE AND CONTINUE"** (optional)
8. Click **"BACK TO DASHBOARD"**

#### D. Create OAuth Credentials
1. In left sidebar: **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"** (top)
3. Select **"OAuth client ID"**
4. Choose **"Web application"**
5. Fill in:
   - **Name**: `Saidpiece Web Client`
   
   - **Authorized JavaScript origins**:
     ```
     http://localhost:5173
     ```
     (Add your production domain later)
   
   - **Authorized redirect URIs**:
     ```
     https://your-supabase-project.supabase.co/auth/v1/callback
     ```
     ⚠️ **PASTE THE CALLBACK URL YOU COPIED FROM SUPABASE HERE!**

6. Click **"CREATE"**

#### E. Copy Your Credentials
A popup will show:
- **Client ID**: `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxxxxxxxxxxxx`

⚠️ **SAVE THESE!** You'll need them in the next step.

### Step 5.3: Configure Google in Supabase
1. Back in Supabase: **🔐 Authentication** → **Providers**
2. Find **Google** and toggle it **ON** (enable it)
3. Paste your credentials:
   - **Client ID**: (from Google Cloud Console)
   - **Client Secret**: (from Google Cloud Console)
4. Click **"Save"**

✅ **Google OAuth is now configured!**

---

## 6. Test Your Setup

### Step 6.1: Test Email/Password Signup
1. Open your app: `http://localhost:5173`
2. Navigate to `/team`
3. Click on any team member (except Thinley Dhendup)
4. Modal should appear
5. Click **"create a new account"**
6. Enter email and password
7. Click **"Sign up"**
8. Check your email for confirmation link
9. Click the confirmation link
10. Go back and login

### Step 6.2: Verify Profile Created
1. In Supabase: **🗄️ Table Editor** → **profiles**
2. You should see your user's profile row!
3. Check that `email` and `full_name` are populated

### Step 6.3: Test Google OAuth
1. In your app, click on a protected team member
2. Click **"Continue with Google"**
3. Select your Google account
4. Grant permissions
5. You should be redirected back and logged in!
6. Check Supabase **profiles** table - new row should appear

### Step 6.4: Test Protected Routes
1. While logged in, navigate to `/dashboard`
2. You should see your profile information
3. Click **"Sign Out"**
4. Try accessing `/dashboard` again
5. You should see the login modal

---

## 🎉 Success Checklist

- ✅ Supabase project created
- ✅ API keys added to `.env`
- ✅ Dev server restarted
- ✅ `profiles` table created
- ✅ RLS policies enabled
- ✅ Trigger function created
- ✅ Google OAuth configured
- ✅ Email signup works
- ✅ Google login works
- ✅ Profiles auto-created in database
- ✅ Protected routes working

---

## 🐛 Troubleshooting

### "Invalid API key"
- Double-check your `.env` file
- Make sure you copied the **anon** key, not the **service_role** key
- Restart dev server after changing `.env`

### "Email not confirmed"
- Check your spam folder
- In Supabase: **Authentication** → **Settings** → Disable "Enable email confirmations" for testing
- Re-enable for production!

### Google OAuth redirect error
- Verify redirect URI in Google Console EXACTLY matches Supabase callback URL
- Check for typos (https vs http, trailing slashes)
- Make sure Google provider is enabled in Supabase

### Profile not created
- Check Supabase **Logs** for errors
- Verify trigger function exists: **Database** → **Functions**
- Check if RLS policies are blocking insert

### "successMsg is not defined" error
- Hard refresh browser: `Ctrl + Shift + R`
- Clear browser cache
- Restart dev server

---

## 📞 Need Help?

1. Check Supabase Dashboard **Logs** tab
2. Check browser console for errors
3. Review the `AUTH_IMPLEMENTATION.md` file
4. Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)

---

## 🚀 Next Steps

Once everything is working:

1. **Add Production URLs**:
   - Add your production domain to Google OAuth redirect URIs
   - Update `redirectTo` in `AuthContext.jsx` for production

2. **Customize Profile Table**:
   - Add more fields (avatar_url, bio, etc.)
   - Update the trigger function to include new fields

3. **Email Templates**:
   - Customize email templates in Supabase: **Authentication** → **Email Templates**

4. **Deploy**:
   - Deploy your app to Vercel/Netlify
   - Update environment variables in hosting platform
   - Test auth in production

---

**You're all set! 🎊** Your authentication system is now fully functional with both email/password and Google OAuth, with automatic profile creation in your Supabase database!
