import { getBlogBySlug, getAllBlogs } from '@/data/blogs';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

// Add markdown rendering
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // Ensure params is treated as a Promise
  const slug = params.slug;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }
  
  return {
    title: `${blog.title} | Aryan Gupta`,
    description: blog.summary,
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  // Explicitly handle as async operation
  const blogs = await getAllBlogs();
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Ensure params is treated as a Promise
  const slug = params.slug;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-28 sm:px-6 lg:px-8">
        <Link href="/blogs" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to all blogs
        </Link>
        
        <article className="prose prose-invert prose-lg max-w-none">
          <header className="mb-10 not-prose">
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</time>
              
              {blog.isProjectBlog && (
                <>
                  <span className="mx-2">•</span>
                  <span className="text-blue-400">Project Blog</span>
                </>
              )}
            </div>
            
            <h1 className="text-4xl font-bold mb-6 glow-text">{blog.title}</h1>
            
            <p className="text-xl text-gray-300 mb-6">{blog.summary}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            
            {blog.coverImage && (
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg mb-10 shadow-lg">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>
          
          <div className="markdown-content">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
} 