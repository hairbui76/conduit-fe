import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';
import { default as PostContainer } from '@/containers/posts';

export default function PostsSection() {
  return (
    <PostContainer>
      <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles`} fn={getPosts} />
    </PostContainer>
  );
}
