import { TypewriterEffectSmooth } from '@/components/TypewriterEffect';

export default function NotFound() {
  const words = '404 - Page not found.'.split(' ').map(word => {
    return { text: word };
  });

  return (
    <div className="sm:w-[570px] md:w-[640px] pt-6 pb-4 px-8 h-fit flex justify-center">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
