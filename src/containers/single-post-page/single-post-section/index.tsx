import SinglePost from '@/components/SinglePost';
import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';

export default function SinglePostSection({ post, comments }: { post: Post; comments: Comment[] }) {
  return (
    <section className="flex-grow flex flex-col items-center gap-4 px-8 md:pt-12 pt-16 pb-4  min-h-screen">
      <SinglePost post={post} comments={comments} />
    </section>
  );
}
