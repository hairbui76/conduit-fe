import ButtonCopy from '@/components/Button/ButtonCopy';
import { CardFooter } from '@/components/Card';
import { Post, PostCardType } from '@/types/Post';
import { Profile } from '@/types/Profile';
import ButtonComment from './ButtonComment';
import ButtonLike from './ButtonLike';
import ButtonShare from './ButtonShare';

export default function PostCardFooter({
  post,
  type,
  currentUser
}: {
  post: Post;
  type: PostCardType;
  currentUser: Profile | null;
}) {
  const { favoritesCount: numLike, favorited: liked, slug, commentsCount: numComment } = post;

  return (
    <CardFooter className="py-0 flex-wrap gap-2 px-4">
      <ButtonLike numLike={numLike} liked={liked} post={post} currentUser={currentUser} />
      <ButtonComment numComment={numComment} slug={slug} type={type} />
      <ButtonCopy
        page="/post"
        id={slug}
        variant="ghost"
        iconClassName="mr-2"
        className="py-0 px-2 flex-row-reverse flex-grow"
      />
      <ButtonShare slug={slug} />
    </CardFooter>
  );
}
