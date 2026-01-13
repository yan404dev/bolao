ALTER TABLE matches ADD COLUMN IF NOT EXISTS external_match_id VARCHAR(255);
CREATE INDEX IF NOT EXISTS idx_matches_external_id ON matches(external_match_id);
