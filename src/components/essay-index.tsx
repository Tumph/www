import type { BlogPost } from '@/data/blogs';
import { shortDate, year } from '@/lib/dates';

// A dated list of essays, newest first. The year is printed once, in the left
// margin, at the start of each year's run, like an old weblog archive.
export default function EssayIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <table className="index">
      <tbody>
        {posts.map((post, i) => {
          const y = year(post.date);
          const newYear = i === 0 || year(posts[i - 1].date) !== y;
          return (
            <tr key={post.slug} className={newYear && i > 0 ? 'year-start' : undefined}>
              <td className="index-year">{newYear ? y : ''}</td>
              <td className="index-date">{shortDate(post.date)}</td>
              <td>
                <a href={`/blogs/${post.slug}`}>{post.title}</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
