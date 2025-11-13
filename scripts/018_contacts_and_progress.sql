-- Create contacts table for saving communication partners
CREATE TABLE IF NOT EXISTS clarity_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship RelationshipContext NOT NULL,
  notes TEXT,
  
  -- Communication context
  neurotype TEXT,
  generation TEXT,
  political_identity TEXT,
  political_values TEXT[],
  
  -- Interaction tracking
  first_interaction_at TIMESTAMPTZ DEFAULT NOW(),
  last_interaction_at TIMESTAMPTZ DEFAULT NOW(),
  total_interactions INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create interaction history table to track progress with each contact
CREATE TABLE IF NOT EXISTS clarity_contact_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES clarity_contacts(id) ON DELETE CASCADE,
  mode TEXT NOT NULL, -- 'draft', 'analyze', 'chat'
  
  -- Interaction data
  original_text TEXT,
  translated_text TEXT,
  context TEXT,
  
  -- Success indicators
  user_satisfaction_rating INTEGER, -- 1-5 scale
  required_edit BOOLEAN DEFAULT FALSE,
  achieved_goal BOOLEAN,
  
  -- Progress metrics
  directness_improvement DECIMAL,
  clarity_improvement DECIMAL,
  empathy_improvement DECIMAL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON clarity_contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_updated_at ON clarity_contacts(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_user_id ON clarity_contact_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_contact_id ON clarity_contact_interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_created_at ON clarity_contact_interactions(created_at DESC);

-- Enable RLS
ALTER TABLE clarity_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE clarity_contact_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contacts
CREATE POLICY "Users can view their own contacts"
  ON clarity_contacts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contacts"
  ON clarity_contacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
  ON clarity_contacts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
  ON clarity_contacts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for interactions
CREATE POLICY "Users can view their own interactions"
  ON clarity_contact_interactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interactions"
  ON clarity_contact_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to update contact's last interaction timestamp
CREATE OR REPLACE FUNCTION update_contact_interaction()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE clarity_contacts
  SET 
    last_interaction_at = NOW(),
    total_interactions = total_interactions + 1,
    updated_at = NOW()
  WHERE id = NEW.contact_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update contact when interaction is added
CREATE TRIGGER update_contact_on_interaction
AFTER INSERT ON clarity_contact_interactions
FOR EACH ROW
EXECUTE FUNCTION update_contact_interaction();
