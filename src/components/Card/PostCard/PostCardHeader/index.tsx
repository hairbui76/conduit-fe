import Link from 'next/link';

import { CardHeader } from '@/components/common/Card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../HoverCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import { IconPlus } from '@tabler/icons-react';

export default function PostCardHeader() {
  return (
    <CardHeader className="flex flex-col p-0">
      <HoverCard openDelay={500}>
        <HoverCardTrigger asChild>
          <Link
            href="/nguyenducloc"
            className="font-semibold leading-tight hover:underline hover:underline-offset-1"
          >
            Nguyễn Đức Lộc
          </Link>
        </HoverCardTrigger>
        <HoverCardContent align="start" side="right">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src="https://assets.leetcode.com/users/avatars/avatar_1698835075.png" />
              <AvatarFallback>LN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm break-all">Nguyễn Đức Lộc</p>
              <p className="text-xs break-all">nguyenducloc404@gmail.com</p>
            </div>
          </div>
          <p className="text-sm my-4 italic">&quot;I like coding&quot;</p>
          <Button className="w-full" size="sm">
            <IconPlus className="w-4 h-4 mr-2" />
            Follow
          </Button>
        </HoverCardContent>
      </HoverCard>
      <time className="text-xs text-muted-foreground !m-0">August 3, 2024 at 15:28</time>
    </CardHeader>
  );
}
