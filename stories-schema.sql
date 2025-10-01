-- Stories Schema
-- This script creates the stories table with all required fields

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  article TEXT NOT NULL,
  banner_image_url TEXT,
  sport_id INTEGER REFERENCES sports(id) ON DELETE SET NULL,
  game_id INTEGER REFERENCES games(id) ON DELETE SET NULL,
  photographer VARCHAR(255),
  journalist VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stories_sport_id ON stories(sport_id);
CREATE INDEX IF NOT EXISTS idx_stories_game_id ON stories(game_id);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);

-- Enable Row Level Security
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow public read access to stories
CREATE POLICY "Allow public read access to stories" ON stories
  FOR SELECT USING (true);

-- Allow authenticated users to insert stories
CREATE POLICY "Allow authenticated users to insert stories" ON stories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update stories
CREATE POLICY "Allow authenticated users to update stories" ON stories
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete stories
CREATE POLICY "Allow authenticated users to delete stories" ON stories
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_stories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW
  EXECUTE FUNCTION update_stories_updated_at();

-- Insert sample stories data
INSERT INTO stories (title, article, sport_id, photographer, journalist) VALUES
(
  'Men''s Basketball Team Secures Championship Victory',
  'The UTSC Maroons Men''s Basketball team delivered an outstanding performance in the championship game, securing a decisive victory with a final score of 78-65. The team demonstrated exceptional teamwork and determination throughout the season, culminating in this well-deserved championship title. Key players stepped up in crucial moments, with outstanding defensive plays and strategic offensive execution. The victory marks a historic moment for the program and showcases the dedication of both players and coaching staff.',
  (SELECT id FROM sports WHERE name = 'Men''s Basketball' LIMIT 1),
  'Sarah Johnson',
  'Mike Chen'
),
(
  'Women''s Volleyball Team Advances to Finals',
  'In an electrifying semifinal match, the Women''s Volleyball team showcased their skill and determination, advancing to the championship finals with a thrilling 3-2 victory. The match featured incredible rallies, strategic plays, and outstanding individual performances. The team''s resilience and teamwork were on full display as they overcame early setbacks to secure their spot in the finals. The coaching staff praised the team''s mental toughness and preparation.',
  (SELECT id FROM sports WHERE name = 'Women''s Volleyball' LIMIT 1),
  'Alex Rodriguez',
  'Jennifer Lee'
),
(
  'Soccer Team''s Record-Breaking Season',
  'The Men''s Soccer team concluded their most successful season in program history, finishing with an impressive 12-2 record. The team''s offensive prowess and defensive solidity were key factors in their success. Several players achieved personal milestones, and the team chemistry was evident throughout the season. The coaching staff attributes the success to the players'' dedication, improved training methods, and strategic game planning.',
  (SELECT id FROM sports WHERE name = 'Men''s Soccer' LIMIT 1),
  'David Kim',
  'Lisa Martinez'
);

-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true);

-- Create RLS policies for story images storage
CREATE POLICY "Allow public read access to story images" ON storage.objects
  FOR SELECT USING (bucket_id = 'story-images');

CREATE POLICY "Allow authenticated users to upload story images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update story images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete story images" ON storage.objects
  FOR DELETE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');