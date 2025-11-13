-- Add tutorial_completed column to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS tutorial_completed BOOLEAN DEFAULT FALSE;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_tutorial_completed 
ON user_profiles(tutorial_completed);

-- Update existing users to have tutorial_completed = true (so they don't see it)
UPDATE user_profiles
SET tutorial_completed = true
WHERE tutorial_completed IS NULL;
