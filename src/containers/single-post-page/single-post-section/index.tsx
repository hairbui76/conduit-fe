import { getCurrentUser } from '@/actions/user';
import PostCard from '@/components/Card/PostCard';
import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';

export default async function SinglePostSection({
  post,
  comments
}: {
  post: Post;
  comments: Comment[];
}) {
  const currentUser = await getCurrentUser();

  return <PostCard post={post} type="detail" comments={comments} currentUser={currentUser} />;
}
