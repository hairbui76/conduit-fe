import { Card } from '@/components/common/Card';

import PostCardHeaderAvatar from './PostCardAvatar';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardAction from './PostCardAction';

export default function PostCard() {
  const numLike = 100;

  return (
    <Card className="w-[600px] py-6 px-8 h-fit">
      <div className="flex items-center gap-3">
        <PostCardHeaderAvatar />
        <PostCardHeader />
        <PostCardAction />
      </div>
      <PostCardContent />
      <PostCardFooter numLike={numLike} />
    </Card>
  );
}
