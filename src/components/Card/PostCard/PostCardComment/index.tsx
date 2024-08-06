'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Comment } from '@/types/Comment';
import PostCardHeaderAvatar from '../PostCardAvatar';
import PostCardHeader from '../PostCardHeader';
import { Button } from '@/components/common/Button';
import { IconChevronsDown } from '@tabler/icons-react';
import { Separator } from '@/components/Separator';
import CommentPost from '../CommentPost';
import { Profile } from '@/types/Profile';

export default function PostCardComment({
  comments,
  currentUser,
  slug
}: {
  comments: Comment[];
  currentUser: Profile | null;
  slug: string;
}) {
  const initialNumComment = 4;
  const authenticated = !!currentUser;
  const [numComment, setNumComment] = useState(initialNumComment);

  return (
    <>
      {(!authenticated || comments.length !== 0) && (
        <Separator className="mt-2 mx-auto" style={{ width: '95%' }} />
      )}
      {authenticated ? (
        <CommentPost currentUser={currentUser} slug={slug} />
      ) : (
        <div className="text-center py-4">
          <p className="pb-2">You need login to comment this post</p>
          <Button>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      )}
      {comments.slice(0, numComment).map(comment => (
        <div key={comment.id} className="flex gap-3 px-4 mb-5">
          <PostCardHeaderAvatar author={comment.author} />
          <div className="border px-4 py-3 rounded-lg">
            <PostCardHeader author={comment.author} createdAt={comment.createdAt} />
            <p className="col-start-2 break-all mt-2">{comment.body}</p>
          </div>
        </div>
      ))}
      {numComment < comments.length && (
        <div className="text-center">
          <Button
            variant="ghost"
            className="py-0"
            onClick={() => setNumComment(numComment => numComment + initialNumComment)}
          >
            View more comments
            <IconChevronsDown className="w-5 h-5 ml-1" />
          </Button>
        </div>
      )}
    </>
  );
}
