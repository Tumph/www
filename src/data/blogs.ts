export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  content: string;
  coverImage?: string;
  isProjectBlog: boolean;
  projectId?: number;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Hyperloo: Building a Knowledge Graph for University Courses",
    slug: "hyperloo-project-blog",
    date: "2025-04-23",
    summary: "How I built an algorithmically generated knowledge graph for UWaterloo programs and courses",
    content: `
Hyperloo is a knowledge graph that maps out all topics, courses, and degrees at the University of Waterloo. Traditional degree structures tend to be abstract, making it difficult to visualize the interconnected nature of knowledge. I wanted to change that. What if you could represent an entire degree visually - showing how concepts interlink and build on one another? That question led me deep into knowledge graphs, which I found incredibly powerful as a tool for structuring and exploring complex domains.

## Why Knowledge Graphs?

Concepts are inherently nested objects. Take nuclear physics - understanding the entire field seems daunting. But break it down, and it's really just a collection of interconnected subtopics. Each of those subtopics can be further divided, creating a layered structure that makes even the most complex subjects feel approachable. Knowledge graphs embody this philosophy: no topic is truly out of reach if broken down correctly. Seeing how subjects connect makes learning more intuitive, empowering students to explore topics they once thought were beyond them.

One of my key inspirations was the Socratica graph matching from the 2023 Socratica Symposium. As graph tooling continues to improve, I believe we'll see knowledge graphs become a standard way to represent and navigate information.

## Building Hyperloo

Creating Hyperloo was a long and technically challenging process. The first step was data collection: scraping every Waterloo syllabus to form a base knowledge corpus. We used Selenium to automate the scraping, parsing programs, courses, and subtopics iteratively. This required multiple browser automation scripts to extract structured data from unstructured web pages. The process was labor-intensive, but necessary.

Once we had a structured corpus, the next challenge was transforming raw syllabus text into meaningful graph data. We trained a custom NLP model using SpaCy to extract key information. The NLP pipeline was relatively simple - a classification model trained with labeled examples to recognize important syllabus components. After multiple iterations, we achieved ~92% accuracy, which was sufficient for our needs. The model's purpose wasn't perfect precision but rather rough approximation to filter syllabus content into useful knowledge nodes.

With the extracted information, we structured the data into a nested JSON format that could be easily visualized as a graph. To generate these structured JSON objects, we used OpenAI's Batch API, processing large volumes of text and distilling them into a structured hierarchy. The result was a massive JSON-L file representing Waterloo's academic knowledge as a network of interconnected topics.

Finally, we built the front end using React, leveraging the GraphForce component to render the knowledge graph. While some customization was required to optimize the visualization, the hardest part of the project was the data transformation itself - getting from raw syllabi to structured knowledge nodes.

## Impact and Utility

Hyperloo has already gained traction. After sharing it on LinkedIn and Twitter, it received over 250 likes on LinkedIn and 100+ on Twitter. More importantly, it was bookmarked 17 times on Twitter - an indicator that people actually intend to use it as a reference.

For Waterloo students, the utility is clear. Hyperloo provides a structured, visual way to explore degree programs, understand prerequisite relationships, and dive into any topic of interest. Even if only a few dozen students actively use it, that's a meaningful outcome for me.

But the implications go beyond Waterloo. With Hyperloo, anyone, anywhere in the world, can effectively trace the structure of a Waterloo degree and use it as a self-learning roadmap. Even though it's not a complete curriculum, the ability to map out an entire field and navigate it freely is incredibly powerful. In theory, a student in South Sudan or any remote region could use Hyperloo, coupled with Perplexity AI and other online resources, to pursue an entire degree's worth of knowledge for free.

## What's Next?

Before starting any project, I ask myself: if I were to disappear tomorrow, what would I leave behind? Hyperloo is one of those projects that feels genuinely useful - not just to me, but to the broader world. If it grows, it could be a foundational resource for structured, open-access education. That's the kind of impact worth building for.

Check out the production version of Hyperloo [here](https://tumph.github.io/hyperlooprod/).


    `,
    coverImage: "/hyperloo.png",
    isProjectBlog: true,
    projectId: 1,
    tags: ["NLP", "Web Scraping", "Knowledge Graph", "Next.js"]
  },
  {
    id: "2",
    title: "Doledesk: Automating Substitute Teacher Scheduling",
    slug: "doledesk-project-blog",
    date: "2023-03-15",
    summary: "How I built a system to automate substitute teacher scheduling",
    content: `
In 2023, I started looking into inefficiencies in school operations - areas where automation could replace tedious, repetitive processes. Automation was becoming increasingly practical, and I wanted to build something with real impact. That led me to a conversation with my high school's vice principal. I asked a simple question: “What are the most time-consuming tasks you deal with daily?”

The answer was clear: substitute teacher scheduling. Every morning, administrators scrambled to check which teachers were absent, cross-referencing a massive spreadsheet to manually assign substitutes. It was an inefficient, error-prone process - one that was ripe for automation. That insight led me to build Doledesk, a system designed to fully automate substitute teacher scheduling using a rules-based algorithm.

## The Complexity of Scheduling

At first, scheduling substitutes seemed like a straightforward problem - identify absent teachers and match them with available subs. But the deeper I went, the more complexity I uncovered. Several constraints made this a non-trivial problem:

Legal Compliance: Many school districts have strict labor laws. For example, a teacher can't work more than three consecutive periods without a break.

Subject Matching: Not all substitutes can teach every subject. A math teacher shouldn't be assigned to an English class.

Multi-Layered Dependencies: If one substitute isn't available, the entire schedule may need to be reshuffled dynamically.

Data Privacy Restrictions: Storing teacher data required careful adherence to K-12 privacy regulations, meaning traditional database solutions weren't viable.

These constraints required a robust, flexible system capable of handling real-world edge cases while optimizing for efficiency.

## Building Doledesk

The core of Doledesk was a backend system built with Java and JavaScript, designed to process teacher absences and dynamically assign substitutes. Here's how it worked:

Data Input Pipeline: Each morning, a fresh list of absent teachers was fed into the system. Since storing persistent data wasn't an option due to privacy regulations, all scheduling had to happen in real-time.

Algorithmic Matching: The backend used a constraint-satisfaction algorithm to assign substitutes based on availability, subject expertise, and legal guidelines. If an optimal match wasn't found, the algorithm recursively adjusted placements.

Automated Notifications: Once schedules were finalized, the system sent out automated email notifications to substitutes and teachers.

Failsafe Mechanisms: If any substitute declined their assignment, the system reran the matching algorithm to fill gaps dynamically.

For the UI, I opted for Bubble, a no-code editor, to accelerate frontend development. This allowed administrators to interact with the system seamlessly without requiring any technical expertise.

## Deployment and Impact

Once Doledesk was live, my school used it for a month. The result? Administrators who previously spent hours manually assigning substitutes were now completing the process in minutes. What used to be a chaotic, last-minute scramble was now a structured, automated workflow.

While this project started as an experiment, it quickly became something more - proof that automation can significantly reduce administrative overhead in education. Doledesk wasn't just about saving time; it was about ensuring that students always had the right teachers in place, improving the overall classroom experience.

## What's Next?

Doledesk validated an important idea: many outdated, manual processes in education can be automated with the right approach. Looking forward, I see opportunities to expand this concept beyond substitute scheduling - perhaps into broader school operations or even district-wide automation tools.
    `,
    coverImage: "/doledesk.png",
    isProjectBlog: true,
    projectId: 2,
    tags: ["Java", "JavaScript", "Bubble"]
  },
  {
    id: "3",
    title: "Pare: Summarizing Resumes on Any ATS",
    slug: "pare-project-blog",
    date: "2024-09-3",
    summary: "How I built a browser extension to summarize resumes on any ATS",
    content: `
## The Hiring Challenge

In 2024, I embarked on a project to tackle inefficiencies in the recruiting industry, a journey inspired by my experience with the Waterloo Co-op program. My first co-op was at an AI company called ada, and while the opportunity was exciting, the hiring process itself was frustratingly arduous. Securing the position required significant effort, and the lack of feedback or even rejection emails while applying to other jobs left me feeling like my resume was getting lost in the void.

At first, I blamed recruiters, assuming they weren't reviewing resumes properly. However, after speaking with several recruiters, I realized the problem wasn't them - it was the sheer volume of applications they had to process daily. Some recruiters I spoke to had thousands of resumes to sift through, often spending only 5-10 seconds per resume. Given these constraints, it became clear that recruiters simply didn't have the bandwidth to provide personalized responses to every applicant.

This insight led me to ask: Could technology streamline this process and help recruiters make better decisions, faster? That's when I built Pare, a resume summarization tool designed to make the recruiting process more efficient.

## Introducing Pare: A Resume Summarizer for ATS Platforms

Pare is a browser extension that integrates with any Applicant Tracking System (ATS) to help recruiters process resumes faster. For those unfamiliar, an ATS is the software recruiters use to track applicants, manage job postings, and oversee hiring pipelines - it's like CRM software but tailored for recruiting.

Since recruiters only have a few seconds to assess a resume, I saw an opportunity to reduce cognitive load by providing structured, AI-generated summaries. The goal was simple: help recruiters get to the essence of a candidate's experience in a fraction of the time.

## The Technical Approach

Building Pare came with significant technical challenges. The primary complexity lay in making the extension work seamlessly across multiple ATS platforms, each with its own data structures and UI implementations. Some ATS platforms rely on React components, others use HTML pop-ups, and some simply display plain text.

Here's how Pare works:

Resume Extraction: Pare uses PDF.js to extract the text from resumes displayed in ATS platforms.

AI-Powered Summarization: The extracted resume text is then fed into OpenAI's GPT model with structured prompting to generate a concise, recruiter-friendly summary.

Dynamic Integration: The extension identifies different ATS architectures and adapts accordingly to display the summarized resume in the appropriate section of the UI.

## Overcoming Edge Cases

A key challenge in developing Pare was ensuring its functionality across different ATS platforms. Some ATS systems store resume data in embedded JavaScript objects, while others use dynamically generated iframes. To address these variations, Pare includes:

DOM Inspection and Adaptation: The extension dynamically detects how the ATS renders resumes and adapts its extraction process accordingly.

Asynchronous Handling: Since ATS platforms load data asynchronously, Pare waits for DOM elements to fully render before extracting content, preventing errors from incomplete data.

Cross-Origin Requests: Some ATS platforms restrict direct access to resume content, requiring workarounds like injecting scripts into the page context to retrieve the necessary data.

## Adoption and Impact

Since launching Pare, several recruiters - many of whom I connected with during the development process - have started using it. A few of my friends running startups with high hiring volumes have also adopted it to streamline their recruiting workflows.

The extension is available on GitHub, where users can configure it with their own OpenAI API key and install it as an unpacked Chrome extension via Developer Tools. By reducing the time recruiters spend reading resumes, Pare helps them focus on identifying the best candidates rather than drowning in an overwhelming sea of applications.

## What's Next?

Pare is just the beginning. There are still many inefficiencies in the hiring process that can be optimized with AI-driven tools. Future iterations of Pare could incorporate:

Customizable Summarization Styles: Allowing recruiters to tweak summary formats based on industry-specific needs.

Multi-Resume Comparisons: Automatically highlighting key differentiators between candidates.

Integration with More ATS Platforms: Expanding native support for widely used recruiting systems.

At its core, Pare is about making hiring more efficient - both for recruiters and job seekers. By leveraging AI to handle tedious, high-volume tasks, recruiters can spend more time on what truly matters: connecting great candidates with great opportunities.
    `,
    coverImage: "/pare.png",
    isProjectBlog: true,
    projectId: 3,
    tags: ["JavaScript", "HTML/CSS", "Git", "PDF.js"]
  },
  {
    id: "4",
    title: "SAI Microjet: Optimizing Sulfur Ratios for Geoengineering",
    slug: "sai-microjet-project-blog",
    date: "2022-07-09",
    summary: "Developing a hardware rig and firmware system for a microjet engine to test optimal sulfur ratios for stratospheric aerosol injection.",
    content: `
## A Climate Engineering Experiment

Climate change is one of the most pressing challenges of our time. At its core, it is an energy problem - greenhouse gases trap more solar radiation in the Earth's atmosphere, increasing surface temperatures. Efforts to mitigate climate change generally fall into two categories: reducing carbon emissions (by transitioning to renewable energy) and removing carbon already in the atmosphere (through carbon capture technologies). However, both approaches require significant time to scale up, which is why an alternative method, geoengineering, has been proposed as a temporary measure to offset rising global temperatures.

Geoengineering strategies aim to reduce the amount of solar radiation reaching Earth. Among the various proposals - such as placing giant mirrors in space or brightening marine clouds - one of the most promising and realistic methods is stratospheric aerosol injection (SAI). This technique involves releasing small aerosol particles, such as sulfur compounds, into the stratosphere to reflect sunlight and cool the planet, similar to how volcanic eruptions impact global temperatures. A historical example of this effect was the 1991 eruption of Mount Pinatubo, which led to a temporary global cooling of 1-2 degrees Celsius.

A Practical Approach: Sulfur Injection via Jet Engine Fuel

Rather than deploying a specialized fleet of aircraft carrying sulfur dioxide tanks for stratospheric aerosol injection, my project explored a more efficient approach: integrating sulfur directly into jet fuel. This concept allows aircraft to release sulfur precursors passively as they fly, eliminating the need for dedicated spraying equipment.

My research, conducted with Andrew Lockley from University College London, began with a conceptual analysis of this approach. However, to validate the feasibility of sulfur-infused jet fuel, I moved beyond theory into practical experimentation.

## Testing with a Microjet Engine

To test the concept, I acquired a microjet engine - a scaled-down jet engine that operates on the same physical principles as full-scale aircraft turbines. Instead of experimenting on a multimillion-dollar Rolls-Royce engine, a microjet provided a cost-effective, low-risk way to evaluate fuel modifications.

## Experiment Design

The experiment involved three key components:

Engine Modification & Sensor Integration:

The microjet engine had built-in safety mechanisms that prevented it from running when detecting foreign substances in the fuel. I modified the firmware to bypass these restrictions and allow sulfur-infused fuel to be burned.

## Measuring Sulfur Dioxide Emissions:

A sulfur dioxide sensor was placed in a metal tube behind the engine to monitor emissions and quantify how much sulfur was successfully converted from fuel to atmospheric aerosol precursors.

## Thrust Performance Analysis:

The engine was mounted on a force dynamo, which measured changes in thrust output. Since fuel composition can impact engine efficiency, it was important to determine if adding sulfur affected performance.

## Findings

The results confirmed the fundamental hypothesis: adding sulfur to the fuel led to increased sulfur dioxide emissions, making this a viable method for stratospheric aerosol injection. However, an interesting tradeoff emerged:

Small amounts of sulfur improved engine performance slightly while still generating the desired emissions.

Excessive sulfur content led to a decline in thrust output, which could make it difficult for an aircraft to reach the stratosphere.

This revealed a crucial optimization problem - balancing sulfur levels to maximize climate impact while maintaining efficient aircraft performance.

## Implications & Future Research

While SAI remains a high-risk, last-resort solution for climate change, my project demonstrated that passively integrating sulfur into jet fuel is a feasible approach to geoengineering. It eliminates the need for dedicated spraying infrastructure and aligns with existing aviation technology.

Of course, serious risks remain. Any large-scale geoengineering effort requires extensive environmental modeling and international collaboration. History has shown that manipulating natural systems can have unintended consequences. Therefore, SAI should not be seen as an immediate solution, but rather as a potential tool for the future - one that could be deployed if climate conditions become dire enough to warrant it.

This project was an exciting step toward understanding practical climate intervention methods. The next phase could involve further optimizing the fuel mixture, testing on larger jet engines, and assessing the long-term atmospheric impacts of such an approach. While geoengineering is not a silver bullet, it may one day provide a crucial buffer as humanity transitions to a sustainable energy future.

    `,
    coverImage: "/geoeng.jpg",
    isProjectBlog: true,
    projectId: 4,
    tags: ["Python", "Firmware", "Mechanical Design", "CAD"]
  }
];

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find(post => post.slug === slug);
}

export async function getProjectBlog(projectId: number): Promise<BlogPost | undefined> {
  return blogPosts.find(post => post.isProjectBlog && post.projectId === projectId);
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  return blogPosts;
}

export async function getNonProjectBlogs(): Promise<BlogPost[]> {
  return blogPosts.filter(post => !post.isProjectBlog);
}

export async function getProjectBlogs(): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.isProjectBlog);
} 