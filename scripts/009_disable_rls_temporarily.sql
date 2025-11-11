-- Temporarily disable RLS to eliminate it as a blocker
-- This will help us debug the auth flow without RLS interference

-- Disable RLS on user_profiles
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Verify profiles exist
SELECT 
  id, 
  email, 
  display_name,
  role,
  subscription_tier,
  subscription_status
FROM public.user_profiles
ORDER BY created_at DESC;
