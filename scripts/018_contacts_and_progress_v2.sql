-- Create custom types first
DO $$ BEGIN
    CREATE TYPE RelationshipContext AS ENUM (
        'spouse_partner',
        'parent',
        'child',
        'sibling',
        'extended_family',
        'close_friend',
        'friend',
        'acquaintance',
        'boss_manager',
        'direct_report',
        'coworker',
        'client',
        'vendor',
        'neighbor',
        'community_member',
        'other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship RelationshipContext NOT NULL,
    relationship_other TEXT,
    
    -- Communication preferences
    neurotype TEXT,
    generation TEXT,
    political_identity TEXT,
    political_values TEXT[],
    communication_style TEXT,
    notes TEXT,
    
    -- Progress tracking
    total_interactions INTEGER DEFAULT 0,
    first_interaction_at TIMESTAMPTZ,
    last_interaction_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT unique_user_contact UNIQUE(user_id, name)
);

-- Create contact interactions table
CREATE TABLE IF NOT EXISTS contact_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('draft', 'analyze', 'chat', 'politalk')),
    interaction_data JSONB,
    
    -- Progress metrics
    clarity_score INTEGER CHECK (clarity_score BETWEEN 1 AND 10),
    effectiveness_rating INTEGER CHECK (effectiveness_rating BETWEEN 1 AND 5),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contacts_user ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_updated ON contacts(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_contact ON contact_interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_user ON contact_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_created ON contact_interactions(created_at DESC);

-- RLS Policies
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_interactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can create their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can update their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can delete their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can view their own contact interactions" ON contact_interactions;
DROP POLICY IF EXISTS "Users can create their own contact interactions" ON contact_interactions;

-- Create policies
CREATE POLICY "Users can view their own contacts" 
    ON contacts FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contacts" 
    ON contacts FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" 
    ON contacts FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts" 
    ON contacts FOR DELETE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own contact interactions" 
    ON contact_interactions FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contact interactions" 
    ON contact_interactions FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Function to update contact statistics
CREATE OR REPLACE FUNCTION update_contact_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE contacts
    SET 
        total_interactions = total_interactions + 1,
        last_interaction_at = NEW.created_at,
        first_interaction_at = COALESCE(first_interaction_at, NEW.created_at),
        updated_at = NOW()
    WHERE id = NEW.contact_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS trigger_update_contact_stats ON contact_interactions;
CREATE TRIGGER trigger_update_contact_stats
    AFTER INSERT ON contact_interactions
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_stats();
