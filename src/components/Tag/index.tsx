import Link from 'next/link';

import { sliceString } from '@/lib/utils';
import { Button } from '../Button';
import { trimStart } from 'lodash';

export default function Tag({ tag }: { tag: string }) {
  tag = trimStart(tag, '#');

  return (
    <Button variant="ghost" size="sm" className="text-xs h-fit py-2 rounded-sm" asChild>
      <Link href={`/tag/${tag}`}>#{sliceString(tag, 30)}</Link>
    </Button>
  );
}
