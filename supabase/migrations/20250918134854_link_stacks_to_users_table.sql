alter table "public"."stacks" add column "user_id" uuid not null;

alter table "public"."stacks" add constraint "stacks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."stacks" validate constraint "stacks_user_id_fkey";


