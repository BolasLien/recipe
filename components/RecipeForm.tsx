'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';
import ImageUploader from './ImageUploader';
import { useToast } from './Toast';

type Recipe = {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
};

type Props = {
  mode: 'create' | 'edit';
  recipe?: Recipe;
};

type FormValues = {
  title: string;
  content: string;
};

export default function RecipeForm({ mode, recipe }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(recipe?.image_url || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast, ToastComponent } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: recipe?.title || '',
      content: recipe?.content || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      if (mode === 'create') {
        const { error } = await supabase.from('recipes').insert({
          title: data.title,
          content: data.content,
          image_url: imageUrl || null,
        });

        if (error) {
          console.error(error);
          showToast('新增食譜失敗，請稍後再試', 'error');
          return;
        }

        showToast('✨ 食譜創建成功！', 'success');
        setTimeout(() => router.push('/'), 1500);
      } else if (mode === 'edit' && recipe) {
        const { error } = await supabase
          .from('recipes')
          .update({
            title: data.title,
            content: data.content,
            image_url: imageUrl || null,
          })
          .eq('id', recipe.id);

        if (error) {
          console.error(error);
          showToast('更新食譜失敗，請稍後再試', 'error');
          return;
        }

        showToast('💾 食譜更新成功！', 'success');
        setTimeout(() => router.push(`/recipes/${recipe.id}`), 1500);
      }
    } catch (err) {
      console.error(err);
      showToast('發生未知錯誤，請稍後再試', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCreate = mode === 'create';
  const submitText = isCreate ? '✨ 創建食譜' : '💾 更新食譜';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* 標題輸入 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            食譜標題 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="輸入食譜的標題..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors"
            {...register('title', { required: '請輸入食譜標題' })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Markdown 輸入框 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            食譜內容 <span className="text-red-500">*</span>
          </label>
          <p className="text-gray-500 text-sm mb-3">
            支援 Markdown 語法，您可以使用 **粗體**、*斜體*、`代碼` 等格式
          </p>
          <textarea
            rows={12}
            placeholder="請輸入食譜的詳細內容，包含食材、步驟等..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors resize-y"
            {...register('content', { required: '請輸入食譜內容' })}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Markdown 預覽 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            內容預覽
          </label>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 min-h-[200px]">
            <div className="markdown">
              <ReactMarkdown>
                {watch('content') || '預覽區域：請在上方輸入內容'}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* 圖片上傳 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            封面照片
          </label>
          <p className="text-gray-500 text-sm mb-3">
            上傳一張吸引人的食譜照片作為封面
          </p>
          <ImageUploader
            onUploaded={(url) => setImageUrl(url)}
            onError={(message) => showToast(message, 'error')}
          />
          {imageUrl && (
            <div className="mt-4">
              <div className="relative max-w-md">
                <Image
                  src={imageUrl}
                  alt="Uploaded"
                  width={448}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-md border-2 border-gray-200"
                  sizes="(max-width: 448px) 100vw, 448px"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZWYzZjI7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmJlZDhiO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2cpIiAvPjwvc3ZnPg=="
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    showToast('圖片載入失敗', 'error');
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    ✅ 上傳成功
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 動作按鈕 */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center justify-center gap-2 font-medium rounded-lg text-sm px-6 py-3 focus:ring-4 focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isCreate
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-300'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-300'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                {isCreate ? '創建中...' : '更新中...'}
              </>
            ) : (
              submitText
            )}
          </button>
          <button
            type="button"
            onClick={() =>
              isCreate
                ? router.push('/')
                : router.push(`/recipes/${recipe!.id}`)
            }
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium rounded-lg text-sm px-6 py-3 hover:from-orange-500 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto"
          >
            <span>↩️</span>
            取消
          </button>
        </div>
      </form>

      {/* Toast 通知 */}
      <ToastComponent />
    </div>
  );
}
