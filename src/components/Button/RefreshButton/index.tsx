'use client';

import { revalidate } from '@/actions/post';
import React, { useTransition } from 'react';

export default function ButtonRefresh() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={async () => {
        startTransition(async () => await revalidate('/'));
      }}
    >
      {isPending ? 'Fetching' : 'Revalidate'}
    </button>
  );
}
