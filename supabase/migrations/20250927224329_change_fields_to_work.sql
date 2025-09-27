drop index if exists "vecs"."panel_embeddings_embedding_idx";

alter table "vecs"."panels" drop column "embedding";

alter table "vecs"."panels" add column "vec" vector(512) not null;

alter table "vecs"."panels" alter column "metadata" set default '{}'::jsonb;

CREATE INDEX panel_embeddings_embedding_idx ON vecs.panels USING ivfflat (vec vector_cosine_ops) WITH (lists='100');


