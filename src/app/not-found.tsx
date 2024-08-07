import { TypewriterEffectSmooth } from '@/components/TypewriterEffect';

export default function NotFound() {
  const words = '404 - Page not found.'.split(' ').map(word => {
    return { text: word };
  });

  return <TypewriterEffectSmooth words={words} />;
}
