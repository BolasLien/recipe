import { supabase } from '../../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import DeleteRecipeButton from '../../../components/DeleteRecipeButton';
import Breadcrumb from '../../../components/Breadcrumb';
// 暫時使用 emoji 替代圖標，避免模組載入問題

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(error);
    notFound();
  }

  const formattedDate = new Date(data.created_at).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const breadcrumbItems = [{ label: '首頁', href: '/' }, { label: '食譜詳情' }];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-amber-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-bold mt-6">{data.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-amber-100">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span className="text-sm">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-amber-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-amber-600 focus:ring-2 focus:outline-none focus:ring-amber-300 transition-colors shadow-sm w-full sm:w-auto"
          >
            <span>←</span>
            返回
          </Link>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href={`/recipes/${data.id}/edit`}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 transition-colors shadow-sm w-full sm:w-auto"
            >
              <span>✏️</span>
              編輯
            </Link>
            <div className="w-full sm:w-auto">
              <DeleteRecipeButton recipeId={data.id} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column: Image */}
          <div className="w-full lg:sticky lg:top-8 self-start">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {data.image_url ? (
                <div className="relative w-full min-h-[300px] max-h-[70vh] bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center">
                  <Image
                    src={data.image_url}
                    alt={data.title}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZWYzZjI7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmJlZDhiO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2cpIiAvPjwvc3ZnPg=="
                    priority
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🍳</div>
                    <p>暫無圖片</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Content */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
              <article className="markdown prose-orange">
                <ReactMarkdown>{data.content || ''}</ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
