-- Insert sample stories data (using existing column names)
INSERT INTO stories (title, content, sport_id, photographer, journalist) VALUES
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
