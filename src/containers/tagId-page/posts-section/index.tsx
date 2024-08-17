import { cookies } from 'next/headers';

import { getCurrentUser } from '@/data/user';
import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';

export default async function TaggedPostsSection({ tag }: { tag: string }) {
  const currentUser = await getCurrentUser(cookies().get('AUTH_TOKEN')?.value);

  return (
    <PostsContainer>
      <Posts
        fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
        options={{ tag: tag }}
        currentUser={currentUser}
      />
    </PostsContainer>
  );
}
