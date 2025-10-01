-- Update existing stories table to match new schema
-- Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Add sport_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'sport_id') THEN
        ALTER TABLE stories ADD COLUMN sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL;
    END IF;
    
    -- Add game_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'game_id') THEN
        ALTER TABLE stories ADD COLUMN game_id INTEGER REFERENCES games(id) ON DELETE SET NULL;
    END IF;
    
    -- Add photographer column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'photographer') THEN
        ALTER TABLE stories ADD COLUMN photographer VARCHAR(255);
    END IF;
    
    -- Add journalist column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'journalist') THEN
        ALTER TABLE stories ADD COLUMN journalist VARCHAR(255);
    END IF;
    
    -- Rename content to article if content exists and article doesn't
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'content') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'article') THEN
        ALTER TABLE stories RENAME COLUMN content TO article;
    END IF;
    
    -- Rename image_url to banner_image_url if image_url exists and banner_image_url doesn't
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'image_url') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'stories' AND column_name = 'banner_image_url') THEN
        ALTER TABLE stories RENAME COLUMN image_url TO banner_image_url;
    END IF;
END $$;

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_stories_sport_id ON stories(sport_id);
CREATE INDEX IF NOT EXISTS idx_stories_game_id ON stories(game_id);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);

-- Enable Row Level Security (only if not already enabled)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'stories' AND relrowsecurity = true) THEN
        ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create RLS policies (only if they don't exist)
DO $$ 
BEGIN
    -- Allow public read access to stories
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'stories' AND policyname = 'Allow public read access to stories') THEN
        CREATE POLICY "Allow public read access to stories" ON stories
          FOR SELECT USING (true);
    END IF;
    
    -- Allow authenticated users to insert stories
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'stories' AND policyname = 'Allow authenticated users to insert stories') THEN
        CREATE POLICY "Allow authenticated users to insert stories" ON stories
          FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    -- Allow authenticated users to update stories
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'stories' AND policyname = 'Allow authenticated users to update stories') THEN
        CREATE POLICY "Allow authenticated users to update stories" ON stories
          FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    
    -- Allow authenticated users to delete stories
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'stories' AND policyname = 'Allow authenticated users to delete stories') THEN
        CREATE POLICY "Allow authenticated users to delete stories" ON stories
          FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- Create function to update updated_at timestamp (only if it doesn't exist)
CREATE OR REPLACE FUNCTION update_stories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_stories_updated_at') THEN
        CREATE TRIGGER update_stories_updated_at
          BEFORE UPDATE ON stories
          FOR EACH ROW
          EXECUTE FUNCTION update_stories_updated_at();
    END IF;
END $$;
