import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';
import ProgressBarProvider from '@/contexts/progressbar';
import { Sidebar } from '@/components/Sidebar';
import MainSection from '@/containers/root-page';
import { getTags } from '@/actions/tag';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s • Conduit',
    default: 'Conduit'
  },
  description:
    "Conduit is a dynamic social media platform designed to bring people together through meaningful conversations and shared experiences. Whether you're looking to connect with like-minded individuals, share your stories, or discover new perspectives, Conduit is your go-to place. Our intuitive interface and diverse community make it easy to engage, express, and inspire. Join Conduit today and be part of a network where your voice matters and connections flourish.",
  openGraph: {
    title: 'Conduit',
    description: 'Conduit is dynamic social media platform',
    siteName: 'Conduit'
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tags = await getTags();

  return (
    <html lang="en">
      <body className={cn('flex flex-col md:flex-row', inter.className)}>
        <ProgressBarProvider>
          <div
            className={cn(
              'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-auto h-screen'
            )}
          >
            <Sidebar />
            <MainSection tags={tags}>{children}</MainSection>
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontSize: '14px',
                padding: '8px 16px',
                marginRight: '16px'
              },
              duration: 5000
            }}
          />
        </ProgressBarProvider>
      </body>
    </html>
  );
}
