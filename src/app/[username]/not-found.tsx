'use client';

import { useParams } from 'next/navigation';

import { TypewriterEffectSmooth } from '@/components/TypewriterEffect';

export default function NotFound() {
  const params = useParams<{ username: string }>();

  const words = `Sorry, user ${params.username} doesn't exist.`.split(' ').map(word => {
    return { text: word };
  });

  return <TypewriterEffectSmooth words={words} />;
}
