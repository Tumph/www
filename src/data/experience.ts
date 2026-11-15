export type Job = {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
};

// Newest first.
export const experience: Job[] = [
  {
    title: 'Co-founder & CEO',
    company: 'Tell',
    period: 'Now',
    description: ['Building Tell (trytell.ai).'],
  },
  {
    title: 'Research Intern',
    company: 'Convictional',
    location: 'Waterloo, Ontario',
    period: 'May 2026 – Aug. 2026',
    description: [
      'Led a research experiment into company decisions to goals; the winning method scored 4.81/5 on evals while producing 57–62% fewer links.',
      "Recruited experts across 5 teams and built the world's first work routing benchmark: on which top models routed work correctly 64% of the time.",
      'Designed a daily company snapshot experiment involving time dimension ontology, that preserved decisions and goals without maintaining a costly web of relationships.',
    ],
  },
  {
    title: 'ML Engineer Intern',
    company: 'Shopify',
    location: 'Toronto, Ontario',
    period: 'Sept. 2025 – Dec. 2025',
    description: [
      "Working on Sidekick, Shopify's assistant empowering merchants to build their shops using AI.",
      'Building App Gen, an agentic system that programmatically generates merchant-facing apps.',
      'Shipped a judging framework in my first 2 weeks for the App Gen planning agent, scoring plan quality and correctness; work was presented to Tobi (CEO) for guiding improvements.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Arbiter',
    location: 'New York, United States',
    period: 'Sept. 2024 – Dec. 2024',
    description: [
      "Designed and built a monorepo for Arbiter's trade data monitoring platform, integrating a React.js frontend, Flask backend, and MongoDB database.",
      'Developed a microservices-based architecture with secure JWT authentication and RESTful APIs for efficient trade data management.',
      'Implemented CSV data ingestion, filtering, and export features, optimizing data handling and user accessibility.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Ada',
    location: 'Toronto, Ontario',
    period: 'Jan. 2024 – Mar. 2024',
    description: [
      'Developed front end components using React and Typescript, and optimized features within the client interface, reporting framework, and guidance tab.',
      'Initiating meetings with mentors within the company, developing a deep understanding of Elasticsearch, RabbitMQ, and Redis.',
    ],
  },
  {
    title: 'Engineering Lead',
    company: 'Mustang Technology Labs',
    location: 'Edison, New Jersey',
    period: 'May 2021 – Jun. 2023',
    description: [
      'Used Python to build firmware for air distribution and breathing pathways for maximal absorption of water and contaminants. Moisture absorption rate went from nonexistant to around 50-60% past 30% humidity. Currently applying for a patent on this technology.',
      'Utilized metal organic frameworks (Aluminum Fumerate MOF) to create novel breathing apparatus during the pandemic for patients with COPD.',
    ],
  },
  {
    title: 'Engineering Lead',
    company: 'Junior Jet Propulsion Lab',
    location: 'Edison, New Jersey',
    period: 'Jun. 2020 – Jun. 2023',
    description: [
      'Built and utilized a Java Plugin on the openrocket platform to predict vehicle performance to 0.15% error.',
      'Worked in conjunction with the head of Princeton Rocketry, and led a team to the TARC National Finals out of 800 teams from 49 US States.',
    ],
  },
  {
    title: 'Founder',
    company: 'eggsplain.us',
    location: 'Edison, New Jersey',
    period: 'Apr. 2019 – Feb. 2022',
    description: [
      'Founded and grew a platform for online notes to 9.6k users, with 1.3k monthly active users.',
      'Developed and implemented PHP and Python features for the forum, built a reactive front end for the platform.',
      "Got 2nd Place Pitch @ Seton Hall's Pirates Pitch, from young entrepreneurs in 17 U.S. states and 10 countries.",
    ],
  },
];
