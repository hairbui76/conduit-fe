import { Fragment } from 'react';
import Link from 'next/link';

import { Badge } from '@/components/Badge';
import { CardContent } from '@/components/common/Card';
import { PostCardType } from '@/types/Post';

export default function PostCardContent({
  title,
  description,
  body,
  type,
  tags,
  slug
}: {
  title: string;
  description: string;
  body: string;
  type: PostCardType;
  tags: string[];
  slug: string;
}) {
  return (
    <CardContent>
      <ContentComponent type={type} slug={slug}>
        <p className="mt-4 font-bold text-2xl break-words leading-tight">{title}</p>
        <p className="text-sm break-words leading">{description}</p>
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        {type === 'detail' && (
          <div className="mt-6 leading-relaxed">
            {body.split('\\n').map((paragraph, index) => (
              <Fragment key={`post-${slug}-paragraph-${index}`}>
                <p>{paragraph}</p>
              </Fragment>
            ))}
          </div>
        )}
      </ContentComponent>
    </CardContent>
  );
}

function ContentComponent({
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
