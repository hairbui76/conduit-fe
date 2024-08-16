import { Fragment } from 'react';

import PostCardHeaderAvatar from '../../PostCardAvatar';
import PostCardHeader from '../../PostCardHeader';
import CommentAction from '../CommentAction';
import { Comment } from '@/types/Comment';
import { Profile } from '@/types/Profile';
import { cn } from '@/lib/utils';

export default function UserComment({
  comment,
  currentUser,
  slug,
  className
}: {
  comment: Comment | null;
  currentUser: Profile | null;
  slug: string;
  className?: string;
}) {
  if (!comment) return null;

  const { id, author, createdAt, body } = comment;
  const isMe = currentUser !== null && author.username === currentUser.username;

  return (
    <div className={cn('flex gap-3 px-4 mb-5', className)}>
      <PostCardHeaderAvatar author={author} />
      <div className="border px-4 py-3 rounded-lg">
        <PostCardHeader author={author} createdAt={createdAt} isMe={isMe} />
        <div className="mt-2">
          {body.split('\\n').map((paragraph, index) => (
            <Fragment key={`comment-${id}-paragraph-${index}`}>
              <p className="col-start-2 break-words">{paragraph}</p>
            </Fragment>
          ))}
        </div>
      </div>
      <CommentAction isMe={isMe} slug={slug} commentId={id} />
    </div>
  );
}
