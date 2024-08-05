import SinglePost from '@/components/SinglePost';
import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';

export default function SinglePostSection({ post, comments }: { post: Post; comments: Comment[] }) {
  return <SinglePost post={post} comments={comments} />;
}
