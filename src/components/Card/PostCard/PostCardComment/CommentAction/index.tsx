import ButtonDeleteComment from './ButtonDeleteComment';
import { Button } from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/DropdownMenu';
import { Post } from '@/types/Post';
import { IconDots } from '@tabler/icons-react';

export default function CommentAction({
  isMe,
  slug,
  commentId,
  setPosts
}: {
  isMe: boolean;
  slug: string;
  commentId: string;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  if (!isMe) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="self-center">
        <Button
          variant="ghost"
          className="rounded-full p-1 w-6 h-6"
          size="sm"
          aria-label="Action with this comment"
        >
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 p-2" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <ButtonDeleteComment slug={slug} commentId={commentId} setPosts={setPosts} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
