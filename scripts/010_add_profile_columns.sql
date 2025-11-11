-- Add missing columns to user_profiles table
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Add comment to columns
COMMENT ON COLUMN public.user_profiles.avatar_url IS 'URL to user profile picture';
COMMENT ON COLUMN public.user_profiles.bio IS 'User bio/description';
