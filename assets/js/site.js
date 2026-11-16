/* Davidson Greenhouse & Nursery — site behaviour. Native scrolling; motion is decorative only. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var motion = html.classList.contains('motion');
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var css = $('link[href*="assets/css/site.css"]');
  var ROOT = css ? css.href.replace(/assets\/css\/site\.css.*$/, '') : '/';

  /* ——— Header: solid after scrolling, tucks away on the way down ——— */
  var hdr = $('[data-hdr]'), lastY = w.scrollY, ticking = false;
  function onScroll() {
    var y = w.scrollY;
    if (hdr) {
      hdr.classList.toggle('is-solid', y > 10);
      var open = hdr.classList.contains('mega-open') || html.classList.contains('ov-lock');
      if (!open && y > 420 && y > lastY + 4) { hdr.classList.add('is-hidden'); html.classList.remove('hdr-shown'); }
      else if (y < lastY - 4 || y <= 420) { hdr.classList.remove('is-hidden'); html.classList.add('hdr-shown'); }
    }
    lastY = y;
    progress();
    ticking = false;
  }
  w.addEventListener('scroll', function () { if (!ticking) { ticking = true; w.requestAnimationFrame(onScroll); } }, { passive: true });

  /* ——— Mega menu ——— */
  var megaBtn = $('[data-mega]'), mega = $('[data-mega-panel]'), megaTimer;
  function setMega(on) {
    if (!megaBtn || !mega) return;
    megaBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    mega.hidden = !on; hdr.classList.toggle('mega-open', on);
  }
  if (megaBtn && mega) {
    megaBtn.addEventListener('click', function () { setMega(mega.hidden); });
    var fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) {
      [megaBtn, mega].forEach(function (el) {
        el.addEventListener('mouseenter', function () { clearTimeout(megaTimer); setMega(true); });
        el.addEventListener('mouseleave', function () { megaTimer = setTimeout(function () { setMega(false); }, 220); });
      });
    }
    d.addEventListener('click', function (e) { if (!mega.hidden && !mega.contains(e.target) && !megaBtn.contains(e.target)) setMega(false); });
    var mImg = $('.mega-img img', mega), mSrc = $('.mega-img source', mega);
    $$('.mega-cats a', mega).forEach(function (a) {
      a.addEventListener('mouseenter', function () {
        var n = a.getAttribute('data-prev'); if (!mImg || !n) return;
        if (mSrc) mSrc.srcset = ROOT + 'assets/img/' + n + '-800.webp';
        mImg.srcset = ROOT + 'assets/img/' + n + '-800.jpg'; mImg.src = ROOT + 'assets/img/' + n + '-800.jpg';
      });
    });
  }

  /* ——— Full-screen menu ——— */
  var burger = $('[data-burger]'), ov = $('[data-nav]'), lastFocus;
  function setOv(on) {
    if (!burger || !ov) return;
    burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) {
      lastFocus = d.activeElement; setMega(false);
      ov.hidden = false; html.classList.add('ov-lock'); hdr.classList.remove('is-hidden');
      w.requestAnimationFrame(function () { w.requestAnimationFrame(function () { ov.classList.add('is-open'); }); });
      var first = $('.nav-ov-main a', ov); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
    } else {
      ov.classList.remove('is-open'); html.classList.remove('ov-lock');
      var done = function () { if (!ov.classList.contains('is-open')) ov.hidden = true; };
      if (motion) setTimeout(done, 700); else done();
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
  }
  if (burger && ov) {
    burger.addEventListener('click', function () { setOv(burger.getAttribute('aria-expanded') !== 'true'); });
    $$('.nav-ov-main a', ov).forEach(function (a, i) {
      a.style.setProperty('--i', i);
      a.addEventListener('mouseenter', function () { var n = a.getAttribute('data-prev'); $$('.ov-img', ov).forEach(function (im) { im.classList.toggle('on', im.getAttribute('data-img') === n); }); });
    });
    ov.addEventListener('click', function (e) { if (e.target.closest('a')) setOv(false); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { if (!ov.hidden) setOv(false); if (mega && !mega.hidden) { setMega(false); megaBtn.focus(); } }
      if (e.key === 'Tab' && !ov.hidden) {
        var f = [burger].concat($$('a,button', ov)).filter(function (x) { return x.offsetParent !== null; });
        var i = f.indexOf(d.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ——— Open / closed, in Crawfordsville time ——— */
  var HRS = { 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: [10, 15], 0: null };
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var fmt = function (h) { return (h > 12 ? h - 12 : h) + (h >= 12 ? ' pm' : ' am'); };
  function nowIndy() {
    try {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Indiana/Indianapolis', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), h: (+o.hour % 24) + (+o.minute) / 60 };
    } catch (e) { var n = new Date(); return { day: n.getDay(), h: n.getHours() + n.getMinutes() / 60 }; }
  }
  function status() {
    var n = nowIndy(), t = HRS[n.day];
    if (t && n.h >= t[0] && n.h < t[1]) return { open: true, short: 'Open · til ' + fmt(t[1]), long: 'Open now, until ' + fmt(t[1]) + ' today.' };
    var nd = n.day, label;
    if (t && n.h < t[0]) label = 'today at ' + fmt(t[0]);
    else { for (var k = 1; k <= 7; k++) { nd = (n.day + k) % 7; if (HRS[nd]) break; } label = (k === 1 ? 'tomorrow' : DAYS[nd]) + ' at ' + fmt(HRS[nd][0]); }
    return { open: false, short: 'Closed · opens ' + label.replace(' at ', ' ').replace('tomorrow', 'tmrw'), long: 'Closed now. We open ' + label + '.' };
  }
  function paintHours() {
    var s = status(), day = nowIndy().day;
    $$('[data-open-chip]').forEach(function (c) { c.classList.toggle('is-open', s.open); c.classList.toggle('is-closed', !s.open); var sp = $('span', c); if (sp) sp.textContent = s.short; c.setAttribute('aria-label', s.long + ' See hours and directions.'); });
    $$('[data-open-line]').forEach(function (p) { p.textContent = s.long; p.classList.toggle('is-open', s.open); });
    $$('[data-hours] li').forEach(function (li) { li.classList.toggle('is-today', +li.getAttribute('data-day') === day); });
  }
  paintHours(); setInterval(paintHours, 60000);

  /* ——— Split headings into words (text nodes only, so entities and links survive) ——— */
  function splitWords(el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = d.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(' ')); return; }
            var o = d.createElement('span'); o.className = 'w';
            var inner = d.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
            o.appendChild(inner); frag.appendChild(o);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(el);
    el.classList.add('split');
  }
  if (motion) $$('[data-split]').forEach(splitWords);
  var word = $('[data-word]');
  if (word && motion) { var txt = word.textContent; word.textContent = ''; txt.split('').forEach(function (ch, i) { var s = d.createElement('span'); s.className = 'ch'; s.textContent = ch; s.style.setProperty('--i', i); word.appendChild(s); }); }

  /* ——— Reveals ——— */
  var targets = $$('.reveal, .clip-reveal, .split, .ftr-word, .pgrid .pcard, .tag-rail .tag-big');
  if (motion && 'IntersectionObserver' in w) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, sib = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        if (el.classList.contains('pcard') || el.classList.contains('tag-big')) el.style.transitionDelay = Math.min(sib % 4, 3) * 70 + 'ms';
        el.classList.add('in'); io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    targets.forEach(function (el) { io.observe(el); });
  } else targets.forEach(function (el) { el.classList.add('in'); });

  /* ——— GSAP: parallax and the read-along intro (transforms/opacity only, no pinning) ——— */
  function gsapBits() {
    if (!motion || !w.gsap || !w.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    $$('[data-parallax]').forEach(function (el) {
      var amt = parseFloat(el.getAttribute('data-parallax')) || 6;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('[data-lines]').forEach(function (el) {
      splitWords(el); el.classList.remove('split');
      var ws = $$('.w', el); ws.forEach(function (x) { x.style.overflow = 'visible'; });
      gsap.fromTo(ws, { opacity: 0.18 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: true } });
    });
    var badge = $('.hero-badge');
    if (badge) gsap.to(badge, { rotate: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    w.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }
  if (w.gsap) gsapBits(); else w.addEventListener('load', gsapBits);

  /* ——— Reading progress + table of contents ——— */
  var bar = $('[data-progress]'), post = $('.post-body');
  function progress() {
    if (!bar || !post) return;
    var r = post.getBoundingClientRect(), total = r.height - w.innerHeight * 0.6;
    var p = Math.min(1, Math.max(0, -r.top / (total || 1)));
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  }
  var tocLinks = $$('[data-toc]');
  if (tocLinks.length && 'IntersectionObserver' in w) {
    var map = {}; tocLinks.forEach(function (a) { map[a.getAttribute('data-toc')] = a; });
    var heads = tocLinks.map(function (a) { return d.getElementById(a.getAttribute('data-toc')); }).filter(Boolean);
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { tocLinks.forEach(function (a) { a.classList.remove('is-on'); }); var a = map[e.target.id]; if (a) a.classList.add('is-on'); } });
    }, { rootMargin: '-15% 0px -70% 0px' });
    heads.forEach(function (h) { tio.observe(h); });
  }

  /* ——— Catalog filters ——— */
  var grid = $('[data-grid]');
  if (grid) {
    var cards = $$('.pcard', grid), q = $('[data-q]'), count = $('[data-count]'), empty = $('[data-empty]'), reset = $('[data-reset]');
    var st = { cat: '', light: [], tag: [], q: '' };
    var params = new URLSearchParams(w.location.search);
    if (params.get('cat')) st.cat = params.get('cat');
    if (params.get('q')) { st.q = params.get('q').toLowerCase(); q.value = params.get('q'); }
    function apply() {
      var n = 0, words = st.q.trim().split(/\s+/).filter(Boolean);
      cards.forEach(function (c) {
        var ok = (!st.cat || c.getAttribute('data-cat') === st.cat);
        if (ok && st.light.length) { var L = c.getAttribute('data-light').split(' '); ok = st.light.some(function (x) { return L.indexOf(x) > -1; }); }
        if (ok && st.tag.length) { var T = c.getAttribute('data-tags').split(' '); ok = st.tag.every(function (x) { return T.indexOf(x) > -1; }); }
        if (ok && words.length) { var nm = c.getAttribute('data-name'); ok = words.every(function (x) { return nm.indexOf(x) > -1; }); }
        c.classList.toggle('is-off', !ok); if (ok) { n++; c.classList.add('in'); }
      });
      count.textContent = n; empty.hidden = n > 0;
      reset.hidden = !(st.cat || st.light.length || st.tag.length || st.q);
      $$('.fchip').forEach(function (b) {
        var f = b.getAttribute('data-f'), v = b.getAttribute('data-v');
        b.setAttribute('aria-pressed', String(f === 'cat' ? st.cat === v : st[f].indexOf(v) > -1));
      });
    }
    $$('.fchip').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-f'), v = b.getAttribute('data-v');
        if (f === 'cat') st.cat = v; else { var i = st[f].indexOf(v); if (i > -1) st[f].splice(i, 1); else st[f].push(v); }
        apply();
      });
    });
    var qt; q.addEventListener('input', function () { clearTimeout(qt); qt = setTimeout(function () { st.q = q.value.toLowerCase(); apply(); }, 90); });
    reset.addEventListener('click', function () { st = { cat: '', light: [], tag: [], q: '' }; q.value = ''; apply(); });
    apply();
  }

  /* ——— Plant list (stays on this device) ——— */
  var KEY = 'dg-plant-list';
  var load = function () { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  var save = function (l) { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} };
  var addBtn = $('[data-list-add]'), plantEl = $('[data-plant]');
  if (addBtn && plantEl) {
    var slug = plantEl.getAttribute('data-plant'), name = plantEl.getAttribute('data-plant-name');
    var paint = function () {
      var on = load().some(function (x) { return x.s === slug; });
      addBtn.classList.toggle('is-on', on); addBtn.setAttribute('aria-pressed', String(on));
      var lab = on ? 'On your list · remove' : 'Add to my plant list', t = $('[data-t]', addBtn);
      if (t) { t.textContent = lab; t.setAttribute('data-t', lab); }
    };
    addBtn.addEventListener('click', function () {
      var l = load(), i = l.findIndex(function (x) { return x.s === slug; });
      if (i > -1) l.splice(i, 1); else l.push({ s: slug, n: name });
      save(l); paint();
    });
    paint();
  }
  var plist = $('[data-plist]');
  if (plist) {
    var ul = $('[data-plist-items]', plist), msg = $('[data-plist-msg]', plist);
    var render = function () {
      var l = load(); ul.innerHTML = '';
      l.forEach(function (x) {
        var li = d.createElement('li'), a = d.createElement('a'), b = d.createElement('button');
        a.href = ROOT + 'plants/' + x.s + '/'; a.textContent = x.n; b.type = 'button'; b.textContent = 'Remove';
        b.addEventListener('click', function () { save(load().filter(function (y) { return y.s !== x.s; })); render(); });
        li.appendChild(a); li.appendChild(b); ul.appendChild(li);
      });
      $('[data-plist-empty]', plist).hidden = l.length > 0; $('[data-plist-actions]', plist).hidden = !l.length;
    };
    $('[data-plist-copy]', plist).addEventListener('click', function () {
      var text = 'My plant list for Davidson Greenhouse:\n' + load().map(function (x) { return '- ' + x.n; }).join('\n');
      var ok = function () { msg.textContent = 'Copied. Paste it into a note or text, or read it to us at (765) 364-0556.'; };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, function () { msg.textContent = text; });
      else msg.textContent = text;
    });
    $('[data-plist-clear]', plist).addEventListener('click', function () { save([]); render(); msg.textContent = ''; });
    render();
  }

  /* ——— Materials calculator ——— */
  var calc = $('[data-calc]');
  if (calc) {
    var out = $('[data-c-out]', calc);
    var run = function () {
      var v = function (k) { return Math.max(0, parseFloat($('[data-c="' + k + '"]', calc).value) || 0); };
      var cuft = v('l') * v('w') * v('d') / 12, yd = cuft / 27;
      out.innerHTML = 'About <strong>' + (Math.ceil(yd * 10) / 10).toFixed(1) + ' cubic yards</strong><small>' + Math.round(cuft) + ' cubic feet · about ' + Math.ceil(cuft / 2) + ' bags of 2 cu ft · ' + Math.round(v('l') * v('w')) + ' sq ft</small>';
    };
    calc.addEventListener('input', run); run();
  }

  /* ——— Gallery lightbox ——— */
  var lb = $('[data-lb]');
  if (lb && lb.showModal) {
    var lbImg = $('[data-lb-img]', lb), lbCap = $('[data-lb-cap]', lb);
    $$('[data-full]').forEach(function (b) {
      b.addEventListener('click', function () { lbImg.src = b.getAttribute('data-full'); lbImg.alt = b.getAttribute('data-alt'); lbCap.textContent = b.getAttribute('data-alt'); lb.showModal(); });
    });
    $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  }

  onScroll();
  w.__dgReady = true;
})();
