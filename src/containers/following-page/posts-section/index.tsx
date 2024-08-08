import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';
import { default as PostsContainer } from '@/containers/posts';
import { Profile } from '@/types/Profile';

export default function FollowingUserPostsSection({ currentUser }: { currentUser: Profile }) {
  return (
    <PostsContainer>
      <Posts
        fetchUrl={`${process.env.BACKEND_URL}/api/articles/feed`}
        fn={getPosts}
        currentUser={currentUser}
      />
    </PostsContainer>
  );
}
