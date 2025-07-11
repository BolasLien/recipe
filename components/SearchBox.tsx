'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (keyword) {
      params.set('q', keyword);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-auto space-x-2">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="搜尋食譜"
        className="border p-2 rounded flex-1"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        搜尋
      </button>
    </form>
  );
}
