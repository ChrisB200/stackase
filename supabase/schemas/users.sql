CREATE TABLE "users" (
  id UUID PRIMARY KEY UNIQUE NOT NULL,
  username TEXT,
  name TEXT,

  FOREIGN KEY ("id") REFERENCES auth.users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Function
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, username, name)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'name'
  );
  return new;
end;
$$;

-- Trigger
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


