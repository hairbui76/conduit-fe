'use client';

import React, { useState } from 'react';

import { Button } from '@/components/common/Button';
import { IconHeart } from '@tabler/icons-react';
import { cn, suffixS } from '@/lib/utils';

export default function ButtonLike({ numLike }: { numLike: number }) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      variant="ghost"
      className="flex-grow py-0"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
    >
      <IconHeart className={cn('mr-2', hover ? 'fill-red-500' : '')} />
      {numLike} {suffixS('Like', numLike)}
    </Button>
  );
}
