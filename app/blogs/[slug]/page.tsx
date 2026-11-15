import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Frame from '@/components/frame';
import Picture from '@/components/picture';
import { getAllBlogs, getBlogBySlug } from '@/data/blogs';
import { longDate } from '@/lib/dates';

type Params = { slug: string };

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const blog = await getBlogBySlug((await params).slug);
  if (!blog) return { title: 'Not Found' };
  return { title: blog.title, description: blog.summary };
}

export default async function EssayPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const posts = await getAllBlogs();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) notFound();

  const blog = posts[index];
  // The list is newest first, so the older essay is the next one in it.
  const older = posts[index + 1];
  const newer = posts[index - 1];

  return (
    <Frame current="/blogs">
      <p className="dateline">{longDate(blog.date)}</p>
      <h1 className="title">{blog.title}</h1>

      {blog.coverImage && (
        <p>
          <Picture src={blog.coverImage} alt="" width={540} maxHeight={405} className="framed" priority />
        </p>
      )}

      <ReactMarkdown
        components={{
          // Images inside an essay are plain <img> tags at their own size,
          // shrunk only if wider than the column.
          // eslint-disable-next-line @next/next/no-img-element
          img: ({ src, alt }) => <img src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} loading="lazy" />,
        }}
      >
        {blog.content}
      </ReactMarkdown>

      <hr />
      <div className="prevnext">
        {older && (
          <a href={`/blogs/${older.slug}`} className="prev">
            &laquo; {older.title}
          </a>
        )}
        {newer && (
          <a href={`/blogs/${newer.slug}`} className="next">
            {newer.title} &raquo;
          </a>
        )}
      </div>
    </Frame>
  );
}
