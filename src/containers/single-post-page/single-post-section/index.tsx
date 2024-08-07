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

  return (
    <section className="flex flex-col items-center gap-4 px-4 sm:px-8 sm:w-[600px] md:w-[700px] h-fit">
      <PostCard post={post} type="detail" comments={comments} currentUser={currentUser} />
    </section>
  );
}
