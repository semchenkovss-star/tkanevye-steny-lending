-- Удобное время звонка из формы заявки
ALTER TABLE t_p58209960_tkanevye_steny_lendi.leads
    ADD COLUMN IF NOT EXISTS call_time character varying(60);