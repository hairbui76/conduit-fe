'use server';

import { Post } from '@/types/Post';
import { revalidatePath } from 'next/cache';

export async function getPosts(url: string, options?: { page: number }) {
  const limit = 5;

  const response = await fetch(`${url}?limit=${limit}&page=${options?.page || ''}`);
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

export async function revalidate(path: string) {
  revalidatePath(path, 'layout');
}
