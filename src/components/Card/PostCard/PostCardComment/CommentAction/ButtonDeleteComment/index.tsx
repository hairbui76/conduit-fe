'use client';

import { deleteComment } from '@/actions/comment';
import { Button } from '@/components/Button';
import { Post } from '@/types/Post';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonDeleteComment({
  slug,
  commentId,
  setPosts
}: {
  slug: string;
  commentId: string;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  function handleDeleteComment() {
    toast.promise(
      deleteComment({ slug: slug, commentId: commentId }),
      {
        loading: 'Deleting comment',
        success: () => {
          if (setPosts !== undefined)
            setPosts(posts =>
              posts.map(post =>
                post.slug === slug
                  ? {
                      ...post,
                      firstComment: post.commentsCount > 1 ? post.comments[1] : null,
                      comments: post.comments.slice(1),
                      commentsCount: post.commentsCount - 1
                    }
                  : post
              )
            );
          return 'Comment was deleted successfully';
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
      className="p-2 text-red-500 w-full hover:text-red-500"
      variant="ghost"
      onClick={handleDeleteComment}
    >
      Delete
      <IconTrash className="w-5 h-5 ml-auto" />
    </Button>
  );
}
