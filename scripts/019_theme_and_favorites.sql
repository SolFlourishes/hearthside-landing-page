-- Add theme preferences and favorites functionality

-- Add theme preferences to user_profiles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'theme_preferences'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN theme_preferences JSONB DEFAULT '{
      "mode": "light",
      "accentColor": "orange",
      "fontSize": "medium"
    }'::jsonb;
  END IF;
END $$;

-- Add favorites columns to existing tables
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clarity_conversations' AND column_name = 'is_favorited'
  ) THEN
    ALTER TABLE clarity_conversations ADD COLUMN is_favorited BOOLEAN DEFAULT FALSE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clarity_translations' AND column_name = 'is_favorited'
  ) THEN
    ALTER TABLE clarity_translations ADD COLUMN is_favorited BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Create indexes for favorites filtering
CREATE INDEX IF NOT EXISTS idx_conversations_favorited 
  ON clarity_conversations(user_id, is_favorited) 
  WHERE is_favorited = TRUE;

CREATE INDEX IF NOT EXISTS idx_translations_favorited 
  ON clarity_translations(user_id, is_favorited) 
  WHERE is_favorited = TRUE;

-- Add comments
COMMENT ON COLUMN user_profiles.theme_preferences IS 'User theme customization settings (mode, accent color, font size)';
COMMENT ON COLUMN clarity_conversations.is_favorited IS 'Whether this conversation is marked as favorite/bookmarked';
COMMENT ON COLUMN clarity_translations.is_favorited IS 'Whether this translation is marked as favorite/bookmarked';
