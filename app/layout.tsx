import '../styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'Recipe App',
  description: 'Upload recipe images with Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
