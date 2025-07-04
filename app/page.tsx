import { supabase } from '../lib/supabase';
import Link from 'next/link';

type Recipe = {
  id: string;
  title: string;
  image_url: string | null;
};

export default async function HomePage() {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, title, image_url')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return <p className="text-red-500 p-4">載入食譜失敗</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">食譜列表</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="block border rounded p-4 hover:shadow"
          >
            {recipe.image_url && (
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
