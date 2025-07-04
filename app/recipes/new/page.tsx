'use client';

import ImageUploader from '../../../components/ImageUploader';
import { useForm } from 'react-hook-form';

interface FormValues {
  title: string;
  content: string;
}

export default function NewRecipePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data);
  });

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">新增食譜</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            標題
          </label>
          <input
            id="title"
            type="text"
            className="w-full border rounded p-2"
            placeholder="輸入標題"
            {...register('title', { required: '標題必填' })}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="content">
            內容 (Markdown)
          </label>
          <textarea
            id="content"
            className="w-full border rounded p-2 h-40"
            placeholder="輸入內容"
            {...register('content', { required: '內容必填' })}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">圖片</label>
          <ImageUploader />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          送出
        </button>
      </form>
    </div>
  );
}
