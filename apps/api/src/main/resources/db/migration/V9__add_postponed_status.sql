-- Update status check constraint to include POSTPONED
ALTER TABLE matches DROP CONSTRAINT IF EXISTS matches_status_check;
ALTER TABLE matches ADD CONSTRAINT matches_status_check
  CHECK (status IN ('SCHEDULED', 'LIVE', 'FINISHED', 'CANCELLED', 'POSTPONED'));
