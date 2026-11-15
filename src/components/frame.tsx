import { elsewhere, nav, site } from '@/data/site';

type FrameProps = {
  // Which nav link is this page; it shows in bold instead of as a link.
  current?: string;
  // The page heading. Leave out on pages that set their own.
  title?: string;
  children: React.ReactNode;
};

// The layout of every page: the name and a row of links across the top, one
// column of text, and a narrow sidebar of picks and links on the right (it
// drops below the text on a phone). Links are plain <a> tags on purpose: each
// click loads a whole new page, the way the web used to.
export default function Frame({ current, title, children }: FrameProps) {
  return (
    <div className="site">
      <header className="masthead">
        {current === '/' ? (
          <h1 className="name">{site.name}</h1>
        ) : (
          <a href="/" className="name">
            {site.name}
          </a>
        )}
        <nav className="nav" aria-label="Site">
          {nav.map((item, i) => (
            <span key={item.href}>
              {i > 0 && <span className="sep"> / </span>}
              {item.href === current ? <b>{item.label}</b> : <a href={item.href}>{item.label}</a>}
            </span>
          ))}
        </nav>
      </header>

      <div className="columns">
        <main className="main">
          {title && <h1 className="title">{title}</h1>}
          {children}
        </main>

        <aside className="sidebar">
          <h2>Elsewhere</h2>
          <p>
            {elsewhere.map((item) => (
              <span key={item.href}>
                <a href={item.href}>{item.label}</a>
                <br />
              </span>
            ))}
          </p>
        </aside>
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} {site.name} &middot; <a href="/rss.xml">RSS</a> &middot;{' '}
        <a href="/contact">Contact</a>
      </footer>
    </div>
  );
}
