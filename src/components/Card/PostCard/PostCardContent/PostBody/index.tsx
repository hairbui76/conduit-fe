import React from 'react';

import { PostCardType } from '@/types/Post';

export default function PostBody({
  body,
  type,
  slug
}: {
  body: string;
  type: PostCardType;
  slug: string;
}) {
  return type === 'detail' ? (
    <div className="mt-6 leading-relaxed">
      {body.split('\\n').map((paragraph, index) => (
        <React.Fragment key={`post-${slug}-paragraph-${index}`}>
          <p>{paragraph}</p>
        </React.Fragment>
      ))}
    </div>
  ) : null;
}
