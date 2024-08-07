import TagsCard from '@/components/Card/TagsCard';
import { Button } from '@/components/common/Button';
import { IconTag } from '@tabler/icons-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

export default function Tags({ tags }: { tags: string[] | null }) {
  if (tags === null) return null;

  return (
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
  );
}
