-- Complete RLS policy rebuild to fix circular dependency issues
-- This script will drop ALL existing policies and recreate them properly

-- Step 1: Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;

-- Step 2: Temporarily disable RLS to ensure we can read/write
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Step 3: Verify your profiles exist and are correct
DO $$
BEGIN
  RAISE NOTICE 'Current profiles:';
END $$;

SELECT id, email, display_name, role FROM public.user_profiles;

-- Step 4: Re-enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create SIMPLE policies without circular dependencies
-- Policy 1: Allow ALL authenticated users to read their own profile
CREATE POLICY "allow_own_profile_select"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy 2: Allow ALL authenticated users to insert their own profile
CREATE POLICY "allow_own_profile_insert"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy 3: Allow ALL authenticated users to update their own profile
CREATE POLICY "allow_own_profile_update"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 4: Service role can do everything (for server-side operations)
CREATE POLICY "service_role_all_access"
  ON public.user_profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 6: Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'user_profiles'
ORDER BY policyname;

-- Step 7: Test the policies work
DO $$
DECLARE
  test_result RECORD;
BEGIN
  -- This should work now
  SELECT COUNT(*) as profile_count INTO test_result FROM public.user_profiles;
  RAISE NOTICE 'Total profiles in database: %', test_result.profile_count;
END $$;
