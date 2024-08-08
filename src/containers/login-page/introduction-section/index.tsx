import React from 'react';

import { cn } from '@/lib/utils';
import LoginPageBackground from '@/components/Background/LoginPageBackground';
import Link from 'next/link';
import { IconArrowNarrowDown } from '@tabler/icons-react';

export default function Introduction() {
  return (
    <div className="h-screen min-h-screen relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center md:basis-1/2">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <LoginPageBackground />
      <h1 className={cn('md:text-4xl text-3xl text-white relative z-20')}>Conduit is Awesome</h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Connecting Ideas, Sharing Stories
      </p>
      <Link
        href="#authentication"
        className="text-center mt-4 text-neutral-300 relative z-20 border-b-2 pb-1 px-1 md:hidden"
      >
        <span className="flex items-center">
          Start Explore
          <IconArrowNarrowDown className="w-5 h-5" />
        </span>
      </Link>
    </div>
  );
}
