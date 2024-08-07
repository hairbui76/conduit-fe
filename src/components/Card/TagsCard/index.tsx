'use client';

import { useState } from 'react';

import Tag from '@/components/Tag';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/Carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { chunk } from 'lodash';
import { Input } from '@/components/common/Input';
import { Search } from 'lucide-react';

export default function TagsCard({ tags, className }: { tags: string[]; className: string }) {
  const [searchValue, setSearchValue] = useState('');

  let filteredTags = tags.filter(tag => tag.startsWith(searchValue));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="h-8 rounded-sm pl-8"
            placeholder="Search tag"
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <Carousel>
          <CarouselContent>
            {chunk(filteredTags, 20).map((each, index) => (
              <CarouselItem key={`tags-${index}`} className="flex gap-2 flex-wrap">
                {each.map(tag => (tag.length > 0 ? <Tag key={tag} tag={tag} /> : null))}
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
