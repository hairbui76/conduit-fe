import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';
import { Profile } from '@/types/Profile';

export default function PostsSection({ currentUser }: { currentUser: Profile }) {
  return <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles/feed`} fn={getPosts} />;
}
