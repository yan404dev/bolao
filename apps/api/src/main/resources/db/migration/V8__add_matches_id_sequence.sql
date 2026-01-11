-- Add auto-increment to matches.id column
CREATE SEQUENCE IF NOT EXISTS matches_id_seq START WITH 1;
SELECT setval('matches_id_seq', COALESCE((SELECT MAX(id) FROM matches), 0) + 1, false);
ALTER TABLE matches ALTER COLUMN id SET DEFAULT nextval('matches_id_seq');
ALTER SEQUENCE matches_id_seq OWNED BY matches.id;
