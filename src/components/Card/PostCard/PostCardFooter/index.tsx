import ButtonComment from '@/components/Button/ButtonComment';
import ButtonCopy from '@/components/Button/ButtonCopy';
import ButtonLike from '@/components/Button/ButtonLike';
import { CardFooter } from '@/components/common/Card';
import { PostCardType } from '@/types/Post';

export default function PostCardFooter({
  numLike,
  numComment,
  liked,
  slug,
  type
}: {
  numLike: number;
  numComment: number | undefined;
  liked: boolean;
  slug: string;
  type: PostCardType;
}) {
  return (
    <CardFooter className="py-0 flex-wrap">
      <ButtonLike numLike={numLike} liked={liked} slug={slug} />
      <ButtonComment numComment={numComment} slug={slug} type={type} />
      <ButtonCopy slug={slug} />
    </CardFooter>
  );
}
