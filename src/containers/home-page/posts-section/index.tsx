import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';
import CreatePostSection from '../create-post-section';

export default function PostsSection() {
  return (
    <PostsContainer>
      <CreatePostSection />
      <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles`} fn={getPosts} />
    </PostsContainer>
  );
}
