-- Страница, с которой отправили заявку, и последний расчёт в калькуляторе
ALTER TABLE t_p58209960_tkanevye_steny_lendi.leads
    ADD COLUMN IF NOT EXISTS page TEXT,
    ADD COLUMN IF NOT EXISTS calc TEXT;