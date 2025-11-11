-- Create recipient profiles table for saved communication partners
CREATE TABLE IF NOT EXISTS public.recipient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic info
  name TEXT NOT NULL,
  relationship TEXT, -- 'boss', 'colleague', 'friend', 'family', etc.
  avatar_url TEXT,
  
  -- Full personality profile
  communication_style TEXT, -- 'direct', 'diplomatic', 'casual', etc.
  formality_level TEXT, -- 'very_formal', 'formal', 'neutral', 'casual', 'very_casual'
  directness_level TEXT, -- 'very_direct', 'direct', 'balanced', 'indirect', 'very_indirect'
  
  -- Context preferences
  neurodiversity_profile JSONB, -- autism, adhd, etc.
  generational_identity TEXT, -- 'gen_z', 'millennial', 'gen_x', 'boomer', etc.
  political_identity TEXT,
  political_values TEXT[],
  
  -- Custom notes from user
  notes TEXT,
  
  -- Usage tracking
  times_used INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.recipient_profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own recipient profiles
CREATE POLICY "recipient_profiles_select_own"
  ON public.recipient_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "recipient_profiles_insert_own"
  ON public.recipient_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "recipient_profiles_update_own"
  ON public.recipient_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "recipient_profiles_delete_own"
  ON public.recipient_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER recipient_profiles_updated_at
  BEFORE UPDATE ON public.recipient_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create index for faster lookups
CREATE INDEX recipient_profiles_user_id_idx ON public.recipient_profiles(user_id);
CREATE INDEX recipient_profiles_last_used_idx ON public.recipient_profiles(user_id, last_used_at DESC);
