import { supabase } from '../lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import ClientSortToggle from '../components/ClientSortToggle';
import ClientSearchBox from '../components/ClientSearchBox';

type Recipe = {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
};

interface PageProps {
  searchParams: Promise<{ sort?: string; q?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
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
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-4 text-red-500">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              載入食譜失敗
            </h1>
            <p className="text-gray-600">請稍後再試或聯繫管理員</p>
          </div>
        </div>
      </div>
    );
  }

  const highlight = (text: string) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark
          key={i}
          className="bg-gradient-to-r from-orange-200 to-yellow-200 px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              美味食譜
            </h1>
            <p className="text-xl text-orange-100 mb-4 max-w-2xl mx-auto">
              探索精選食譜，創造美味時光
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <ClientSearchBox />
            <ClientSortToggle sort={sort} />
          </div>
          <div className="flex items-center gap-4">
            {data && data.length > 0 && (
              <span className="text-gray-600 text-sm">
                共 {data.length} 個食譜
              </span>
            )}
            <Link
              href="/recipes/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              新增食譜
            </Link>
          </div>
        </div>

        {/* Recipe Grid */}
        {data && data.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6 text-gray-400">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {keyword ? '找不到相關食譜' : '還沒有食譜'}
            </h3>
            <p className="text-gray-500 mb-6">
              {keyword
                ? `沒有找到包含「${keyword}」的食譜`
                : '開始創建您的第一個食譜吧！'}
            </p>
            <Link
              href="/recipes/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {keyword ? '新增食譜' : '創建第一個食譜'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {recipe.image_url ? (
                    <Image
                      src={recipe.image_url}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZWYzZjI7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmJlZDhiO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2cpIiAvPjwvc3ZnPg=="
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">🍳</div>
                        <p className="text-sm">暫無圖片</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {highlight(recipe.title)}
                  </h2>

                  {recipe.content && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {highlight(recipe.content.replace(/\n/g, ' '))}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-medium">
                      食譜
                    </span>
                    <div className="flex items-center text-orange-500">
                      <span className="text-sm font-medium mr-1">查看</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
