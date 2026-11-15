// Builds the whole site into dist/ as plain HTML files. No packages: just
// Node's own fs and path. Run `node build.mjs`, then `node serve.mjs` to look.
//
// Every page is a function that returns a string of HTML. The layout, the
// essay list and pictures are small helpers below. Links are plain <a> tags,
// so each click loads a whole new page, the way the web used to.

import fs from 'node:fs';
import path from 'node:path';
import { blogPosts } from './data/blogs.mjs';
import { experience } from './data/experience.mjs';
import { projects } from './data/projects.mjs';
import { elsewhere, nav, site } from './data/site.mjs';
import { longDate, parseDate, shortDate, year } from './lib/dates.mjs';
import { imageSize } from './lib/image-size.mjs';
import { escapeHtml as esc, markdown } from './lib/markdown.mjs';

const OUT = 'dist';

// --- data -----------------------------------------------------------------

// Newest first. Posts written on the same day keep the later-added one on top.
const posts = blogPosts
  .map((post, index) => ({ post, index }))
  .sort((a, b) => parseDate(b.post.date) - parseDate(a.post.date) || b.index - a.index)
  .map(({ post }) => post);

// Projects page order: these first, in this order, then everything else.
const PROJECTS_FIRST = [
  'ontology-project-blog',
  'sai-microjet-project-blog',
  'hyperloo-project-blog',
  'pikachu-project-blog',
];

// --- helpers --------------------------------------------------------------

// An <img> with its width and height written in, so nothing jumps while it
// loads. Pass `height` to crop to a box; otherwise it keeps its proportions,
// never shows bigger than the file, and narrows to fit `maxHeight`.
function picture(src, { alt = '', width = 410, height, maxHeight, eager = false, thumb = false } = {}) {
  const file = thumb && fs.existsSync(path.join('public/thumbs', path.basename(src)))
    ? `/thumbs/${path.basename(src)}`
    : src;
  const loading = eager ? 'eager" fetchpriority="high' : 'lazy';

  if (height) {
    return `<img src="${file}" alt="${esc(alt)}" width="${width}" height="${height}" class="framed" loading="${loading}" style="width:${width}px;aspect-ratio:${width}/${height};object-fit:cover">`;
  }

  const size = imageSize(src) ?? { width, height: width };
  let shown = Math.min(width, size.width);
  if (maxHeight && (shown * size.height) / size.width > maxHeight) {
    shown = Math.round((maxHeight * size.width) / size.height);
  }
  const tall = Math.round((shown * size.height) / size.width);
  return `<img src="${file}" alt="${esc(alt)}" width="${shown}" height="${tall}" class="framed" loading="${loading}" style="width:${shown}px">`;
}

// A dated list of essays. The year is printed once, in the left margin, at
// the start of each year's run, like an old weblog archive.
function essayIndex(list) {
  const rows = list.map((post, i) => {
    const y = year(post.date);
    const newYear = i === 0 || year(list[i - 1].date) !== y;
    return `<tr${newYear && i > 0 ? ' class="year-start"' : ''}><td class="index-year">${newYear ? y : ''}</td><td class="index-date">${shortDate(post.date)}</td><td><a href="/blogs/${post.slug}">${esc(post.title)}</a></td></tr>`;
  });
  return `<table class="index">\n<tbody>\n${rows.join('\n')}\n</tbody>\n</table>`;
}

