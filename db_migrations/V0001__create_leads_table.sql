CREATE TABLE IF NOT EXISTS t_p58209960_tkanevye_steny_lendi.leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    source VARCHAR(200) DEFAULT 'Сайт',
    summary TEXT,
    address TEXT,
    comment TEXT,
    samples TEXT,
    email_sent BOOLEAN DEFAULT FALSE,
    telegram_sent BOOLEAN DEFAULT FALSE,
    delivery_error TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON t_p58209960_tkanevye_steny_lendi.leads (created_at DESC);
