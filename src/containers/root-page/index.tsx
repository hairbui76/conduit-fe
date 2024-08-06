'use client';

import { usePathname } from 'next/navigation';

import TagsCard from '@/components/Card/TagsCard';
import { Button } from '@/components/common/Button';
import { IconTag } from '@tabler/icons-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

export default function MainSection({
  tags,
  children
}: {
  tags: string[] | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return pathname === '/login' ? (
    children
  ) : (
    <main className="flex mx-auto md:pt-12 pt-16 pb-4 h-fit min-h-screen lg:gap-4">
      <section className="flex flex-col items-center gap-4 px-4 sm:px-8">{children}</section>
      {tags !== null && (
        <>
          <TagsCard tags={tags} className="max-w-80 hidden lg:block h-fit sticky top-12 p-2" />
          <Popover>
            <PopoverTrigger className="lg:hidden fixed right-6 bottom-4">
              <Button
                asChild
                className="rounded-full w-[56px] h-[56px] text-primary z-1000 bg-slate-50 hover:bg-slate-100"
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
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
            >
              <TagsCard tags={tags} className="max-w-80 h-fit border-none shadow-none" />
            </PopoverContent>
          </Popover>
        </>
      )}
    </main>
  );
}
