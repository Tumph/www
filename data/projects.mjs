// Shown in this order on /projects. Any other project write-up in blogs.ts
// (isProjectBlog: true) is listed underneath as an earlier project.
export const projects = [
  {
    title: 'Ontology Project',
    description:
      'Built a pipeline that turns raw novel text into RDF/OWL knowledge graphs with LLM extraction, coreference resolution, SPARQL queries, and interactive graph and timeline views.',
    technologies: ['RDF', 'OWL', 'SPARQL', 'Claude', 'LLM'],
    image: '/ontology-project.png',
    slug: 'ontology-project-blog',
  },
  {
    title: 'Hyperloo',
    description:
      'Built an algorithmically generated knowledge graph of UWaterloo programs, majors, and courses using web scraping, a custom NLP pipeline, and batch API.',
    technologies: ['spaCy', 'Next.js', 'JavaScript', 'Selenium', 'Python', 'Batch API'],
    image: '/hyperloo.png',
    slug: 'hyperloo-project-blog',
  },
  {
    title: 'Pikachu',
    description:
      'Built a real-time, voice and text enabled pair programming agent that helps developers debug code, search documentation, and propose fixes using Gemini 2.0 Flash Live.',
    technologies: ['FastAPI', 'WebSocket', 'Electron', 'Gemini 2.0 Flash Live', 'Google ADK'],
    image: '/googlehack.jpeg',
    slug: 'pikachu-project-blog',
  },
  {
    title: 'uwOS',
    description:
      'Built a macOS-style launchpad for Waterloo students that aggregates the best UWaterloo tools into one place, reducing friction in daily student life.',
    technologies: ['Next.js', 'React', 'Tailwind', 'Electron', 'Electron Forge'],
    image: '/uwos.png',
    slug: 'uwos-project-blog',
  },
  {
    title: 'Pare',
    description:
      'Built a browser extension that summarizes resumes on any ATS, allowing recruiters to scan more resumes in a shorter time.',
    technologies: ['JavaScript', 'HTML/CSS', 'Git', 'PDF.js'],
    image: '/pare.png',
    slug: 'pare-project-blog',
  },
];
