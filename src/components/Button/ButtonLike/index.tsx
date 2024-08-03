'use client';

import React, { useState } from 'react';

import { Button } from '@/components/common/Button';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { suffixS } from '@/lib/utils';

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
      {hover ? <IconHeartFilled className="mr-2 fill-red-500" /> : <IconHeart className="mr-2" />}
      {numLike} {suffixS('Like', numLike)}
    </Button>
  );
}