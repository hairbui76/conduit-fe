import ButtonDeletePost from '@/components/Button/ButtonDeletePost';
import ButtonEditPost from '@/components/Button/ButtonEditPost';
import { Button } from '@/components/common/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/DropdownMenu';
import { IconDots } from '@tabler/icons-react';

export default function PostCardAction({ isMe, slug }: { isMe: boolean; slug: string }) {
  if (!isMe) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-1 w-8 h-8 ml-auto">
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <ButtonEditPost />
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <ButtonDeletePost slug={slug} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
