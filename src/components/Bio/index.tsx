import { cn } from '@/lib/utils';

export default function Bio({ text, className }: { text: string; className?: string }) {
  return <p className={cn('text-sm italic', className)}>&quot;{text}&quot;</p>;
}
