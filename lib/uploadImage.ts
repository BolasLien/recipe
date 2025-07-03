import { supabase, supabaseKey, supabaseUrl } from './supabase';

export const uploadImage = async (
  file: File,
  path: string,
  onProgress?: (percent: number) => void
) => {
  const bucket = 'recipes-images';

  const url = `${supabaseUrl}/storage/v1/object/${bucket}/${path}`;

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('apikey', supabaseKey as string);
    xhr.setRequestHeader('authorization', `Bearer ${supabaseKey}`);
    xhr.setRequestHeader('x-upsert', 'true');
    xhr.setRequestHeader(
      'Content-Type',
      (file as File).type || 'application/octet-stream'
    );
    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(xhr.responseText || xhr.statusText));
      }
    };
    xhr.onerror = () => reject(new Error(xhr.statusText));
    xhr.send(file);
  });

  const { data: publicUrlData, error } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  if (error) throw error;

  return publicUrlData.publicUrl;
};
