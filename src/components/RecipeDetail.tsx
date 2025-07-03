import Image from 'next/image';
import { Recipe } from '@/types/recipe';

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{recipe.name}</h1>
      {recipe.imageUrl && (
        <Image src={recipe.imageUrl} alt={recipe.name} width={600} height={400} />
      )}
      <div>
        <h2 className="font-semibold">食材</h2>
        <p>{recipe.ingredients}</p>
      </div>
      <div>
        <h2 className="font-semibold">步驟</h2>
        <p>{recipe.steps}</p>
      </div>
    </div>
  );
}
