import Link from 'next/link';

import { Button } from '@/components/Button';

export default function ButtonGoHome() {
  return (
    <Button>
      <Link href="/">Start Explore</Link>
    </Button>
  );
}
