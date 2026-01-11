CREATE TABLE IF NOT EXISTS bets (
    id BIGSERIAL PRIMARY KEY,
    round_id BIGINT REFERENCES rounds(id),
    name VARCHAR(255),
    phone VARCHAR(50),
    ticket_code VARCHAR(100) UNIQUE,
    points INTEGER,
    created_at TIMESTAMP,
    status VARCHAR(50)
);

CREATE INDEX IF NOT EXISTS idx_bets_round_id ON bets(round_id);
CREATE INDEX IF NOT EXISTS idx_bets_ticket_code ON bets(ticket_code);
CREATE INDEX IF NOT EXISTS idx_bets_status ON bets(status);
