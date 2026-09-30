import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/lib/site';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'TeerthSaathi | Pilgrimage Journeys With Care',
    template: '%s | TeerthSaathi',
  },
  description: site.description,
  openGraph: {
    title: 'TeerthSaathi | Pilgrimage Journeys With Care',
    description: site.description,
    type: 'website',
    locale: 'en_IN',
    siteName: site.name,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeerthSaathi | Journeys With Care',
    description: site.description,
    images: ['/opengraph-image'],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
