import { Badge } from '@/components/Badge';
import { CardContent } from '@/components/common/Card';

export default function PostCardContent() {
  return (
    <CardContent>
      <p className="mt-4 font-bold text-2xl break-words">
        His mother had always taught him to fdshaf tothsd sat hestlaste htiasekt eashtkesatkls
      </p>
      <div className="flex gap-2 mt-1 flex-wrap">
        <Badge variant="outline">#history</Badge>
        <Badge variant="outline">#american</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
        <Badge variant="outline">#crime</Badge>
      </div>
    </CardContent>
  );
}
