import { Card } from '@/components/common/Card';

import { Post } from '@/types/Post';
import PostCardHeaderAvatar from './PostCardAvatar';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardAction from './PostCardAction';

export default function PostCard({ post }: { post: Post }) {
  const { author, title, favoritedCount, favorited, tagList, createdAt } = post;

  return (
    <Card className="md:w-[600px] w-auto pt-6 pb-4 px-8 h-fit">
      <div className="flex items-center gap-3">
        <PostCardHeaderAvatar author={author} />
        <PostCardHeader author={author} createdAt={createdAt} />
        <PostCardAction />
      </div>
      <PostCardContent content={title} tags={tagList} />
      <PostCardFooter numLike={favoritedCount} liked={favorited} />
    </Card>
  );
}
