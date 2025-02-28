type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Arbiter",
    location: "New York, United States",
    period: "Sept. 2024 – Dec. 2024",
    description: [
      "Designed and built a monorepo for Arbiter's trade data monitoring platform, integrating a React.js frontend, Flask backend, and MongoDB database.",
      "Developed a microservices-based architecture with secure JWT authentication and RESTful APIs for efficient trade data management.",
      "Implemented CSV data ingestion, filtering, and export features, optimizing data handling and user accessibility."
    ]
  },
  {
    id: 2,
    title: "Software Engineering Intern",
    company: "Ada",
    location: "Toronto, Ontario",
    period: "Jan. 2024 – Mar. 2024",
    description: [
      "Developed front end components using React and Typescript, and optimized features within the client interface, reporting framework, and guidance tab.",
      "Initiating meetings with mentors within the company, developing a deep understanding of Elasticsearch, RabbitMQ, and Redis."
    ]
  },
  {
    id: 3,
    title: "Engineering Lead",
    company: "Mustang Technology Labs",
    location: "Edison, New Jersey",
    period: "May 2021 - Jun. 2023",
    description: [
      "Used Python to build firmware for air distribution and breathing pathways for maximal absorption of water and contaminants. Moisture absorption rate went from nonexistant to around 50-60% past 30% humidity. Currently applying for a patent on this technology.",
      "Utilized metal organic frameworks (Aluminum Fumerate MOF) to create novel breathing apparatus during the pandemic for patients with COPD."
    ]
  },
  {
    id: 4,
    title: "Engineering Lead",
    company: "Junior Jet Propulsion Lab",
    location: "Edison, New Jersey",
    period: "Jun. 2020 - Jun. 2023",
    description: [
      "Built and utilized a Java Plugin on the openrocket platform to predict vehicle performance to 0.15% error.",
      "Worked in conjunction with the head of Princeton Rocketry, and led a team to the TARC National Finals out of 800 teams from 49 US States."
    ]
  },
  {
    id: 5,
    title: "Founder",
    company: "eggsplain.us",
    location: "Edison, New Jersey",
    period: "Apr. 2019 - Feb. 2022",
    description: [
      "Founded and grew a platform for online notes to 9.6k users, with 1.3k monthly active users.",
      "Developed and implemented PHP and Python features for the forum, built a reactive front end for the platform.",
      "Got 2nd Place Pitch @ Seton Hall's Pirates Pitch, from young entrepreneurs in 17 U.S. states and 10 countries."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 tracking-tight">EXPERIENCE</h2>
      
      <div className="space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 border-l border-gray-800 hover:border-gray-700 transition-all duration-300">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-0"></div>
            <div className="mb-2 flex flex-wrap justify-between items-start">
              <div>
                <h3 className="text-xl font-medium">{exp.title}</h3>
                <p className="text-blue-400">{exp.company}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300">{exp.location}</p>
                <p className="text-gray-400">{exp.period}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {exp.description.map((item, index) => (
                <li key={index} className="text-gray-300 flex">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
} 