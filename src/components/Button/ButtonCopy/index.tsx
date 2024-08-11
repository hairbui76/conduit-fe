'use client';

import { Button } from '@/components/common/Button';
import { IconLink } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonCopy({
  page,
  id,
  variant,
  className,
  iconClassName
}: {
  page: string;
  id: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <Button
      variant={variant || 'default'}
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}${page}/${id}`);
        toast.success('Copied link to clipboard', { position: 'top-center' });
      }}
    >
      Copy link
      <IconLink className={iconClassName} />
    </Button>
  );
}
