'use client';

import { sliceString } from '@/lib/utils';
import { Button } from '../common/Button';
import { useRouter } from 'next-nprogress-bar';

export default function Tag({ tag }: { tag: string }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="h-fit px-2.5 py-1 rounded-sm"
      onClick={() => {
        router.push(`/tag/${tag}`);
      }}
    >
      <p className="break-all text-xs">#{sliceString(tag, 30)}</p>
    </Button>
  );
}
