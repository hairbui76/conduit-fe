import Posts from '@/components/Posts';
import { Profile } from '@/types/Profile';
import { default as PostsContainer } from '@/containers/posts';

export default function LikedPostsSection({ currentUser }: { currentUser: Profile }) {
  return (
    <PostsContainer>
      <Posts
        fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
        options={{ liked: currentUser.username }}
        currentUser={currentUser}
      />
    </PostsContainer>
  );
}
