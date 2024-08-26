import { cn } from '@/lib/utils';

export default function PostSection({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn('flex flex-col items-center gap-4 w-full sm:w-[570px] h-fit', className)}
    >
      {children}
    </section>
  );
}
