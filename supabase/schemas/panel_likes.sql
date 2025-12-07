CREATE TABLE likes (
  user_id UUID NOT NULL,
  panel_id INTEGER NOT NULL,

  PRIMARY KEY (user_id, panel_id),

  FOREIGN KEY ("user_id") REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  FOREIGN KEY ("panel_id") REFERENCES public.panels(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
