import { Post } from '@/types/Post';
import PostCard from '../Card/PostCard';
import { Comment } from '@/types/Comment';

export default function SinglePost({ post, comments }: { post: Post; comments: Comment[] }) {
  return <PostCard post={post} type="detail" comments={comments} />;
}
