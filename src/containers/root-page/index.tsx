'use client';

import { usePathname } from 'next/navigation';

export default function MainSection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return pathname === '/login' ? (
    children
  ) : (
    <main className="flex mx-auto md:py-12 py-16 h-fit min-h-screen lg:gap-4 px-4">{children}</main>
  );
}
