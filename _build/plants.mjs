import { esc, slugify, pic, ico, btn, crumbs, crumbLd, page } from './shell.mjs';
import { SITE, PHONE, TEL, GUIDE_PDF } from './site.mjs';
import { CATS, CAT } from './cats.mjs';
import dims from './img-dims.json' with { type: 'json' };

const FILES = ['houseplants', 'succulents', 'annuals', 'perennials1', 'perennials2', 'herbs', 'vegetables', 'fruit', 'trees', 'shrubs', 'grasses', 'water', 'seasonal'];
// Companion slugs written by hand in the data files that point at a page under a different name.
const ALIAS = { aster: 'new-england-aster', heuchera: 'coral-bells', allium: 'ornamental-onion', ajuga: 'bugleweed', brunnera: 'brunnera-jack-frost', 'peppers-sweet': 'sweet-peppers', 'peppers-hot': 'hot-peppers', potentilla: 'shrubby-cinquefoil', 'roses-shrub': 'shrub-roses', 'cardinal-climber': 'cypress-vine', 'squash-summer': 'summer-squash-and-zucchini', lettuce: 'lettuce', beans: 'green-beans', 'sweet-corn': 'sweet-corn-and-popcorn', 'kale-and-collards': 'kale-and-collards', 'peach-trees': 'peach-trees', 'st-johns-wort': 'st-johns-wort', 'lambs-ear': 'lambs-ear-and-betony', iris: 'bearded-iris', 'perennial-sunflower': 'perennial-sunflower', 'salvia-perennial': 'perennial-salvia', 'hen-and-chicks': 'hen-and-chicks', lamium: 'dead-nettle', 'crocosmia-lucifer': 'crocosmia-lucifer', sunflower: 'perennial-sunflower', tomato: 'tomato', cabbage: 'cabbage', cucumber: 'cucumbers', pumpkins: 'pumpkins', strawberries: 'strawberries', carrots: 'carrots', 'garden-mums': 'garden-mums', 'joe-pye': null, 'boston-fern': 'fern-hanging-basket', 'joseph-s-coat': 'josephs-coat', pachysandra: 'japanese-pachysandra', 'begonia-rex-cane': 'angel-wing-and-rex-begonia', alyssum: 'sweet-alyssum', 'salvia-annual': 'annual-salvia', spike: 'cordyline-and-spike', 'lady-s-mantle': 'ladys-mantle', yucca: 'yucca-color-guard', radish: 'radishes', 'lizard-s-tail': 'lizards-tail', calendula: null, pawpaw: null, ' ': null };

export async function loadPlants() {
  const all = [];
  for (const f of FILES) { const m = await import(`./data/${f}.mjs`); for (const p of m.default) all.push({ ...p, file: f }); }
  const by = new Map(); const dupes = [];
  for (const p of all) { p.slug = slugify(p.n); if (by.has(p.slug)) dupes.push(p.slug); by.set(p.slug, p); if (p.img && !dims[p.img]) { console.warn('missing img', p.img); delete p.img; } }
  if (dupes.length) throw new Error('duplicate plant slugs: ' + dupes.join(', '));
  const missing = new Set();
  for (const p of all) {
    p.co = [...new Set((p.co || []).map(s => (s in ALIAS ? ALIAS[s] : s)).filter(s => { if (!s) return false; if (!by.has(s)) { missing.add(s); return false; } return s !== p.slug; }))];
    p.cat = CAT[p.c]; if (!p.cat) throw new Error('bad category ' + p.c + ' for ' + p.n);
    p.L = p.L || []; p.t = p.t || []; p.v = p.v || [];
  }
  if (missing.size) console.warn('dropped unknown companions:', [...missing].join(', '));
  for (const p of all) {
    const score = q => (q.c === p.c ? 3 : 0) + q.t.filter(t => p.t.includes(t)).length + q.L.filter(l => p.L.includes(l)).length;
    p.rel = all.filter(q => q !== p && !p.co.includes(q.slug)).map(q => [score(q), q.slug, q]).sort((a, b) => b[0] - a[0] || a[1].localeCompare(b[1])).slice(0, 4).map(x => x[2]);
  }
  return { all, by };
}

