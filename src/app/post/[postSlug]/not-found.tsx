'use client';

import { TypewriterEffectSmooth } from '@/components/TypewriterEffect';

export default function NotFound() {
  const words = 'Sorry, we could not find this post.'.split(' ').map(word => {
    return { text: word };
  });

  return (
    <section className="flex-grow flex flex-col items-center gap-4 px-8 md:pt-12 pt-16 pb-4 h-fit min-h-screen">
      <TypewriterEffectSmooth words={words} />
    </section>
  );
}
