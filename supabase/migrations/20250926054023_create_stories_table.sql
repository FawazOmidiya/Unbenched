-- Create stories table (only if it doesn't exist)
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

-- This migration only creates the table structure
-- RLS policies and other features are handled in subsequent migrations
