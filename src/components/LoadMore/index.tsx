'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { Post } from '@/types/Post';
import { useInView } from 'react-intersection-observer';
import Spinner from '../common/Spinner';
import PostCard from '../Card/PostCard';
import { Profile } from '@/types/Profile';

export default function LoadMore({
  fetchUrl,
  fn,
  options,
  currentUser
}: {
  fetchUrl: string;
  fn: (
    url: string,
    options: {
      page?: number;
      liked?: string;
      author?: string;
    }
  ) => Promise<{
    posts: Post[];
    postsCount: number;
    page: number;
    nextPage: number | null;
  }>;
  options?: {
    page?: number;
    liked?: string;
    author?: string;
  };
  currentUser: Profile | null;
}) {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number | null>(2);

  useEffect(() => {
    if (inView) {
      if (page === null) return;
      fn(fetchUrl, { page: page ?? 0, ...options })
        .then(res => {
          setPosts([...posts, ...res.posts]);
          setPage(res.nextPage);
        })
        .catch(() => setPage(null));
    }
  }, [inView, posts, fetchUrl, page, fn, options]);

  return (
    <>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} currentUser={currentUser} />
      ))}
      <div ref={ref} className={(cn('pb-2'), page === null ? 'hidden' : '')}>
        <Spinner className="my-2 w-7 h-7" />
      </div>
      {page === null && <p>You have read all posts :)</p>}
    </>
  );
}
