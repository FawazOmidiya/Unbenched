-- Update sports table to include slug field
-- Run this in your Supabase SQL Editor

-- Add slug column to sports table
ALTER TABLE sports ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_sports_slug ON sports(slug);

-- Update existing sports with slugs
UPDATE sports SET slug = 'mens-basketball' WHERE name = 'Men''s Basketball';
UPDATE sports SET slug = 'mens-soccer' WHERE name = 'Men''s Soccer';
UPDATE sports SET slug = 'mens-volleyball' WHERE name = 'Men''s Volleyball';
UPDATE sports SET slug = 'mens-rugby' WHERE name = 'Men''s Rugby';
UPDATE sports SET slug = 'mens-baseball' WHERE name = 'Men''s Baseball';
UPDATE sports SET slug = 'womens-basketball' WHERE name = 'Women''s Basketball';
UPDATE sports SET slug = 'womens-soccer' WHERE name = 'Women''s Soccer';
UPDATE sports SET slug = 'womens-volleyball' WHERE name = 'Women''s Volleyball';
UPDATE sports SET slug = 'womens-rugby' WHERE name = 'Women''s Rugby';
UPDATE sports SET slug = 'womens-softball' WHERE name = 'Women''s Softball';
UPDATE sports SET slug = 'golf' WHERE name = 'Golf';
UPDATE sports SET slug = 'curling' WHERE name = 'Curling';
UPDATE sports SET slug = 'esports' WHERE name = 'Esports';

-- Make slug NOT NULL after updating existing records
ALTER TABLE sports ALTER COLUMN slug SET NOT NULL;