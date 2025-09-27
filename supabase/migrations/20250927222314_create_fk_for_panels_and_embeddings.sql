alter table "vecs"."panels" add constraint "panels_panel_id_fkey" FOREIGN KEY (panel_id) REFERENCES panels(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "vecs"."panels" validate constraint "panels_panel_id_fkey";


