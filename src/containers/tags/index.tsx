import { getTags } from '@/actions/tag';
import Tags from '@/components/Tags';

export default async function TagsSection() {
  const tags = await getTags();

  return (
    <section>
      <Tags tags={tags} />
    </section>
  );
}
