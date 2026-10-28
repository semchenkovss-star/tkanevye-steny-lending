ALTER TABLE t_p58209960_tkanevye_steny_lendi.leads ADD COLUMN ip varchar(64) NULL;
CREATE INDEX leads_ip_created_idx ON t_p58209960_tkanevye_steny_lendi.leads (ip, created_at);