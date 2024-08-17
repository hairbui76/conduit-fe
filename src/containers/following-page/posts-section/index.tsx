import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';
import { Profile } from '@/types/Profile';

export default function FollowingUserPostsSection({ currentUser }: { currentUser: Profile }) {
  return (
    <PostsContainer>
      <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles/feed`} currentUser={currentUser} />
    </PostsContainer>
  );
}
