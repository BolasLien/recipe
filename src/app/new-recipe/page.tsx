import RecipeForm from '@/components/RecipeForm';

export default function NewRecipePage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">新增食譜</h1>
      <RecipeForm />
    </main>
  );
}
