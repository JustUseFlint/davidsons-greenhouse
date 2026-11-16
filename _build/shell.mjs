import { SITE, V, NAME, LEGAL, PHONE, TEL, STREET, CITY, REGION, ZIP, ADDR, MAPS, FB, IG, PIN, HOURS, fmtH, JOBS } from './site.mjs';
import { CATS } from './cats.mjs';
import dims from './img-dims.json' with { type: 'json' };
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const slugify = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/['’‘"“”]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const pic = (root, name, alt, { cls = '', sizes = '100vw', eager = false, ratio = '' } = {}) => {
  const [W, H] = dims[name]; const w16 = Math.min(1600, W), w8 = Math.min(800, W), h8 = Math.round(H * w8 / W);
  const set = ext => w16 > 800 ? `${root}assets/img/${name}-800.${ext} 800w, ${root}assets/img/${name}-1600.${ext} ${w16}w` : `${root}assets/img/${name}-800.${ext} ${w8}w`;
  return `<picture class="pic ${cls}"${ratio ? ` style="--r:${ratio}"` : ''}><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${root}assets/img/${name}-800.jpg" srcset="${set('jpg')}" sizes="${sizes}" alt="${esc(alt)}" width="${w8}" height="${h8}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
};

const sv = (d, extra = '') => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" ${extra}>${d}</svg>`;
const st = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
export const ico = {
  arrow: sv(`<path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" ${st}/>`),
  ext: sv(`<path d="M8 16L16.5 7.5M9.5 7.5h7v7" ${st}/>`),
  phone: sv(`<path d="M6.6 3.8l2.6.4 1.2 4-2 1.5a12 12 0 005.9 5.9l1.5-2 4 1.2.4 2.6a2 2 0 01-2 2.2A16.6 16.6 0 014.4 5.8a2 2 0 012.2-2z" ${st}/>`),
  pin: sv(`<path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0113 0c0 4.9-6.5 11-6.5 11z" ${st}/><circle cx="12" cy="10" r="2.3" ${st}/>`),
  clock: sv(`<circle cx="12" cy="12" r="8.5" ${st}/><path d="M12 7.5V12l3 2" ${st}/>`),
  sun: sv(`<circle cx="12" cy="12" r="4" ${st}/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" ${st}/>`),
  drop: sv(`<path d="M12 3.2s6 6.6 6 11a6 6 0 01-12 0c0-4.4 6-11 6-11z" ${st}/>`),
  snow: sv(`<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5" ${st}/>`),
  ruler: sv(`<path d="M4 16.5L16.5 4l3.5 3.5L7.5 20z M8 12.5l1.8 1.8M10.8 9.7l1.8 1.8M13.6 6.9l1.8 1.8" ${st}/>`),
  flower: sv(`<circle cx="12" cy="9" r="2.2" ${st}/><path d="M12 6.8c0-2.4 3.4-2.4 3.4 0 2.3-.8 3.3 2.4 1.1 3.3 1.5 2-1.2 4-2.7 2.1-1 2.3-4.5 2.3-3.6-.1-2.5.9-3.6-2.4-1.2-3.2-1.9-1.8.8-4.5 3-2.1z M12 13.5V21M12 18c-2-2.5-4.5-2.5-5.5-2 .5 2.5 3 3 5.5 2z" ${st}/>`),
  layers: sv(`<path d="M12 4l8.5 4.5L12 13 3.5 8.5z M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5" ${st}/>`),
  paw: sv(`<circle cx="7.5" cy="9.5" r="1.7" ${st}/><circle cx="11" cy="6" r="1.7" ${st}/><circle cx="15" cy="6.5" r="1.7" ${st}/><circle cx="17.5" cy="10.5" r="1.7" ${st}/><path d="M8.5 16.5c0-3 2-5 4-5s4 2 4 4.5c0 2.4-2 3-4 2.5-2.5-.6-4 1-4-2z" ${st}/>`),
  grid: sv(`<path d="M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z" ${st}/>`),
  leaf: sv(`<path d="M5 19C5 10 10 5 20 4c-.5 10-5.5 15-14 15zM5 19l8-8" ${st}/>`),
  search: sv(`<circle cx="10.5" cy="10.5" r="6" ${st}/><path d="M15 15l5 5" ${st}/>`),
  close: sv(`<path d="M6 6l12 12M18 6L6 18" ${st} stroke-width="2"/>`),
  chev: sv(`<path d="M9 5.5l6.5 6.5L9 18.5" ${st}/>`),
  down: sv(`<path d="M6 9.5l6 6 6-6" ${st}/>`),
  fb: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-7.4h2.5l.4-3h-2.9V8.8c0-.9.3-1.5 1.5-1.5h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8.2v3h2.5V21" fill="currentColor"/></svg>`,
  ig: sv(`<rect x="3.5" y="3.5" width="17" height="17" rx="5" ${st}/><circle cx="12" cy="12" r="4" ${st}/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>`),
  pin2: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.3 3C7.4 3 5 6.5 5 9.4c0 1.8.7 3.4 2.1 3.9.2.1.4 0 .5-.3l.2-.8c.1-.3 0-.4-.2-.6-.4-.5-.7-1.2-.7-2.1 0-2.7 2-5.1 5.3-5.1 2.9 0 4.4 1.8 4.4 4.1 0 3.1-1.4 5.7-3.4 5.7-1.1 0-2-.9-1.7-2.1.3-1.4 1-2.9 1-3.9 0-.9-.5-1.7-1.5-1.7-1.2 0-2.1 1.2-2.1 2.8 0 1 .3 1.7.3 1.7l-1.4 6c-.4 1.8-.1 3.9 0 4.1 0 .1.2.2.3 0 .1-.2 1.6-2 2.1-3.8l.8-3.2c.4.8 1.6 1.5 2.9 1.5 3.8 0 6.4-3.5 6.4-8.1C19.2 6.2 16.2 3 12.3 3z" fill="currentColor"/></svg>`,
};
// Custom mark: a gabled glasshouse with a leaf growing inside.
export const MARK = `<svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M5 22L24 7l19 15v19H5z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M14.5 41V29.5M33.5 41V29.5M5 29.5h38" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/><path d="M24 41c0-9 2.5-15 10-18-1 8-4.5 13-10 14.5M24 41c0-6-2-10-7-12 .5 5 3 8 7 9" fill="currentColor"/></svg>`;

export const btn = (href, label, { cls = 'btn-solid', icon = ico.arrow, ext = false, attrs = '' } = {}) =>
  `<a class="btn ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}${attrs ? ' ' + attrs : ''}><span class="btn-t"><span data-t="${esc(label)}">${esc(label)}</span></span><span class="btn-i">${icon}</span></a>`;

const FONTS = 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..600&family=Hanken+Grotesk:wght@400..700&display=swap';

export const BIZ_LD = {
  '@context': 'https://schema.org', '@type': ['GardenStore', 'LocalBusiness'], '@id': SITE + '#business', name: LEGAL, alternateName: ['Davidson Greenhouse', 'Davidson\u2019s Greenhouse'],
  url: SITE, telephone: '+1-765-364-0556', image: SITE + 'assets/img/greenhouse-panorama-1600.jpg', logo: SITE + 'assets/img/apple-touch-icon.png',
  address: { '@type': 'PostalAddress', streetAddress: STREET, addressLocality: CITY, addressRegion: REGION, postalCode: ZIP, addressCountry: 'US' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' }, { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '15:00' }],
  sameAs: [FB, IG, PIN], areaServed: 'Crawfordsville and Montgomery County, Indiana',
};

export function head({ root, title, desc, path = '', body = '', ld = [], img = 'greenhouse-panorama', type = 'website', extraHead = '' }) {
  const url = SITE + path;
  const lds = [BIZ_LD, ...ld].map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#1d3a29">
<link rel="canonical" href="${url}">
<meta property="og:site_name" content="${NAME}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="${type}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}assets/img/${img}-1600.jpg"><meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}assets/img/${img}-1600.jpg">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml"><link rel="icon" href="${root}assets/img/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${root}assets/css/site.css?v=${V}">
${extraHead}${lds}
<script>(function(d,w){var h=d.documentElement;h.className=h.className.replace('no-js','js');if(!(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches))h.classList.add('motion');setTimeout(function(){if(!w.__dgReady){h.classList.remove('motion')}},3500)})(document,window)</script>
</head>
<body class="${body}">`;
}

export const NAV = [['Plants', 'plants/'], ['In season', 'seasonal/'], ['Landscaping', 'landscaping/'], ['Garden journal', 'journal/'], ['Events', 'events/'], ['Visit', 'visit/']];
const OVERLAY = [
  ['Shop plants', 'plants/', 'perennial-bench'], ['What’s in season', 'seasonal/', 'fall-display'], ['Garden journal', 'journal/', 'seed-starting'],
  ['Landscaping', 'landscaping/', 'nursery-trees'], ['Events', 'events/', 'pumpkins-gourds'], ['Our story', 'about/', 'truck-wreath'], ['Visit & hours', 'visit/', 'greenhouse-interior'],
];
const MORE = [['Custom containers', 'custom-containers/'], ['Hanging baskets', 'hanging-baskets/'], ['Mulch, stone & soil', 'mulch-stone-soil/'], ['Gifts & goods', 'gifts-and-goods/'], ['Garden guide', 'garden-guide/'], ['Gallery', 'gallery/'], ['Reviews', 'reviews/'], ['FAQ', 'faq/'], ['Contact', 'contact/'], ['Careers', 'careers/']];

export const hoursList = (cls = '') => `<ul class="hours ${cls}" data-hours>${HOURS.map(([d, o, c], i) => `<li data-day="${(i + 1) % 7}"><span>${d}</span><span>${o == null ? 'Closed' : fmtH(o) + ' – ' + fmtH(c)}</span></li>`).join('')}</ul>`;

export function header(root, path, counts = {}) {
  const cur = p => (p === '' ? path === '' : path.startsWith(p)) ? ' aria-current="page"' : '';
  const mega = `<div class="mega" id="mega-plants" data-mega-panel hidden>
    <div class="mega-in wrap">
      <div class="mega-cats">${CATS.map(c => `<a href="${root}plants/category/${c.id}/" data-prev="${c.img}"><span class="mega-n">${esc(c.short)}</span><span class="mega-c">${counts[c.id] || ''}</span></a>`).join('')}</div>
      <div class="mega-side">
        <div class="mega-img">${pic(root, 'perennial-bench', '', { sizes: '320px' })}</div>
        <a class="mega-all" href="${root}plants/">Browse every plant ${ico.arrow}</a>
        <a class="mega-sub" href="${root}garden-guide/">How to use our garden guide</a>
      </div>
    </div>
  </div>`;
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <div class="hdr-bar wrap">
    <a class="brand" href="${root}" aria-label="${NAME}, home">${MARK}<span class="brand-t"><span class="brand-w">Davidson</span><span class="brand-s">Greenhouse &amp; Nursery</span></span></a>
    <nav class="hdr-nav" aria-label="Primary">
      <button class="hdr-link has-mega" type="button" aria-expanded="false" aria-controls="mega-plants" data-mega>Plants ${ico.down}</button>
      ${NAV.slice(1).map(([t, h]) => `<a class="hdr-link" href="${root}${h}"${cur(h)}>${t}</a>`).join('')}
    </nav>
    <div class="hdr-r">
      <a class="open-chip" href="${root}visit/" data-open-chip><i aria-hidden="true"></i><span>Hours</span></a>
      <a class="hdr-call" href="${TEL}" aria-label="Call ${PHONE}">${ico.phone}<span>${PHONE}</span></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="nav-ov" data-burger><span class="burger-t"><span>Menu</span><span>Close</span></span><span class="burger-i" aria-hidden="true"><i></i><i></i></span></button>
    </div>
  </div>
  ${mega}
</header>
<div class="nav-ov" id="nav-ov" data-nav hidden>
  <div class="nav-ov-panel" role="dialog" aria-modal="true" aria-label="Site menu">
    <div class="nav-ov-grid wrap">
      <nav class="nav-ov-main" aria-label="Main">${OVERLAY.map(([t, h, im]) => `<a href="${root}${h}" data-prev="${im}"${cur(h)}><span class="ov-t"><span>${t}</span></span></a>`).join('')}</nav>
      <div class="nav-ov-prev" aria-hidden="true">${OVERLAY.map(([, , im], i) => `<div class="ov-img${i === 0 ? ' on' : ''}" data-img="${im}">${pic(root, im, '', { sizes: '30vw' })}</div>`).join('')}</div>
      <div class="nav-ov-side">
        <div class="ov-col"><p class="eyebrow">Plants</p><ul>${CATS.map(c => `<li><a href="${root}plants/category/${c.id}/">${esc(c.short)}</a></li>`).join('')}</ul></div>
        <div class="ov-col"><p class="eyebrow">More</p><ul>${MORE.map(([t, h]) => `<li><a href="${root}${h}">${t}</a></li>`).join('')}</ul></div>
        <div class="ov-col ov-visit"><p class="eyebrow">Visit</p><p>${STREET}<br>${CITY}, ${REGION} ${ZIP}</p><p><a href="${TEL}">${PHONE}</a></p>${hoursList('hours-sm')}<p class="ov-soc"><a href="${FB}" target="_blank" rel="noopener" aria-label="Facebook">${ico.fb}</a><a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram">${ico.ig}</a><a href="${PIN}" target="_blank" rel="noopener" aria-label="Pinterest">${ico.pin2}</a></p></div>
      </div>
    </div>
  </div>
</div>`;
}

export function footer(root) {
  const y = 2026;
  return `<footer class="ftr">
  <div class="ftr-cta wrap">
    <p class="eyebrow eyebrow-l">Open year-round</p>
    <h2 class="ftr-h" data-split>Come walk the greenhouse.</h2>
    <div class="ftr-btns">${btn(MAPS, 'Get directions', { cls: 'btn-sun', ext: true, icon: ico.pin })}${btn(TEL, 'Call ' + PHONE, { cls: 'btn-line-l', icon: ico.phone })}</div>
  </div>
  <div class="ftr-cols wrap">
    <div class="ftr-col"><p class="eyebrow eyebrow-l">Find us</p><p>${STREET}<br>${CITY}, ${REGION} ${ZIP}</p><p><a href="${TEL}">${PHONE}</a></p><p><a class="ul" href="${MAPS}" target="_blank" rel="noopener">Directions</a></p></div>
    <div class="ftr-col"><p class="eyebrow eyebrow-l">Hours</p>${hoursList('hours-ftr')}</div>
    <div class="ftr-col"><p class="eyebrow eyebrow-l">Plants</p><ul>${CATS.slice(0, 9).map(c => `<li><a href="${root}plants/category/${c.id}/">${esc(c.short)}</a></li>`).join('')}<li><a href="${root}plants/">All plants</a></li></ul></div>
    <div class="ftr-col"><p class="eyebrow eyebrow-l">Explore</p><ul><li><a href="${root}about/">Our story</a></li><li><a href="${root}journal/">Garden journal</a></li><li><a href="${root}landscaping/">Landscaping</a></li><li><a href="${root}custom-containers/">Custom containers</a></li><li><a href="${root}events/">Events</a></li><li><a href="${root}gifts-and-goods/">Gifts &amp; goods</a></li><li><a href="${root}faq/">FAQ</a></li><li><a href="${root}contact/">Contact</a></li><li><a href="${JOBS}" target="_blank" rel="noopener">Employment application</a></li></ul></div>
  </div>
  <div class="ftr-word wrap" aria-hidden="true"><span data-word>Davidson</span></div>
  <div class="ftr-legal wrap"><p>© ${y} ${LEGAL}. All rights reserved.</p><p class="ftr-soc"><a href="${FB}" target="_blank" rel="noopener">${ico.fb}<span>Facebook</span></a><a href="${IG}" target="_blank" rel="noopener">${ico.ig}<span>Instagram</span></a><a href="${PIN}" target="_blank" rel="noopener">${ico.pin2}<span>Pinterest</span></a></p></div>
</footer>`;
}

export const tail = root => `<script src="${root}assets/vendor/gsap.min.js?v=${V}" defer></script><script src="${root}assets/vendor/ScrollTrigger.min.js?v=${V}" defer></script><script src="${root}assets/js/site.js?v=${V}" defer></script>
</body></html>`;

export const crumbs = (root, items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([t, h], i) => `<li>${h != null && i < items.length - 1 ? `<a href="${root}${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}</li>`).join('')}</ol></nav>`;
export const crumbLd = items => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([t, h], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: SITE + (h ?? '') })) });

export function page({ root, path, title, desc, body = '', ld = [], img, type, main, counts, extraHead }) {
  return head({ root, title, desc, path, body, ld, img, type, extraHead }) + header(root, path, counts) + `<main id="main" class="main">${main}</main>` + footer(root) + tail(root);
}
