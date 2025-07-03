import Link from 'next/link';
import { Recipe } from '@/types/recipe';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <ul className="space-y-2">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="border p-2 bg-white">
          <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  );
}
