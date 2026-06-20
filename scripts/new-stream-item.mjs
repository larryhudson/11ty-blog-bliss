// Creates a new stream post (reading / building) from a URL + description.
// The page title is fetched and parsed here so the Apple Shortcut only has to
// send the URL and a short description.
//
// Inputs (env): URL (required), DESCRIPTION (optional), TYPE (default "reading")
// On GitHub Actions it appends title/path/branch/slug to $GITHUB_OUTPUT.
// Dependency-free: uses Node built-ins and global fetch (Node 18+).

import { writeFile, mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';

const url = (process.env.URL || '').trim();
const description = (process.env.DESCRIPTION || '').trim();
const type = (process.env.TYPE || 'reading').trim();

if (!url) {
  console.error('URL is required (set the URL env var).');
  process.exit(1);
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#0*39;|&#x0*27;/gi, '\'')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

async function fetchTitle(target) {
  try {
    const res = await fetch(target, {
      headers: { 'user-agent': 'Mozilla/5.0 (stream-item-bot)' },
      redirect: 'follow',
    });
    const html = await res.text();
    const og =
      html.match(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
    if (og) return decodeEntities(og[1]).trim();
    const t = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (t && t[1].trim()) return decodeEntities(t[1]).trim();
  } catch (err) {
    console.error('Could not fetch title:', err.message);
  }
  return url; // fall back to the URL itself
}

function slugify(s) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60)
      .replace(/-+$/g, '') || 'item'
  );
}

function yamlQuote(s) {
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

const title = await fetchTitle(url);

const now = new Date();
const yyyy = String(now.getFullYear());
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
const dateStr = `${yyyy}-${mm}-${dd}`;

const slug = slugify(title);
const dir = path.join('content', 'posts', yyyy);
const filepath = path.join(dir, `${mm}-${dd}-${slug}.md`);

const tags = type === 'building' ? ['ai', 'building'] : ['ai', 'reading'];
const tagLines = tags.map((t) => `  - ${t}`).join('\n');
const body = description || `[${title}](${url})`;

const content = `---
title: ${yamlQuote(title)}
description: ${yamlQuote(description || title)}
date: ${dateStr}
type: ${type}
externalUrl: ${url}
tags:
${tagLines}
---

${body}
`;

await mkdir(dir, { recursive: true });
await writeFile(filepath, content, 'utf8');

console.log(`Created ${filepath}`);
console.log(`Title: ${title}`);

if (process.env.GITHUB_OUTPUT) {
  const branch = `${type}-${dateStr}-${slug}`.slice(0, 80);
  await appendFile(
    process.env.GITHUB_OUTPUT,
    `title=${title}\npath=${filepath}\nbranch=${branch}\nslug=${slug}\n`
  );
}
