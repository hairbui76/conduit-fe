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
    <CardFooter className="py-0 flex-wrap gap-2 px-4">
      <ButtonLike numLike={numLike} liked={liked} slug={slug} />
      <ButtonComment numComment={numComment} slug={slug} type={type} />
      <ButtonCopy baseUrl="/post" id={slug} variant="ghost" />
    </CardFooter>
  );
}
