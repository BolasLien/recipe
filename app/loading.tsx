export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-9 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center space-x-4">
          <div className="h-9 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
            <div className="w-40 h-40 bg-gray-200"></div>
            <div className="p-4 flex-grow">
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}