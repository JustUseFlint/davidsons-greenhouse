import { mkdirSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from './site.mjs';
import { CATS } from './cats.mjs';
import { loadPlants, plantPage, catalogPage, categoryPage, setBy } from './plants.mjs';
import { home, staticPages, notFound } from './pages.mjs';
import { loadPosts, postPage, journalIndex, journalCat, JCATS } from './journal.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..');
const GEN = ['plants', 'journal', 'about', 'seasonal', 'landscaping', 'custom-containers', 'hanging-baskets', 'mulch-stone-soil', 'gifts-and-goods', 'events', 'visit', 'contact', 'faq', 'reviews', 'gallery', 'careers', 'garden-guide'];
for (const d of GEN) rmSync(join(OUT, d), { recursive: true, force: true });

const pages = [];
const put = (path, html) => { const f = path.endsWith('.html') ? join(OUT, path) : join(OUT, path, 'index.html'); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); pages.push(path); };

const { all, by } = await loadPlants(); setBy(by);
const posts = await loadPosts(join(HERE, 'posts'));
for (const p of posts) for (const s of p.plants || []) if (!by.has(s)) console.warn(`post ${p.slug}: unknown plant ${s}`);

const h = home(all, posts); put(h.path, h.html);
for (const pg of staticPages(all, posts)) put(pg.path, pg.html);
put('plants/', catalogPage(all));
for (const c of CATS) put(`plants/category/${c.id}/`, categoryPage(c, all.filter(p => p.c === c.id), posts));
for (const p of all) put(`plants/${p.slug}/`, plantPage(p));
put('journal/', journalIndex(posts));
for (const c of JCATS) put(`journal/category/${c[0]}/`, journalCat(c, posts));
for (const p of posts) put(`journal/${p.slug}/`, postPage(p, posts, by));
const nf = notFound(); put(nf.path, nf.html);

const today = '2026-11-15';
const urls = pages.filter(p => p !== '404.html');
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
writeFileSync(join(OUT, '.nojekyll'), '');
console.log(`built ${pages.length} pages: ${all.length} plants, ${posts.length} posts`);
console.log(posts.map(p => `${p.words}\t${p.slug}`).join('\n'));
