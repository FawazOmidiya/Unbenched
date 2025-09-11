-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create stories table
CREATE TABLE stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  date DATE NOT NULL,
  category VARCHAR(100) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  home_team VARCHAR(255) NOT NULL,
  away_team VARCHAR(255) NOT NULL,
  home_score INTEGER DEFAULT 0,
  away_score INTEGER DEFAULT 0,
  sport VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'final')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sports table
CREATE TABLE sports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(20) NOT NULL CHECK (category IN ('mens', 'womens', 'other')),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media table for file uploads
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'video')),
  size INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create players table
CREATE TABLE players (
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

-- Create admin users table
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_stories_date ON stories(date DESC);
CREATE INDEX idx_stories_featured ON stories(featured);
CREATE INDEX idx_games_date ON games(date DESC);
CREATE INDEX idx_games_sport ON games(sport);
CREATE INDEX idx_media_type ON media(type);
CREATE INDEX idx_players_sport ON players(sport_id);
CREATE INDEX idx_players_active ON players(is_active);

-- Enable Row Level Security
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for stories" ON stories FOR SELECT USING (true);
CREATE POLICY "Public read access for games" ON games FOR SELECT USING (true);
CREATE POLICY "Public read access for sports" ON sports FOR SELECT USING (true);
CREATE POLICY "Public read access for media" ON media FOR SELECT USING (true);
CREATE POLICY "Public read access for players" ON players FOR SELECT USING (true);

-- Create policies for admin access (you'll need to implement proper authentication)
CREATE POLICY "Admin full access to stories" ON stories FOR ALL USING (true);
CREATE POLICY "Admin full access to games" ON games FOR ALL USING (true);
CREATE POLICY "Admin full access to sports" ON sports FOR ALL USING (true);
CREATE POLICY "Admin full access to media" ON media FOR ALL USING (true);
CREATE POLICY "Admin full access to players" ON players FOR ALL USING (true);
CREATE POLICY "Admin full access to admin_users" ON admin_users FOR ALL USING (true);

-- Insert initial data
INSERT INTO sports (name, category, description) VALUES
('Men''s Basketball', 'mens', 'Men''s basketball team'),
('Men''s Soccer', 'mens', 'Men''s soccer team'),
('Men''s Volleyball', 'mens', 'Men''s volleyball team'),
('Men''s Rugby', 'mens', 'Men''s rugby team'),
('Men''s Baseball', 'mens', 'Men''s baseball team'),
('Women''s Basketball', 'womens', 'Women''s basketball team'),
('Women''s Soccer', 'womens', 'Women''s soccer team'),
('Women''s Volleyball', 'womens', 'Women''s volleyball team'),
('Women''s Rugby', 'womens', 'Women''s rugby team'),
('Women''s Softball', 'womens', 'Women''s softball team'),
('Golf', 'other', 'Golf team'),
('Curling', 'other', 'Curling team'),
('Esports', 'other', 'Esports team');

-- Insert sample stories
INSERT INTO stories (title, excerpt, content, date, category, featured) VALUES
('Lords Basketball Team Advances to Championship Finals', 'The Unbenched Lords basketball team secured their spot in the championship finals with an impressive victory over their rivals...', 'Full story content here...', '2024-12-16', 'Basketball', true),
('New Athletic Director Announced', 'The university is pleased to announce the appointment of a new Athletic Director who brings years of experience...', 'Full story content here...', '2024-12-14', 'Administration', false),
('Soccer Team Wins Conference Title', 'The Lords soccer team captured their third consecutive conference championship with a dominant performance...', 'Full story content here...', '2024-12-12', 'Soccer', false),
('Student-Athlete Academic Excellence Awards', 'Twenty-five student-athletes were recognized for their outstanding academic achievements this semester...', 'Full story content here...', '2024-12-10', 'Academics', false);

-- Insert sample games
INSERT INTO games (home_team, away_team, home_score, away_score, sport, date, status) VALUES
('Unbenched Lords', 'Rival College', 85, 72, 'Basketball', '2024-12-15', 'final'),
('Unbenched Lords', 'State University', 2, 1, 'Soccer', '2024-12-12', 'final'),
('Unbenched Lords', 'City College', 3, 0, 'Volleyball', '2024-12-10', 'final');

-- Insert sample players (assuming Men's Basketball has ID 1)
INSERT INTO players (sport_id, name, number, position, bio, height, weight, year, hometown, major) VALUES
(1, 'John Smith', 23, 'Point Guard', 'Team captain and leading scorer. Known for his clutch shooting and leadership on the court.', '6''2"', '185 lbs', 'Senior', 'Chicago, IL', 'Business Administration'),
(1, 'Mike Johnson', 15, 'Shooting Guard', 'Sharp shooter with excellent three-point accuracy. Transferred from State University.', '6''4"', '195 lbs', 'Junior', 'Los Angeles, CA', 'Computer Science'),
(1, 'David Wilson', 7, 'Small Forward', 'Versatile player who can play multiple positions. Strong defensive presence.', '6''6"', '210 lbs', 'Sophomore', 'Miami, FL', 'Engineering'),
(1, 'Chris Brown', 33, 'Power Forward', 'Dominant rebounder and inside scorer. Team''s leading rebounder last season.', '6''8"', '225 lbs', 'Senior', 'Detroit, MI', 'Sports Management'),
(1, 'Alex Davis', 12, 'Center', 'Rim protector and shot blocker. Developing offensive game in the post.', '6''10"', '240 lbs', 'Freshman', 'Houston, TX', 'Pre-Med');