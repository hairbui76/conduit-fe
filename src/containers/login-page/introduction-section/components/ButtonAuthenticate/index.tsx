import Link from 'next/link';

import { Button } from '@/components/Button';

export default function ButtonAuthenticate({ page }: { page: 'login' | 'signup' }) {
  return (
    <Button variant="outline" className="ml-4 lg:hidden">
      <Link href={`#${page}-form`}>{page === 'login' ? 'Login' : 'Sign up'}</Link>
    </Button>
  );
}
