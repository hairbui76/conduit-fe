'use client';

import Link from 'next/link';

import { useState } from 'react';

import { Button } from '@/components/Button';
import { IconChevronsDown } from '@tabler/icons-react';
import { Separator } from '@/components/Separator';
import CommentPost from './CommentPost';
import { Profile } from '@/types/Profile';
import { Post, PostCardType } from '@/types/Post';
import UserComment from './UserComment';

export default function PostCardComment({
  post,
  currentUser,
  slug,
  type,
  setPosts
}: {
  post: Post;
  currentUser: Profile | null;
  slug: string;
  type: PostCardType;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  const initialNumComment = 4;
  const authenticated = !!currentUser;
  const [numComment, setNumComment] = useState(initialNumComment);

  return type === 'summary' ? (
    post.commentsCount != 0 ? (
      <>
        <Separator className="mt-2 mx-auto" style={{ width: '95%' }} />
        <UserComment
          comment={post.firstComment}
          currentUser={currentUser}
          slug={slug}
          className="mb-0 mt-5"
          setPosts={setPosts}
        />
      </>
    ) : null
  ) : (
    <>
      {(!authenticated || post.commentsCount !== 0) && (
        <Separator className="mt-2 mx-auto" style={{ width: '95%' }} />
      )}
      {authenticated ? (
        <CommentPost currentUser={currentUser} post={post} />
      ) : (
        <div className="text-center py-4">
          <p className="pb-2">You need login to comment this post</p>
          <Button>
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      )}
      {post.comments.slice(0, numComment).map(comment => (
        <UserComment key={comment.id} comment={comment} currentUser={currentUser} slug={slug} />
      ))}
      {numComment < post.commentsCount && (
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
