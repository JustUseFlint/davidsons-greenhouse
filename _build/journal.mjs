import { esc, pic, ico, btn, crumbs, crumbLd, page } from './shell.mjs';
import { SITE, LEGAL, PHONE, TEL } from './site.mjs';
import { md, words } from './md.mjs';
import { card, jcard } from './plants.mjs';
import { faqLd } from './pages.mjs';
import { readdirSync } from 'node:fs';

export const JCATS = [['planning', 'Planning & timing'], ['vegetables', 'Vegetables & fruit'], ['flowers', 'Flowers & perennials'], ['trees', 'Trees & shrubs'], ['indoor', 'Houseplants & containers'], ['wildlife', 'Wildlife & pollinators']];
const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export async function loadPosts(dir) {
  const files = readdirSync(dir).filter(f => f.endsWith('.mjs')).sort();
  const posts = [];
  for (const f of files) {
    const p = (await import(`${dir}/${f}`)).default;
    const faqWords = p.faq.reduce((n, [q, a]) => n + words(q) + words(a), 0);
    p.words = words(p.body) + faqWords;
    p.mins = Math.max(1, Math.round(p.words / 230));
    posts.push(p);
  }
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return posts;
}

export function postPage(p, posts, by) {
  const root = '../../', path = `journal/${p.slug}/`;
  const { html, toc } = md(p.body, root);
  const items = [['Home', ''], ['Garden journal', 'journal/'], [p.title, path]];
  const plants = (p.plants || []).map(s => by.get(s)).filter(Boolean).slice(0, 8);
  const more = posts.filter(q => q !== p).map(q => [q.jcat === p.jcat ? 1 : 0, q]).sort((a, b) => b[0] - a[0]).slice(0, 3).map(x => x[1]);
  const art = { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.desc, image: [SITE + `assets/img/${p.img}-1600.jpg`], datePublished: p.date, dateModified: p.updated || p.date, author: { '@type': 'Organization', name: LEGAL, url: SITE }, publisher: { '@type': 'Organization', name: LEGAL, logo: { '@type': 'ImageObject', url: SITE + 'assets/img/apple-touch-icon.png' } }, mainEntityOfPage: SITE + path, wordCount: p.words, articleSection: JCATS.find(c => c[0] === p.jcat)?.[1] };
  const main = `<div class="progress" aria-hidden="true"><i data-progress></i></div>
<article class="post">
  <header class="post-hero wrap">
    ${crumbs(root, items)}
    <p class="eyebrow"><a href="${root}journal/category/${p.jcat}/">${esc(JCATS.find(c => c[0] === p.jcat)[1])}</a></p>
    <h1 class="post-h" data-split>${esc(p.title)}</h1>
    <p class="lead">${esc(p.dek)}</p>
    <p class="post-meta"><span>By ${esc(LEGAL)}</span><span><time datetime="${p.date}">${fmtDate(p.date)}</time></span><span>${p.mins} min read</span></p>
  </header>
  <figure class="post-fig wrap"><div class="clip-reveal">${pic(root, p.img, p.imgAlt, { eager: true, sizes: '(min-width: 1200px) 1100px, 100vw' })}</div>${p.imgCap ? `<figcaption>${esc(p.imgCap)}</figcaption>` : ''}</figure>
  <div class="post-grid wrap">
    <aside class="toc" aria-label="On this page"><p class="eyebrow">On this page</p><ol>${toc.map(([id, t]) => `<li><a href="#${id}" data-toc="${id}">${esc(t)}</a></li>`).join('')}<li><a href="#faq" data-toc="faq">Frequently asked questions</a></li></ol></aside>
    <div class="post-body prose">
      ${html}
      <section class="post-faq" id="faq" aria-labelledby="faq-h"><h2 id="faq-h">Frequently asked questions</h2><div class="faq">${p.faq.map(([q, a]) => `<details class="qa"><summary><span>${esc(q)}</span>${ico.down}</summary><div class="qa-a"><p>${esc(a)}</p></div></details>`).join('')}</div></section>
      ${p.sources?.length ? `<section class="sources" aria-labelledby="src-h"><h2 id="src-h" class="h5">Further reading &amp; sources</h2><ul>${p.sources.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('')}</ul></section>` : ''}
      <div class="post-cta"><p><strong>Questions about your own garden?</strong> Call us at <a href="${TEL}">${PHONE}</a> or stop by the greenhouse. Bring photos.</p></div>
    </div>
  </div>
  ${plants.length ? `<section class="wrap sec"><div class="sec-head"><p class="eyebrow">Plants in this article</p><h2 class="h2">Find them in the catalog</h2></div><div class="pgrid pgrid-4">${plants.map(q => card(root, q)).join('')}</div></section>` : ''}
  <section class="wrap sec"><div class="sec-head"><p class="eyebrow">Keep reading</p><h2 class="h2">More from the journal</h2></div><div class="jgrid">${more.map(q => jcard(root, q)).join('')}</div></section>
</article>`;
  return page({ root, path, title: p.seoTitle || `${p.title} | Davidson Greenhouse`, desc: p.desc, main, body: 'pg-post', img: p.img, type: 'article', ld: [crumbLd(items), art, faqLd(p.faq)] });
}

