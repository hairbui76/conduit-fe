import { getPosts } from '@/actions/post';
import Posts from '@/components/Posts';

export default function PostsSection() {
  return <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles`} fn={getPosts} />;
}
