'use client';

import { deleteComment } from '@/actions/comment';
import { Button } from '@/components/Button';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonDeleteComment({
  slug,
  commentId
}: {
  slug: string;
  commentId: string;
}) {
  function handleDeleteComment() {
    toast.promise(
      deleteComment({ slug: slug, commentId: commentId }),
      {
        loading: 'Deleting comment',
        success: 'Comment was deleted successfully',
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
      className="p-2 text-red-500 w-full hover:text-red-500"
      variant="ghost"
      onClick={handleDeleteComment}
    >
      Delete
      <IconTrash className="w-5 h-5 ml-auto" />
    </Button>
  );
}
