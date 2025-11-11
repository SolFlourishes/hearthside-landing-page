-- Add missing columns to user_profiles table for communication context
-- These columns store user preferences that auto-populate in Clarity Coach

-- Add neurotype column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'user_profiles' 
                 AND column_name = 'neurotype') THEN
    ALTER TABLE public.user_profiles ADD COLUMN neurotype TEXT;
  END IF;
END $$;

-- Add generation column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'user_profiles' 
                 AND column_name = 'generation') THEN
    ALTER TABLE public.user_profiles ADD COLUMN generation TEXT;
  END IF;
END $$;

-- Add avatar_url column if it doesn't exist (for profile pictures)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'user_profiles' 
                 AND column_name = 'avatar_url') THEN
    ALTER TABLE public.user_profiles ADD COLUMN avatar_url TEXT;
  END IF;
END $$;

-- Add bio column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'user_profiles' 
                 AND column_name = 'bio') THEN
    ALTER TABLE public.user_profiles ADD COLUMN bio TEXT;
  END IF;
END $$;

-- Create index on neurotype for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_neurotype ON public.user_profiles(neurotype);

-- Create index on generation for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_generation ON public.user_profiles(generation);

COMMENT ON COLUMN public.user_profiles.neurotype IS 'User neurotype (Neurotypical, Autistic, ADHD, etc.) for personalized communication';
COMMENT ON COLUMN public.user_profiles.generation IS 'User generation (Gen Z, Millennial, Xennial, Gen X, Boomer, Silent) for context-aware translations';
COMMENT ON COLUMN public.user_profiles.avatar_url IS 'URL to user profile picture stored in Vercel Blob';
COMMENT ON COLUMN public.user_profiles.bio IS 'User biography or description';
