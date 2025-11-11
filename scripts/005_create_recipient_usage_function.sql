-- Create function to increment recipient usage count
CREATE OR REPLACE FUNCTION public.increment_recipient_usage(recipient_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.recipient_profiles
  SET 
    times_used = times_used + 1,
    last_used_at = NOW()
  WHERE id = recipient_id;
END;
$$;
