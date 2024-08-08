import ButtonDeleteComment from '@/components/Button/ButtonDeleteComment';
import { Button } from '@/components/common/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/DropdownMenu';
import { IconDots } from '@tabler/icons-react';

export default function CommentAction({
  isMe,
  slug,
  commentId
}: {
  isMe: boolean;
  slug: string;
  commentId: string;
}) {
  if (!isMe) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="self-center">
        <Button variant="ghost" className="rounded-full p-1 w-6 h-6" size="sm">
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 p-2" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <ButtonDeleteComment slug={slug} commentId={commentId} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
