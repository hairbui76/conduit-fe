import ButtonLike from '@/components/Button/ButtonLike';
import { Button } from '@/components/common/Button';
import { CardFooter } from '@/components/common/Card';
import { IconLink } from '@tabler/icons-react';

export default function PostCardFooter({ numLike }: { numLike: number }) {
  return (
    <CardFooter className="py-0">
      <ButtonLike numLike={numLike} />
      <Button variant="ghost" className="flex-grow py-0">
        <IconLink className="mr-2" />
        Copy link
      </Button>
    </CardFooter>
  );
}
