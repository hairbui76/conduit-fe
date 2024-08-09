import ButtonCopy from '@/components/Button/ButtonCopy';
import ButtonDeletePost from '@/components/Button/ButtonDeletePost';
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-1 w-8 h-8 ml-auto"
          aria-label="Action with this post"
        >
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <ButtonCopy
              baseUrl="/post"
              id={slug}
              variant="ghost"
              className="px-2 flex-grow"
              iconClassName="w-5 h-5 ml-auto"
            />
          </DropdownMenuItem>
          {isMe && (
            <DropdownMenuItem className="p-0">
              <ButtonDeletePost slug={slug} />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
