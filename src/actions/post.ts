'use server';

import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function getPosts(url: string, options?: { page: number }) {
  const limit = 5;
  const token = cookies().get('AUTH_TOKEN')?.value;

  const response = await fetch(`${url}?limit=${limit}&page=${options?.page || ''}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    },
    next: { tags: ['posts', 'global'] }
  });
  if (!response.ok) {
    throw new Error('Could not get posts.');
  }

  const data: { articles: Post[]; articlesCount: number; page: number } = await response.json();

  return {
    posts: data.articles,
    postsCount: data.articlesCount,
    page: data.page,
    nextPage: data.page * limit >= data.articlesCount ? null : data.page + 1
  };
}

export async function getSinglePost(slug: string) {
  const url = `${process.env.BACKEND_URL}/api/articles/${slug}`;
  const token = cookies().get('AUTH_TOKEN')?.value;

  const [postResponse, commentsResponse] = await Promise.all([
    fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      },
      next: { tags: [slug] }
    }),
    fetch(`${url}/comments`)
  ]);

  if (!postResponse.ok) {
    return null;
  }

  const [postData, commentsData] = await Promise.all([
    postResponse.json(),
    commentsResponse.json()
  ]);

  return { post: postData.article as Post, comments: commentsData.comments as Comment[] };
}

export async function likePost(slug: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    throw new Error('You need login to like this post');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Could not like this post');
  }

  revalidateTag('posts');
  revalidateTag(slug);
}

export async function unlikePost(slug: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    throw new Error('You need login to unlike this post');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Could not unlike this post');
  }

  revalidateTag('posts');
  revalidateTag(slug);
}

export async function revalidate(path: string) {
  revalidatePath(path, 'layout');
}
