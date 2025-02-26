import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogs } from '@/data/blogs';

export const metadata = {
  title: 'Blogs | Aryan Gupta',
  description: 'Blog posts about technology, projects, and more by Aryan Gupta',
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();
  
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-28 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Blog</h1>
        
        <div className="grid gap-10">
          {blogs.map((blog) => (
            <article key={blog.id} className="group">
              <Link href={`/blogs/${blog.slug}`} className="block">
                <div className="grid md:grid-cols-4 gap-6">
                  {blog.coverImage && (
                    <div className="md:col-span-1">
                      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={blog.coverImage ? "md:col-span-3" : "md:col-span-4"}>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
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
                    
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4">{blog.summary}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 