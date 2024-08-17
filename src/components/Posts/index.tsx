import { cookies } from 'next/headers';

import { Profile } from '@/types/Profile';
import PostCard from '../Card/PostCard';
import LoadMore from './LoadMore';
import { getPosts } from '@/data/post';

export default async function Posts({
  fetchUrl,
  options,
  currentUser
}: {
  fetchUrl: string;
  options?: {
    page?: number;
    liked?: string;
    tag?: string;
    author?: string;
  };
  currentUser: Profile | null;
}) {
  const token = cookies().get('AUTH_TOKEN')?.value;
  const postsData = await getPosts(fetchUrl, { page: 1, ...options }, token);

  if (postsData.postsCount === 0) {
    return <p>No post to read :)</p>;
  }

  return (
    <>
      {postsData.posts.map(post => (
        <PostCard key={post.slug} post={post} currentUser={currentUser} />
      ))}

      {postsData.nextPage ? (
        <LoadMore
          fetchUrl={fetchUrl}
          options={options}
          currentUser={currentUser}
          token={token}
          backendUrl={process.env.BACKEND_URL!}
        />
      ) : (
        <p>You have read all posts :)</p>
      )}
    </>
  );
}
