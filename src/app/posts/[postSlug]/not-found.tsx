import { TypewriterEffectSmooth } from '@/components/TypewriterEffect';

export default function NotFound() {
  const words = 'Sorry, we could not find this post.'.split(' ').map(word => {
    return { text: word };
  });

  return <TypewriterEffectSmooth words={words} />;
}
