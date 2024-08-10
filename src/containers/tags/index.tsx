import { getTags } from '@/actions/tag';
import Tags from '@/components/Tags';

export default async function TagsSection({ canHidden = true }: { canHidden?: boolean }) {
  const tags = await getTags();

  return (
    <section>
      <Tags tags={tags} canHidden={canHidden} />
    </section>
  );
}
