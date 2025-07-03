import RecipeForm from '../../components/RecipeForm';

export const metadata = {
  title: '新增食譜',
};

export default function NewRecipePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">新增食譜</h1>
      <RecipeForm />
    </main>
  );
}
