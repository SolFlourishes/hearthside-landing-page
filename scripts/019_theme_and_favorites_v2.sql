-- Add theme preferences and favorites support

-- Add theme and appearance preferences to user_profiles
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'user_profiles' AND column_name = 'theme_preference') THEN
    ALTER TABLE user_profiles ADD COLUMN theme_preference TEXT DEFAULT 'system';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'user_profiles' AND column_name = 'accent_color') THEN
    ALTER TABLE user_profiles ADD COLUMN accent_color TEXT DEFAULT 'orange';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'user_profiles' AND column_name = 'font_size') THEN
    ALTER TABLE user_profiles ADD COLUMN font_size TEXT DEFAULT 'medium';
  END IF;
END $$;

-- Add is_favorited column to conversations table (correct table name)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'conversations' AND column_name = 'is_favorited') THEN
    ALTER TABLE conversations ADD COLUMN is_favorited BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Add is_favorited column to translations table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'translations' AND column_name = 'is_favorited') THEN
    ALTER TABLE translations ADD COLUMN is_favorited BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Create indexes for favorites filtering (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_conversations_favorited ON conversations(user_id, is_favorited) WHERE is_favorited = TRUE;
CREATE INDEX IF NOT EXISTS idx_translations_favorited ON translations(user_id, is_favorited) WHERE is_favorited = TRUE;

-- Comment on new columns
COMMENT ON COLUMN user_profiles.theme_preference IS 'User theme preference: light, dark, or system';
COMMENT ON COLUMN user_profiles.accent_color IS 'User accent color choice: orange, blue, green, purple, pink';
COMMENT ON COLUMN user_profiles.font_size IS 'User font size preference: small, medium, large';
COMMENT ON COLUMN conversations.is_favorited IS 'Whether the conversation has been marked as favorite';
COMMENT ON COLUMN translations.is_favorited IS 'Whether the translation has been marked as favorite';
