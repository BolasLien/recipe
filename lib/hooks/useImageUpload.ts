import { useState, useCallback } from 'react';
import { uploadImage } from '../uploadImage';
import { useErrorHandler } from './useErrorHandler';

type ImageUploadState = {
  progress: number | null;
  isUploading: boolean;
  imageUrl: string;
};

type ImageUploadActions = {
  upload: (file: File) => Promise<string>;
  reset: () => void;
  setImageUrl: (url: string) => void;
};

type UseImageUploadReturn = ImageUploadState & ImageUploadActions;

/**
 * 圖片上傳 Hook
 */
export const useImageUpload = (initialUrl = ''): UseImageUploadReturn => {
  const [progress, setProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const { handleError } = useErrorHandler();

  // 安全地清理文件名
  const sanitizeFileName = useCallback((fileName: string): string => {
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
  }, []);

  const upload = useCallback(
    async (file: File): Promise<string> => {
      setIsUploading(true);
      setProgress(0);

      try {
        const safeName = sanitizeFileName(file.name);
        const path = `images/${safeName}`;

        const url = await uploadImage(file, path, (percent) => {
          setProgress(percent);
        });

        setImageUrl(url);
        return url;
      } catch (error) {
        handleError(error, '圖片上傳失敗');
        throw error;
      } finally {
        setIsUploading(false);
        setProgress(null);
      }
    },
    [sanitizeFileName, handleError]
  );

  const reset = useCallback(() => {
    setProgress(null);
    setIsUploading(false);
    setImageUrl('');
  }, []);

  return {
    progress,
    isUploading,
    imageUrl,
    upload,
    reset,
    setImageUrl,
  };
};
