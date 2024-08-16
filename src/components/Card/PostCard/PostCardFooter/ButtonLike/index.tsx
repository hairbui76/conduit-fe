'use client';

import { useOptimistic, useState } from 'react';

import { Button } from '@/components/Button';
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
        const { liked } = optimisticLikeState;
        if (liked) {
          optimisticLikePost('unlike');
          const response = await unlikePost(slug);
          if (response?.error) {
            toast.error(response.error, {
              position: 'top-center'
            });
          }
        } else {
          optimisticLikePost('like');
          const response = await likePost(slug);
          if (response?.error) {
            toast.error(response.error, {
              position: 'top-center'
            });
          }
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