// The layout of every page: the name and a row of links across the top, one
// column of text, and a narrow sidebar on the right (it drops below the text
// on a phone).
function page({ path: current, title, heading, description = site.description, body }) {
  const name = current === '/'
    ? `<h1 class="name">${esc(site.name)}</h1>`
    : `<a href="/" class="name">${esc(site.name)}</a>`;
  const links = nav
    .map((item) => (item.href === current ? `<b>${item.label}</b>` : `<a href="${item.href}">${item.label}</a>`))
    .join('<span class="sep"> / </span>');
  const side = elsewhere.map((item) => `<a href="${item.href}">${item.label}</a><br>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="/style.css">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="${esc(site.name)}: Essays" href="/rss.xml">
</head>
<body>
<div class="site">
<header class="masthead">
${name}
<nav class="nav" aria-label="Site">${links}</nav>
</header>

<div class="columns">
<main class="main">
${heading ? `<h1 class="title">${esc(heading)}</h1>\n` : ''}${body}
</main>

<aside class="sidebar">
<h2>Elsewhere</h2>
<p>
${side}
</p>
</aside>
</div>

<footer class="footer">&copy; ${new Date().getFullYear()} ${esc(site.name)} &middot; <a href="/rss.xml">RSS</a> &middot; <a href="/contact">Contact</a></footer>
</div>
</body>
</html>
`;
}

// --- pages ----------------------------------------------------------------

function home() {
  const image = site.homeImage;
  const projectLinks = projects.map((p) => `<a href="/blogs/${p.slug}">${esc(p.title)}</a>`).join(' &middot; ');
  return page({
    path: '/',
    title: site.name,
    body: `<p>Hi, I&rsquo;m Aryan. I&rsquo;m building <a href="${site.company.url}">Tell</a>.</p>

<figure>
<a href="${image.href}">${picture(image.src, { alt: image.alt, width: 540, eager: true })}</a>
<figcaption>${esc(image.caption)}</figcaption>
</figure>

<p>I used to be a research intern at Convictional and an ML intern at Shopify on Sidekick. I study Computer Engineering at Waterloo.</p>

<h2 class="section">Writing</h2>
${essayIndex(posts.slice(0, 6))}
<p class="meta"><a href="/blogs">All of it</a> &middot; <a href="/rss.xml">RSS</a></p>

<h2 class="section">Projects</h2>
<p>${projectLinks}</p>
<p class="meta"><a href="/projects">More</a></p>`,
  });
}

function essays() {
  return page({
    path: '/blogs',
    title: 'Essays',
    heading: 'Essays',
    description: `Essays by ${site.name}.`,
    body: essayIndex(posts),
  });
}

function essay(post, index) {
  // The list is newest first, so the older essay is the next one in it.
  const older = posts[index + 1];
  const newer = posts[index - 1];
  const cover = post.coverImage
    ? `<p>${picture(post.coverImage, { width: 540, maxHeight: 405, eager: true })}</p>\n`
    : '';
  const prevnext = [
    older ? `<a href="/blogs/${older.slug}" class="prev">&laquo; ${esc(older.title)}</a>` : '',
    newer ? `<a href="/blogs/${newer.slug}" class="next">${esc(newer.title)} &raquo;</a>` : '',
  ].join('\n');

  return page({
    path: '/blogs',
    title: post.title,
    description: post.summary,
    body: `<p class="dateline">${longDate(post.date)}</p>
<h1 class="title">${esc(post.title)}</h1>
${cover}${markdown(post.content)}

<hr>
<div class="prevnext">
${prevnext}
</div>`,
  });
}

function projectsPage() {
  const featured = new Set(projects.map((p) => p.slug));
  // Every other project write-up, shown the same way, using its cover and summary.
  const others = posts
    .filter((post) => post.isProjectBlog && !featured.has(post.slug) && post.coverImage)
    .map((post) => ({
      title: post.title,
      description: post.summary,
      technologies: post.tags,
      image: post.coverImage,
      slug: post.slug,
    }));
  const rank = (slug) => (PROJECTS_FIRST.includes(slug) ? PROJECTS_FIRST.indexOf(slug) : PROJECTS_FIRST.length);
  const all = [...projects, ...others].sort((a, b) => rank(a.slug) - rank(b.slug));

  const rows = all.map((p) => `<div class="project">
<a href="/blogs/${p.slug}">${picture(p.image, { width: 150, height: 112, thumb: true })}</a>
<div class="project-text">
<b><a href="/blogs/${p.slug}">${esc(p.title)}</a></b><br>
${esc(p.description)}<br>
<span class="meta">${esc(p.technologies.join(', '))}</span>
</div>
</div>`);

  return page({
    path: '/projects',
    title: 'Projects',
    heading: 'Projects',
    description: `Things ${site.name} has built.`,
    body: rows.join('\n\n'),
  });
}

function work() {
  const jobs = experience.map((job) => `<div>
<p><b>${esc(job.company)}</b>, ${esc(job.title)}<br>
<span class="meta">${esc([job.location, job.period].filter(Boolean).join(', '))}</span></p>
<ul>
${job.description.map((line) => `<li>${esc(line)}</li>`).join('\n')}
</ul>
</div>`);

  return page({
    path: '/work',
    title: 'Work',
    heading: 'Work',
    description: `Where ${site.name} has worked.`,
    body: jobs.join('\n\n'),
  });
}

function contact() {
  const [school, personal] = site.emails;
  return page({
    path: '/contact',
    title: 'Contact',
    heading: 'Contact',
    description: `How to reach ${site.name}.`,
    body: `<p>Email: <a href="mailto:${personal}">${personal}</a><br>
School: <a href="mailto:${school}">${school}</a></p>

<p>Or DM me on <a href="${site.twitter}">Twitter</a>.</p>`,
  });
}

function notFound() {
  return page({
    title: 'Not Found',
    heading: 'Not Found',
    body: '<p>Nothing here. <a href="/">Go home</a>?</p>',
  });
}

function feed() {
  const items = posts.map((post) => {
    const link = `${site.url}/blogs/${post.slug}`;
    return `    <item>
      <title>${esc(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${parseDate(post.date).toUTCString()}</pubDate>
      <description>${esc(post.summary)}</description>
    </item>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)}: Essays</title>
    <link>${site.url}/blogs</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
${items.join('\n')}
  </channel>
</rss>
`;
}

// --- write it all out -----------------------------------------------------

function write(file, contents) {
  const full = path.join(OUT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync('public', OUT, { recursive: true });
fs.cpSync('static', OUT, { recursive: true });

write('index.html', home());
write('blogs.html', essays());
posts.forEach((post, i) => write(`blogs/${post.slug}.html`, essay(post, i)));
write('projects.html', projectsPage());
write('work.html', work());
write('contact.html', contact());
write('404.html', notFound());
write('rss.xml', feed());

console.log(`Built ${posts.length + 6} pages and the feed into ${OUT}/`);
