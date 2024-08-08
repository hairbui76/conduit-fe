'use client';

import { useOptimistic, useState } from 'react';

import { Button } from '@/components/common/Button';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { suffixS } from '@/lib/utils';
import { likePost, unlikePost } from '@/actions/post';
import toast from 'react-hot-toast';

export default function ButtonLike({
  numLike,
  liked,
  slug
}: {
  numLike: number;
  liked: boolean;
  slug: string;
}) {
  const [hover, setHover] = useState(false);
  const [optimisticLikeState, optimisticLikePost] = useOptimistic(
    { numLike, liked },
    (curLikeState, action: 'like' | 'unlike') => {
      return {
        numLike: action === 'like' ? curLikeState.numLike + 1 : curLikeState.numLike - 1,
        liked: !curLikeState.liked
      };
    }
  );

  return (
    <Button
      variant="ghost"
      className="flex-grow py-0"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      onClick={async () => {
        try {
          const { liked } = optimisticLikeState;
          if (liked) {
            optimisticLikePost('unlike');
            await unlikePost(slug);
          } else {
            optimisticLikePost('like');
            await likePost(slug);
          }
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : 'Something went wrong. Try again later',
            {
              position: 'top-center'
            }
          );
        }
      }}
    >
      {hover || optimisticLikeState.liked ? (
        <IconHeartFilled className="mr-2 fill-primary" />
      ) : (
        <IconHeart className="mr-2" />
      )}
      {optimisticLikeState.numLike > 0
        ? `${optimisticLikeState.numLike} ${suffixS('Like', optimisticLikeState.numLike)}`
        : 'Like'}
    </Button>
  );
}
