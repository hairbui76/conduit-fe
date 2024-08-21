import { CardContent } from '@/components/Card';
import { Post, PostCardType } from '@/types/Post';
import PostTags from './PostTags';
import PostBody from './PostBody';
import PostOverview from './PostOverview';

export default function PostCardContent({ post, type }: { post: Post; type: PostCardType }) {
  const { title, description, body, tagList: tags, slug } = post;

  return (
    <CardContent>
      <PostOverview type={type} slug={slug}>
        {title.length > 0 && (
          <p className="mt-4 font-bold text-2xl break-words leading-tight">{title}</p>
        )}
        {description?.length > 0 && <p className="text-sm break-words leading">{description}</p>}
      </PostOverview>
      <PostTags tags={tags} />
      <PostBody body={body} type={type} slug={slug} />
    </CardContent>
  );
}
