import { getTags } from '@/actions/tag';
import Tags from '@/components/Tags';

export default async function TagsSection() {
  const tags = await getTags();

  return (
    <section className="lg:pr-6">
      <Tags tags={tags} />
    </section>
  );
}
