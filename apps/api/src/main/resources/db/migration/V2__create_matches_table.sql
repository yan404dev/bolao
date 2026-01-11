CREATE TABLE IF NOT EXISTS matches (
    id BIGINT PRIMARY KEY,
    round_id BIGINT REFERENCES rounds(id),
    home_team VARCHAR(255),
    home_team_logo VARCHAR(500),
    home_score INTEGER,
    away_team VARCHAR(255),
    away_team_logo VARCHAR(500),
    away_score INTEGER,
    kickoff_time TIMESTAMP,
    status VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_matches_round_id ON matches(round_id);
