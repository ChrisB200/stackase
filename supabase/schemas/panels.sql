CREATE TABLE "panels" (
  id SERIAL PRIMARY KEY,
  picture_id UUID NOT NULL,
  caption TEXT DEFAULT '',
  media TEXT NOT NULL,
  stack_id INTEGER NOT NULL,
  origin TEXT NOT NULL,
  format panel_format NOT NULL DEFAULT 'OTHER',

  FOREIGN KEY ("stack_id") REFERENCES public.stacks(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
