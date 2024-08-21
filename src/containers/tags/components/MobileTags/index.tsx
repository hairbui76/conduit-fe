'use client';

import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '@/components/Button';
import { IconTag } from '@tabler/icons-react';

export default function MobileTags({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger className="lg:hidden fixed right-6 bottom-4" asChild>
        <Button
          asChild
          className="rounded-full w-[56px] h-[56px] text-primary z-1000 bg-slate-50 hover:bg-slate-100"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
          }}
        >
          <IconTag />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={8}
        alignOffset={50}
        className="w-fit p-0"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
