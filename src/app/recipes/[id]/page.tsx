interface RecipePageProps {
  params: { id: string };
}

export default function RecipePage({ params }: RecipePageProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Recipe {params.id}</h1>
    </div>
  );
}
