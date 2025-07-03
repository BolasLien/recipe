import RecipeDetail from '../../../components/RecipeDetail';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

export default async function RecipeDetailPage({ params }: Params) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${params.id}`);
  if (!res.ok) {
    return notFound();
  }
  const recipe = await res.json();

  return (
    <main>
      <RecipeDetail recipe={recipe} />
    </main>
  );
}