// ——— Seed-packet artwork for plants without their own photo. Simple line drawings by plant form.
const ART = {
  flower: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M60 150V82"/><path d="M60 128c-14-2-24-12-26-26 14 1 24 10 26 26zM60 112c13-1 22-10 24-23-13 1-22 10-24 23z"/><circle cx="60" cy="58" r="9"/><path d="M60 49c-6-14 6-24 0-30-6 6 6 16 0 30zM69 58c14-6 24 6 30 0-6-6-16 6-30 0zM60 67c6 14-6 24 0 30 6-6-6-16 0-30zM51 58c-14 6-24-6-30 0 6 6 16-6 30 0zM66 52c8-12 22-8 24-17-9 2-12 16-24 17zM54 64c-8 12-22 8-24 17 9-2 12-16 24-17zM66 64c12 8 8 22 17 24-2-9-16-12-17-24zM54 52c-12-8-8-22-17-24 2 9 16 12 17 24z"/></g>',
  leaf: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M38 150h44l-5-26H43z"/><path d="M60 124V70"/><path d="M60 92C36 92 24 72 26 50c22 2 34 18 34 42zM60 80c22-2 34-20 32-42-22 2-32 20-32 42zM60 70c-4-16 2-30 14-40 6 16 0 30-14 40z"/><path d="M60 92L36 62M60 80l22-30"/></g>',
  tree: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M60 152v-48M60 122l-14-12M60 114l12-10"/><path d="M60 106c-28 0-40-16-36-34-10-14 2-34 18-32 4-16 32-18 38-2 18-4 30 16 22 30 8 18-8 38-42 38z"/><path d="M30 152h60"/></g>',
  conifer: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M60 22L40 58h10L32 90h12L24 124h72L76 90h12L70 58h10z"/><path d="M60 124v28M34 152h52"/></g>',
  fruit: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M60 52c-4-12 0-22 8-28"/><path d="M64 40c10-12 26-10 30-4-10 10-22 10-30 4z"/><path d="M60 56c-22-12-44 4-40 32 4 30 24 48 40 40 16 8 36-10 40-40 4-28-18-44-40-32z"/><path d="M38 84c2-8 8-14 14-16"/></g>',
  veg: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M60 62c-26 0-40 22-36 48 4 26 22 40 36 40s32-14 36-40c4-26-10-48-36-48z"/><path d="M60 62c-2-12 2-22 10-28M60 62c-10-10-24-10-30-4 8 8 20 8 30 4zM60 62c10-8 22-6 28 0-8 8-20 6-28 0z"/><path d="M44 92c-4 12-2 26 6 36M76 92c4 12 2 26-6 36"/></g>',
  grass: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M60 152C58 110 52 70 38 30M60 152c2-44 10-84 24-118M60 152c-6-34-20-62-40-80M60 152c6-36 22-64 42-78M60 152c0-48 0-90 0-128"/><path d="M38 30c-4-6-2-14 2-18M84 34c2-8 8-12 12-14M60 24c-3-6-1-12 3-16"/></g>',
  succulent: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M34 152h52l-6-30H40z"/><path d="M60 122c-8-14-8-30 0-44 8 14 8 30 0 44zM60 120c-18-4-30-18-32-34 16 2 28 14 32 34zM60 120c18-4 30-18 32-34-16 2-28 14-32 34zM60 122c-22 4-38-4-44-14 16-6 32-2 44 14zM60 122c22 4 38-4 44-14-16-6-32-2-44 14z"/></g>',
  water: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 128c10-6 20 6 30 0s20 6 30 0 20 6 30 0M24 144c10-6 20 6 30 0s20 6 30 0 16 4 20 2"/><path d="M60 118c-20 0-32-8-32-8s8-14 18-12c-2-14 8-26 14-26s16 12 14 26c10-2 18 12 18 12s-12 8-32 8z"/><path d="M60 72v-20M60 52c-8-6-8-18 0-24 8 6 8 18 0 24z"/></g>',
  herb: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M60 152V40M60 130l-20-12M60 112l22-12M60 92l-18-12M60 74l16-12M60 56l-12-10"/><path d="M40 118c-10 2-16-4-16-12 10-2 16 4 16 12zM82 100c10 2 16-4 16-12-10-2-16 4-16 12zM42 80c-10 2-16-4-16-12 10-2 16 4 16 12zM76 62c10 2 14-4 14-12-10-2-14 4-14 12zM48 46c-8 0-12-6-12-12 8 0 12 6 12 12zM60 40c-6-4-6-12 0-16 6 4 6 12 0 16z"/></g>',
};
const artKind = p => {
  if (p.c === 'succulents' || /Hen and Chicks|Sedum|Ice Plant|Yucca|Bitterroot|Ponytail|Aloe/.test(p.n)) return 'succulent';
  if (p.c === 'water') return 'water';
  if (p.c === 'herbs') return 'herb';
  if (p.c === 'fruit' || p.c === 'fruit-trees') return 'fruit';
  if (p.c === 'vegetables') return 'veg';
  if (p.c === 'trees') return /Evergreen/.test(p.k) ? 'conifer' : 'tree';
  if (p.c === 'shrubs') return /Juniper|Yew|Cypress|Arborvitae|Boxwood/.test(p.n) ? 'conifer' : 'tree';
  if (p.c === 'grasses-vines') return /Grass/.test(p.k) ? 'grass' : 'leaf';
  if (p.c === 'houseplants') return 'leaf';
  if (/Fern|Hosta|Coral Bells|Lamium|Ginger|Ligularia|Lungwort|Bergenia|Brunnera|Spurge|Lily-of/.test(p.n)) return 'leaf';
  return 'flower';
};
const TONES = ['moss', 'leaf', 'sun', 'clay', 'plum', 'sky', 'rose'];
const tone = s => TONES[[...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % TONES.length];
export const packet = (p, small = false) => `<div class="packet packet-${tone(p.slug)}${small ? ' packet-sm' : ''}" aria-hidden="true">
  <div class="packet-top"><span>Davidson</span><span>${esc(p.cat.short)}</span></div>
  <svg class="packet-art" viewBox="0 0 120 170">${ART[artKind(p)]}</svg>
  <div class="packet-name"><span class="packet-n">${esc(p.n)}</span>${small ? '' : `<span class="packet-b">${esc(p.b)}</span>`}</div>
  ${small ? '' : `<div class="packet-foot"><span>Crawfordsville, Ind.</span><span>Grown &amp; sold here</span></div>`}
</div>`;

export const TAGS = { native: 'Indiana native', pollinator: 'Pollinator favorite', deer: 'Deer resistant', fragrant: 'Fragrant', edible: 'Edible', 'pet-safe': 'Pet safe', evergreen: 'Evergreen', container: 'Great in containers' };
export const LIGHT = { full: 'Full sun', part: 'Part shade', shade: 'Shade', 'indoor-bright': 'Bright indoor light', 'indoor-low': 'Low indoor light' };

// Hardiness note for Crawfordsville (USDA 2023 map: 6a; the 2012 map had 5b).
const zoneNote = z => {
  const m = String(z).match(/^(\d+)[a-b]?\s*[–-]\s*(\d+)/);
  if (!m) return null;
  const lo = +m[1];
  if (lo <= 5) return ['hardy', 'Reliably winter hardy in Crawfordsville (zone 6a).'];
  if (lo === 6) return ['edge', 'Hardy at the edge of its range here. Choose a sheltered spot and mulch in late fall.'];
  return ['tender', `Not winter hardy in central Indiana (hardy only to zone ${lo}). Grow it as an annual, or bring it indoors before frost.`];
};

export const card = (root, p, sizes = '(min-width: 1100px) 22vw, (min-width: 700px) 30vw, 46vw') => `<a class="pcard" href="${root}plants/${p.slug}/" data-cat="${p.c}" data-light="${p.L.join(' ')}" data-tags="${p.t.join(' ')}" data-name="${esc((p.n + ' ' + p.b + ' ' + p.k + ' ' + p.v.map(v => v[0]).join(' ')).toLowerCase())}">
  <div class="pcard-m">${p.img ? pic(root, p.img, '', { sizes }) : packet(p, true)}</div>
  <div class="pcard-t"><span class="pcard-k">${esc(p.k)}</span><span class="pcard-n">${esc(p.n)}</span><span class="pcard-b">${esc(p.b)}</span></div>
</a>`;

const PRICE_CATS = ['houseplants', 'succulents'];
export function plantPage(p) {
  const root = '../../', path = `plants/${p.slug}/`;
  const zn = zoneNote(p.z);
  const tags = p.t.map(t => `<li class="chip">${esc(TAGS[t])}</li>`).join('') + p.L.map(l => `<li class="chip chip-o">${esc(LIGHT[l])}</li>`).join('');
  const rows = [['sun', 'Light', p.sun], ['drop', 'Water', p.wat], ['snow', 'Hardiness', p.z], ['ruler', 'Mature size', p.sz], ['flower', /vegetables|fruit/.test(p.c) ? 'Bloom & harvest' : 'Bloom & season', p.bl], ['layers', 'Soil', p.soil], ['grid', 'Spacing', p.sp]].filter(r => r[2]);
  const desc = `${p.n} (${p.b}) at Davidson Greenhouse in Crawfordsville, IN: light, water, hardiness, size and care for central Indiana, plus the varieties in our garden guide.`.slice(0, 158);
  const items = [['Home', ''], ['Plants', 'plants/'], [p.cat.short, `plants/category/${p.c}/`], [p.n, path]];
  const ld = [crumbLd(items), { '@context': 'https://schema.org', '@type': 'Product', name: p.n, alternateName: p.b, description: p.d, category: p.cat.name, url: SITE + path, image: p.img ? SITE + `assets/img/${p.img}-1600.jpg` : undefined, brand: { '@type': 'Brand', name: 'Davidson Greenhouse & Nursery' } }];
  const varTable = p.v.length ? `<section class="sec-tight reveal" aria-labelledby="var-h">
      <div class="sec-head"><p class="eyebrow">From our garden guide</p><h2 id="var-h" class="h3">Varieties we’ve listed</h2></div>
      <div class="tbl tbl-var"><table><thead><tr><th scope="col">Variety</th><th scope="col">Notes</th></tr></thead><tbody>${p.v.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div>
      <p class="fine">Listed under “${esc(p.src)}” ${/gallery|website/i.test(p.src) ? '' : 'in our <a href="' + root + 'garden-guide/">2025 Garden Guide</a>'}. Stock changes constantly, and we can often special-order. Call <a href="${TEL}">${PHONE}</a> to check what’s on the benches today.</p>
    </section>` : '';
  const price = PRICE_CATS.includes(p.c) && /Houseplants/.test(p.src) ? `<div class="price-note"><p class="eyebrow">2025 pot-size pricing</p><ul><li><span>2″ pot</span><b>$3.50</b></li><li><span>4″ pot</span><b>$5.99</b></li><li><span>6″ pot</span><b>$12.99</b></li></ul><p class="fine">As printed in our 2025 Garden Guide for houseplants, succulents and cacti. Prices can change; call to confirm.</p></div>` : '';
  const pet = p.pet ? `<div class="aside-box"><h3 class="h5">${ico.paw} Pets</h3><p>${esc(p.pet)}</p><p class="fine"><a class="ul" href="https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants" target="_blank" rel="noopener">ASPCA plant list</a></p></div>` : '';
  const co = p.co.length ? `<section class="sec-tight reveal" aria-labelledby="co-h"><div class="sec-head"><p class="eyebrow">Good company</p><h2 id="co-h" class="h3">Plant it with</h2></div><div class="pgrid pgrid-4">${p.co.slice(0, 4).map(q => card(root, getBy(q))).join('')}</div></section>` : '';
  const rel = `<section class="sec-tight reveal" aria-labelledby="rel-h"><div class="sec-head"><p class="eyebrow">Keep browsing</p><h2 id="rel-h" class="h3">You might also like</h2></div><div class="pgrid pgrid-4">${p.rel.map(q => card(root, q)).join('')}</div></section>`;
  const main = `<article class="plant" data-plant="${p.slug}" data-plant-name="${esc(p.n)}">
  <div class="wrap">${crumbs(root, items)}</div>
  <header class="plant-hero wrap">
    <div class="plant-hero-t">
      <p class="eyebrow"><a href="${root}plants/category/${p.c}/">${esc(p.cat.short)}</a> <span aria-hidden="true">·</span> ${esc(p.k)}</p>
      <h1 class="plant-h" data-split>${esc(p.n)}</h1>
      <p class="plant-b">${esc(p.b)}</p>
      <p class="lead">${esc(p.d)}</p>
      <ul class="chips" aria-label="Quick facts">${tags}</ul>
      <div class="plant-cta">${btn(TEL, 'Call to check stock', { icon: ico.phone })}<button class="btn btn-line" type="button" data-list-add><span class="btn-t"><span data-t="Add to my plant list">Add to my plant list</span></span><span class="btn-i">${ico.leaf}</span></button></div>
    </div>
    <div class="plant-hero-m">${p.img ? `<div class="clip-reveal">${pic(root, p.img, `${p.n} at Davidson Greenhouse`, { eager: true, sizes: '(min-width: 900px) 44vw, 100vw' })}</div>` : packet(p)}</div>
  </header>
  <div class="plant-body wrap">
    <div class="plant-main">
      <section class="tag-card reveal" aria-labelledby="tag-h">
        <span class="tag-hole" aria-hidden="true"></span>
        <h2 id="tag-h" class="tag-title"><span>${esc(p.n)}</span><em>${esc(p.b)}</em></h2>
        <dl class="tag-rows">${rows.map(([i, k, v]) => `<div><dt>${ico[i]}${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        ${zn ? `<p class="zone zone-${zn[0]}">${ico.snow}<span>${esc(zn[1])}</span></p>` : ''}
      </section>
      <section class="sec-tight reveal" aria-labelledby="grow-h">
        <div class="sec-head"><p class="eyebrow">Growing it in central Indiana</p><h2 id="grow-h" class="h3">Care &amp; planting tips</h2></div>
        <ul class="tips">${p.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      </section>
      ${varTable}
    </div>
    <aside class="plant-aside">
      ${price}
      <div class="aside-box"><h3 class="h5">${ico.leaf} Watch for</h3><p>${esc(p.pr)}</p><p class="fine">Not sure what you’re seeing? Bring a sample (sealed in a bag) or a photo to the greenhouse, or try <a class="ul" href="https://ag.purdue.edu/department/btny/ppdl/" target="_blank" rel="noopener">Purdue’s Plant &amp; Pest Diagnostic Lab</a>.</p></div>
      ${pet}
      <div class="aside-box aside-visit"><h3 class="h5">${ico.pin} Find it here</h3><p>3147 E Ladoga Road, Crawfordsville</p><p><a href="${root}visit/" class="ul">Hours &amp; directions</a></p></div>
    </aside>
  </div>
  <div class="wrap">${co}${rel}</div>
</article>`;
  return page({ root, path, title: `${p.n} (${p.b}) | Davidson Greenhouse, Crawfordsville IN`, desc, ld, img: p.img || p.cat.img, main, body: 'pg-plant', type: 'product' });
}
let _by; export const setBy = b => { _by = b; }; const getBy = s => _by.get(s);

const CAT_INTRO = {
  houseplants: 'Our houseplant greenhouse is open all year, and it’s one of the largest selections around. You’ll find easy pothos and snake-plant-tough classics, flowering tropicals, trailing vines for hanging baskets, and the odd collector’s plant. Every page lists the light, water and temperature it likes, and whether it’s safe around pets.',
  succulents: 'Succulents and cacti store water in their leaves and stems, so the main way to lose them is kindness: too much water, not enough light. We stock loose plants in 2″, 4″ and 6″ pots, plus dish gardens, teacup planters and living wreaths made in-house.',
  annuals: 'Annuals give you one huge season of color. Our spring benches fill with packs and pots of the classics and newer patio varieties. Wait until frost danger has passed, usually around mid-May in Montgomery County, before planting tender ones out.',
  perennials: 'Perennials come back every spring. Our potted perennial list runs to hundreds of named varieties, from sun-baked prairie natives to shade-garden hostas and ferns. Each page notes how well it handles a Crawfordsville winter.',
  herbs: 'Culinary herbs, tea herbs and fragrant oddities, sold as plants and seed. Most need full sun and well-drained soil; some are perennial here and some are best treated as annuals or brought indoors.',
  vegetables: 'Transplants for the vegetable garden, plus seed potatoes, onion sets and plants, sweet potato slips, and bulk seed sold by the scoop. Cool-season crops go out in early spring; warm-season crops wait for warm soil.',
  fruit: 'Berries, brambles, grapes and other small fruits that produce well in Indiana backyards, from June-bearing strawberries to everbearing raspberries and native elderberry.',
  'fruit-trees': 'Apples, cherries, peaches, pears, plums and more for the home orchard. Our garden guide marks which varieties are self-fertile and which need a pollinator partner nearby. Each page here says the same.',
  trees: 'Shade trees, flowering trees and evergreens are on hand from April through October, and we can special-order. Planting depth and watering in the first two years matter more than anything else you do.',
  shrubs: 'Hydrangeas, lilacs, roses, boxwood, weigela and more for foundation plantings, hedges and borders. We’ve left out wintercreeper (prohibited in Indiana) and other invasive shrubs.',
  'grasses-vines': 'Ornamental grasses bring height and winter structure, vines cover fences and arbors, and groundcovers fill spaces where lawn won’t grow.',
  water: 'Hardy marginals, tropical floaters and water lilies for ponds, water gardens and patio tubs.',
  seasonal: 'Fall brings garden mums, ornamental kale and cabbage, and pumpkins and gourds. In winter come Christmas trees, wreaths and poinsettias. The benches change with the calendar, so call ahead if you’re after something specific.',
};

export function catalogPage(all) {
  const root = '../', path = 'plants/';
  const chips = (name, map) => Object.entries(map).map(([k, v]) => `<button type="button" class="fchip" data-f="${name}" data-v="${k}" aria-pressed="false">${esc(v)}</button>`).join('');
  const main = `<section class="pg-hero pg-hero-catalog wrap">
    ${crumbs(root, [['Home', ''], ['Plants', 'plants/']])}
    <div class="pg-hero-in"><p class="eyebrow">The catalog</p><h1 class="h1" data-split>Every plant on our list, with how to grow it.</h1>
    <p class="lead">${all.length} plant pages built from our 2025 Garden Guide. Search by name or variety, or filter by light and what you need the plant to do. Stock changes daily in season, so call before a special trip.</p></div>
  </section>
  <section class="catalog wrap" data-catalog>
    <div class="cat-tags">${CATS.map(c => `<a class="cat-tag" href="${root}plants/category/${c.id}/"><span class="cat-tag-hole" aria-hidden="true"></span><span class="cat-tag-n">${esc(c.short)}</span><span class="cat-tag-c">${all.filter(p => p.c === c.id).length}</span></a>`).join('')}</div>
    <div class="filters" role="search">
      <label class="search"><span class="vh">Search plants</span>${ico.search}<input type="search" placeholder="Search plants or varieties…" data-q autocomplete="off"></label>
      <div class="frow"><span class="frow-l">Category</span><div class="fchips"><button type="button" class="fchip" data-f="cat" data-v="" aria-pressed="true">All</button>${CATS.map(c => `<button type="button" class="fchip" data-f="cat" data-v="${c.id}" aria-pressed="false">${esc(c.short)}</button>`).join('')}</div></div>
      <div class="frow"><span class="frow-l">Light</span><div class="fchips">${chips('light', LIGHT)}</div></div>
      <div class="frow"><span class="frow-l">Good for</span><div class="fchips">${chips('tag', TAGS)}</div></div>
      <p class="fcount" aria-live="polite"><span data-count>${all.length}</span> plants <button type="button" class="ul freset" data-reset hidden>Clear filters</button></p>
    </div>
    <div class="pgrid" data-grid>${all.slice().sort((a, b) => a.n.localeCompare(b.n)).map(p => card(root, p)).join('')}</div>
    <p class="empty" data-empty hidden>Nothing matches those filters. Try fewer, or <a href="tel:+17653640556">call us</a>; we may have it anyway.</p>
  </section>`;
  return page({ root, path, title: 'Plant Catalog | Davidson Greenhouse & Nursery, Crawfordsville IN', desc: `Browse ${all.length} plants from Davidson Greenhouse’s garden guide, from houseplants and perennials to fruit trees and vegetables, with care for central Indiana.`, main, body: 'pg-catalog', img: 'perennial-bench', ld: [crumbLd([['Home', ''], ['Plants', 'plants/']])] });
}

export function categoryPage(c, list, posts) {
  const root = '../../../', path = `plants/category/${c.id}/`;
  const items = [['Home', ''], ['Plants', 'plants/'], [c.short, path]];
  const kinds = [...new Set(list.map(p => p.k))];
  const rp = posts.filter(p => (p.cats || []).includes(c.id)).slice(0, 3);
  const main = `<section class="pg-hero wrap">
    ${crumbs(root, items)}
    <div class="cat-hero">
      <div class="cat-hero-t"><p class="eyebrow">${list.length} plants</p><h1 class="h1" data-split>${esc(c.name)}</h1><p class="lead">${esc(CAT_INTRO[c.id])}</p>
      ${kinds.length > 1 ? `<p class="fine">Includes: ${kinds.map(esc).join(', ')}.</p>` : ''}</div>
      <div class="cat-hero-m parallax-wrap"><div data-parallax="-8">${pic(root, c.img, '', { eager: true, sizes: '(min-width: 900px) 40vw, 100vw' })}</div></div>
    </div>
  </section>
  <section class="wrap sec-tight"><div class="pgrid">${list.slice().sort((a, b) => a.n.localeCompare(b.n)).map(p => card(root, p)).join('')}</div></section>
  ${rp.length ? `<section class="wrap sec"><div class="sec-head"><p class="eyebrow">From the garden journal</p><h2 class="h2">Read before you plant</h2></div><div class="jgrid">${rp.map(p => jcard(root, p)).join('')}</div></section>` : ''}
  <section class="wrap sec-tight"><div class="cat-others">${CATS.filter(x => x.id !== c.id).map(x => `<a href="${root}plants/category/${x.id}/" class="ul">${esc(x.short)}</a>`).join('')}</div></section>`;
  return page({ root, path, title: `${c.name} | Davidson Greenhouse, Crawfordsville IN`, desc: `${c.name} at Davidson Greenhouse & Nursery in Crawfordsville, Indiana: ${list.length} plants with care, hardiness and variety notes.`.slice(0, 158), main, img: c.img, ld: [crumbLd(items)] });
}

export const jcard = (root, p, big = false) => `<a class="jcard${big ? ' jcard-big' : ''}" href="${root}journal/${p.slug}/"><div class="jcard-m">${pic(root, p.img, '', { sizes: big ? '(min-width: 900px) 60vw, 100vw' : '(min-width: 900px) 30vw, 100vw' })}</div><div class="jcard-t"><p class="jcard-k">${esc(p.kicker)} <span aria-hidden="true">·</span> ${p.mins} min read</p><h3 class="jcard-h">${esc(p.title)}</h3>${big ? `<p class="jcard-d">${esc(p.desc)}</p>` : ''}</div></a>`;
