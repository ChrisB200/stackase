CREATE TABLE "panels" (
  id SERIAL PRIMARY KEY,
  caption TEXT DEFAULT '',
  media TEXT NOT NULL,
  stack_id INTEGER NOT NULL,
  origin TEXT NOT NULL,
  format panel_format NOT NULL DEFAULT 'OTHER',
  position INTEGER NOT NULL,

  FOREIGN KEY ("stack_id") REFERENCES public.stacks(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
