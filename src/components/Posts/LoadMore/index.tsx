'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { Post } from '@/types/Post';
import { useInView } from 'react-intersection-observer';
import { Profile } from '@/types/Profile';
import PostCard from '@/components/Card/PostCard';
import Spinner from '@/components/Spinner';
import { getPosts } from '@/data/post';

export default function LoadMore({
  fetchUrl,
  options,
  currentUser,
  token,
  backendUrl
}: {
  fetchUrl: string;
  options?: {
    page?: number;
    liked?: string;
    author?: string;
  };
  currentUser: Profile | null;
  token: string | undefined;
  backendUrl: string;
}) {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number | null>(2);

  useEffect(() => {
    if (inView) {
      if (page === null) return;
      getPosts(fetchUrl, { page: page ?? 0, ...options }, token, backendUrl)
        .then(res => {
          setPosts([...posts, ...res.posts]);
          setPage(res.nextPage);
        })
        .catch(() => setPage(null));
    }
  }, [inView, posts, fetchUrl, page, options, token, backendUrl]);

  return (
    <>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} currentUser={currentUser} />
      ))}
      <div ref={ref} className={(cn('pb-2'), page === null ? 'hidden' : '')}>
        <Spinner className="my-2 w-7 h-7 stroke-primary" />
      </div>
      {page === null && <p>You have read all posts :)</p>}
    </>
  );
}
