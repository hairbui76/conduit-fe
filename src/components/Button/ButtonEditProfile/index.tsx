import Link from 'next/link';

import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';
import { IconEdit, IconPencil } from '@tabler/icons-react';

export default function ButtonEditProfile({
  className,
  iconClassname
}: {
  className?: string;
  iconClassname?: string;
}) {
  return (
    <Button className={className}>
      <Link href="/settings" className="flex items-center">
        <IconEdit className={cn('mr-2', iconClassname)} />
        Edit profile
      </Link>
    </Button>
  );
}
