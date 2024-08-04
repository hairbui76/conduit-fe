'use client';

import { Fragment, useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getPosts } from '@/api/post';
import Spinner from '../common/Spinner';
import PostCard from '../Card/PostCard';
import { cn } from '@/lib/utils';

export default function Posts({ queryKey, fetchUrl }: { queryKey: string; fetchUrl: string }) {
  const { ref, inView } = useInView();

  const { data, isFetching, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      staleTime: Infinity,
      queryKey: [queryKey],
      queryFn: async ({ pageParam }) => await getPosts(`${fetchUrl}`, { page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: lastPage => lastPage.nextPage
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isFetching && !isFetchingNextPage) {
    return <Spinner className="my-2 w-7 h-7" />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {data?.pages.map(page => (
        <Fragment key={page.page}>
          {page.posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} className={(cn('pb-2'), !isFetchingNextPage && !hasNextPage ? 'hidden' : '')}>
        <Spinner className="my-2 w-7 h-7" />
      </div>
    </>
  );
}
