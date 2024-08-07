import PostsSection from '@/containers/tagId-page/posts-section';
import TagsSection from '@/containers/tags';

export function generateMetadata({ params }: { params: { tagId: string } }) {
  const { tagId } = params;

  return {
    title: `#${tagId}`,
    description: `Welcome to all the posts with tag ${tagId}! Explore a collection of posts dedicated to ${tagId}`
  };
}

export default function Page({ params }: { params: { tagId: string } }) {
  return (
    <>
      <PostsSection tag={params.tagId} />
      <TagsSection />
    </>
  );
}
