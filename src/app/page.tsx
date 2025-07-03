import RecipeList from '../components/RecipeList';

export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">食譜清單</h1>
      <RecipeList />
    </main>
  );
}
