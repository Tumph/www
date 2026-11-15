import type { Metadata } from 'next';
import Frame from '@/components/frame';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `How to reach ${site.name}.`,
};

export default function ContactPage() {
  const [school, personal] = site.emails;
  return (
    <Frame current="/contact" title="Contact">
      <p>
        Email: <a href={`mailto:${personal}`}>{personal}</a>
        <br />
        School: <a href={`mailto:${school}`}>{school}</a>
      </p>

      <p>
        Or DM me on <a href={site.twitter}>Twitter</a>.
      </p>
    </Frame>
  );
}
