import RecipeDetail from '@/components/RecipeDetail';
import { Recipe } from '@/types/recipe';

interface Props {
  params: { id: string };
}

async function getRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function RecipeDetailPage({ params }: Props) {
  const recipe = await getRecipe(params.id);
  return (
    <main className="p-4">
      <RecipeDetail recipe={recipe} />
    </main>
  );
}
