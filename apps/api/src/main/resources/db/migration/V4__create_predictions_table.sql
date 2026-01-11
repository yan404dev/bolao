CREATE TABLE IF NOT EXISTS predictions (
    id BIGSERIAL PRIMARY KEY,
    bet_id BIGINT REFERENCES bets(id),
    match_id BIGINT REFERENCES matches(id),
    home_score INTEGER,
    away_score INTEGER
);

CREATE INDEX IF NOT EXISTS idx_predictions_bet_id ON predictions(bet_id);
