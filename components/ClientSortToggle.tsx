'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Sort = 'asc' | 'desc';

export default function ClientSortToggle({ sort }: { sort: Sort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (newSort: Sort) => {
    if (!mounted) return;

    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sort', newSort);
    router.push(`/?${params.toString()}`);
  };

  if (!mounted) {
    return (
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <div className="bg-gray-200 animate-pulse rounded-md w-20 h-11"></div>
        <div className="bg-gray-200 animate-pulse rounded-md w-20 h-11"></div>
      </div>
    );
  }

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => handleChange('desc')}
        className={`font-medium rounded-md text-sm px-4 py-2 transition-all duration-200 focus:ring-2 focus:outline-none leading-5 h-11 ${
          sort === 'desc'
            ? 'bg-white text-gray-900 shadow-sm border border-gray-200 focus:ring-orange-300'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-300'
        }`}
        aria-pressed={sort === 'desc'}
        aria-label="按最新時間排序"
      >
        最近新增
      </button>
      <button
        onClick={() => handleChange('asc')}
        className={`font-medium rounded-md text-sm px-4 py-2 transition-all duration-200 focus:ring-2 focus:outline-none leading-5 h-11 ${
          sort === 'asc'
            ? 'bg-white text-gray-900 shadow-sm border border-gray-200 focus:ring-orange-300'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-300'
        }`}
        aria-pressed={sort === 'asc'}
        aria-label="按較早時間排序"
      >
        較早新增
      </button>
    </div>
  );
}
