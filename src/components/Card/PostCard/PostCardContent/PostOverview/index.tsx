import Link from 'next/link';

export default function PostOverview({
  type,
  slug,
  children
}: {
  type: 'summary' | 'detail';
  slug: string;
  children: React.ReactNode;
}) {
  const className = 'flex flex-col gap-1';

  return type === 'detail' ? (
    <div className={className}>{children}</div>
  ) : (
    <Link href={`/post/${slug}`} className={className}>
      {children}
    </Link>
  );
}
