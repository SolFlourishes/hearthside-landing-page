-- Create communication history table
CREATE TABLE IF NOT EXISTS public.communication_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_profile_id UUID REFERENCES public.recipient_profiles(id) ON DELETE SET NULL,
  
  -- Type of interaction
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('draft', 'analyze', 'chat')),
  
  -- Original content
  original_text TEXT NOT NULL,
  
  -- Translated/analyzed content
  result_text TEXT,
  
  -- Context used
  sender_profile JSONB, -- Snapshot of sender's communication preferences
  receiver_profile JSONB, -- Snapshot of receiver's communication preferences
  context_options JSONB, -- Other options like formality, directness, etc.
  
  -- AI feedback
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  user_feedback TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.communication_history ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own history
CREATE POLICY "communication_history_select_own"
  ON public.communication_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "communication_history_insert_own"
  ON public.communication_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "communication_history_update_own"
  ON public.communication_history FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "communication_history_delete_own"
  ON public.communication_history FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for faster lookups
CREATE INDEX communication_history_user_id_idx ON public.communication_history(user_id);
CREATE INDEX communication_history_created_at_idx ON public.communication_history(user_id, created_at DESC);
CREATE INDEX communication_history_recipient_idx ON public.communication_history(recipient_profile_id);
