import RecipeForm from '../../../components/RecipeForm';
import Breadcrumb from '../../../components/Breadcrumb';

export default function NewRecipePage() {
  const breadcrumbItems = [{ label: '首頁', href: '/' }, { label: '新增食譜' }];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 drop-shadow-md">
            新增食譜
          </h1>
          <p className="mt-2 text-white/90">創建新的美味食譜，與大家分享</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <RecipeForm mode="create" />
      </main>
    </div>
  );
}
