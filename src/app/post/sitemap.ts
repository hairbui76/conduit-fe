import { MetadataRoute } from 'next';
import { cookies } from 'next/headers';

import { getPosts } from '@/data/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getPosts(
    `${process.env.BACKEND_URL}/api/articles`,
    { limit: 200 },
    cookies().get('AUTH_TOKEN')?.value
  );

  return (
    posts.map(post => ({
      url: `${process.env.BASE_URL}/post/${post.slug}`,
      changeFrequency: 'always',
      lastModified: post.updatedAt,
      priority: 1
    })) || []
  );
}
