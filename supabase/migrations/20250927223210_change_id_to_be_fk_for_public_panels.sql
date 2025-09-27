alter table "vecs"."panels" drop constraint "panels_panel_id_fkey";

alter table "vecs"."panels" drop column "panel_id";

alter table "vecs"."panels" alter column "id" drop default;

alter table "vecs"."panels" alter column "id" set data type integer using "id"::integer;

drop sequence if exists "vecs"."panels_id_seq";

alter table "vecs"."panels" add constraint "panels_id_fkey" FOREIGN KEY (id) REFERENCES panels(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "vecs"."panels" validate constraint "panels_id_fkey";


