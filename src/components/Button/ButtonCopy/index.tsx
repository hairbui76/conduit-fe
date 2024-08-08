'use client';

import { Button } from '@/components/common/Button';
import { IconLink } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonCopy({
  baseUrl,
  id,
  variant
}: {
  baseUrl: string;
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
}) {
  return (
    <Button
      variant={variant || 'default'}
      className="flex-grow py-0"
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}${baseUrl}/${id}`);
        toast.success('Copied link to clipboard', { position: 'top-center' });
      }}
    >
      <IconLink className="mr-2" />
      Copy link
    </Button>
  );
}
