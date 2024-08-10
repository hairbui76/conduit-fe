import Link from 'next/link';

import { format } from 'date-fns';
import { CardHeader } from '@/components/common/Card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../HoverCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Profile } from '@/types/Profile';
import ButtonFollow from '@/components/Button/ButtonFollow';
import ButtonEditProfile from '@/components/Button/ButtonEditProfile';
import Bio from '@/components/Bio';

export default function PostCardHeader({
  author,
  createdAt,
  isMe
}: {
  author: Profile;
  createdAt: string;
  isMe: boolean;
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
              <AvatarImage src={image} alt={`${username} avatar`} />
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm break-all">{username}</p>
            </div>
          </div>
          {bio && bio.length > 0 && <Bio text={bio} className="mt-4" />}
          {isMe ? (
            <ButtonEditProfile className="w-full mt-4" iconClassname="w-4 h-4" />
          ) : (
            <ButtonFollow username={username} following={following} className="w-full mt-4" />
          )}
        </HoverCardContent>
      </HoverCard>
      <time className="text-xs text-muted-foreground !m-0">
        {format(new Date(createdAt), "PPP 'at' H:mm")}
      </time>
    </CardHeader>
  );
}
