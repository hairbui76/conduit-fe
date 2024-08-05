import ButtonComment from '@/components/Button/ButtonComment';
import ButtonCopy from '@/components/Button/ButtonCopy';
import ButtonLike from '@/components/Button/ButtonLike';
import { CardFooter } from '@/components/common/Card';

export default function PostCardFooter({
  numLike,
  liked,
  slug
}: {
  numLike: number;
  liked: boolean;
  slug: string;
}) {
  return (
    <CardFooter className="py-0">
      <ButtonLike numLike={numLike} liked={liked} />
      <ButtonComment slug={slug} />
      <ButtonCopy slug={slug} />
    </CardFooter>
  );
}
