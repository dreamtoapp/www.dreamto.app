import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.dreamto.app/sitemap.xml',
    host: 'https://www.dreamto.app',
  };
}
