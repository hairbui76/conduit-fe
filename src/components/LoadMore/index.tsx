'use client';

import { getPosts } from '@/actions/post';
import { cn } from '@/lib/utils';
import { Post } from '@/types/Post';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from '../common/Spinner';
import PostCard from '../Card/PostCard';

let page = 2;
export default function LoadMore({ fetchUrl }: { fetchUrl: string }) {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<Post[]>([]);
  // const [page, setPage] = useState<number | null>(2);

  if (inView) {
    if (page === null) return;
    getPosts(fetchUrl, { page: page ?? 0 }).then(res => {
      setPosts([...posts, ...res.posts]);
      // setPage(res.nextPage);
    });
    // .catch(() => setPage(null));
  }

  // useEffect(() => {
  //   if (inView) {
  //     if (page === null) return;
  //     getPosts(fetchUrl, { page: page ?? 0 })
  //       .then(res => {
  //         setPosts([...posts, ...res.posts]);
  //         setPage(res.nextPage);
  //       })
  //       .catch(() => setPage(null));
  //   }
  // }, [inView, posts, fetchUrl, page]);

  return (
    <>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
      <div ref={ref} className={(cn('pb-2'), page === null ? 'hidden' : '')}>
        <Spinner className="my-2 w-7 h-7" />
      </div>
      {page === null && <p>You have read all posts :)</p>}
    </>
  );
}
