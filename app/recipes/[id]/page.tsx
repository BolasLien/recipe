import { supabase } from '../../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

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
    <main className="max-w-2xl mx-auto p-8">
      {data.image_url && (
        <img
          src={data.image_url}
          alt={data.title}
          className="w-full h-auto rounded mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <article className="prose">
        <ReactMarkdown>{data.content || ''}</ReactMarkdown>
      </article>
    </main>
  );
}
