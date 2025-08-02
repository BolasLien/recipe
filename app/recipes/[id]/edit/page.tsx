import { supabase } from '../../../../lib/supabase';
import RecipeForm from '../../../../components/RecipeForm';
import Breadcrumb from '../../../../components/Breadcrumb';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditRecipePage({ params }: Props) {
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

  const breadcrumbItems = [
    { label: '首頁', href: '/' },
    { label: data.title, href: `/recipes/${data.id}` },
    { label: '編輯食譜' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-amber-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-bold mt-6">編輯食譜</h1>
          <p className="mt-3 text-amber-100">修改「{data.title}」的內容</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
        <RecipeForm mode="edit" recipe={data} />
      </main>
    </div>
  );
}
