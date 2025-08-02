'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '../lib/uploadImage';

export default function ImageUploader({
  onUploaded,
  onError,
}: {
  onUploaded?: (url: string) => void;
  onError?: (message: string) => void;
}) {
  const [progress, setProgress] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const path = `images/${file.name}`;

    try {
      const url = await uploadImage(file, path, (percent) => {
        setProgress(percent);
      });

      if (onUploaded) {
        onUploaded(url);
      }
    } catch (err) {
      console.error(err);
      if (onError) {
        onError('圖片上傳失敗，請稍後再試');
      }
    } finally {
      setProgress(null);
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {/* 上傳按鈕區域 */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
        <div className="space-y-3">
          <div className="text-4xl">📷</div>
          <div>
            <button
              type="button"
              onClick={handleChoose}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:from-orange-500 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              📎 選擇圖片
            </button>
          </div>
          <p className="text-gray-500 text-sm">支援 JPG、PNG 格式</p>
        </div>
      </div>

      {/* 上傳進度 */}
      {progress !== null && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>上傳進度</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
