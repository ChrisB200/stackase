CREATE TABLE "panels" (
  id SERIAL PRIMARY KEY,
  picture_id UUID NOT NULL,
  caption TEXT DEFAULT '',
  stack_id INTEGER NOT NULL,

  FOREIGN KEY ("stack_id") REFERENCES public.stacks(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
