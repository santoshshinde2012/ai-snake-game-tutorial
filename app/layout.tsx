import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Snake Game - Next.js + TypeScript',
  description: 'A modern Snake game built with Next.js, TypeScript, and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
