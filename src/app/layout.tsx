import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';
import ProgressBarProvider from '@/contexts/progressbar';
import { Sidebar } from '@/containers/sidebar';
import MainSection from '@/containers/root-page';
import { ThemeProvider } from '@/contexts/theme';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('flex flex-col md:flex-row', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBarProvider>
            <div
              className={cn(
                'flex flex-col md:flex-row bg-gray-100 dark:bg-background w-full flex-1 mx-auto overflow-auto h-screen'
              )}
            >
              <Sidebar />
              <MainSection>{children}</MainSection>
            </div>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  fontSize: '14px',
                  padding: '8px 16px',
                  marginRight: '0px'
                },
                duration: 5000
              }}
            />
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
