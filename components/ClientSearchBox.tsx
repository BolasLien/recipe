'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ClientSearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (searchParams) {
      setKeyword(searchParams.get('q') || '');
    }
    setLoading(false);
  }, [searchParams]);

  const navigateWithQuery = (kw: string) => {
    if (!mounted) return;

    const params = new URLSearchParams(searchParams?.toString() || '');
    if (kw) {
      params.set('q', kw);
    } else {
      params.delete('q');
    }
    setLoading(true);
    router.push(`/?${params.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateWithQuery(keyword);
  };

  const handleClear = () => {
    setKeyword('');
    navigateWithQuery('');
  };

  if (!mounted) {
    return (
      <div className="flex w-full sm:w-auto space-x-2">
        <div className="relative flex-1">
          <div className="border p-2 rounded w-full pr-8 bg-gray-50 animate-pulse h-10"></div>
        </div>
        <div className="bg-gray-300 animate-pulse py-2 px-4 rounded h-10 w-16"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-auto space-x-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜尋食譜"
          className="border-2 border-gray-200 px-5 py-2.5 rounded-lg w-full pr-10 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all duration-300 text-sm font-medium leading-5 h-10"
          disabled={loading}
        />
        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="清除搜尋"
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 disabled:opacity-60 transition-all duration-300 transform hover:scale-105 shadow-md leading-5 h-10"
        disabled={loading}
      >
        {loading ? '搜尋中...' : '搜尋'}
      </button>
    </form>
  );
}
