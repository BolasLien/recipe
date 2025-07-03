import { supabase } from './supabase';

export const uploadImage = async (
  file: File,
  path: string,
  onProgress?: (percent: number) => void
) => {
  const { data, error } = await supabase.storage
    .from('recipes-images')
    .upload(path, file, {
      upsert: true,
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('recipes-images')
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
};
