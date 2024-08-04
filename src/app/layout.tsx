import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';
import { Root } from '@/components/Root';
import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s • Conduit',
    default: 'Conduit'
  },
  description:
    "Conduit is a dynamic social media platform designed to bring people together through meaningful conversations and shared experiences. Whether you're looking to connect with like-minded individuals, share your stories, or discover new perspectives, Conduit is your go-to place. Our intuitive interface and diverse community make it easy to engage, express, and inspire. Join Conduit today and be part of a network where your voice matters and connections flourish."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = !!cookies().get('AUTH_TOKEN')?.value;

  return (
    <html lang="en">
      <body className={cn('flex flex-col md:flex-row', inter.className)}>
        <Root isLoggedIn={isLoggedIn}>{children}</Root>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: '14px',
              padding: '8px 16px'
            },
            duration: 5000
          }}
        />
      </body>
    </html>
  );
}
