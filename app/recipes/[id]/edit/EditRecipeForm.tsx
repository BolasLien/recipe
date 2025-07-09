'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../../../../lib/supabase';
import ImageUploader from '../../../../components/ImageUploader';
import { useState } from 'react';

type Props = {
  recipe: {
    id: string;
    title: string;
    content: string | null;
    image_url: string | null;
  };
};

type FormValues = {
  title: string;
  content: string;
};

export default function EditRecipeForm({ recipe }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(recipe.image_url || '');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: recipe.title,
      content: recipe.content || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
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
      alert('更新失敗');
      return;
    }

    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">編輯食譜</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* 標題 */}
        <div>
          <label className="block font-medium mb-1">標題</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register('title', { required: '標題必填' })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Markdown 輸入 */}
        <div>
          <label className="block font-medium mb-1">內容 (Markdown)</label>
          <textarea
            rows={10}
            className="w-full border p-2 rounded"
            {...register('content')}
          />
        </div>

        {/* Markdown 預覽 */}
        <div>
          <label className="block font-medium mb-1">Markdown 預覽</label>
          <div className="border p-4 rounded bg-gray-50 markdown">
            <ReactMarkdown>{watch('content') || ''}</ReactMarkdown>
          </div>
        </div>

        {/* 圖片上傳 */}
        <div>
          <label className="block font-medium mb-1">封面照片</label>
          <ImageUploader onUploaded={(url) => setImageUrl(url)} />
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="w-48 mt-2 rounded" />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          更新食譜
        </button>
      </form>
    </div>
  );
}
