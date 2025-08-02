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
      <div className="flex space-x-2">
        <div className="py-2 px-4 rounded-full border bg-gray-200 animate-pulse w-16 h-10"></div>
        <div className="py-2 px-4 rounded-full border bg-gray-200 animate-pulse w-16 h-10"></div>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleChange('desc')}
        className={`font-medium rounded-lg text-sm px-5 py-2.5 border-2 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:outline-none shadow-md leading-5 h-10 ${
          sort === 'desc'
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 focus:ring-orange-300'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300 focus:ring-orange-100'
        }`}
      >
        最新
      </button>
      <button
        onClick={() => handleChange('asc')}
        className={`font-medium rounded-lg text-sm px-5 py-2.5 border-2 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:outline-none shadow-md leading-5 h-10 ${
          sort === 'asc'
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500 focus:ring-orange-300'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-300 focus:ring-orange-100'
        }`}
      >
        最舊
      </button>
    </div>
  );
}
