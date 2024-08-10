import Link from 'next/link';

import { sliceString } from '@/lib/utils';

export default function Tag({ tag }: { tag: string }) {
  return (
    <Link
      className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-fit px-2.5 py-1 rounded-sm break-all text-xs"
      href={`/tags/${tag}`}
    >
      #{sliceString(tag, 30)}
    </Link>
  );
}
