'use client';

import { TypewriterEffectSmooth } from '@/components/TypewriterEffect';

export default function NotFound() {
  const words = 'Sorry, we could not find this post.'.split(' ').map(word => {
    return { text: word };
  });

  return (
    <div className="sm:w-[570px] md:w-[640px] pt-6 pb-4 px-8 h-fit flex justify-center">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
