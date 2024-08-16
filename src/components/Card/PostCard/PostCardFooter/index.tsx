import ButtonComment from './ButtonComment';
import ButtonLike from './ButtonLike';
import ButtonEditPost from './ButtonEditPost';
import { CardFooter } from '@/components/Card';
import { Post, PostCardType } from '@/types/Post';

export default function PostCardFooter({
  post,
  type,
  isMe
}: {
  post: Post;
  type: PostCardType;
  isMe: boolean;
}) {
  const { favoritesCount: numLike, favorited: liked, slug, commentsCount: numComment } = post;

  return (
    <CardFooter className="py-0 flex-wrap gap-2 px-4">
      <ButtonLike numLike={numLike} liked={liked} slug={slug} />
      <ButtonComment numComment={numComment} slug={slug} type={type} />
      {isMe && <ButtonEditPost post={post} />}
    </CardFooter>
  );
}
