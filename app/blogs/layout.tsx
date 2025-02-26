import Header from '@/components/header';
import Footer from '@/components/footer';
import { Metadata } from 'next';
import './blog-styles.css';

export const metadata: Metadata = {
  title: 'Blog | Aryan Gupta',
  description: 'Blog posts about AI, engineering, projects, and more by Aryan Gupta',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}