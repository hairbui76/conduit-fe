import ButtonComment from './ButtonComment';
import ButtonLike from './ButtonLike';
import ButtonEditPost from './ButtonEditPost';
import { CardFooter } from '@/components/Card';
import { Post, PostCardType } from '@/types/Post';
import { Profile } from '@/types/Profile';

export default function PostCardFooter({
  post,
  type,
  isMe,
  currentUser
}: {
  post: Post;
  type: PostCardType;
  isMe: boolean;
  currentUser: Profile | null;
}) {
  const { favoritesCount: numLike, favorited: liked, slug, commentsCount: numComment } = post;

  return (
    <CardFooter className="py-0 flex-wrap gap-2 px-4">
      <ButtonLike numLike={numLike} liked={liked} post={post} currentUser={currentUser} />
      <ButtonComment numComment={numComment} slug={slug} type={type} />
      {isMe && <ButtonEditPost post={post} />}
    </CardFooter>
  );
}
