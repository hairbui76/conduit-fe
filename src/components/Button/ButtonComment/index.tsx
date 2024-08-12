'use client';

import { useRouter } from 'next-nprogress-bar';
import { Button } from '@/components/common/Button';
import { suffixS } from '@/lib/utils';
import { PostCardType } from '@/types/Post';
import { IconBubble } from '@tabler/icons-react';

export default function ButtonComment({
  numComment,
  slug,
  type
}: {
  numComment: number | undefined;
  slug: string;
  type: PostCardType;
}) {
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
      {numComment && numComment > 0 ? `${numComment} ${suffixS('Comment', numComment)}` : 'Comment'}
    </Button>
  );
}
