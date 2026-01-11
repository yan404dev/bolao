CREATE TABLE IF NOT EXISTS rounds (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    external_round_id VARCHAR(255),
    championship_title VARCHAR(255),
    championship_logo VARCHAR(500),
    status VARCHAR(50),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    total_tickets INTEGER,
    prize_pool DOUBLE PRECISION,
    ticket_price DOUBLE PRECISION,
    created_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rounds_status ON rounds(status);
