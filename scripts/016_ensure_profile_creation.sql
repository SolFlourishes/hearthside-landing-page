-- Create or replace function to automatically create user_profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, tutorial_completed, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    FALSE,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure tutorial_completed defaults to false for new rows
ALTER TABLE user_profiles 
ALTER COLUMN tutorial_completed SET DEFAULT FALSE;
