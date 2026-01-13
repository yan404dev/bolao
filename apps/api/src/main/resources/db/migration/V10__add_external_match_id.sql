-- Add external_match_id to matches table for smart sync
ALTER TABLE matches ADD COLUMN IF NOT EXISTS external_match_id VARCHAR(255);

-- Add index for performance during sync
CREATE INDEX IF NOT EXISTS idx_matches_external_id ON matches(external_match_id);

-- Optional: If you want to ensure uniqueness per league/season, be careful.
-- For now, a simple index is enough for the upsert logic.
