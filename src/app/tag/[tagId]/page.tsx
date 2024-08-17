import { getTags } from '@/data/tag';
import TaggedPostsSection from '@/containers/tagId-page/posts-section';
import TagsSection from '@/containers/tags';

export function generateMetadata({ params }: { params: { tagId: string } }) {
  const { tagId } = params;

  return {
    title: `#${tagId}`,
    description: `Welcome to all the posts with tag ${tagId}! Explore a collection of posts dedicated to ${tagId}`
  };
}

export async function generateStaticParams() {
  const tags = await getTags();

  return (
    tags
      ?.filter(tag => tag.length > 0)
      .map(tag => ({
        tagId: tag
      })) || []
  );
}

export default function Page({ params }: { params: { tagId: string } }) {
  return (
    <>
      <TaggedPostsSection tag={params.tagId} />
      <TagsSection />
    </>
  );
}
