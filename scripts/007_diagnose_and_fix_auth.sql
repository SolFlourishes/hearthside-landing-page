-- Diagnostic and Fix Script for Authentication Issues
-- Run this in your Supabase SQL Editor

-- 1. Show all auth users
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 2. Show all user profiles
-- Updated to use correct column name 'display_name' instead of 'full_name'
SELECT 
  id,
  email,
  display_name,
  role,
  created_at
FROM public.user_profiles
ORDER BY created_at DESC;

-- 3. Find auth users WITHOUT profiles
SELECT 
  au.id,
  au.email,
  au.created_at
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE up.id IS NULL
ORDER BY au.created_at DESC;

-- 4. CREATE MISSING PROFILES AND SET AS ADMIN
-- This will create profiles for all auth users who don't have one
-- and set sol@hearthsideworks.com as admin
-- Updated to use correct column name 'display_name' and added required columns
INSERT INTO public.user_profiles (
  id, 
  email, 
  display_name, 
  role,
  subscription_tier,
  subscription_status
)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
  CASE 
    WHEN au.email = 'sol@hearthsideworks.com' THEN 'admin'
    ELSE 'user'
  END,
  CASE 
    WHEN au.email = 'sol@hearthsideworks.com' THEN 'premium'
    ELSE 'free'
  END,
  'active'
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE up.id IS NULL
ON CONFLICT (id) DO UPDATE 
SET 
  role = CASE 
    WHEN EXCLUDED.email = 'sol@hearthsideworks.com' THEN 'admin'
    ELSE user_profiles.role
  END,
  subscription_tier = CASE 
    WHEN EXCLUDED.email = 'sol@hearthsideworks.com' THEN 'premium'
    ELSE user_profiles.subscription_tier
  END;

-- 5. Ensure sol@hearthsideworks.com is admin (in case profile already exists)
-- Added subscription_tier update
UPDATE public.user_profiles
SET 
  role = 'admin',
  subscription_tier = 'premium',
  subscription_status = 'active'
WHERE email = 'sol@hearthsideworks.com';

-- 6. Verify the fix - show all profiles again
-- Updated to use correct column name 'display_name'
SELECT 
  id,
  email,
  display_name,
  role,
  subscription_tier,
  subscription_status,
  created_at
FROM public.user_profiles
ORDER BY created_at DESC;
