-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true);

-- Create RLS policies for story images storage
CREATE POLICY "Allow public read access to story images" ON storage.objects
  FOR SELECT USING (bucket_id = 'story-images');

CREATE POLICY "Allow authenticated users to upload story images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update story images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete story images" ON storage.objects
  FOR DELETE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');
