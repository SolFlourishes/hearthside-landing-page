-- Add neurotype, generation, and other fields to profiles table
-- Also make email nullable since it can be derived from auth.users

-- First, make email nullable to fix the constraint issue
ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

-- Add new columns for user context
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS neurotype TEXT CHECK (neurotype IN ('neurotypical', 'autistic', 'adhd', 'other', NULL)),
  ADD COLUMN IF NOT EXISTS generation TEXT CHECK (generation IN ('silent', 'boomer', 'genx', 'millennial', 'genz', 'genalpha', NULL)),
  ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Update the trigger to handle email from auth.users properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    new.id,
    new.email,  -- This will come from auth.users
    COALESCE(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', NULL)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, profiles.display_name);
  RETURN new;
END;
$$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_neurotype ON public.profiles(neurotype);
CREATE INDEX IF NOT EXISTS idx_profiles_generation ON public.profiles(generation);
