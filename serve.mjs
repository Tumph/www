// Serves dist/ on http://localhost:3047 the way Vercel does: /blogs finds
// blogs.html, and anything missing gets 404.html. Rebuilds on every page
// request, so edits show up on reload. No packages, only Node's own http.
//
//   node serve.mjs [port]

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const PORT = Number(process.argv[2] ?? process.env.PORT ?? 3047);
const ROOT = path.resolve('dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.xml': 'application/rss+xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
};

function build() {
  try {
    execFileSync(process.execPath, ['build.mjs'], { stdio: 'inherit' });
  } catch {
    console.error('Build failed; serving the last good build.');
  }
}

function find(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const base = path.join(ROOT, clean);
  if (!base.startsWith(ROOT)) return null;
  for (const file of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

build();
http
  .createServer((req, res) => {
    const urlPath = new URL(req.url, 'http://localhost').pathname;
    if (!path.extname(urlPath) || urlPath.endsWith('.html')) build();
    const file = find(urlPath);
    const status = file ? 200 : 404;
    const body = file ?? path.join(ROOT, '404.html');
    res.writeHead(status, { 'Content-Type': TYPES[path.extname(body)] ?? 'application/octet-stream' });
    fs.createReadStream(body).pipe(res);
  })
  .listen(PORT, () => console.log(`Serving dist/ at http://localhost:${PORT}`));
