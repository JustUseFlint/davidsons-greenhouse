import { esc, pic, ico, btn, crumbs, crumbLd, page, hoursList, MARK } from './shell.mjs';
import { SITE, NAME, LEGAL, PHONE, TEL, STREET, CITY, REGION, ZIP, ADDR, MAPS, MAP_EMBED, FB, IG, PIN, OLD, CONTACT_FORM, JOBS, VENDOR, GUIDE_PDF } from './site.mjs';
import { CATS } from './cats.mjs';
import { jcard, card } from './plants.mjs';
import dims from './img-dims.json' with { type: 'json' };

const R = d => '../'.repeat(d);
const hero = (root, items, eyebrow, h1, lead, extra = '') => `<section class="pg-hero wrap">${crumbs(root, items)}<div class="pg-hero-in"><p class="eyebrow">${eyebrow}</p><h1 class="h1" data-split>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}${extra}</div></section>`;
const std = (path, t, desc, main, { img, ld = [], body = '' } = {}) => ({ path, html: page({ root: R(path.split('/').filter(Boolean).length), path, title: t, desc, main, img, ld, body }) });
const fig = (root, name, alt, cap, cls = '', sizes) => `<figure class="fig ${cls}"><div class="clip-reveal">${pic(root, name, alt, { sizes })}</div>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;

export const TIMELINE = [
  ['1909', 'Wilson Greenhouse', 'Cully Wilson starts the Wilson Greenhouse in Roachdale, Indiana.'],
  ['1954', 'Wilson Brothers', 'Don and Howard Wilson move the business to Raccoon, Indiana, as Wilson Brothers Greenhouse.'],
  ['1977', 'The Davidsons begin', 'David and Marilyn Davidson start a small greenhouse of their own.'],
  ['1979', 'Two families, one greenhouse', 'Barb Wilson and the Davidsons merge and build the current greenhouse in Crawfordsville as Davidson-Wilson Greenhouse.'],
  ['1982', 'The back greenhouses', 'Wilson Brothers closes. Its greenhouses are auctioned and become the back three greenhouses here today.'],
  ['1984', 'The showroom', 'The current showroom is built at 3147 E Ladoga Road.'],
  ['2001', 'Davidson Greenhouse & Nursery', 'Mark Davidson and Vicki Deer take over and rename the business Davidson Greenhouse & Nursery.'],
];

export const REVIEWS = [
  ['It was my first time in there today, and I was amazed at the selection of just about everything they had. I cannot wait to go back! Everything was healthy and lovely.', 'Nikki S'],
  ['I absolutely LOVE Davidson’s! Everyone there is very friendly and always quick to help with anything, very knowledgeable staff! I recommend this greenhouse/ nursery, you will not be disappointed!', 'Stacey & Tim'],
  ['Friendly helpful staff, so many plants, great selection, so many varieties good prices for good looking plants, the rest is up to me.', 'Dennis R'],
  ['I loved my first visit here. The lovely folks who work and own this place are super nice. I will most certainly be coming back soon for more of their plants as well! The lovely lady who helped me grab my tomatoes while I held my baby was awesome and I honestly wish I had neighbors like these people.', 'Krista L'],
  ['Went for the fall festival in spite of the rain we had a great time.', 'Becca F'],
  ['Super helpful, very nice, clean and professional.', 'Courtney B'],
  ['❤ love! Very helpful and informative!', 'Cindy H'],
  ['Davidsons has a great selection of beautiful plants.', 'Kathy F'],
  ['Great place friendly people', 'Justice B'],
];

const SEASONS = [
  ['Spring', 'March – May', 'seedling-benches', ['Annuals in packs and pots', 'Perennials by the hundreds', 'Hanging baskets', 'Vegetable and herb transplants', 'Seed potatoes, onion sets, bulk seed', 'Fruit trees, berries and grapes']],
  ['Summer', 'June – August', 'annual-display', ['Trees and shrubs (April–October)', 'Patio tropicals', 'Water garden plants', 'Mulch, stone and sand', 'Late-season perennials', 'Custom container refreshes']],
  ['Fall', 'September – November', 'fall-display', ['Garden mums', 'Ornamental cabbage and kale', 'Pumpkins and gourds', 'Fall Festival weekend', 'Garlic for fall planting', 'Trees and shrubs, while stock lasts']],
  ['Holidays & winter', 'November – February', 'christmas-bench', ['Christmas trees', 'Wreaths', 'Poinsettias', 'Houseplants, succulents and cacti', 'Gifts, honey and decor', 'Seed-starting supplies']],
];

const LANDSCAPE = ['Tree and shrub planting', 'Mulch installation', 'Flower bed cleanup and maintenance', 'Seasonal cleanups', 'Weeding and trimming', 'Lawn improvements', 'Landscape design', 'Hardscaping'];

const marquee = words => `<div class="marquee" aria-hidden="true"><div class="marquee-in">${[0, 1].map(() => `<span>${words.map(w => `<i>${esc(w)}</i>`).join('<b>✳</b>')}<b>✳</b></span>`).join('')}</div></div>`;

const visitBlock = root => `<section class="visit-block wrap sec reveal" aria-labelledby="vb-h">
  <div class="vb-t"><p class="eyebrow">Plan a visit</p><h2 id="vb-h" class="h2">3147 E Ladoga Road, just outside Crawfordsville.</h2>
    <div class="vb-cols"><div>${hoursList()}<p class="open-line" data-open-line></p></div><div><p>${STREET}<br>${CITY}, ${REGION} ${ZIP}</p><p><a href="${TEL}" class="ul">${PHONE}</a></p><div class="btn-row">${btn(MAPS, 'Get directions', { ext: true, icon: ico.pin })}${btn(root + 'visit/', 'Visiting tips', { cls: 'btn-line' })}</div></div></div></div>
  <div class="vb-map"><iframe title="Map to Davidson Greenhouse & Nursery" src="${MAP_EMBED}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</section>`;

