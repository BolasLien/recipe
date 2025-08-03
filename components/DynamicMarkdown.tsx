'use client';

import { Suspense, lazy } from 'react';

// 動態導入 ReactMarkdown 以優化 bundle 大小
const ReactMarkdown = lazy(() => import('react-markdown'));

type DynamicMarkdownProps = {
  children: string;
  className?: string;
};

// Loading 組件
const MarkdownSkeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

/**
 * 動態載入的 Markdown 組件
 * 使用 lazy loading 來減少初始 bundle 大小
 */
export default function DynamicMarkdown({
  children,
  className,
}: DynamicMarkdownProps) {
  return (
    <Suspense fallback={<MarkdownSkeleton />}>
      <div className={className}>
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
    </Suspense>
  );
}
