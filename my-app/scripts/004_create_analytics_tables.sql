-- Create analytics aggregation table for user growth tracking
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Time period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  
  -- Usage metrics
  total_interactions INTEGER DEFAULT 0,
  draft_count INTEGER DEFAULT 0,
  analyze_count INTEGER DEFAULT 0,
  chat_count INTEGER DEFAULT 0,
  
  -- Style evolution metrics (JSONB for flexibility)
  avg_formality_score DECIMAL(3,2),
  avg_directness_score DECIMAL(3,2),
  communication_patterns JSONB,
  
  -- Improvement metrics
  avg_rating DECIMAL(3,2),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one record per user per period
  UNIQUE(user_id, period_start, period_type)
);

-- Enable RLS
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own analytics
CREATE POLICY "user_analytics_select_own"
  ON public.user_analytics FOR SELECT
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX user_analytics_user_period_idx ON public.user_analytics(user_id, period_start DESC);
