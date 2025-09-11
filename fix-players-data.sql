-- Fix players data - check and update sport_id references
-- Run this in your Supabase SQL Editor

-- First, let's see what sports exist and their IDs
SELECT id, name FROM sports ORDER BY id;

-- If Men's Basketball doesn't exist or has a different ID, let's create it
INSERT INTO sports (name, category, description) 
VALUES ('Men''s Basketball', 'mens', 'Men''s basketball team competing in the conference')
ON CONFLICT (name) DO NOTHING;

-- Now let's get the correct sport_id for Men's Basketball
-- Replace the sport_id in the players insert with the actual ID from your sports table

-- Clear existing sample data first (optional - remove this line if you want to keep existing data)
-- DELETE FROM players WHERE name IN ('John Smith', 'Mike Johnson', 'David Wilson', 'Chris Brown', 'Alex Davis');

-- Insert players with the correct sport_id (replace 1 with the actual Men's Basketball sport_id)
INSERT INTO players (sport_id, name, number, position, bio, height, weight, year, hometown, major) 
SELECT 
  s.id, -- Use the actual sport_id from the sports table
  p.name, p.number, p.position, p.bio, p.height, p.weight, p.year, p.hometown, p.major
FROM (VALUES
  ('Men''s Basketball', 'John Smith', 23, 'Point Guard', 'Team captain and leading scorer. Known for his clutch shooting and leadership on the court.', '6''2"', '185 lbs', 'Senior', 'Chicago, IL', 'Business Administration'),
  ('Men''s Basketball', 'Mike Johnson', 15, 'Shooting Guard', 'Sharp shooter with excellent three-point accuracy. Transferred from State University.', '6''4"', '195 lbs', 'Junior', 'Los Angeles, CA', 'Computer Science'),
  ('Men''s Basketball', 'David Wilson', 7, 'Small Forward', 'Versatile player who can play multiple positions. Strong defensive presence.', '6''6"', '210 lbs', 'Sophomore', 'Miami, FL', 'Engineering'),
  ('Men''s Basketball', 'Chris Brown', 33, 'Power Forward', 'Dominant rebounder and inside scorer. Team''s leading rebounder last season.', '6''8"', '225 lbs', 'Senior', 'Detroit, MI', 'Sports Management'),
  ('Men''s Basketball', 'Alex Davis', 12, 'Center', 'Rim protector and shot blocker. Developing offensive game in the post.', '6''10"', '240 lbs', 'Freshman', 'Houston, TX', 'Pre-Med')
) AS p(sport_name, name, number, position, bio, height, weight, year, hometown, major)
JOIN sports s ON s.name = p.sport_name
ON CONFLICT DO NOTHING;

-- Verify the data was inserted correctly
SELECT p.*, s.name as sport_name 
FROM players p 
JOIN sports s ON p.sport_id = s.id 
ORDER BY p.number;