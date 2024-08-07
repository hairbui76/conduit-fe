import Link from 'next/link';

import { format } from 'date-fns';
import { CardHeader } from '@/components/common/Card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../HoverCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Profile } from '@/types/Profile';
import ButtonFollow from '@/components/Button/ButtonFollow';

export default function PostCardHeader({
  author,
  createdAt
}: {
  author: Profile;
  createdAt: string;
}) {
  const { username, image, bio, following } = author;

  return (
    <CardHeader className="flex flex-col p-0">
      <HoverCard openDelay={500}>
        <HoverCardTrigger asChild>
          <Link
            href={`/${username}`}
            className="font-semibold leading-tight hover:underline hover:underline-offset-1"
          >
            {username}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm break-all">{username}</p>
            </div>
          </div>
          {bio && bio.length > 0 && <p className="text-sm mt-4 italic">&quot;{bio}&quot;</p>}
          <ButtonFollow username={username} following={following} />
        </HoverCardContent>
      </HoverCard>
      <time className="text-xs text-muted-foreground !m-0">
        {format(new Date(createdAt), "PPP 'at' H:m")}
      </time>
    </CardHeader>
  );
}
