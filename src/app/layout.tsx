import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Recipe App',
  description: 'A simple recipe website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="container mx-auto p-4">{children}</body>
    </html>
  );
}
