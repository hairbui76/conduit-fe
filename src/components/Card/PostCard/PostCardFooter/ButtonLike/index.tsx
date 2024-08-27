'use client';

import { useOptimistic, useState, useTransition } from 'react';

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
  currentUser,
  setPosts
}: {
  numLike: number;
  liked: boolean;
  post: Post;
  currentUser: Profile | null;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  const { slug, title, author } = post;
  const [hover, setHover] = useState(false);
  const { socket, status } = useSocket();
  const [optimisticLikeState, optimisticLikePost] = useOptimistic(
    { numLike, liked },
    (_, newState: { numLike: number; liked: boolean }) => newState
  );
  const [_, startTransition] = useTransition();

  const updatePosts = (slug: string, newState: { numLike: number; liked: boolean }) => {
    if (setPosts === undefined) return;
    setPosts(posts =>
      posts.map(post =>
        post.slug === slug
          ? {
              ...post,
              favorited: newState.liked,
              favoritesCount: newState.numLike
            }
          : post
      )
    );
  };

  return (
    <Button
      variant="ghost"
      className="flex-grow py-0 px-2"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      onClick={async () => {
        const { liked } = optimisticLikeState;
        if (liked) {
          startTransition(async () => {
            const newState = {
              liked: false,
              numLike: optimisticLikeState.numLike - 1
            };
            optimisticLikePost(newState);
            const response = await unlikePost(slug);
            if (response?.error) {
              toast.error(response.error, {
                position: 'top-center'
              });
            } else {
              updatePosts(slug, newState);
            }
          });
        } else {
          startTransition(async () => {
            const newState = {
              liked: true,
              numLike: optimisticLikeState.numLike + 1
            };
            optimisticLikePost(newState);
            const response = await likePost(slug);
            if (response?.error) {
              toast.error(response.error, {
                position: 'top-center'
              });
            } else {
              updatePosts(slug, newState);
              if (status !== 'connected') return;
              socket?.emit('like', {
                from: currentUser?.username || '',
                to: author.username,
                postSlug: slug,
                postTitle: title
              });
            }
          });
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
