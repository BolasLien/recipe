'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type Sort = 'asc' | 'desc';

export default function SortToggle({ sort }: { sort: Sort }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (newSort: Sort) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sort', newSort);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="space-x-2">
      <button
        onClick={() => handleChange('desc')}
        className={`py-1 px-3 rounded border transition ${sort === 'desc' ? 'bg-blue-600 text-white' : 'bg-white'}`}
      >
        最新
      </button>
      <button
        onClick={() => handleChange('asc')}
        className={`py-1 px-3 rounded border transition ${sort === 'asc' ? 'bg-blue-600 text-white' : 'bg-white'}`}
      >
        最舊
      </button>
    </div>
  );
}
