import EssayIndex from '@/components/essay-index';
import Frame from '@/components/frame';
import Picture from '@/components/picture';
import { getAllBlogs } from '@/data/blogs';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export default async function Home() {
  const recent = (await getAllBlogs()).slice(0, 6);
  const image = site.homeImage;

  return (
    <Frame current="/">
      <p>
        Hi, I&rsquo;m Aryan. I&rsquo;m building <a href={site.company.url}>Tell</a>.
      </p>

      <figure>
        <a href={image.href}>
          <Picture src={image.src} alt={image.alt} width={540} className="framed" priority />
        </a>
        <figcaption>{image.caption}</figcaption>
      </figure>

      <p>
        I used to be a research intern at Convictional and an ML intern at Shopify on Sidekick. I study Computer Engineering at Waterloo.
      </p>

      <h2 className="section">Writing</h2>
      <EssayIndex posts={recent} />
      <p className="meta">
        <a href="/blogs">All of it</a> &middot; <a href="/rss.xml">RSS</a>
      </p>

      <h2 className="section">Projects</h2>
      <p>
        {projects.map((project, i) => (
          <span key={project.slug}>
            {i > 0 && ' · '}
            <a href={`/blogs/${project.slug}`}>{project.title}</a>
          </span>
        ))}
      </p>
      <p className="meta">
        <a href="/projects">More</a>
      </p>
    </Frame>
  );
}
