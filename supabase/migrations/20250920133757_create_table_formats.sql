create sequence "public"."formats_id_seq";

create table "public"."formats" (
    "id" integer not null default nextval('formats_id_seq'::regclass),
    "title" text not null,
    "number" integer,
    "description" text not null
);


alter table "public"."panels" add column "format_id" integer not null;

alter table "public"."panels" add column "media" text not null;

alter sequence "public"."formats_id_seq" owned by "public"."formats"."id";

CREATE UNIQUE INDEX formats_pkey ON public.formats USING btree (id);

alter table "public"."formats" add constraint "formats_pkey" PRIMARY KEY using index "formats_pkey";

alter table "public"."panels" add constraint "panels_format_id_fkey" FOREIGN KEY (format_id) REFERENCES formats(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."panels" validate constraint "panels_format_id_fkey";

grant delete on table "public"."formats" to "anon";

grant insert on table "public"."formats" to "anon";

grant references on table "public"."formats" to "anon";

grant select on table "public"."formats" to "anon";

grant trigger on table "public"."formats" to "anon";

grant truncate on table "public"."formats" to "anon";

grant update on table "public"."formats" to "anon";

grant delete on table "public"."formats" to "authenticated";

grant insert on table "public"."formats" to "authenticated";

grant references on table "public"."formats" to "authenticated";

grant select on table "public"."formats" to "authenticated";

grant trigger on table "public"."formats" to "authenticated";

grant truncate on table "public"."formats" to "authenticated";

grant update on table "public"."formats" to "authenticated";

grant delete on table "public"."formats" to "service_role";

grant insert on table "public"."formats" to "service_role";

grant references on table "public"."formats" to "service_role";

grant select on table "public"."formats" to "service_role";

grant trigger on table "public"."formats" to "service_role";

grant truncate on table "public"."formats" to "service_role";

grant update on table "public"."formats" to "service_role";


