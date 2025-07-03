import { createClient } from './supabaseClient';

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage.from('recipes').upload(fileName, file);
  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from('recipes').getPublicUrl(fileName);
  return data.publicUrl;
}
