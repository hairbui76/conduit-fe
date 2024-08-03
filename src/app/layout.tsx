import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';
import { Root } from '@/components/Root';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s • Conduit',
    default: 'Conduit'
  },
  description:
    "Conduit is a dynamic social media platform designed to bring people together through meaningful conversations and shared experiences. Whether you're looking to connect with like-minded individuals, share your stories, or discover new perspectives, Conduit is your go-to place. Our intuitive interface and diverse community make it easy to engage, express, and inspire. Join Conduit today and be part of a network where your voice matters and connections flourish."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('flex', inter.className)}>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
