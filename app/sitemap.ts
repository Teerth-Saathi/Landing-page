import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/journeys/mathura-vrindavan',
    '/privacy',
    '/terms',
    '/credits',
  ].map((path) => ({ url: `${site.url}${path}` }));
}
