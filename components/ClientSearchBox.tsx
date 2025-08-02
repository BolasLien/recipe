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
    if (kw.trim()) {
      params.set('q', kw.trim());
    } else {
      params.delete('q');
    }
    setLoading(true);
    router.push(`/?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateWithQuery(keyword);
  };

  const handleClear = () => {
    setKeyword('');
    navigateWithQuery('');
  };

  // 鍵盤快捷鍵支援 (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[role="searchbox"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted) {
    return (
      <div className="flex w-full gap-2">
        <div className="relative flex-1">
          <div className="border-2 border-gray-200 px-5 py-2.5 rounded-lg w-full pr-10 bg-gray-50 animate-pulse h-11"></div>
        </div>
        <div className="bg-gray-300 animate-pulse rounded-lg h-11 w-20"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="搜尋食譜..."
          className="border-2 border-gray-200 pl-10 pr-12 py-2.5 rounded-lg w-full focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all duration-200 text-sm font-medium leading-5 h-11"
          disabled={loading}
          aria-label="搜尋食譜關鍵字"
          role="searchbox"
        />

        {/* 搜尋圖示 */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* 清除按鈕 */}
        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="清除搜尋"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 搜尋按鈕 */}
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-orange-500 text-white font-medium rounded-lg text-sm px-4 py-2.5 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-all duration-200 shadow-sm hover:shadow-md h-11 whitespace-nowrap"
        disabled={loading}
        aria-label="執行搜尋"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
        <span className="hidden sm:inline">
          {loading ? '搜尋中...' : '搜尋'}
        </span>
      </button>
    </form>
  );
}
