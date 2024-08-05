import Link from 'next/link';

import { format } from 'date-fns';
import { CardHeader } from '@/components/common/Card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../HoverCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { IconPlus } from '@tabler/icons-react';
import { Profile } from '@/types/Profile';

export default function PostCardHeader({
  author,
  createdAt
}: {
  author: Profile;
  createdAt: string;
}) {
  return (
    <CardHeader className="flex flex-col p-0">
      <HoverCard openDelay={500}>
        <HoverCardTrigger asChild>
          <Link
            href={`/${author.username}`}
            className="font-semibold leading-tight hover:underline hover:underline-offset-1"
          >
            {author.username}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={author.image} />
              <AvatarFallback>{author.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm break-all">{author.username}</p>
            </div>
          </div>
          <p className="text-sm my-4 italic">&quot;{author.bio}&quot;</p>
          <Button className="w-full" size="sm">
            <IconPlus className="w-4 h-4 mr-2" />
            Follow
          </Button>
        </HoverCardContent>
      </HoverCard>
      <time className="text-xs text-muted-foreground !m-0">
        {format(new Date(createdAt), "PPP 'at' H:m")}
      </time>
    </CardHeader>
  );
}
