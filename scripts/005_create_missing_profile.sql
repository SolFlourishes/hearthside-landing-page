-- This script creates a profile for existing authenticated users who don't have one yet
-- Run this in your Supabase SQL Editor if you're locked out

-- Replace the email below with YOUR email address
DO $$
DECLARE
  user_auth_id uuid;
  user_email text := 'your-email@example.com'; -- CHANGE THIS TO YOUR EMAIL
BEGIN
  -- Find the auth user ID by email
  SELECT id INTO user_auth_id
  FROM auth.users
  WHERE email = user_email;

  IF user_auth_id IS NOT NULL THEN
    -- Check if profile already exists
    IF NOT EXISTS (
      SELECT 1 FROM public.user_profiles WHERE id = user_auth_id
    ) THEN
      -- Create the profile with admin role
      INSERT INTO public.user_profiles (id, email, full_name, role, created_at, updated_at)
      VALUES (
        user_auth_id,
        user_email,
        'Admin User', -- You can change this to your name
        'admin', -- Set to 'admin' for admin access
        now(),
        now()
      );
      RAISE NOTICE 'Profile created for user: %', user_email;
    ELSE
      -- Profile exists, just update to admin role
      UPDATE public.user_profiles
      SET role = 'admin', updated_at = now()
      WHERE id = user_auth_id;
      RAISE NOTICE 'Profile updated to admin for user: %', user_email;
    END IF;
  ELSE
    RAISE NOTICE 'No auth user found with email: %', user_email;
  END IF;
END $$;

-- Verify the profile was created
SELECT id, email, role, created_at 
FROM public.user_profiles 
WHERE email = 'your-email@example.com'; -- CHANGE THIS TO YOUR EMAIL
