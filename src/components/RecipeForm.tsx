'use client';

import { useState, FormEvent } from 'react';
import { uploadImage } from '../utils/uploadImage';
import { Recipe } from '../types/recipe';
import { useRouter } from 'next/navigation';

export default function RecipeForm() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      imageUrl = await uploadImage(image);
    }
    const recipe: Recipe = { name, ingredients, steps, imageUrl };
    await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">名稱</label>
        <input
          type="text"
          className="w-full border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">食材</label>
        <textarea
          className="w-full border p-2"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">步驟</label>
        <textarea
          className="w-full border p-2"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">照片</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        新增
      </button>
    </form>
  );
}
