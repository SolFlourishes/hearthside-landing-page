-- Create conversations table for Clarity Coach
CREATE TABLE IF NOT EXISTS clarity_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Conversation',
  messages JSONB DEFAULT '[]'::jsonb,
  is_draft BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster user queries
CREATE INDEX IF NOT EXISTS idx_clarity_conversations_user_id ON clarity_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_clarity_conversations_created_at ON clarity_conversations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE clarity_conversations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own conversations
CREATE POLICY "Users can view own conversations"
  ON clarity_conversations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own conversations
CREATE POLICY "Users can insert own conversations"
  ON clarity_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own conversations
CREATE POLICY "Users can update own conversations"
  ON clarity_conversations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own conversations
CREATE POLICY "Users can delete own conversations"
  ON clarity_conversations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on conversation changes
DROP TRIGGER IF EXISTS on_conversation_updated ON clarity_conversations;
CREATE TRIGGER on_conversation_updated
  BEFORE UPDATE ON clarity_conversations
  FOR EACH ROW EXECUTE FUNCTION public.handle_conversation_updated_at();
