'use client';

import { usePathname } from 'next/navigation';

export default function Section({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return pathname === '/login' ? (
    children
  ) : (
    <section className="flex-grow flex flex-col items-center gap-4 px-8 md:pt-12 pt-16 pb-4 h-fit min-h-screen">
      {children}
    </section>
  );
}
