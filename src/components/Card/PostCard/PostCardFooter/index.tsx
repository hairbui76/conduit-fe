import ButtonComment from '@/components/Button/ButtonComment';
import ButtonCopy from '@/components/Button/ButtonCopy';
import ButtonEditPost from '@/components/Button/ButtonEditPost';
import ButtonLike from '@/components/Button/ButtonLike';
import { CardFooter } from '@/components/common/Card';
import { Post, PostCardType } from '@/types/Post';

export default function PostCardFooter({
  post,
  type,
  numComment,
  isMe
}: {
  post: Post;
  type: PostCardType;
  numComment: number | undefined;
  isMe: boolean;
}) {
  const { favoritesCount: numLike, favorited: liked, tagList, createdAt, slug } = post;

  return (
    <CardFooter className="py-0 flex-wrap gap-2 px-4">
      <ButtonLike numLike={numLike} liked={liked} slug={slug} />
      <ButtonComment numComment={numComment} slug={slug} type={type} />
      {isMe && <ButtonEditPost post={post} />}
      <ButtonCopy baseUrl="/post" id={slug} variant="ghost" />
    </CardFooter>
  );
}
