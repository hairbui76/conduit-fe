import { Badge } from '@/components/Badge';
import { CardContent } from '@/components/common/Card';

export default function PostCardContent({ content, tags }: { content: string; tags: string[] }) {
  return (
    <CardContent>
      <p className="mt-4 font-bold text-2xl break-words leading-tight">
        His mother had always taught him to fdshaf tothsd sat hestlaste htiasekt eashtkesatkls
      </p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline">
            #{tag}
          </Badge>
        ))}
      </div>
    </CardContent>
  );
}
