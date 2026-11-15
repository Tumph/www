// A small Markdown-to-HTML converter, covering what the essays use:
// headings, paragraphs, bulleted and numbered lists, block quotes, rules,
// fenced code, **bold**, *italic*, `code`, [links](url), <autolinks> and
// ![images](src). Raw HTML in an essay is shown as text, not run.

export function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(text) {
  // Pull out code spans first so nothing inside them gets formatted.
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, code) => {
    codes.push(`<code>${escapeHtml(code)}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });

  s = escapeHtml(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/&lt;(https?:\/\/[^\s&]+)&gt;/g, '<a href="$1">$1</a>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\w)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => codes[Number(i)]);
}

const BULLET = /^\s*[-*+]\s+(.*)$/;
const NUMBER = /^\s*\d+[.)]\s+(.*)$/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const RULE = /^\s*([-*_])(\s*\1){2,}\s*$/;
const FENCE = /^\s*```/;

export function markdown(source) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let i = 0;

  const isBlockStart = (line) =>
    HEADING.test(line) || RULE.test(line) || FENCE.test(line) || /^\s*>/.test(line) ||
    BULLET.test(line) || NUMBER.test(line);

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (FENCE.test(line)) {
      const code = [];
      i++;
      while (i < lines.length && !FENCE.test(lines[i])) code.push(lines[i++]);
      i++;
      out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      i++;
      continue;
    }

    if (RULE.test(line)) {
      out.push('<hr>');
      i++;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quoted = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        quoted.push(lines[i++].replace(/^\s*>\s?/, ''));
      }
      out.push(`<blockquote>\n${markdown(quoted.join('\n'))}\n</blockquote>`);
      continue;
    }

    const kind = BULLET.test(line) ? BULLET : NUMBER.test(line) ? NUMBER : null;
    if (kind) {
      // Items of the same kind stay in one list, even with blank lines between.
      const items = [];
      let loose = false; // blank lines between items space them like paragraphs
      while (i < lines.length) {
        const match = lines[i].match(kind);
        if (match) {
          items.push(match[1]);
          i++;
        } else if (lines[i].trim() && !isBlockStart(lines[i]) && items.length) {
          items[items.length - 1] += `\n${lines[i++].trim()}`;
        } else if (!lines[i].trim() && i + 1 < lines.length && kind.test(lines[i + 1])) {
          loose = true;
          i++;
        } else {
          break;
        }
      }
      const tag = kind === BULLET ? 'ul' : 'ol';
      out.push(`<${tag}>\n${items.map((item) => (loose ? `<li><p>${inline(item)}</p></li>` : `<li>${inline(item)}</li>`)).join('\n')}\n</${tag}>`);
      continue;
    }

    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !(paragraph.length && isBlockStart(lines[i]))) {
      paragraph.push(lines[i++].trim());
    }
    out.push(`<p>${inline(paragraph.join('\n'))}</p>`);
  }

  return out.join('\n');
}
