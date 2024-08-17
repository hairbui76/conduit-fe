import { getTags } from '@/data/tag';
import TagsCard from './components/TagsCard';
import MobileTags from './components/MobileTags';

export default async function TagsSection() {
  const tags = await getTags();
  if (!tags) return null;

  return (
    <section>
      <TagsCard tags={tags} className="max-w-80 hidden lg:block h-fit sticky top-12 p-2" />
      <MobileTags>
        <TagsCard tags={tags} className="max-w-80 h-fit border-none shadow-none" />
      </MobileTags>
    </section>
  );
}
