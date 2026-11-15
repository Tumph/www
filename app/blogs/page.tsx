import type { Metadata } from 'next';
import EssayIndex from '@/components/essay-index';
import Frame from '@/components/frame';
import { getAllBlogs } from '@/data/blogs';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Essays',
  description: `Essays by ${site.name}.`,
};

export default async function EssaysPage() {
  const posts = await getAllBlogs();

  return (
    <Frame current="/blogs" title="Essays">
      <EssayIndex posts={posts} />
    </Frame>
  );
}
