import ButtonComment from '@/components/Button/ButtonComment';
import ButtonCopy from '@/components/Button/ButtonCopy';
import ButtonLike from '@/components/Button/ButtonLike';
import { CardFooter } from '@/components/common/Card';
import { PostCardType } from '@/types/Post';

export default function PostCardFooter({
  numLike,
  liked,
  slug,
  type
}: {
  numLike: number;
  liked: boolean;
  slug: string;
  type: PostCardType;
}) {
  return (
    <CardFooter className="py-0 flex-wrap">
      <ButtonLike numLike={numLike} liked={liked} slug={slug} />
      <ButtonComment slug={slug} type={type} />
      <ButtonCopy slug={slug} />
    </CardFooter>
  );
}
