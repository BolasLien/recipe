import RecipeList from '@/components/RecipeList';
import { Recipe } from '@/types/recipe';

async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Home() {
  const recipes = await getRecipes();
  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-bold">食譜列表</h1>
      <RecipeList recipes={recipes} />
    </main>
  );
}
