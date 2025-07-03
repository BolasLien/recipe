import { supabase } from './supabaseClient';

export async function uploadRecipeImage(file: File): Promise<string> {
  const { data, error } = await supabase.storage
    .from('recipe-images')
    .upload(`${Date.now()}-${file.name}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error || !data) {
    throw error || new Error('Upload failed');
  }

  const { data: publicUrlData } = await supabase.storage
    .from('recipe-images')
    .getPublicUrl(data.path);

  if (!publicUrlData.publicUrl) {
    throw new Error('Failed to get public URL');
  }

  return publicUrlData.publicUrl;
}
