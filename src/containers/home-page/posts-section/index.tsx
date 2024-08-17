import { cookies } from 'next/headers';

import { getCurrentUser } from '@/data/user';

import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';
import CreatePostSection from '../create-post-section';

export default async function HomePostsSection() {
  const currentUser = await getCurrentUser(cookies().get('AUTH_TOKEN')?.value);

  return (
    <PostsContainer>
      <CreatePostSection />
      <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles`} currentUser={currentUser} />
    </PostsContainer>
  );
}
