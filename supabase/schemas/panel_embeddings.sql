CREATE EXTENSION IF NOT EXISTS vector;

CREATE SCHEMA IF NOT EXISTS vecs;

CREATE TABLE IF NOT EXISTS vecs.panels (
  id INTEGER PRIMARY KEY,
  vec VECTOR(512) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMP DEFAULT now(),

  FOREIGN KEY ("id") REFERENCES public.panels(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

create index if not exists panel_embeddings_embedding_idx
on vecs.panels
using ivfflat (vec vector_cosine_ops)
with (lists = 100);
