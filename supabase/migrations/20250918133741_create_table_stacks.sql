create sequence "public"."stacks_id_seq";

create table "public"."stacks" (
    "id" integer not null default nextval('stacks_id_seq'::regclass),
    "name" text not null,
    "description" text
);


alter sequence "public"."stacks_id_seq" owned by "public"."stacks"."id";

CREATE UNIQUE INDEX stacks_pkey ON public.stacks USING btree (id);

alter table "public"."stacks" add constraint "stacks_pkey" PRIMARY KEY using index "stacks_pkey";

grant delete on table "public"."stacks" to "anon";

grant insert on table "public"."stacks" to "anon";

grant references on table "public"."stacks" to "anon";

grant select on table "public"."stacks" to "anon";

grant trigger on table "public"."stacks" to "anon";

grant truncate on table "public"."stacks" to "anon";

grant update on table "public"."stacks" to "anon";

grant delete on table "public"."stacks" to "authenticated";

grant insert on table "public"."stacks" to "authenticated";

grant references on table "public"."stacks" to "authenticated";

grant select on table "public"."stacks" to "authenticated";

grant trigger on table "public"."stacks" to "authenticated";

grant truncate on table "public"."stacks" to "authenticated";

grant update on table "public"."stacks" to "authenticated";

grant delete on table "public"."stacks" to "service_role";

grant insert on table "public"."stacks" to "service_role";

grant references on table "public"."stacks" to "service_role";

grant select on table "public"."stacks" to "service_role";

grant trigger on table "public"."stacks" to "service_role";

grant truncate on table "public"."stacks" to "service_role";

grant update on table "public"."stacks" to "service_role";


