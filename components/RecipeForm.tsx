'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';
import ImageUploader from './ImageUploader';

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
    try {
      if (mode === 'create') {
        const { error } = await supabase.from('recipes').insert({
          title: data.title,
          content: data.content,
          image_url: imageUrl || null,
        });

        if (error) {
          console.error(error);
          alert('新增失敗');
          return;
        }

        alert('新增成功！');
        router.push('/');
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
          alert('更新失敗');
          return;
        }

        router.push(`/recipes/${recipe.id}`);
      }
    } catch (err) {
      console.error(err);
      alert('發生錯誤');
    }
  };

  const isCreate = mode === 'create';
  const title = isCreate ? '新增食譜' : '編輯食譜';
  const submitText = isCreate ? '新增食譜' : '更新食譜';
  const submitButtonClass = isCreate
    ? 'bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700'
    : 'bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700';

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* 標題輸入 */}
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

        {/* Markdown 輸入框 */}
        <div>
          <label className="block font-medium mb-1">內容 (Markdown)</label>
          <textarea
            rows={10}
            className="w-full border p-2 rounded"
            {...register('content', { required: '內容必填' })}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
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

        <div className="flex space-x-2">
          <button type="submit" className={submitButtonClass}>
            {submitText}
          </button>
          <button
            type="button"
            onClick={() =>
              isCreate
                ? router.push('/')
                : router.push(`/recipes/${recipe!.id}`)
            }
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
