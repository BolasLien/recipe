'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);

  const navigateWithQuery = (kw: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (kw) {
      params.set('q', kw);
    } else {
      params.delete('q');
    }
    setLoading(true);
    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    setKeyword(searchParams.get('q') || '');
    setLoading(false);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateWithQuery(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-auto space-x-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜尋食譜"
          className="border p-2 rounded w-full pr-8"
          disabled={loading}
        />
        {keyword && (
          <button
            type="button"
            onClick={() => {
              setKeyword('');
              navigateWithQuery('');
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
            aria-label="清除搜尋"
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? '搜尋中...' : '搜尋'}
      </button>
    </form>
  );
}
