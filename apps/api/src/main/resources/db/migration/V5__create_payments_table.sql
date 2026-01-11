CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    version INTEGER DEFAULT 0,
    bet_id BIGINT NOT NULL,
    external_id VARCHAR(255),
    amount DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) NOT NULL,
    pix_copy_paste VARCHAR(1000),
    pix_qr_code_base64 VARCHAR(5000),
    paid_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_bet_id ON payments(bet_id);
CREATE INDEX IF NOT EXISTS idx_payments_external_id ON payments(external_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
