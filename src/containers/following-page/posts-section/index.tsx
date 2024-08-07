import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';
import { Profile } from '@/types/Profile';
import { default as PostContainer } from '@/containers/posts';

export default function PostsSection({ currentUser }: { currentUser: Profile }) {
  return (
    <PostContainer>
      <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles/feed`} fn={getPosts} />
    </PostContainer>
  );
}
