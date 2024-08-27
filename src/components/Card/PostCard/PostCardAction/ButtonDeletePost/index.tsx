'use client';

import { usePathname } from 'next/navigation';

import { useRouter } from 'next-nprogress-bar';
import { deletePost } from '@/actions/post';
import { Button } from '@/components/Button';
import { Post } from '@/types/Post';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonDeletePost({
  slug,
  setPosts
}: {
  slug: string;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function handleDeletePost() {
    toast.promise(
      deletePost(slug),
      {
        loading: 'Deleting post',
        success: () => {
          if (setPosts !== undefined) setPosts(posts => posts.filter(post => post.slug !== slug));
          if (pathname.startsWith('/post')) {
            router.push('/');
          }
          return 'Post was deleted successfully';
        },
        error: err => err.message
      },
      {
        loading: {
          duration: Infinity
        },
        success: {
          duration: 5000
        },
        error: {
          duration: 5000
        },
        style: {
          marginRight: '16px'
        },
        position: 'top-right'
      }
    );
  }

  return (
    <Button
      type="submit"
      className="px-2 text-red-500 w-full hover:text-red-500"
      variant="ghost"
      onClick={handleDeletePost}
    >
      Delete
      <IconTrash className="w-5 h-5 ml-auto" />
    </Button>
  );
}
