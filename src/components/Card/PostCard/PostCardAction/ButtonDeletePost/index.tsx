'use client';

import { deletePost } from '@/actions/post';
import { Button } from '@/components/Button';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonDeletePost({ slug }: { slug: string }) {
  function handleDeletePost() {
    toast.promise(
      deletePost(slug),
      {
        loading: 'Deleting post',
        success: 'Post was deleted successfully',
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
