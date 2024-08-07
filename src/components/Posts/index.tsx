import ButtonRefresh from '../Button/RefreshButton';

import PostCard from '../Card/PostCard';
import LoadMore from '../LoadMore';
import { Post } from '@/types/Post';

export default async function Posts({
  fetchUrl,
  fn,
  options
}: {
  fetchUrl: string;
  fn: (
    url: string,
    options: {
      page?: number;
      liked?: string;
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
    tag?: string;
  };
}) {
  const postsData = await fn(fetchUrl, { page: 1, ...options });

  return (
    <>
      {/* <ButtonRefresh /> */}
      <>
        {postsData.posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}

        {postsData.nextPage ? (
          <LoadMore fetchUrl={fetchUrl} fn={fn} options={options} />
        ) : (
          <p>You have read all posts :)</p>
        )}
      </>
    </>
  );
}
