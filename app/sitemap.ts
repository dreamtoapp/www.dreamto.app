import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Best practice: Use your real domain and include all static and dynamic routes
  // For dynamic routes, you would fetch slugs/ids from your data source
  // Here is a static example for demonstration
  return [
    {
      url: 'https://www.dreamto.app/',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://www.dreamto.app/en',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://www.dreamto.app/ar',
      lastModified: new Date().toISOString(),
    },
    // Add more static or dynamic URLs as needed
  ];
}
