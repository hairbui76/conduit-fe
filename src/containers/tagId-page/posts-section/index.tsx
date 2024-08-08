import { getPosts } from '@/actions/post';
import { getCurrentUser } from '@/actions/user';
import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';

export default async function TaggedPostsSection({ tag }: { tag: string }) {
  const currentUser = await getCurrentUser();

  return (
    <PostsContainer>
      <Posts
        fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
        fn={getPosts}
        options={{ tag: tag }}
        currentUser={currentUser}
      />
    </PostsContainer>
  );
}
