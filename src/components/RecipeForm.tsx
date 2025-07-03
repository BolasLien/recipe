'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('ingredients', ingredients);
    formData.append('steps', steps);
    if (image) formData.append('image', image);

    await fetch('/api/recipes', {
      method: 'POST',
      body: formData,
    });

    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">名稱</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block mb-1">食材</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full border px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block mb-1">步驟</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full border px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block mb-1">照片</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
        新增食譜
      </button>
    </form>
  );
}
