import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/content-loader';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aed3.vercel.app';

  // Get all content slugs
  const slugs = getAllSlugs();

  // Generate content pages
  const contentPages = slugs.map((slug) => ({
    url: `${baseUrl}/content/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/content`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...contentPages,
  ];
}
