import { MetadataRoute } from 'next';

import { getPosts } from '@/actions/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getPosts(`${process.env.BACKEND_URL}/api/articles`, { limit: 200 });

  return (
    posts.map(post => ({
      url: `${process.env.BASE_URL}/post/${post.slug}`,
      changeFrequency: 'always',
      lastModified: post.updatedAt,
      priority: 1
    })) || []
  );
}
