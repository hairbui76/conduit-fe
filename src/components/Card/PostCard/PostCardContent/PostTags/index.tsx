import Tag from '@/components/Tag';
import { uniqArray } from '@/lib/utils';

export default function PostTags({ tags }: { tags: string[] }) {
  const uniqTags = uniqArray(tags);

  return uniqTags.length > 0 ? (
    <div className="flex gap-2 flex-wrap">
      {uniqTags.map(tag => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  ) : null;
}
