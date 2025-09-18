-- migration: create institutions storage bucket
insert into storage.buckets (id, name, public, file_size_limit)
values (
  'panels',
  'panels',
  true,
  52428800  -- 50 MiB in bytes
);

CREATE POLICY public_read_object
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'panels');

CREATE POLICY authenticated_upload_to_panels_images
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated'
    AND bucket_id = 'panels'
  );


