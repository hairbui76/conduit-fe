'use client';

import { useOptimistic, useState } from 'react';

import { Button } from '@/components/Button';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { suffixS } from '@/lib/utils';
import { likePost, unlikePost } from '@/actions/post';
import toast from 'react-hot-toast';
import { Post } from '@/types/Post';
import { Profile } from '@/types/Profile';
import { useSocket } from '@/hooks/useSocket';

export default function ButtonLike({
  numLike,
  liked,
  post,
  currentUser
}: {
  numLike: number;
  liked: boolean;
  post: Post;
  currentUser: Profile | null;
}) {
  const { slug, title, author } = post;
  const [hover, setHover] = useState(false);
  const { socket, status } = useSocket();
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
          } else {
            if (status !== 'connected') return;
            socket?.emit('like', {
              from: currentUser?.username || '',
              to: author.username,
              postSlug: slug,
              postTitle: title
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
