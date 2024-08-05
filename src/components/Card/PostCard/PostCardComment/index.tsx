import { Comment } from '@/types/Comment';
import PostCardHeaderAvatar from '../PostCardAvatar';
import PostCardHeader from '../PostCardHeader';

export default function PostCardComment({ comments }: { comments: Comment[] }) {
  return (
    <div className="border-t mt-2">
      {comments.map(comment => (
        <div
          key={comment.id}
          className="grid gap-3 p-4 gap-y-2"
          style={{ gridTemplateColumns: 'max-content 1fr' }}
        >
          <PostCardHeaderAvatar author={comment.author} />
          <PostCardHeader author={comment.author} createdAt={comment.createdAt} />
          <p className="col-start-2">{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
