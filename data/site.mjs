// Everything about the site that isn't an essay, a project, or a job.
// Edit here; every page reads from this file.

export const site = {
  name: 'Aryan Gupta',
  url: 'https://arygupta.com',
  description:
    'Aryan Gupta, co-founder and CEO of Tell. Essays and projects.',
  emails: ['a535gupt@uwaterloo.ca', 'aryansmail@gmail.com'],
  github: 'https://github.com/Tumph',
  linkedin: 'https://linkedin.com/in/aryangoopta',
  twitter: 'https://x.com/argupta_',
  // What I'm working on now. Linked from the home page.
  company: { name: 'Tell', url: 'https://trytell.ai' },
  // The picture on the home page, with the caption printed under it.
  homeImage: {
    src: '/tell.jpg',
    alt: 'The Tell home page: Your inbox does the work. You just approve it.',
    caption: 'trytell.ai',
    href: 'https://trytell.ai',
  },
};


// The row of links under the name at the top of every page.
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Essays', href: '/blogs' },
  { label: 'Projects', href: '/projects' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

// "Elsewhere" in the sidebar.
export const elsewhere = [
  { label: 'GitHub', href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'Twitter', href: site.twitter },
  { label: 'Email', href: '/contact' },
  { label: 'RSS', href: '/rss.xml' },
];
