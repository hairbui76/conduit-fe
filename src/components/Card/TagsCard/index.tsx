import { Badge } from '@/components/Badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { chunk } from 'lodash';

export default function TagsCard({ tags, className }: { tags: string[]; className: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel>
          <CarouselContent>
            {chunk(tags, 20).map((each, index) => (
              <CarouselItem key={`tags-${index}`} className="flex gap-2 flex-wrap">
                {each.map(tag =>
                  tag.length > 0 ? (
                    <Badge variant="outline" key={tag}>
                      #{tag}
                    </Badge>
                  ) : null
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="relative mt-8">
            <CarouselPrevious className="left-1/2 -translate-x-[120%]" />
            <CarouselNext className="right-1/2 translate-x-[120%]" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
}
