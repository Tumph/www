import type { Metadata, Viewport } from 'next';
import { site } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Pages are titled plainly ("Essays", an essay's own title), like
  // paulgraham.com, rather than "Something | Site Name".
  title: { default: site.name, template: '%s' },
  description: site.description,
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: `${site.name}: Essays` }],
    },
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
