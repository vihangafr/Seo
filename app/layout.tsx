import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SearchPilot | Dynamic SEO Schema & Metadata Optimizer',
  description: 'AI-powered technical SEO platform for small businesses to crawl pages, generate click-optimized meta tags, rich JSON-LD schemas, and Search Console compliant sitemap_live.xml files.',
  openGraph: {
    title: 'SearchPilot | Dynamic SEO Schema & Metadata Optimizer',
    description: 'Effortless technical SEO, JSON-LD Schema markup generator, and Search Console compliant sitemap_live.xml for small businesses.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SearchPilot | Dynamic SEO Schema & Metadata Optimizer',
    description: 'Effortless technical SEO, JSON-LD Schema markup generator, and Search Console compliant sitemap_live.xml for small businesses.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
