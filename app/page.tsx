import { supabase } from '../lib/supabase';
import Link from 'next/link';
import SortToggle from '../components/SortToggle';
import SearchBox from '../components/SearchBox';

type Recipe = {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
};

export default async function HomePage({
  searchParams,
}: {
  searchParams:
    | { sort?: string; q?: string }
    | Promise<{ sort?: string; q?: string }>;
}) {
  const params = await searchParams;
  const sort = params?.sort === 'asc' ? 'asc' : 'desc';
  const keyword = params?.q || '';
  let query = supabase
    .from('recipes')
    .select('id, title, content, image_url')
    .order('created_at', { ascending: sort === 'asc' });

  if (keyword) {
    query = query.or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return <p className="text-red-500 p-4">載入食譜失敗</p>;
  }

  const highlight = (text: string) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">食譜列表</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <SearchBox />
          <SortToggle sort={sort} />
          <Link
            href="/recipes/new"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            新增食譜
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {data && data.length === 0 && (
          <p className="text-center text-gray-500">無結果</p>
        )}
        {data?.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="flex bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
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
                <h2 className="text-lg font-semibold mb-2">
                  {highlight(recipe.title)}
                </h2>
                <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                  {recipe.content
                    ? highlight(
                        recipe.content.replace(/\n/g, ' ').slice(0, 50) +
                          (recipe.content.length > 50 ? '...' : '')
                      )
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
