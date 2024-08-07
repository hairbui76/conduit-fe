import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';

export default function PostsSection({ tag }: { tag: string }) {
  return (
    <PostsContainer>
      <Posts
        fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
        fn={getPosts}
        options={{ tag: tag }}
      />
    </PostsContainer>
  );
}
