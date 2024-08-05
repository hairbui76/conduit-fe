'use client';

import { Button } from '@/components/common/Button';
import { PostCardType } from '@/types/Post';
import { IconBubble } from '@tabler/icons-react';
import { useRouter } from 'next-nprogress-bar';

export default function ButtonComment({ slug, type }: { slug: string; type: PostCardType }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex-grow py-0"
      onClick={() => {
        if (type === 'summary') router.push(`/post/${slug}`);
      }}
    >
      <IconBubble className="mr-2" />
      Comment
    </Button>
  );
}
