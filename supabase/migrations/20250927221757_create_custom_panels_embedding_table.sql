create schema if not exists "vecs";

create sequence "vecs"."panels_id_seq";

create table "vecs"."panels" (
    "id" bigint not null default nextval('vecs.panels_id_seq'::regclass),
    "panel_id" integer not null,
    "embedding" vector(512) not null,
    "metadata" jsonb not null,
    "created_at" timestamp without time zone default now()
);


alter sequence "vecs"."panels_id_seq" owned by "vecs"."panels"."id";

CREATE INDEX panel_embeddings_embedding_idx ON vecs.panels USING ivfflat (embedding vector_cosine_ops) WITH (lists='100');

CREATE UNIQUE INDEX panels_pkey ON vecs.panels USING btree (id);

alter table "vecs"."panels" add constraint "panels_pkey" PRIMARY KEY using index "panels_pkey";


