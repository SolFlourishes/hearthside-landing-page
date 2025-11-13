-- Add quiz history tracking to user_profiles
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'quiz_history'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN quiz_history JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- Add quiz reference field
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'quiz_reference'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN quiz_reference TEXT;
    END IF;
END $$;

-- Create conversations table for saving AI Coach conversations
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    conversation_date TIMESTAMPTZ DEFAULT NOW(),
    partner_type TEXT, -- 'coach', 'peer', 'elder'
    neurotype TEXT,
    generation TEXT,
    topic_tags TEXT[],
    messages JSONB NOT NULL, -- Array of message objects
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create translations table for saving translations
CREATE TABLE IF NOT EXISTS translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    translation_date TIMESTAMPTZ DEFAULT NOW(),
    original_message TEXT NOT NULL,
    translated_message TEXT NOT NULL,
    source_neurotype TEXT,
    source_generation TEXT,
    target_neurotype TEXT,
    target_generation TEXT,
    source_conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
    saved_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contacts table for tracking communication partners
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    neurotype TEXT,
    generation TEXT,
    interaction_count INTEGER DEFAULT 0,
    last_interaction_date TIMESTAMPTZ,
    translation_accuracy_score FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, name)
);

-- Enable RLS on new tables
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Users can view their own conversations"
    ON conversations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations"
    ON conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
    ON conversations FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
    ON conversations FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for translations
CREATE POLICY "Users can view their own translations"
    ON translations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own translations"
    ON translations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own translations"
    ON translations FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for contacts
CREATE POLICY "Users can view their own contacts"
    ON contacts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts"
    ON contacts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
    ON contacts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
    ON contacts FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_date ON conversations(conversation_date DESC);
CREATE INDEX IF NOT EXISTS idx_translations_user_id ON translations(user_id);
CREATE INDEX IF NOT EXISTS idx_translations_date ON translations(translation_date DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
