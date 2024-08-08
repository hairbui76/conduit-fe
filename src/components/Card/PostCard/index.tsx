import { Post, PostCardType } from '@/types/Post';
import PostCardHeaderAvatar from './PostCardAvatar';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardAction from './PostCardAction';
import { Card } from '@/components/common/Card';
import { Comment } from '@/types/Comment';
import PostCardComment from './PostCardComment';
import { Profile } from '@/types/Profile';

export default function PostCard({
  post,
  type = 'summary',
  comments,
  currentUser = null
}: {
  post: Post;
  type?: PostCardType;
  comments?: Comment[];
  currentUser?: Profile | null;
}) {
  const { author, createdAt, slug } = post;
  const isMe = currentUser !== null && currentUser.username === author.username;

  return (
    <Card className="w-full pt-6 pb-4 px-8">
      <div className="flex items-center gap-3">
        <PostCardHeaderAvatar author={author} />
        <PostCardHeader author={author} createdAt={createdAt} isMe={isMe} />
        <PostCardAction isMe={isMe} slug={slug} />
      </div>
      <PostCardContent post={post} type={type} />
      <PostCardFooter numComment={comments?.length} type={type} post={post} isMe={isMe} />
      {type === 'detail' && comments && (
        <PostCardComment comments={comments} currentUser={currentUser} slug={slug} />
      )}
    </Card>
  );
}
