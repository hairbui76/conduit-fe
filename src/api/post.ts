import { Post } from '@/types/Post';

export async function getPosts(
  url: string,
  options?: { page: number }
): Promise<{ posts: Post[]; postsCount: number; page: number; nextPage: number | null }> {
  const limit = 10;

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
