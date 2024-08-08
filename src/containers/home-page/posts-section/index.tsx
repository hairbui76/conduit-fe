import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';
import CreatePostSection from '../create-post-section';
import { getCurrentUser } from '@/actions/user';

export default async function HomePostsSection() {
  const currentUser = await getCurrentUser();

  return (
    <PostsContainer>
      <CreatePostSection />
      <Posts
        fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
        fn={getPosts}
        currentUser={currentUser}
      />
    </PostsContainer>
  );
}