export function journalIndex(posts) {
  const root = '../', path = 'journal/';
  const [lead, ...rest] = posts;
  const main = `<section class="pg-hero wrap">${crumbs(root, [['Home', ''], ['Garden journal', 'journal/']])}<div class="pg-hero-in"><p class="eyebrow">The garden journal</p><h1 class="h1" data-split>Long reads for gardening in central Indiana.</h1><p class="lead">Detailed guides from the greenhouse on timing, planting and care, written for Montgomery County soil and weather.</p></div>
  <nav class="jcats" aria-label="Journal categories"><a href="${root}journal/" aria-current="page">All</a>${JCATS.map(([id, n]) => `<a href="${root}journal/category/${id}/">${esc(n)}</a>`).join('')}</nav></section>
  <section class="wrap sec-tight"><div class="jgrid jgrid-lead">${jcard(root, lead, true)}</div></section>
  <section class="wrap sec"><div class="jgrid">${rest.map(q => jcard(root, q)).join('')}</div></section>`;
  return page({ root, path, title: 'Garden Journal: Central Indiana Gardening Guides | Davidson Greenhouse', desc: 'In-depth gardening guides for Crawfordsville and central Indiana: planting calendars, frost dates, tomatoes, perennials, trees, containers, pollinators and more.', main, body: 'pg-journal', img: lead.img, ld: [crumbLd([['Home', ''], ['Garden journal', 'journal/']]), { '@context': 'https://schema.org', '@type': 'Blog', name: 'Davidson Greenhouse Garden Journal', url: SITE + path, blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: SITE + `journal/${p.slug}/`, datePublished: p.date })) }] });
}

export function journalCat([id, n], posts) {
  const root = '../../../', path = `journal/category/${id}/`;
  const list = posts.filter(p => p.jcat === id);
  const items = [['Home', ''], ['Garden journal', 'journal/'], [n, path]];
  const main = `<section class="pg-hero wrap">${crumbs(root, items)}<div class="pg-hero-in"><p class="eyebrow">Garden journal</p><h1 class="h1" data-split>${esc(n)}</h1></div>
  <nav class="jcats" aria-label="Journal categories"><a href="${root}journal/">All</a>${JCATS.map(([i, t]) => `<a href="${root}journal/category/${i}/"${i === id ? ' aria-current="page"' : ''}>${esc(t)}</a>`).join('')}</nav></section>
  <section class="wrap sec"><div class="jgrid">${list.map(q => jcard(root, q)).join('')}</div></section>`;
  return page({ root, path, title: `${n} | Garden Journal | Davidson Greenhouse`, desc: `Davidson Greenhouse garden journal articles on ${n.toLowerCase()} for Crawfordsville and central Indiana.`, main, img: list[0]?.img, ld: [crumbLd(items)] });
}
