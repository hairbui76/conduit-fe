'use server';

import { Comment } from '@/types/Comment';
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

export async function getSinglePost(slug: string) {
  const url = `https://node-express-conduit.appspot.com/api/articles/${slug}`;

  const [postResponse, commentsResponse] = await Promise.all([
    fetch(url),
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

export async function revalidate(path: string) {
  revalidatePath(path, 'layout');
}
