import Link from 'next/link';

import { Button } from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';

export default function NeedAuthCard({ message }: { message: string }) {
  return (
    <Card className="sm:w-[570px] md:w-[640px] px-16 py-12 h-fit flex justify-center">
      <CardContent className="text-center p-0">
        <p className="mb-6">{message}</p>
        <Button>
          <Link href="/login">Go to login</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
