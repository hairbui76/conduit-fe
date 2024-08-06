import { Post, PostCardType } from '@/types/Post';
import PostCardHeaderAvatar from './PostCardAvatar';
import PostCardHeader from './PostCardHeader';
import PostCardContent from './PostCardContent';
import PostCardFooter from './PostCardFooter';
import PostCardAction from './PostCardAction';
import { Card } from '@/components/common/Card';
import { Comment } from '@/types/Comment';
import PostCardComment from './PostCardComment';
import { Profile } from '@/types/Profile';

export default function PostCard({
  post,
  type = 'summary',
  comments,
  currentUser = null
}: {
  post: Post;
  type?: PostCardType;
  comments?: Comment[];
  currentUser?: Profile | null;
}) {
  const { author, title, description, body, favoritesCount, favorited, tagList, createdAt, slug } =
    post;

  return (
    <Card className="sm:w-[570px] md:w-[640px] pt-6 pb-4 px-8 h-fit">
      <div className="flex items-center gap-3">
        <PostCardHeaderAvatar author={author} />
        <PostCardHeader author={author} createdAt={createdAt} />
        <PostCardAction />
      </div>
      <PostCardContent
        title={title}
        description={description}
        tags={tagList}
        slug={slug}
        type={type}
        body={body}
      />
      <PostCardFooter
        numLike={favoritesCount}
        numComment={comments?.length}
        liked={favorited}
        slug={slug}
        type={type}
      />
      {type === 'detail' && comments && (
        <PostCardComment comments={comments} currentUser={currentUser} slug={slug} />
      )}
    </Card>
  );
}
