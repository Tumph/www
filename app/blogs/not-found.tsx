import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Blog Post Not Found</h2>
        <p className="text-gray-300 mb-8">
          {"The blog post you're looking for doesn't exist or has been moved."}
        </p>
        <Link 
          href="/blogs" 
          className="inline-flex items-center justify-center px-6 py-3 border border-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
        >
          Back to Blogs
        </Link>
      </div>
    </main>
  );
} 