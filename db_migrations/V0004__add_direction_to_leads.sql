-- Направление заявки: Потолки, Стены или Акустика
ALTER TABLE t_p58209960_tkanevye_steny_lendi.leads
    ADD COLUMN IF NOT EXISTS direction VARCHAR(20);