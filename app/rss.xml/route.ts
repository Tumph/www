import { getAllBlogs } from '@/data/blogs';
import { site } from '@/data/site';
import { parseDate } from '@/lib/dates';

// Built once at deploy time, like a feed file sitting next to the pages.
export const dynamic = 'force-static';

function escape(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  const posts = await getAllBlogs();
  const items = posts
    .map((post) => {
      const link = `${site.url}/blogs/${post.slug}`;
      return [
        '    <item>',
        `      <title>${escape(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid>${link}</guid>`,
        `      <pubDate>${parseDate(post.date).toUTCString()}</pubDate>`,
        `      <description>${escape(post.summary)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.name)}: Essays</title>
    <link>${site.url}/blogs</link>
    <description>${escape(site.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
