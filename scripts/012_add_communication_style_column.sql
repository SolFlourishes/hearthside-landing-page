-- Add communication_style column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS communication_style JSONB;

-- Add comment explaining the column
COMMENT ON COLUMN public.user_profiles.communication_style IS 'Stores Communication Style Quiz results as JSONB for flexibility';
