'use client';

import { Button } from '@/components/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { IconShare3 } from '@tabler/icons-react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  XIcon
} from 'react-share';

export default function ButtonShare({ url }: { url: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex-grow px-2">
          <IconShare3 className="mr-2" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-2 px-4 w-fit" side="top">
        <div className="flex justify-center gap-4">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <XIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
