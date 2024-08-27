import { Post, PostCardType } from '@/types/Post';
import PostCardHeaderAvatar from './PostCardAvatar';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardAction from './PostCardAction';
import { Card } from '@/components/Card';
import PostCardComment from './PostCardComment';
import { Profile } from '@/types/Profile';

export default function PostCard({
  post,
  type = 'summary',
  setPosts,
  currentUser = null
}: {
  post: Post;
  type?: PostCardType;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
  currentUser?: Profile | null;
}) {
  const { author, createdAt, slug } = post;
  const isMe = currentUser !== null && currentUser.username === author.username;

  return (
    <Card className="w-full px-4 pt-6 pb-4 sm:px-8">
      <div className="flex items-center gap-3">
        <PostCardHeaderAvatar author={author} />
        <PostCardHeader author={author} createdAt={createdAt} isMe={isMe} />
        <PostCardAction isMe={isMe} post={post} setPosts={setPosts} />
      </div>
      <PostCardContent post={post} type={type} />
      <PostCardFooter type={type} post={post} currentUser={currentUser} setPosts={setPosts} />
      <PostCardComment
        type={type}
        post={post}
        currentUser={currentUser}
        slug={slug}
        setPosts={setPosts}
      />
    </Card>
  );
}
