'use client';

import { Button } from '@/components/Button';
import { IconLink } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonCopy({
  url,
  variant,
  className,
  iconClassName
}: {
  url: string;
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
        navigator.clipboard.writeText(url);
        toast.success('Copied link to clipboard', { position: 'top-center' });
      }}
    >
      Copy link
      <IconLink className={iconClassName} />
    </Button>
  );
}
