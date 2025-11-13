-- Add notification preferences to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{
  "email_enabled": true,
  "saved_items": "never",
  "quiz_reminders": true,
  "communication_tips": "monthly",
  "feature_updates": true,
  "connection_reminders": true,
  "digest_frequency": "weekly"
}'::jsonb;

-- Create notifications table for admin-scheduled messages
CREATE TABLE IF NOT EXISTS scheduled_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'newsletter', 'feature_update', 'tips', 'community'
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'scheduled', 'sent', 'cancelled'
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  target_audience JSONB DEFAULT '{"all": true}'::jsonb, -- Can filter by role, quiz_completed, etc
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  recipient_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0
);

-- Create notification logs table
CREATE TABLE IF NOT EXISTS notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  notification_id UUID REFERENCES scheduled_notifications(id) ON DELETE SET NULL,
  type VARCHAR(50) NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'sent', -- 'sent', 'failed', 'bounced'
  error_message TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_scheduled_notifications_status ON scheduled_notifications(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_notifications_scheduled_for ON scheduled_notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notification_logs_user_id ON notification_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_logs_sent_at ON notification_logs(sent_at);

-- RLS Policies
ALTER TABLE scheduled_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Admins can manage all notifications
CREATE POLICY "Admins can manage scheduled_notifications"
  ON scheduled_notifications
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Users can view their own notification logs
CREATE POLICY "Users can view own notification_logs"
  ON notification_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all notification logs
CREATE POLICY "Admins can view all notification_logs"
  ON notification_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );
