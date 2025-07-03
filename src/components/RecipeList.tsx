'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { Recipe } from '../types/recipe';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecipeList() {
  const { data, error } = useSWR<Recipe[]>('/api/recipes', fetcher);

  if (error) return <div>載入錯誤</div>;
  if (!data) return <div>載入中...</div>;

  return (
    <ul className="space-y-2">
      {data.map((recipe) => (
        <li key={recipe.id} className="border p-2">
          <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  );
}
