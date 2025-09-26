create type "public"."panel_format" as enum ('PANEL', 'VOLUME', 'COVER', 'STRIP', 'OTHER');

revoke delete on table "public"."formats" from "anon";

revoke insert on table "public"."formats" from "anon";

revoke references on table "public"."formats" from "anon";

revoke select on table "public"."formats" from "anon";

revoke trigger on table "public"."formats" from "anon";

revoke truncate on table "public"."formats" from "anon";

revoke update on table "public"."formats" from "anon";

revoke delete on table "public"."formats" from "authenticated";

revoke insert on table "public"."formats" from "authenticated";

revoke references on table "public"."formats" from "authenticated";

revoke select on table "public"."formats" from "authenticated";

revoke trigger on table "public"."formats" from "authenticated";

revoke truncate on table "public"."formats" from "authenticated";

revoke update on table "public"."formats" from "authenticated";

revoke delete on table "public"."formats" from "service_role";

revoke insert on table "public"."formats" from "service_role";

revoke references on table "public"."formats" from "service_role";

revoke select on table "public"."formats" from "service_role";

revoke trigger on table "public"."formats" from "service_role";

revoke truncate on table "public"."formats" from "service_role";

revoke update on table "public"."formats" from "service_role";

alter table "public"."panels" drop constraint "panels_format_id_fkey";

alter table "public"."formats" drop constraint "formats_pkey";

drop index if exists "public"."formats_pkey";

drop table "public"."formats";

alter table "public"."panels" drop column "format_id";

alter table "public"."panels" add column "format" panel_format not null default 'OTHER'::panel_format;

alter table "public"."panels" add column "origin" text not null;

drop sequence if exists "public"."formats_id_seq";


