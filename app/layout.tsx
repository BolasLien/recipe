import '../styles/globals.css';
import React from 'react';

export const metadata = {
  title: '美味食譜',
  description: '探索精選食譜，創造美味時光',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
