# Supabase Setup Guide

## 1. SQL Setup (Profiles Table & RLS)

Run the following SQL in the **SQL Editor** of your Supabase Dashboard to create the `profiles` table and set up security.

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Policy: Public can view profiles (optional, restrict if needed)
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

-- Policy: Users can insert their own profile.
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

-- Policy: Users can update their own profile.
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup automatically (Trigger)
-- This ensures every new user gets a matching row in the profiles table.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, created_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', now());
  return new;
end;
$$;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 2. Google OAuth Setup

1.  Go to **Authentication > Providers** in your Supabase Dashboard.
2.  Enable **Google**.
3.  You will need a **Client ID** and **Client Secret**.
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Create a new project (or select existing).
    *   Go to **APIs & Services > OAuth consent screen**. Set it to **External** and fill in required details.
    *   Go to **Credentials > Create Credentials > OAuth client ID**.
    *   **Application type**: Web application.
    *   **Authorized JavaScript origins**: `http://localhost:5173` (and your production domain later).
    *   **Authorized redirect URIs**: Copy the "Callback URL (for OAuth)" from your Supabase Google Provider page. It usually looks like: `https://<your-project-ref>.supabase.co/auth/v1/callback`.
4.  Copy the Client ID and Secret from Google back to Supabase.
5.  Click **Save**.

## 3. Environment Variables

Ensure your `.env` file has the correct Supabase keys:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
