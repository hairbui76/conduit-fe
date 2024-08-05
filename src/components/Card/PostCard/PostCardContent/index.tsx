import { Badge } from '@/components/Badge';
import { CardContent } from '@/components/common/Card';
import Link from 'next/link';

export default function PostCardContent({
  content,
  tags,
  slug
}: {
  content: string;
  tags: string[];
  slug: string;
}) {
  return (
    <CardContent>
      <Link href={`/post/${slug}`}>
        <p className="mt-4 font-bold text-2xl break-words leading-tight">{content}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
      </Link>
    </CardContent>
  );
}
