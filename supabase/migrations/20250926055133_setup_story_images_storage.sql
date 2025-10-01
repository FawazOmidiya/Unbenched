-- Create storage bucket for story images (only if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('story-images', 'story-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for story images storage (only if they don't exist)
DO $$ 
BEGIN
    -- Allow public read access to story images
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow public read access to story images') THEN
        CREATE POLICY "Allow public read access to story images" ON storage.objects
          FOR SELECT USING (bucket_id = 'story-images');
    END IF;
    
    -- Allow authenticated users to upload story images
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow authenticated users to upload story images') THEN
        CREATE POLICY "Allow authenticated users to upload story images" ON storage.objects
          FOR INSERT WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');
    END IF;
    
    -- Allow authenticated users to update story images
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow authenticated users to update story images') THEN
        CREATE POLICY "Allow authenticated users to update story images" ON storage.objects
          FOR UPDATE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');
    END IF;
    
    -- Allow authenticated users to delete story images
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow authenticated users to delete story images') THEN
        CREATE POLICY "Allow authenticated users to delete story images" ON storage.objects
          FOR DELETE USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');
    END IF;
END $$;
