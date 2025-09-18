create sequence "public"."panels_id_seq";

create table "public"."panels" (
    "id" integer not null default nextval('panels_id_seq'::regclass),
    "picture_url" text not null,
    "caption" text default ''::text,
    "stack_id" integer not null
);


alter sequence "public"."panels_id_seq" owned by "public"."panels"."id";

CREATE UNIQUE INDEX panels_pkey ON public.panels USING btree (id);

alter table "public"."panels" add constraint "panels_pkey" PRIMARY KEY using index "panels_pkey";

alter table "public"."panels" add constraint "panels_stack_id_fkey" FOREIGN KEY (stack_id) REFERENCES stacks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."panels" validate constraint "panels_stack_id_fkey";

grant delete on table "public"."panels" to "anon";

grant insert on table "public"."panels" to "anon";

grant references on table "public"."panels" to "anon";

grant select on table "public"."panels" to "anon";

grant trigger on table "public"."panels" to "anon";

grant truncate on table "public"."panels" to "anon";

grant update on table "public"."panels" to "anon";

grant delete on table "public"."panels" to "authenticated";

grant insert on table "public"."panels" to "authenticated";

grant references on table "public"."panels" to "authenticated";

grant select on table "public"."panels" to "authenticated";

grant trigger on table "public"."panels" to "authenticated";

grant truncate on table "public"."panels" to "authenticated";

grant update on table "public"."panels" to "authenticated";

grant delete on table "public"."panels" to "service_role";

grant insert on table "public"."panels" to "service_role";

grant references on table "public"."panels" to "service_role";

grant select on table "public"."panels" to "service_role";

grant trigger on table "public"."panels" to "service_role";

grant truncate on table "public"."panels" to "service_role";

grant update on table "public"."panels" to "service_role";


