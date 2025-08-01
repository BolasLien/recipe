import { supabase } from '../../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteRecipeButton from '../../../components/DeleteRecipeButton';

type Props = {
  params: {
    id: string;
  };
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

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column: Image */}
        <div className="w-full md:sticky md:top-8 self-start">
          {data.image_url && (
            <img
              src={data.image_url}
              alt={data.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover md:max-h-[70vh]"
            />
          )}
        </div>

        {/* Right Column: Content */}
        <div>
          <div className="flex space-x-2 mb-4">
            <Link
              href="/"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
            >
              返回
            </Link>
            <Link
              href={`/recipes/${data.id}/edit`}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              編輯
            </Link>
            <DeleteRecipeButton recipeId={data.id} />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            {data.title}
          </h1>

          <article className="markdown">
            <ReactMarkdown>{data.content || ''}</ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}
