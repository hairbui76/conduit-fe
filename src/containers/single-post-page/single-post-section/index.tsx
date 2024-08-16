import { getCurrentUser } from '@/actions/user';
import PostCard from '@/components/Card/PostCard';
import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';

export default async function SinglePostSection({ post }: { post: Post }) {
  const currentUser = await getCurrentUser();

  return (
    <section className="flex flex-col items-center gap-4 px-4 sm:px-8 sm:w-[600px] md:w-[670px] lg:w-[700px] h-fit">
      <PostCard post={post} type="detail" currentUser={currentUser} />
    </section>
  );
}
