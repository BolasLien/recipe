import { supabase } from '../lib/supabase';
import Link from 'next/link';

type Recipe = {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
};

export default async function HomePage() {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, title, content, image_url')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return <p className="text-red-500 p-4">載入食譜失敗</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">食譜列表</h1>

      <div className="space-y-4">
        {data?.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="flex border rounded overflow-hidden hover:shadow transition"
          >
            {recipe.image_url && (
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-40 h-40 object-cover flex-shrink-0"
              />
            )}

            <div className="p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                  {recipe.content
                    ? recipe.content.replace(/\n/g, ' ').slice(0, 50) + '...'
                    : ''}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
