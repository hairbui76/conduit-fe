'use client';

import { Button } from '@/components/common/Button';
import { IconBubble } from '@tabler/icons-react';
import { useRouter } from 'next-nprogress-bar';

export default function ButtonComment({ slug }: { slug: string }) {
  const router = useRouter();

  return (
    <Button variant="ghost" className="flex-grow py-0" onClick={() => router.push(`/post/${slug}`)}>
      <IconBubble className="mr-2" />
      Comment
    </Button>
  );
}
