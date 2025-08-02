import { supabase } from '../../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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

  const breadcrumbItems = [
    { label: '首頁', href: '/' },
    { label: '食譜詳情' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 drop-shadow-md">
            {data.title}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-white/90">
            <div className="flex items-center gap-1">
              <span className="text-sm">📅</span>
              <span className="text-sm">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:from-orange-500 hover:to-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto"
          >
            <span>←</span>
            返回
          </Link>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href={`/recipes/${data.id}/edit`}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto"
            >
              <span>✏️</span>
              編輯
            </Link>
            <div className="w-full sm:w-auto">
              <DeleteRecipeButton recipeId={data.id} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image */}
          <div className="w-full lg:sticky lg:top-8 self-start">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {data.image_url ? (
                <img
                  src={data.image_url}
                  alt={data.title}
                  className="w-full h-auto object-cover lg:max-h-[70vh]"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
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
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
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
