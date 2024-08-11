import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0
    },
    {
      url: `${process.env.BASE_URL}/login`,
      changeFrequency: 'never',
      priority: 0.5
    },
    {
      url: `${process.env.BASE_URL}/signup`,
      changeFrequency: 'never',
      priority: 0.5
    },
    {
      url: `${process.env.BASE_URL}/following`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8
    },
    {
      url: `${process.env.BASE_URL}/liked`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8
    },
    {
      url: `${process.env.BASE_URL}/settings`,
      changeFrequency: 'never'
    }
  ];
}
