import { cookies } from 'next/headers';

import { getCurrentUser } from '@/data/user';
import PostCard from '@/components/Card/PostCard';
import { Post } from '@/types/Post';

export default async function SinglePostSection({ post }: { post: Post }) {
  const currentUser = await getCurrentUser(cookies().get('AUTH_TOKEN')?.value);

  return (
    <section className="flex flex-col items-center gap-4 px-4 sm:px-8 sm:w-[600px] md:w-[670px] lg:w-[700px] h-fit">
      <PostCard post={post} type="detail" currentUser={currentUser} />
    </section>
  );
}
