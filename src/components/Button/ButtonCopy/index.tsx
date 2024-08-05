'use client';

import { Button } from '@/components/common/Button';
import { IconLink } from '@tabler/icons-react';
import toast from 'react-hot-toast';

export default function ButtonCopy({ slug }: { slug: string }) {
  return (
    <Button
      variant="ghost"
      className="flex-grow py-0"
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${slug}`);
        toast.success('Copied link to clipboard', { position: 'top-center' });
      }}
    >
      <IconLink className="mr-2" />
      Copy link
    </Button>
  );
}
