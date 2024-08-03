import React from 'react';
import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/common/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/common/Button';
import { Avatar, AvatarImage } from '@/components/common/Avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../HoverCard';
import { IconBookmark, IconBubble, IconDots, IconLink, IconPlus } from '@tabler/icons-react';
import ButtonLike from '@/components/Button/ButtonLike';
import { suffixS } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/DropdownMenu';

export default function PostCard() {
  const numLike = 50;
  const numComment = 100;

  return (
    <Card className="w-[600px] py-6 px-8 h-fit">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://assets.leetcode.com/users/avatars/avatar_1698835075.png" />
          <AvatarFallback>LN</AvatarFallback>
        </Avatar>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-1 w-8 h-8 ml-auto">
              <IconDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-0" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem className="p-2">
                <Button variant="ghost" size="sm" className="p-4 flex-grow">
                  Save
                  <IconBookmark className="w-5 h-5 ml-auto" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent>
        <p className="mt-4 font-bold text-2xl">His mother had always taught him</p>
        <div className="flex gap-2 mt-1">
          <Badge variant="outline">#history</Badge>
          <Badge variant="outline">#american</Badge>
          <Badge variant="outline">#crime</Badge>
        </div>
      </CardContent>
      <CardFooter className="py-0">
        <ButtonLike numLike={numLike} />
        <Button variant="ghost" className="flex-grow py-0">
          <IconBubble className="mr-2" />
          {numComment} {suffixS('Comment', numComment)}
        </Button>
        <Button variant="ghost" className="flex-grow py-0">
          <IconLink className="mr-2" />
          Copy link
        </Button>
      </CardFooter>
    </Card>
  );
}
