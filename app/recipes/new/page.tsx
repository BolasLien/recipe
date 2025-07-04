'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../../../lib/supabase';
import ImageUploader from '../../../components/ImageUploader';

type FormValues = {
  title: string;
  content: string;
  imageUrl: string;
};

export default function NewRecipePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [imageUrl, setImageUrl] = useState('');

  const onSubmit = async (data: FormValues) => {
    try {
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

      // 成功提示並導向列表頁
      alert('新增成功！');
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('發生錯誤');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">新增食譜</h1>
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
          <div className="border p-4 rounded bg-gray-50 prose">
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
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          新增食譜
        </button>
      </form>
    </div>
  );
}
