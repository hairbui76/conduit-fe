import Link from 'next/link';

import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/Card';
import { cn } from '@/lib/utils';

export default function NeedAuthCard({
  message,
  className
}: {
  message: string;
  className?: string;
}) {
  return (
    <Card className={cn('px-16 py-12 h-fit flex justify-center', className)}>
      <CardContent className="text-center p-0">
        <p className="mb-6">{message}</p>
        <Button>
          <Link href="/login">Go to login</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
