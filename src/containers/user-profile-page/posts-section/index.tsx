import { default as PostsContainer } from '@/containers/posts';
import Posts from '@/components/Posts';
import { Profile } from '@/types/Profile';

export default function RecentPost({
  username,
  currentUser
}: {
  username: string;
  currentUser: Profile | null;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Recent posts</h3>
      <PostsContainer className="w-full sm:w-full">
        <Posts
          fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
          options={{ author: username }}
          currentUser={currentUser}
        />
      </PostsContainer>
    </div>
  );
}
