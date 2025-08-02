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

  // 安全地清理文件名
  const sanitizeFileName = (fileName: string) => {
    // 移除路徑遍歷字符和特殊字符
    const sanitized = fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_') // 只保留字母、數字、點和連字符
      .replace(/\.+/g, '.') // 合併多個點
      .replace(/^\./, '') // 移除開頭的點
      .substring(0, 100); // 限制長度

    // 確保有副檔名
    const ext = fileName.split('.').pop()?.toLowerCase();
    const name = sanitized.split('.')[0] || 'image';

    // 添加時間戳以避免衝突
    const timestamp = Date.now();
    return `${name}_${timestamp}.${ext}`;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const safeName = sanitizeFileName(file.name);
    const path = `images/${safeName}`;

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
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
        <div className="space-y-3">
          <div className="text-4xl">📷</div>
          <div>
            <button
              type="button"
              onClick={handleChoose}
              className="bg-amber-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-amber-600 focus:ring-2 focus:outline-none focus:ring-amber-300 transition-colors shadow-sm"
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
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
