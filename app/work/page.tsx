import type { Metadata } from 'next';
import Frame from '@/components/frame';
import { experience } from '@/data/experience';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Work',
  description: `Where ${site.name} has worked.`,
};

export default function WorkPage() {
  return (
    <Frame current="/work" title="Work">
      {experience.map((job) => (
        <div key={`${job.company}-${job.period}`}>
          <p>
            <b>{job.company}</b>, {job.title}
            <br />
            <span className="meta">
              {[job.location, job.period].filter(Boolean).join(', ')}
            </span>
          </p>
          <ul>
            {job.description.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </Frame>
  );
}
