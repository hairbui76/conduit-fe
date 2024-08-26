'use client';

import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/Dialog';
import { IconShare3 } from '@tabler/icons-react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  XIcon
} from 'react-share';

export default function ButtonShare({ slug }: { slug: string }) {
  const url = `${window.location.origin}/post/${slug}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex-grow px-2">
          <IconShare3 className="mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="py-4 px-6 w-fit">
        <DialogHeader>
          <DialogTitle>Share post</DialogTitle>
          <DialogDescription>Choose your favorite social media</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-2">
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <XIcon size={40} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} round={true} />
          </LinkedinShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