export function home(all, posts) {
  const root = '';
  const featured = ['monstera', 'hydrangea', 'tomato', 'coneflower', 'hosta', 'japanese-maple', 'blueberries', 'peony'].map(s => all.find(p => p.slug === s)).filter(Boolean);
  const main = `<section class="hero">
  <div class="hero-in wrap">
    <div class="hero-t">
      <p class="eyebrow"><span class="dot" aria-hidden="true"></span> Greenhouse &amp; nursery · Crawfordsville, Indiana</p>
      <h1 class="hero-h" data-split>Greenhouse roots back to 1909. Open all year on Ladoga Road.</h1>
      <p class="lead">Family-owned and operated, with one of the area’s largest selections of houseplants, succulents and cacti, plus annuals, perennials, trees, shrubs, vegetables and everything to plant them in.</p>
      <div class="btn-row">${btn('plants/', 'Browse the plants')}${btn('visit/', 'Hours & directions', { cls: 'btn-line', icon: ico.clock })}</div>
    </div>
    <div class="hero-m">
      <div class="pane pane-a parallax-wrap"><div data-parallax="-6">${pic(root, 'greenhouse-interior', 'Inside the greenhouse at Davidson Greenhouse & Nursery', { eager: true, sizes: '(min-width: 900px) 46vw, 100vw' })}</div></div>
      <div class="pane pane-b"><div data-parallax="6">${pic(root, 'hoya', 'Hoya plants in the houseplant greenhouse', { sizes: '(min-width: 900px) 18vw, 40vw' })}</div></div>
      <div class="pane pane-c"><div data-parallax="10">${pic(root, 'pansy', 'Pansies on the spring benches', { sizes: '(min-width: 900px) 14vw, 30vw' })}</div></div>
      <div class="hero-badge" aria-hidden="true">${MARK}<span>Open<br>year-round</span></div>
    </div>
  </div>
  ${marquee(['Houseplants', 'Succulents & cacti', 'Annuals', 'Perennials', 'Hanging baskets', 'Herbs', 'Vegetables', 'Fruit trees', 'Shrubs', 'Mulch & stone', 'Mums & pumpkins', 'Poinsettias'])}
</section>

<section class="intro wrap sec" aria-label="About the greenhouse">
  <p class="intro-big reveal-lines" data-lines>We’re a mom-and-pop greenhouse with more than forty years on Ladoga Road. You’ll find healthy plants, honest advice about what grows here, and a family history in greenhouses that goes back to 1909.</p>
  <div class="intro-row">
    ${fig(root, 'greenhouse-panorama', 'The greenhouses at Davidson Greenhouse & Nursery', 'The greenhouses on Ladoga Road.', 'fig-wide', '(min-width: 900px) 60vw, 100vw')}
    <div class="intro-side reveal"><p>Every plant that comes through our doors is checked for pests and disease. Unhealthy plants are pulled and isolated so the problem doesn’t spread. We carry warranties on many products, and if we don’t have something, we can usually order it.</p>${btn('about/', 'Our story', { cls: 'btn-line' })}</div>
  </div>
</section>

<section class="sec cats-sec" aria-labelledby="cats-h">
  <div class="wrap sec-head sec-head-row"><div><p class="eyebrow">Shop by category</p><h2 id="cats-h" class="h2">${all.length} plants, each with its own care page.</h2></div>${btn('plants/', 'Full catalog', { cls: 'btn-line' })}</div>
  <div class="tag-rail wrap" data-rail>${CATS.map(c => `<a class="tag-big" href="plants/category/${c.id}/"><span class="tag-big-hole" aria-hidden="true"></span><span class="tag-big-m">${pic(root, c.img, '', { sizes: '260px' })}</span><span class="tag-big-n">${esc(c.short)}</span><span class="tag-big-l">${esc(c.line)}</span><span class="tag-big-c">${all.filter(p => p.c === c.id).length} plants ${ico.arrow}</span></a>`).join('')}</div>
</section>

<section class="sec seasons wrap" aria-labelledby="sea-h">
  <div class="sec-head"><p class="eyebrow">Through the year</p><h2 id="sea-h" class="h2">What’s on the benches, season by season.</h2><p class="sec-lead">The greenhouse never closes for the winter, but what we carry changes with the calendar.</p></div>
  <div class="season-grid">${SEASONS.map(([n, m, im, list]) => `<article class="season reveal"><div class="season-m">${pic(root, im, '', { sizes: '(min-width: 900px) 25vw, 90vw' })}</div><div class="season-t"><p class="season-when">${m}</p><h3 class="h4">${n}</h3><ul>${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></article>`).join('')}</div>
  <p class="center">${btn('seasonal/', 'See what’s in season', { cls: 'btn-line' })}</p>
</section>

<section class="sec feat-plants" aria-labelledby="fp-h">
  <div class="wrap sec-head sec-head-row"><div><p class="eyebrow">From the catalog</p><h2 id="fp-h" class="h2">A few favorites to start with.</h2></div></div>
  <div class="wrap pgrid pgrid-4">${featured.map(p => card(root, p)).join('')}</div>
</section>

<section class="sec services" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow eyebrow-l">More than plants</p><h2 id="svc-h" class="h2">Bring the pot. We’ll fill it.</h2></div>
    <div class="svc-grid">
      <a class="svc reveal" href="custom-containers/"><div class="svc-m">${pic(root, 'teapot-planters', '', { sizes: '(min-width: 900px) 30vw, 90vw' })}</div><h3 class="h4">Custom containers</h3><p>Drop off your planters. After a talk with our in-house designer, we plant a custom arrangement made to bloom all season.</p><span class="svc-go">How it works ${ico.arrow}</span></a>
      <a class="svc reveal" href="landscaping/"><div class="svc-m">${pic(root, 'nursery-trees', '', { sizes: '(min-width: 900px) 30vw, 90vw' })}</div><h3 class="h4">Landscaping with Yund Outdoor</h3><p>Planting, bed cleanups, mulch, hardscaping and design, done by Yund Outdoor’s crew with plants and materials from our yard.</p><span class="svc-go">Landscaping services ${ico.arrow}</span></a>
      <a class="svc reveal" href="mulch-stone-soil/"><div class="svc-m">${pic(root, 'mulch', '', { sizes: '(min-width: 900px) 30vw, 90vw' })}</div><h3 class="h4">Mulch, stone &amp; soil</h3><p>Bulk and bagged mulch in several colors, river rock, limestone, driveway gravel, boulders, sand and topsoil.</p><span class="svc-go">Materials ${ico.arrow}</span></a>
    </div>
  </div>
</section>

<section class="sec history wrap" aria-labelledby="hist-h">
  <div class="hist-in">
    <div class="hist-t"><p class="eyebrow">Our story</p><h2 id="hist-h" class="h2">Two greenhouse families, one address.</h2><p>The Wilson family started growing in Roachdale in 1909. The Davidsons started their own greenhouse in 1977. In 1979 the two joined up and built the greenhouse that still stands on Ladoga Road.</p>${btn('about/', 'Read the whole history', { cls: 'btn-line' })}</div>
    <ol class="years">${TIMELINE.map(([y, t]) => `<li class="reveal"><span class="years-y">${y}</span><span class="years-t">${esc(t)}</span></li>`).join('')}</ol>
  </div>
</section>

<section class="sec journal-sec" aria-labelledby="jr-h">
  <div class="wrap sec-head sec-head-row"><div><p class="eyebrow">The garden journal</p><h2 id="jr-h" class="h2">Long-form guides for central Indiana gardens.</h2></div>${btn('journal/', 'All articles', { cls: 'btn-line' })}</div>
  <div class="wrap jgrid jgrid-home">${posts.slice(0, 3).map((p, i) => jcard(root, p, i === 0)).join('')}</div>
</section>

<section class="sec reviews-sec" aria-labelledby="rv-h">
  <div class="wrap sec-head"><p class="eyebrow">Kind words</p><h2 id="rv-h" class="h2">From our customers</h2></div>
  <div class="rv-rail wrap" data-rail tabindex="0" aria-label="Customer reviews, scroll sideways">${REVIEWS.map(([q, n]) => `<figure class="rv"><blockquote><p>${esc(q)}</p></blockquote><figcaption>${esc(n)}</figcaption></figure>`).join('')}</div>
  <p class="wrap fine fine-l">Reviews as posted on our <a class="ul" href="${OLD}reviews/" target="_blank" rel="noopener">original website</a>. <a class="ul" href="reviews/">Read them all</a>.</p>
</section>

<section class="sec events-teaser wrap" aria-labelledby="ev-h">
  <div class="sec-head"><p class="eyebrow">At the greenhouse</p><h2 id="ev-h" class="h2">Events &amp; info sessions</h2></div>
  <div class="ev-grid">
    <a class="ev reveal" href="events/#beekeepers"><p class="ev-when">Second Wednesday, monthly</p><h3 class="h4">Beekeeper info meetings</h3><p>Learn from the Montgomery County beekeepers, see the hive on our site and ask questions. Guest speakers make each session different.</p></a>
    <a class="ev reveal" href="events/#fall-festival"><p class="ev-when">Every fall</p><h3 class="h4">Fall Festival</h3><p>Mums, pumpkins, local vendor booths, face painting and food trucks, benefiting the Animal Welfare League of Montgomery County.</p></a>
    <a class="ev reveal" href="events/#cannabinoids-101"><p class="ev-when">Info session</p><h3 class="h4">Cannabinoids 101</h3><p>New to CBD? Learn the basics at this information session.</p></a>
  </div>
</section>
${visitBlock(root)}`;
  return { path: '', html: page({ root, path: '', title: 'Davidson Greenhouse & Nursery | Crawfordsville, IN Greenhouse, Open Year-Round', desc: 'Family-owned greenhouse and nursery at 3147 E Ladoga Rd, Crawfordsville, IN. Houseplants, succulents, annuals, perennials, trees, shrubs, vegetables, mulch and stone. Open year-round.', main, body: 'pg-home', img: 'greenhouse-panorama' }) };
}

export function staticPages(all, posts) {
  const out = [];
  // About
  {
    const r = '../';
    const main = hero(r, [['Home', ''], ['Our story', 'about/']], 'Our story', 'Two families, three towns, one greenhouse on Ladoga Road.', 'Davidson Greenhouse &amp; Nursery is a family-owned, mom-and-pop greenhouse that has served Crawfordsville for more than forty years. Its greenhouse roots go back much further.') + `
  <section class="wrap sec about-intro">
    ${fig(r, 'truck-wreath', 'The Davidson Greenhouse truck decorated with a holiday wreath', '', 'fig-wide', '(min-width: 900px) 60vw, 100vw')}
    <div class="prose reveal"><p>We want to give every customer good advice and a wide variety of quality products for their gardening and landscaping. That shows up in small ways: plants checked for pests and disease before they reach the sales floor, staff who’ll tell you honestly whether something will survive a Montgomery County winter, and a habit of ordering what we don’t have.</p><p>The greenhouse is open all year. In spring and summer it’s annuals, perennials, hanging baskets, vegetables and herbs. In fall it’s mums, ornamental cabbage and kale, pumpkins and gourds. At the holidays it’s Christmas trees, wreaths and poinsettias. Houseplants, succulents and cacti are here in every season.</p></div>
  </section>
  <section class="wrap sec timeline-sec" aria-labelledby="tl-h"><div class="sec-head"><p class="eyebrow">Timeline</p><h2 id="tl-h" class="h2">How we got here</h2></div>
    <ol class="timeline">${TIMELINE.map(([y, t, d]) => `<li class="tl reveal"><span class="tl-y">${y}</span><div><h3 class="h4">${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>
    <p class="fine">Timeline as published by the greenhouse. Our original website also describes the business as serving customers “since 1980” and as having been open “for over 40 years.”</p>
  </section>
  <section class="wrap sec today"><div class="sec-head"><p class="eyebrow">Today</p><h2 class="h2">New ownership, an expanding vision</h2></div><div class="prose reveal"><p>Under new ownership, Davidson Greenhouse has partnered with <a href="${r}landscaping/">Yund Outdoor</a> to offer full landscaping and installation, with plants, trees, mulch and stone from our yard. We also host <a href="${r}events/">monthly beekeeper meetings and a Fall Festival</a> that benefits the Animal Welfare League of Montgomery County.</p></div>
  <div class="gal-strip">${['greenhouse-interior', 'cactus-collection', 'seedling-benches', 'pumpkins-gourds', 'christmas-bench'].map(n => `<div class="gal-strip-i reveal">${pic(r, n, '', { sizes: '(min-width: 900px) 20vw, 60vw' })}</div>`).join('')}</div></section>
  ${visitBlock(r)}`;
    out.push(std('about/', 'Our Story | Davidson Greenhouse & Nursery, Crawfordsville IN', 'From the 1909 Wilson Greenhouse in Roachdale to Davidson Greenhouse & Nursery on Ladoga Road in Crawfordsville: the history of a family-owned Indiana greenhouse.', main, { img: 'truck-wreath', ld: [crumbLd([['Home', ''], ['Our story', 'about/']])] }));
  }
  // Seasonal
  {
    const r = '../';
    const pick = s => all.find(p => p.slug === s);
    const fall = ['garden-mums', 'ornamental-cabbage-and-kale', 'pumpkins', 'gourds', 'new-england-aster', 'garlic'].map(pick).filter(Boolean);
    const winter = ['poinsettia', 'norfolk-island-pine', 'hoya', 'cacti', 'succulents', 'air-plants'].map(pick).filter(Boolean);
    const spring = ['pansy', 'potatoes', 'onions', 'strawberries', 'lettuce', 'peas'].map(pick).filter(Boolean);
    const summer = ['tomato', 'zinnia', 'coneflower', 'water-lily', 'hydrangea', 'basil'].map(pick).filter(Boolean);
    const blk = (id, n, m, im, text, list) => `<section class="wrap sec season-row" id="${id}" aria-labelledby="${id}-h"><div class="sr-head"><div class="sr-m parallax-wrap"><div data-parallax="-6">${pic(r, im, '', { sizes: '(min-width: 900px) 40vw, 100vw' })}</div></div><div class="sr-t"><p class="eyebrow">${m}</p><h2 id="${id}-h" class="h2">${n}</h2><p>${text}</p></div></div><div class="pgrid pgrid-6">${list.map(p => card(r, p, '(min-width: 1100px) 15vw, 46vw')).join('')}</div></section>`;
    const main = hero(r, [['Home', ''], ['In season', 'seasonal/']], 'In season', 'The greenhouse changes with the calendar.', 'We’re open year-round, and the benches turn over with every season. Here’s roughly when to come for what. Selection changes quickly, so call if you’re after something specific.') +
      blk('spring', 'Spring', 'March – May', 'seedling-benches', 'Annuals in packs and pots, hundreds of perennials, hanging baskets, vegetable and herb transplants, seed potatoes, onion sets and plants, and bulk seed by the scoop. Cool-season crops go in early. Tender plants wait for warm soil, usually around mid-May here.', spring) +
      blk('summer', 'Summer', 'June – August', 'annual-display', 'Trees and shrubs are on hand from April through October. Summer is also the season for patio tropicals, water garden plants, mulch and stone projects, and refreshing tired containers.', summer) +
      blk('fall', 'Fall', 'September – November', 'fall-display', 'Garden mums, ornamental cabbage and kale, pumpkins and gourds, plus our annual Fall Festival. Fall is also a great time to plant trees, shrubs and perennials.', fall) +
      blk('holidays', 'Holidays &amp; winter', 'November – February', 'christmas-bench', 'Christmas trees, wreaths and poinsettias for the holidays, then a greenhouse full of houseplants, succulents and cacti to get you through the gray months.', winter) + visitBlock(r);
    out.push(std('seasonal/', 'What’s in Season | Davidson Greenhouse, Crawfordsville IN', 'Spring annuals and vegetables, summer trees and shrubs, fall mums and pumpkins, and holiday poinsettias and Christmas trees at Davidson Greenhouse in Crawfordsville.', main, { img: 'fall-display', ld: [crumbLd([['Home', ''], ['In season', 'seasonal/']])] }));
  }
  // Landscaping
  {
    const r = '../';
    const fq = [['What landscaping services do you offer in Crawfordsville, IN?', 'Davidson Greenhouse and Yund Outdoor offer tree and shrub planting, mulch installation, flower bed maintenance, seasonal cleanups, weeding, trimming, landscape design, hardscaping and outdoor property improvements for homes and businesses in Crawfordsville and the surrounding communities.'], ['Do you provide custom landscaping designs?', 'Yes. Every property is different, so the landscaping team works with you on a plan based on your vision, property layout, budget and how much maintenance you want.'], ['Can you refresh existing flower beds and landscaping?', 'Yes. The team can clean up overgrown beds, remove weeds, trim shrubs, install fresh mulch and replace tired plants. You don’t have to start from scratch.'], ['Do you install trees and shrubs?', 'Yes. Trees, shrubs and ornamental plants are installed professionally, with planting techniques that help them establish for the long term.'], ['Do Davidson Greenhouse and Yund Outdoor work together on projects?', 'Yes. Davidson Greenhouse supplies the plants, trees, mulch and materials, and Yund Outdoor handles landscaping and installation, so one partnership takes you from choosing plants to the finished yard.']];
    const main = hero(r, [['Home', ''], ['Landscaping', 'landscaping/']], 'Landscaping · with Yund Outdoor', 'Plants from our yard, planted by people who do it every day.', 'Davidson Greenhouse and Yund Outdoor work together to offer full landscaping for homes and businesses in Crawfordsville and Montgomery County.') + `
  <section class="wrap sec land">
    ${fig(r, 'nursery-trees', 'Trees and shrubs in the nursery yard', 'Trees and shrubs are on hand April through October.', 'fig-wide', '(min-width: 900px) 55vw, 100vw')}
    <div class="land-t reveal"><h2 class="h3">What the crew does</h2><ul class="checks">${LANDSCAPE.map(s => `<li>${s}</li>`).join('')}</ul><p>From a small refresh to a full outdoor makeover, Yund Outdoor works with you to fit your style, needs and budget.</p><div class="btn-row">${btn(TEL, 'Call ' + PHONE, { icon: ico.phone })}${btn(r + 'contact/', 'Other ways to reach us', { cls: 'btn-line' })}</div></div>
  </section>
  <section class="wrap sec"><div class="sec-head"><p class="eyebrow">Shop the materials</p><h2 class="h2">Start with what grows here</h2></div><div class="pgrid pgrid-4">${['hydrangea', 'red-maple', 'arborvitae', 'feather-reed-grass', 'boxwood', 'eastern-redbud', 'shrub-roses', 'coneflower'].map(s => all.find(p => p.slug === s)).filter(Boolean).map(p => card(r, p)).join('')}</div></section>
  <section class="wrap sec faq-sec"><div class="sec-head"><p class="eyebrow">Questions</p><h2 class="h2">Landscaping FAQ</h2></div><div class="faq">${fq.map(([q, a]) => `<details class="qa"><summary><span>${esc(q)}</span>${ico.down}</summary><div class="qa-a"><p>${esc(a)}</p></div></details>`).join('')}</div></section>`;
    out.push(std('landscaping/', 'Landscaping in Crawfordsville, IN | Davidson Greenhouse & Yund Outdoor', 'Tree and shrub planting, mulch, bed cleanups, hardscaping and landscape design in Crawfordsville, IN from Davidson Greenhouse and Yund Outdoor.', main, { img: 'nursery-trees', ld: [crumbLd([['Home', ''], ['Landscaping', 'landscaping/']]), faqLd(fq)] }));
  }
  // Custom containers
  {
    const r = '../';
    const steps = [['Bring your containers', 'Drop off your planters, urns or window boxes at the greenhouse.'], ['Talk it through', 'Our in-house designer asks about sun, style and colors, and how much watering you’re up for.'], ['We plant it', 'We build a custom arrangement for your pots, made to bloom all season.'], ['Take it home', 'Pick it up planted, with care tips for the season.']];
    const main = hero(r, [['Home', ''], ['Custom containers', 'custom-containers/']], 'Bring your own container', 'Drop off the pot. Pick up a planter that blooms all season.', 'Our “bring your own container” service: leave your planters with us, talk through the look with our in-house designer, and we’ll plant a custom arrangement.') + `
  <section class="wrap sec"><ol class="steps">${steps.map(([t, d]) => `<li class="step reveal"><h2 class="h4">${t}</h2><p>${d}</p></li>`).join('')}</ol></section>
  <section class="wrap sec cc-gal"><div class="cc-grid">${['teapot-planters', 'jar-planters', 'succulent-dish-gardens', 'fairy-garden', 'succulent-wreath', 'tub-succulents'].map(n => `<div class="cc-i reveal">${pic(r, n, 'A planter arrangement made at Davidson Greenhouse', { sizes: '(min-width: 900px) 30vw, 50vw' })}</div>`).join('')}</div>
  <p class="fine">Arrangements shown are from our photo gallery. Call <a href="${TEL}">${PHONE}</a> to ask about timing and pricing for your containers.</p></section>
  <section class="wrap sec"><div class="sec-head"><p class="eyebrow">Container favorites</p><h2 class="h2">Plants that earn a spot in a pot</h2></div><div class="pgrid pgrid-4">${all.filter(p => p.t.includes('container') && p.c === 'annuals').slice(0, 8).map(p => card(r, p)).join('')}</div><p class="center">${btn(r + 'journal/container-gardening-guide/', 'Read: container gardening guide', { cls: 'btn-line' })}</p></section>`;
    out.push(std('custom-containers/', 'Custom Container Planting | Davidson Greenhouse, Crawfordsville IN', 'Bring your own planters to Davidson Greenhouse in Crawfordsville, IN. Our in-house designer will plant a custom arrangement made to bloom all season.', main, { img: 'teapot-planters', ld: [crumbLd([['Home', ''], ['Custom containers', 'custom-containers/']])] }));
  }
  // Hanging baskets
  {
    const r = '../';
    const tiers = [['Yellow Ribbon', '6–8″ basket', 'Assorted succulents or houseplants'], ['Blue Ribbon', '10″ basket', 'Assorted annual flowers'], ['Red Ribbon', '10″ basket', 'Fern, begonias, fuchsias, streptocarpus, geraniums, spider plants and wandering Jew, assorted'], ['White Ribbon', '12″ basket', 'Other specialty baskets and 12″ ferns']];
    const main = hero(r, [['Home', ''], ['Hanging baskets', 'hanging-baskets/']], 'Hanging baskets', 'Four ribbons, from windowsill-size to porch showstopper.', 'Our 2025 Garden Guide sorts our hanging baskets by ribbon color. Here’s what each one means.') + `
  <section class="wrap sec"><div class="ribbons">${tiers.map(([n, s, d]) => `<article class="ribbon ribbon-${n.split(' ')[0].toLowerCase()} reveal"><span class="ribbon-tail" aria-hidden="true"></span><h2 class="h4">${n}</h2><p class="ribbon-s">${s}</p><p>${d}</p></article>`).join('')}</div>
  <p class="fine">From our 2025 Garden Guide. Basket contents vary through the season; tumbling tomato baskets are listed on our <a href="${r}plants/tomato/">tomato page</a>.</p></section>
  <section class="wrap sec bk"><div class="bk-m">${pic(r, 'ice-plant-basket', 'A hanging basket at Davidson Greenhouse', { sizes: '(min-width: 900px) 40vw, 100vw' })}</div><div class="prose reveal"><h2 class="h3">Keeping a basket full all summer</h2><p>Hanging baskets dry out faster than anything else you grow. On hot July days a 10″ basket in full sun may need water every day, sometimes twice. Water until it runs out the bottom. Feed weekly with a water-soluble fertilizer from June on, and trim leggy petunias and calibrachoa back by a third in midsummer for a second flush.</p><p>For the full routine, read our <a href="${r}journal/hanging-basket-care/">hanging basket care guide</a>.</p></div></section>
  <section class="wrap sec"><div class="sec-head"><p class="eyebrow">What goes in them</p><h2 class="h2">Basket plants</h2></div><div class="pgrid pgrid-4">${['petunia', 'calibrachoa', 'fuchsia', 'begonia', 'geranium', 'fern-hanging-basket', 'spider-plant', 'wandering-dude'].map(s => all.find(p => p.slug === s)).filter(Boolean).map(p => card(r, p)).join('')}</div></section>`;
    out.push(std('hanging-baskets/', 'Hanging Baskets | Davidson Greenhouse, Crawfordsville IN', 'Yellow, Blue, Red and White Ribbon hanging baskets at Davidson Greenhouse in Crawfordsville, IN, with sizes, contents and summer care tips.', main, { img: 'ice-plant-basket', ld: [crumbLd([['Home', ''], ['Hanging baskets', 'hanging-baskets/']])] }));
  }
  // Mulch stone soil
  {
    const r = '../';
    const mats = [['Mulch', 'Bulk and bagged mulch in several colors.'], ['Topsoil', 'Bulk or by the bag.'], ['Sand', 'Bagged and bulk.'], ['River rock & limestone', 'Bulk decorative stone.'], ['Driveway gravel & landscape rock', 'For drives, paths and drainage.'], ['Boulders', 'Accent stone for beds and slopes.'], ['Compost & peat moss', 'Bagged, for amending beds and potting.'], ['Potting soils & raised bed amendments', 'Including raised-bed corners.']];
    const main = hero(r, [['Home', ''], ['Mulch, stone & soil', 'mulch-stone-soil/']], 'Landscape materials', 'Mulch, stone, sand and soil, bulk or bagged.', 'Everything you need to finish a bed, edge a path or top up the vegetable garden.') + `
  <section class="wrap sec mats"><div class="mats-m">${pic(r, 'mulch', 'Mulch at Davidson Greenhouse', { sizes: '(min-width: 900px) 45vw, 100vw' })}</div><ul class="mats-l">${mats.map(([t, d]) => `<li class="reveal"><h2 class="h5">${t}</h2><p>${d}</p></li>`).join('')}</ul></section>
  <section class="wrap sec calc-sec" aria-labelledby="calc-h"><div class="sec-head"><p class="eyebrow">Quick math</p><h2 id="calc-h" class="h2">How much do I need?</h2><p class="sec-lead">Bulk materials are sold by the cubic yard. One cubic yard covers about 324 square feet at 1 inch deep.</p></div>
  <form class="calc" data-calc onsubmit="return false"><label><span>Length (ft)</span><input type="number" min="0" step="0.5" value="20" data-c="l" inputmode="decimal"></label><label><span>Width (ft)</span><input type="number" min="0" step="0.5" value="4" data-c="w" inputmode="decimal"></label><label><span>Depth (in)</span><input type="number" min="0" step="0.5" value="3" data-c="d" inputmode="decimal"></label><output class="calc-out" data-c-out aria-live="polite"></output></form>
  <p class="fine">A rough estimate. Ask us about delivery and current bulk availability. Our <a href="${r}journal/mulch-stone-soil-calculator-guide/">materials guide</a> explains depths for each job.</p></section>`;
    out.push(std('mulch-stone-soil/', 'Mulch, Stone & Topsoil | Davidson Greenhouse, Crawfordsville IN', 'Bulk and bagged mulch, river rock, limestone, gravel, boulders, sand and topsoil at Davidson Greenhouse in Crawfordsville, IN, plus a quick quantity calculator.', main, { img: 'mulch', ld: [crumbLd([['Home', ''], ['Mulch, stone & soil', 'mulch-stone-soil/']])] }));
  }
  // Gifts & goods
  {
    const r = '../';
    const garden = ['Raw honey and local maple syrup', 'Herbs', 'Pots: clay, glazed and plastic', 'Garden tools and gloves', 'Tomato cages, trellises and plant supports', 'Bulk or bagged topsoil', 'Bird feeders, houses, seed and birdbaths', 'Plant and garden seeds', 'Spring and fall vegetables', 'Insecticides and herbicides, including organic options', 'Fertilizers and potting soils', 'Pond maintenance items', 'Fairy garden supplies and terrarium plants', 'Mole traps and bait'];
    const decor = ['T-shirts', 'Jewelry', 'Home decor', 'Garden decor and statuary', 'Wind chimes and Corinthian Bells', 'Gazing balls and wind spinners', 'Crystals, rocks and gemstones', 'Engraved rocks', 'Glass hanging terrariums', 'Solar garden lanterns'];
    const main = hero(r, [['Home', ''], ['Gifts & goods', 'gifts-and-goods/']], 'Gifts &amp; goods', 'Raw honey to wind chimes, and everything in between.', 'Whether you’re taking your garden to the next level or shopping for someone who isn’t a gardener, the store has more than plants.') + `
  <section class="wrap sec goods"><div class="goods-col reveal"><h2 class="h3">For the garden</h2><ul class="checks">${garden.map(x => `<li>${x}</li>`).join('')}</ul></div><div class="goods-m">${pic(r, 'garden-supplies', 'Garden supplies at Davidson Greenhouse', { sizes: '(min-width: 900px) 30vw, 100vw' })}</div><div class="goods-col reveal"><h2 class="h3">For the home</h2><ul class="checks">${decor.map(x => `<li>${x}</li>`).join('')}</ul></div></section>
  <section class="wrap sec cbd" aria-labelledby="cbd-h"><div class="cbd-in"><p class="eyebrow">Also in store</p><h2 id="cbd-h" class="h3">CBD products</h2><p>We carry CBD products and host a “Cannabinoids 101” info session for anyone new to them. <a href="${r}events/#cannabinoids-101">See events</a>.</p><p class="fine">These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.</p></div></section>
  <p class="wrap fine">If we don’t have it in stock, we’ll do our best to order it for you.</p>`;
    out.push(std('gifts-and-goods/', 'Gifts, Honey & Garden Supplies | Davidson Greenhouse, Crawfordsville IN', 'Raw honey, garden tools, pots, bird feeders, seeds, decor, jewelry and more at Davidson Greenhouse & Nursery in Crawfordsville, IN.', main, { img: 'garden-supplies', ld: [crumbLd([['Home', ''], ['Gifts & goods', 'gifts-and-goods/']])] }));
  }
  // Events
  {
    const r = '../';
    const main = hero(r, [['Home', ''], ['Events', 'events/']], 'Events', 'Come for the plants, stay for the bees.', 'We host regular info sessions and an annual festival that gives back to the community.') + `
  <section class="wrap sec events">
    <article class="evt reveal" id="beekeepers"><div class="evt-when"><span>Monthly</span><b>2nd Wed.</b></div><div class="evt-t"><h2 class="h3">Beekeeper info meetings</h2><p>On the second Wednesday of every month, we host info meetings, open to the public, with the Montgomery County beekeepers. Hear about the beehive on our site and get your questions answered. Guest speakers are invited too, so no two sessions are the same.</p><p class="fine">Call <a href="${TEL}">${PHONE}</a> for the next meeting’s time.</p></div></article>
    <article class="evt reveal" id="fall-festival"><div class="evt-when"><span>Annually</span><b>Fall</b></div><div class="evt-t"><h2 class="h3">Fall Festival</h2><p>Held every year to benefit the Animal Welfare League of Montgomery County and local vendors. Shop seasonal plants like mums and pumpkins, browse vendor booths, and enjoy face painting and food trucks, all for a small entry fee.</p><p class="fine">Our events page describes the festival as the first weekend of October. Our 2027 vendor application lists Saturday, September 25 (10 am–4 pm) and Sunday, September 26 (noon–4 pm). Call to confirm this year’s dates.</p><div class="btn-row">${btn(VENDOR, 'Vendor application', { ext: true, icon: ico.ext, cls: 'btn-line' })}</div></div></article>
    <article class="evt reveal" id="cannabinoids-101"><div class="evt-when"><span>Info session</span><b>CBD</b></div><div class="evt-t"><h2 class="h3">Cannabinoids 101</h2><p>If you’re new to CBD or just want to know more, this session covers the basics: the deltas, CBD and recent developments in cannabinoids.</p><p class="fine">Call for upcoming dates.</p></div></article>
  </section>
  <section class="wrap sec">${fig(r, 'truck-pumpkins', 'Pumpkins in the Davidson Greenhouse truck', 'Fall at the greenhouse.', 'fig-wide', '100vw')}</section>`;
    out.push(std('events/', 'Events | Davidson Greenhouse, Crawfordsville IN', 'Monthly beekeeper info meetings, the annual Fall Festival benefiting the Animal Welfare League of Montgomery County, and Cannabinoids 101 at Davidson Greenhouse.', main, { img: 'truck-pumpkins', ld: [crumbLd([['Home', ''], ['Events', 'events/']])] }));
  }
  // Visit
  {
    const r = '../';
    const tips = [['Come early in spring', 'From late April through May the benches turn over fast, and the best selection goes early in the week.'], ['Bring measurements and photos', 'For containers, beds or a tricky shady corner, photos and rough measurements help us steer you to the right plants.'], ['Ask about special orders', 'If it isn’t on the benches, especially trees and shrubs, ask. We can often order it.'], ['Protect plants on the ride home', 'In cold months, ask us to sleeve or wrap tropical plants and poinsettias. A few minutes below 50°F can damage them.']];
    const main = hero(r, [['Home', ''], ['Visit', 'visit/']], 'Visit', 'Find us on Ladoga Road.', `${ADDR}. Call us at <a href="${TEL}">${PHONE}</a>.`) + `
  <section class="wrap sec visit-main"><div class="vm-hours reveal"><h2 class="h3">Hours</h2>${hoursList('hours-lg')}<p class="open-line" data-open-line></p><p class="fine">Hours as posted on our website. Holiday and seasonal hours may differ; call ahead.</p></div><div class="vm-map"><iframe title="Map to Davidson Greenhouse & Nursery" src="${MAP_EMBED}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><div class="btn-row">${btn(MAPS, 'Open in Google Maps', { ext: true, icon: ico.pin })}${btn(TEL, 'Call ' + PHONE, { cls: 'btn-line', icon: ico.phone })}</div></div></section>
  <section class="wrap sec"><div class="sec-head"><p class="eyebrow">Before you come</p><h2 class="h2">A few visiting tips</h2></div><div class="tips-grid">${tips.map(([t, d]) => `<div class="tipc reveal"><h3 class="h5">${t}</h3><p>${d}</p></div>`).join('')}</div></section>
  <section class="wrap sec">${fig(r, 'sunset-field', 'Sunset over the field at Davidson Greenhouse', '', 'fig-wide', '100vw')}</section>`;
    out.push(std('visit/', 'Visit Us: Hours & Directions | Davidson Greenhouse, Crawfordsville IN', 'Davidson Greenhouse & Nursery, 3147 E Ladoga Road, Crawfordsville, IN 47933. Open Monday–Friday 9–5 and Saturday 10–3. Closed Sunday. (765) 364-0556.', main, { img: 'sunset-field', ld: [crumbLd([['Home', ''], ['Visit', 'visit/']])] }));
  }
  // Contact
  {
    const r = '../';
    const main = hero(r, [['Home', ''], ['Contact', 'contact/']], 'Contact', 'The fastest way to reach us is the phone.', 'Questions about stock, special orders, landscaping or events? Give us a call during business hours.') + `
  <section class="wrap sec contact-grid">
    <a class="cbox reveal" href="${TEL}">${ico.phone}<h2 class="h4">Call</h2><p class="cbox-big">${PHONE}</p><p>Mon–Fri 9–5 · Sat 10–3</p></a>
    <a class="cbox reveal" href="${MAPS}" target="_blank" rel="noopener">${ico.pin}<h2 class="h4">Visit</h2><p class="cbox-big">${STREET}</p><p>${CITY}, ${REGION} ${ZIP}</p></a>
    <a class="cbox reveal" href="${FB}" target="_blank" rel="noopener">${ico.fb}<h2 class="h4">Message us</h2><p class="cbox-big">Facebook</p><p>Updates, new arrivals and events</p></a>
    <a class="cbox reveal" href="${CONTACT_FORM}" target="_blank" rel="noopener">${ico.ext}<h2 class="h4">Web form</h2><p class="cbox-big">Contact form</p><p>On our current website</p></a>
  </section>
  <section class="wrap sec list-sec" aria-labelledby="pl-h"><div class="sec-head"><p class="eyebrow">Your plant list</p><h2 id="pl-h" class="h2">Plants you’ve saved</h2><p class="sec-lead">Tap “Add to my plant list” on any plant page. Your list stays on this device. Copy it and read it to us over the phone, or bring it on your visit.</p></div>
  <div class="plist" data-plist><p class="plist-empty" data-plist-empty>No plants saved yet. <a class="ul" href="${r}plants/">Browse the catalog</a>.</p><ul data-plist-items></ul><div class="btn-row" data-plist-actions hidden><button type="button" class="btn btn-solid" data-plist-copy><span class="btn-t"><span data-t="Copy list">Copy list</span></span><span class="btn-i">${ico.layers}</span></button><button type="button" class="btn btn-line" data-plist-clear><span class="btn-t"><span data-t="Clear list">Clear list</span></span><span class="btn-i">${ico.close}</span></button></div><p class="fine" data-plist-msg aria-live="polite"></p></div></section>
  <section class="wrap sec"><div class="cols-2"><div class="reveal"><h2 class="h4">Jobs</h2><p>Want to work in the greenhouse? Fill out our <a class="ul" href="${JOBS}" target="_blank" rel="noopener">employment application</a>.</p></div><div class="reveal"><h2 class="h4">Fall Festival vendors</h2><p>Apply for a booth with the <a class="ul" href="${VENDOR}" target="_blank" rel="noopener">vendor application</a>.</p></div></div></section>`;
    out.push(std('contact/', 'Contact | Davidson Greenhouse & Nursery, Crawfordsville IN', 'Call Davidson Greenhouse at (765) 364-0556, visit 3147 E Ladoga Road in Crawfordsville, IN, or message us on Facebook.', main, { img: 'greenhouse-panorama', ld: [crumbLd([['Home', ''], ['Contact', 'contact/']])] }));
  }
  // FAQ
  {
    const r = '../';
    const nursery = [['What types of plants do you carry?', 'A large selection of annuals, perennials, shrubs, trees, hanging baskets, herbs, vegetables, succulents, seasonal flowers and specialty plants. Year-round, we have one of the largest selections of houseplants, succulents and cacti in the area. Browse the <a href="' + r + 'plants/">plant catalog</a> to see what’s on our garden guide list.'], ['Are you open in winter?', 'Yes. We’re open year-round: Monday through Friday 9 am–5 pm and Saturday 10 am–3 pm. Closed Sunday.'], ['Do you sell trees and shrubs for landscaping?', 'Yes. We carry trees, shrubs, ornamental grasses and evergreens from April through October, and staff can help you choose for privacy, shade, curb appeal and long-term health. If we don’t have what you want, we can often special-order it.'], ['Can your team help me choose the right plants for my yard?', 'Yes. Tell us about your sun, soil, how much upkeep you want and what you’re hoping for. We’ll recommend plants that suit Indiana’s weather.'], ['Do you offer mulch, decorative stone and landscaping materials?', 'Yes: bulk and bagged mulch in several colors, decorative stone, driveway gravel, boulders, sand and topsoil. See <a href="' + r + 'mulch-stone-soil/">mulch, stone &amp; soil</a>.'], ['Does your inventory change during the season?', 'Constantly. Stock depends on the season, availability and new arrivals, and it moves quickly in spring. The best way to see what’s available is to stop by, or call ahead for something specific.'], ['Do you guarantee your plants?', 'We carry warranties on many of our products. Ask at checkout about the warranty on what you’re buying.'], ['Can I bring my own pots to be planted?', 'Yes. Our <a href="' + r + 'custom-containers/">bring-your-own-container service</a> pairs you with our in-house designer for a custom arrangement.'], ['Which of your houseplants are safe for pets?', 'Our garden guide flags pet-friendly plants, and each plant page here notes pet safety where it’s well documented, with a link to the ASPCA plant list. Start with our <a href="' + r + 'journal/houseplant-care-pet-safe-plants/">pet-safe houseplant guide</a>.'], ['Why shop at a local greenhouse instead of a big box store?', 'Healthier plants, knowledgeable advice and personal service from people who know Crawfordsville’s climate and soil.']];
    const land = [['Do you do landscaping?', 'Yes. Landscaping is offered with our partner Yund Outdoor: tree and shrub planting, mulch, bed cleanups, weeding, trimming, design and hardscaping. See <a href="' + r + 'landscaping/">landscaping</a>.']];
    const all2 = [...nursery, ...land];
    const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
    const main = hero(r, [['Home', ''], ['FAQ', 'faq/']], 'FAQ', 'Good questions, straight answers.', '') + `<section class="wrap sec faq-sec"><div class="faq">${all2.map(([q, a]) => `<details class="qa"><summary><span>${esc(q)}</span>${ico.down}</summary><div class="qa-a"><p>${a}</p></div></details>`).join('')}</div><p class="fine">Still curious? Call <a href="${TEL}">${PHONE}</a>.</p></section>`;
    out.push(std('faq/', 'FAQ | Davidson Greenhouse & Nursery, Crawfordsville IN', 'Answers about plants, hours, landscaping, mulch and stone, custom containers and pet-safe plants at Davidson Greenhouse in Crawfordsville, IN.', main, { img: 'greenhouse-interior', ld: [crumbLd([['Home', ''], ['FAQ', 'faq/']]), faqLd(all2.map(([q, a]) => [q, strip(a)]))] }));
  }
  // Reviews
  {
    const r = '../';
    const main = hero(r, [['Home', ''], ['Reviews', 'reviews/']], 'Reviews', 'What customers say.', `As posted on our <a class="ul" href="${OLD}reviews/" target="_blank" rel="noopener">original website</a>.`) + `<section class="wrap sec"><div class="rv-wall">${REVIEWS.map(([q, n]) => `<figure class="rv rv-w reveal"><blockquote><p>${esc(q)}</p></blockquote><figcaption>${esc(n)}</figcaption></figure>`).join('')}</div></section>`;
    out.push(std('reviews/', 'Customer Reviews | Davidson Greenhouse, Crawfordsville IN', 'What customers say about Davidson Greenhouse & Nursery in Crawfordsville, IN: friendly staff, healthy plants and a great selection.', main, { img: 'greenhouse-interior', ld: [crumbLd([['Home', ''], ['Reviews', 'reviews/']])] }));
  }
  // Gallery
  {
    const r = '../';
    const names = Object.keys(dims).filter(n => n !== 'gift-certificate');
    const ALT = { 'herb-bundles': 'Onion sets and plants, seed potatoes and bulk beans', flats: 'Flats of young greens on a greenhouse bench', 'water-garden': 'Water hyacinth around a garden statue', 'seed-packets': 'A tomato transplant with vegetable seed packets', 'wreath-bundles': 'Bundles of fresh greens', 'sunset-field': 'Sunset over the field', 'truck-wreath': 'The greenhouse truck with a holiday wreath', 'fall-truck': 'The greenhouse truck in a fall display', 'truck-pumpkins': 'Pumpkins in the greenhouse truck' };
    const alt = n => (ALT[n] || n.replace(/-/g, ' ').replace(/^./, c => c.toUpperCase())) + ' at Davidson Greenhouse';
    const main = hero(r, [['Home', ''], ['Gallery', 'gallery/']], 'Gallery', 'Around the greenhouse.', 'Photos from Davidson Greenhouse &amp; Nursery: the benches, the arrangements and the seasons. Tap any photo to see it larger.') + `<section class="wrap sec"><div class="masonry" data-gallery>${names.map(n => `<button type="button" class="m-i" data-full="${r}assets/img/${n}-1600.jpg" data-alt="${esc(alt(n))}">${pic(r, n, alt(n), { sizes: '(min-width: 1100px) 25vw, (min-width: 700px) 33vw, 50vw' })}</button>`).join('')}</div></section>
  <dialog class="lb" data-lb aria-label="Photo viewer"><button type="button" class="lb-x" data-lb-close aria-label="Close">${ico.close}</button><img alt="" data-lb-img><p class="lb-c" data-lb-cap></p></dialog>`;
    out.push(std('gallery/', 'Photo Gallery | Davidson Greenhouse & Nursery, Crawfordsville IN', 'Photos of houseplants, succulents, arrangements, fall displays and holiday greenery at Davidson Greenhouse & Nursery in Crawfordsville, IN.', main, { img: 'greenhouse-panorama', ld: [crumbLd([['Home', ''], ['Gallery', 'gallery/']])] }));
  }
  // Careers
  {
    const r = '../';
    const main = hero(r, [['Home', ''], ['Careers', 'careers/']], 'Careers', 'Like plants? Like people? Work with us.', 'We accept employment applications online.', `<div class="btn-row">${btn(JOBS, 'Employment application', { ext: true, icon: ico.ext })}</div>`) + `<section class="wrap sec">${fig(r, 'seedling-benches', 'Seedling benches in the greenhouse', '', 'fig-wide', '100vw')}<p class="fine">The application opens on Jotform, the form service we use. Openings depend on the season; spring is our busiest time.</p></section>`;
    out.push(std('careers/', 'Careers | Davidson Greenhouse & Nursery, Crawfordsville IN', 'Apply to work at Davidson Greenhouse & Nursery in Crawfordsville, Indiana. Fill out our online employment application.', main, { img: 'seedling-benches', ld: [crumbLd([['Home', ''], ['Careers', 'careers/']])] }));
  }
  // Garden guide
  {
    const r = '../';
    const secs = [['Hanging baskets', 'hanging-baskets/'], ['Houseplants / succulents / cactus', 'plants/category/houseplants/'], ['Annuals, packs and potted', 'plants/category/annuals/'], ['Herbs', 'plants/category/herbs/'], ['Water plants', 'plants/category/water/'], ['Perennials, potted and packs', 'plants/category/perennials/'], ['Grasses, vines and groundcovers', 'plants/category/grasses-vines/'], ['Fruits and vegetables', 'plants/category/vegetables/'], ['Pepper plants', 'plants/hot-peppers/'], ['Tomatoes', 'plants/tomato/'], ['Fruit trees', 'plants/category/fruit-trees/'], ['Shrubs and trees', 'plants/category/trees/']];
    const main = hero(r, [['Home', ''], ['Garden guide', 'garden-guide/']], 'Garden guide', 'Our 2025 Garden Guide, now as a website.', 'Every spring we publish a garden guide listing the plants and varieties we grow and carry. The plant pages on this site are built from it, with growing details for central Indiana added to each one.', `<div class="btn-row">${btn(GUIDE_PDF, 'Open the 2025 PDF', { ext: true, icon: ico.ext })}${btn(r + 'plants/', 'Browse the plant pages', { cls: 'btn-line' })}</div>`) + `
  <section class="wrap sec"><div class="gg-grid">${secs.map(([t, h]) => `<a class="gg reveal" href="${r}${h}"><span>${t}</span>${ico.arrow}</a>`).join('')}</div></section>
  <section class="wrap sec prose reveal"><h2 class="h3">Reading the guide</h2><ul><li><strong>Stock always changes.</strong> The guide lists what we plan to grow and carry. Things sell out, and new plants arrive all season. We’re happy to special-order.</li><li><strong>Tomato disease codes.</strong> Letters after a tomato variety show resistance: V Verticillium wilt, F Fusarium wilt (FF and FFF for more races), N nematodes, T tobacco mosaic virus, A Alternaria stem canker, St Stemphylium gray leaf spot, TSWV tomato spotted wilt virus, BS bacterial speck, EB early blight, LB late blight.</li><li><strong>(P) and (S) on fruit trees.</strong> (P) means the variety needs a pollinator variety nearby. (S) means it’s self-fertile.</li><li><strong>Zones.</strong> The guide’s herb notes say “most of Indiana is Zone 5,” from the older USDA map. On the 2023 map, Crawfordsville is zone 6a. Our plant pages use the current map. Check your address at the <a href="https://planthardiness.ars.usda.gov/" target="_blank" rel="noopener">USDA Plant Hardiness Zone Map</a>.</li><li><strong>Prices.</strong> The 2025 guide lists houseplants, succulents and cacti at $3.50 (2″), $5.99 (4″) and $12.99 (6″). Call to confirm current prices.</li></ul></section>`;
    out.push(std('garden-guide/', '2025 Garden Guide | Davidson Greenhouse, Crawfordsville IN', 'Davidson Greenhouse’s 2025 Garden Guide: houseplants, annuals, perennials, herbs, vegetables, tomatoes, peppers, fruit trees and shrubs, with how to read it.', main, { img: 'seed-packets', ld: [crumbLd([['Home', ''], ['Garden guide', 'garden-guide/']])] }));
  }
  return out;
}

export const faqLd = qa => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

export function notFound() {
  // 404 lives at the site root but can be served at any depth, so it uses absolute URLs.
  const root = '/davidsons-greenhouse/';
  const main = `<section class="nf wrap"><p class="eyebrow">404 · Page not found</p><h1 class="h1">This bench is empty.</h1><p class="lead">The page you’re looking for has been moved, sold out, or never sprouted. Try the catalog or head home.</p><div class="btn-row">${btn(root, 'Back to home')}${btn(root + 'plants/', 'Browse plants', { cls: 'btn-line' })}</div><div class="nf-pot" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M30 70h60l-7 38H37z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M26 62h68v8H26z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M60 62c0-12 2-20 8-26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="nf-sprout"/><path d="M68 36c6-6 14-6 18-2-6 6-12 6-18 2z" fill="currentColor" class="nf-leaf"/></svg></div></section>`;
  return { path: '404.html', html: page({ root, path: '404.html', title: 'Page not found | Davidson Greenhouse & Nursery', desc: 'That page could not be found.', main, body: 'pg-404' }) };
}
