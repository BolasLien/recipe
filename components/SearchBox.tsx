'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateWithQuery(keyword);
  };

  const handleClear = () => {
    setKeyword('');
    navigateWithQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border rounded px-3 py-1 flex-grow"
        placeholder="搜尋食譜"
      />
      {keyword && (
        <button type="button" onClick={handleClear} className="px-2 text-sm">
          清除
        </button>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-1 px-4 rounded disabled:opacity-50"
      >
        {loading ? '搜尋中...' : '搜尋'}
      </button>
    </form>
  );
}
