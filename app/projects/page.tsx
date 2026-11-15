import type { Metadata } from 'next';
import Frame from '@/components/frame';
import Picture from '@/components/picture';
import { getProjectBlogs } from '@/data/blogs';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Things ${site.name} has built.`,
};

export default async function ProjectsPage() {
  const featured = new Set(projects.map((project) => project.slug));
  // Every other project write-up, shown the same way, using its cover and summary.
  const others = (await getProjectBlogs())
    .filter((post) => !featured.has(post.slug) && post.coverImage)
    .map((post) => ({
      title: post.title,
      description: post.summary,
      technologies: post.tags,
      image: post.coverImage as string,
      slug: post.slug,
    }));
  // These come first, in this order; everything else follows.
  const first = ['ontology-project-blog', 'sai-microjet-project-blog', 'hyperloo-project-blog', 'pikachu-project-blog'];
  const rank = (slug: string) => (first.includes(slug) ? first.indexOf(slug) : first.length);
  const all = [...projects, ...others].sort((a, b) => rank(a.slug) - rank(b.slug));

  return (
    <Frame current="/projects" title="Projects">
      {all.map((project) => (
        <div key={project.slug} className="project">
          <a href={`/blogs/${project.slug}`}>
            <Picture src={project.image} alt="" width={150} height={112} className="framed" />
          </a>
          <div className="project-text">
            <b>
              <a href={`/blogs/${project.slug}`}>{project.title}</a>
            </b>
            <br />
            {project.description}
            <br />
            <span className="meta">{project.technologies.join(', ')}</span>
          </div>
        </div>
      ))}

    </Frame>
  );
}
