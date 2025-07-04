'use client';

import { useState } from 'react';
import { uploadImage } from '../lib/uploadImage';

export default function ImageUploader({
  onUploaded,
}: {
  onUploaded?: (url: string) => void;
}) {
  const [progress, setProgress] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const path = `images/${file.name}`;

    try {
      const url = await uploadImage(file, path, (percent) => {
        setProgress(percent);
      });

      setImageUrl(url);
      if (onUploaded) {
        onUploaded(url);
      }
    } catch (err) {
      console.error(err);
      alert('上傳失敗！');
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleUpload} />
      {progress !== null && <p>上傳進度：{progress}%</p>}
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-40 h-40 object-cover" />
      )}
    </div>
  );
}
