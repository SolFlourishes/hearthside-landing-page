-- Create subscription tiers enum
CREATE TYPE subscription_tier AS ENUM ('free', 'premium');

-- Add subscription fields to user_profiles if not exists
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS subscription_tier subscription_tier DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Create subscription_history table
CREATE TABLE IF NOT EXISTS subscription_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL,
  action TEXT NOT NULL, -- 'upgrade', 'downgrade', 'cancel', 'renew'
  amount DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_subscription_history_user_id ON subscription_history(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_history_created_at ON subscription_history(created_at DESC);

-- Enable Row Level Security
ALTER TABLE subscription_history ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own subscription history
CREATE POLICY "Users can view own subscription history"
  ON subscription_history
  FOR SELECT
  USING (auth.uid() = user_id);
