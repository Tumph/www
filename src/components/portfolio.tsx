'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBlog } from '@/data/blogs'

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  url: string;
}

type ProjectWithBlogUrl = Project & {
  blogUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Hyperloo",
    category: "Web Application",
    description: "Built an algorithmically generated knowledge graph of UWaterloo programs, majors, and courses using web scraping, a custom NLP pipeline, and batch API.",
    technologies: ["spaCy", "nextjs", "javascript", "selenium", "python", "batch API"],
    image: "/hyperloo.png",
    url: "/blogs/hyperloo-project-blog"
  },
  {
    id: 2,
    title: "Doledesk",
    category: "Management System",
    description: "Developed a JavaScript and Java-based teacher substitute management system, automating placements and saving 360+ admin hours annually.",
    technologies: ["JavaScript", "Java", "Bubble", "Git", "PostgreSQL"],
    image: "/doledesk.png",
    url: "/blogs/doledesk-project-blog"
  },
  {
    id: 3,
    title: "Pare",
    category: "Browser Extension",
    description: "Built a browser extension that summarizes resumes on any ATS, allowing recruiters to scan more resumes in a shorter time.",
    technologies: ["JavaScript", "HTML/CSS", "Git", "PDF.js"],
    image: "/pare.png",
    url: "/blogs/pare-project-blog"
  },
  {
    id: 4,
    title: "SAI Microjet",
    category: "Hardware and Firmware",
    description: "Built a hardware rig and firmware system for a microjet engine, using it to test optimal ratios of sulfur for stratospheric aerosol injection research.",
    technologies: ["Python", "Firmware", "Mechanical Design", "CAD"],
    image: "/geoeng.jpg",
    url: "/blogs/sai-microjet-project-blog"
  }
]

export default function Portfolio() {
  const [projectsWithBlogUrls, setProjectsWithBlogUrls] = useState<ProjectWithBlogUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectBlogs = async () => {
      try {
        const projectsWithUrls = await Promise.all(
          projects.map(async (project) => {
            const projectBlog = await getProjectBlog(project.id);
            return {
              ...project,
              blogUrl: projectBlog ? `/blogs/${projectBlog.slug}` : undefined
            };
          })
        );
        setProjectsWithBlogUrls(projectsWithUrls);
      } catch (error) {
        console.error("Error fetching project blogs:", error);
        // Fallback to original projects if there's an error
        setProjectsWithBlogUrls(projects);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectBlogs();
  }, []);

  if (isLoading) {
    return (
      <section id="work" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 tracking-tight">PROJECTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-900 rounded-lg border border-gray-800 h-64 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }
  
  return (
    <section id="work" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 tracking-tight">PROJECTS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsWithBlogUrls.map((project) => {
          const projectUrl = project.blogUrl || project.url;
          const isExternalLink = !project.blogUrl;
          
          return (
            <div key={project.id} className="group relative overflow-hidden bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 transform scale-90">
              <div className="aspect-w-16 aspect-h-9 w-full bg-gray-800 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover absolute inset-0"
                />
              </div>
              
              <div className="p-6">
                <span className="text-sm text-blue-400">{project.category}</span>
                <h3 className="text-xl font-medium mt-1">{project.title}</h3>
                <p className="mt-2 text-gray-300">{project.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Link 
                  href={projectUrl} 
                  target={isExternalLink ? "_blank" : undefined} 
                  rel={isExternalLink ? "noopener noreferrer" : undefined} 
                  className="px-6 py-3 border border-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
                >
                  {project.blogUrl ? "Read Blog" : "View Project"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
} 