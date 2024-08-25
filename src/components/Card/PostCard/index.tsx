import { Post, PostCardType } from '@/types/Post';
import PostCardHeaderAvatar from './PostCardAvatar';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardAction from './PostCardAction';
import { Card } from '@/components/Card';
import { Comment } from '@/types/Comment';
import PostCardComment from './PostCardComment';
import { Profile } from '@/types/Profile';

export default function PostCard({
  post,
  type = 'summary',
  currentUser = null
}: {
  post: Post;
  type?: PostCardType;
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
      <PostCardFooter type={type} post={post} isMe={isMe} currentUser={currentUser} />
      <PostCardComment type={type} post={post} currentUser={currentUser} slug={slug} />
    </Card>
  );
}
