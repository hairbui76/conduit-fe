'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function commentPost({ slug, comment }: { slug: string; comment: string }) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to comment this post' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: {
        body: comment
      }
    })
  });

  if (!response.ok) {
    return { error: 'Could not comment this post' };
  }

  revalidateTag(`${slug}-comments`);
}

export async function deleteComment({ slug, commentId }: { slug: string; commentId: string }) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    throw new Error('You need login to detete this comment');
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/articles/${slug}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Could not delete this comment');
  }

  revalidateTag(`${slug}-comments`);
}
