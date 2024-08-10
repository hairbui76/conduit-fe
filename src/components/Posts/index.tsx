import { Profile } from '@/types/Profile';

import PostCard from '../Card/PostCard';
import LoadMore from '../LoadMore';
import { Post } from '@/types/Post';

export default async function Posts({
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
    tag?: string;
    author?: string;
  };
  currentUser: Profile | null;
}) {
  const postsData = await fn(fetchUrl, { page: 1, ...options });

  return (
    <>
      <>
        {postsData.posts.map(post => (
          <PostCard key={post.slug} post={post} currentUser={currentUser} />
        ))}

        {postsData.nextPage ? (
          <LoadMore fetchUrl={fetchUrl} fn={fn} options={options} currentUser={currentUser} />
        ) : (
          <p>You have read all posts :)</p>
        )}
      </>
    </>
  );
}
