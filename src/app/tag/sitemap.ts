import { MetadataRoute } from 'next';

import { getTags } from '@/actions/tag';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tags = await getTags();

  return (
    tags
      ?.filter(tag => tag.length > 0)
      .slice(0, 50000)
      .map(tag => ({
        url: `${process.env.BASE_URL}/tag/${tag}`,
        changeFrequency: 'always',
        priority: 0.8
      })) || []
  );
}
