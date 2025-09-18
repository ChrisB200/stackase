alter table "public"."panels" drop column "picture_url";

alter table "public"."panels" add column "picture_id" uuid not null;


