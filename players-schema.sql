-- Players table and related schema
-- Run this in your Supabase SQL Editor

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  sport_id INTEGER NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  number INTEGER,
  position VARCHAR(100),
  bio TEXT,
  photo_url TEXT,
  height VARCHAR(20),
  weight VARCHAR(20),
  year VARCHAR(20), -- Freshman, Sophomore, Junior, Senior, etc.
  hometown VARCHAR(255),
  major VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_sport ON players(sport_id);
CREATE INDEX IF NOT EXISTS idx_players_active ON players(is_active);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY IF NOT EXISTS "Public read access for players" ON players FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Admin full access to players" ON players FOR ALL USING (true);

-- Insert sample player data for Men's Basketball (assuming sport_id = 1)
INSERT INTO players (sport_id, name, number, position, bio, height, weight, year, hometown, major) VALUES
(1, 'John Smith', 23, 'Point Guard', 'Team captain and leading scorer. Known for his clutch shooting and leadership on the court.', '6''2"', '185 lbs', 'Senior', 'Chicago, IL', 'Business Administration'),
(1, 'Mike Johnson', 15, 'Shooting Guard', 'Sharp shooter with excellent three-point accuracy. Transferred from State University.', '6''4"', '195 lbs', 'Junior', 'Los Angeles, CA', 'Computer Science'),
(1, 'David Wilson', 7, 'Small Forward', 'Versatile player who can play multiple positions. Strong defensive presence.', '6''6"', '210 lbs', 'Sophomore', 'Miami, FL', 'Engineering'),
(1, 'Chris Brown', 33, 'Power Forward', 'Dominant rebounder and inside scorer. Team''s leading rebounder last season.', '6''8"', '225 lbs', 'Senior', 'Detroit, MI', 'Sports Management'),
(1, 'Alex Davis', 12, 'Center', 'Rim protector and shot blocker. Developing offensive game in the post.', '6''10"', '240 lbs', 'Freshman', 'Houston, TX', 'Pre-Med')
ON CONFLICT DO NOTHING;