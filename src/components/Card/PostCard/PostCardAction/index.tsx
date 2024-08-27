'use client';

import React, { useState } from 'react';

import ButtonCopy from '@/components/Button/ButtonCopy';
import { Button } from '@/components/Button';
import ButtonDeletePost from './ButtonDeletePost';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/DropdownMenu';
import { IconDots } from '@tabler/icons-react';
import { Post } from '@/types/Post';
import { Dialog, DialogTrigger } from '@/components/Dialog';
import EditPostDialog from '@/components/Dialog/EditPostDialog';
import ButtonEditPost from './ButtonEditPost';

export default function PostCardAction({
  isMe,
  post,
  setPosts
}: {
  isMe: boolean;
  post: Post;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  const [open, setOpen] = useState(false);

  if (!isMe) return null;

  return (
    <Dialog open={open}>
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
              <ButtonDeletePost slug={post.slug} setPosts={setPosts} />
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <DialogTrigger className="flex-grow" asChild>
                <ButtonEditPost setOpen={setOpen} />
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditPostDialog post={post} setOpen={setOpen} setPosts={setPosts} />
    </Dialog>
  );
}
