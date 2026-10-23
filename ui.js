/* ═══════════════════════════════════════════════════════════
   Quizzes — shared UI helpers (no dependencies)
   Loaded at the top of <body> on every page.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var Q = window.Q = window.Q || {};

  /* Embedded mode: index.html?embed=1 is the AI chat shown inside a window on other pages (no top bar, no background effects) */
  Q.embed = /[?&]embed=1(&|$)/.test(location.search);
  if (Q.embed) document.documentElement.classList.add('embed');

  /* ═══════════════════════════════════════════════════════════════════════
     ### SUBJECTS — one block per subject, in the order they appear on the site.
     This is the single place for: Subject Name · Subject ID · Icon · Quizzes · Notes

       id        URL id (subject.html?id=...). lowercase + hyphens. Don't change it once published.
       name      shown on the home card and at the top of the subject page
       icon      flask · atom · pill · bottle · activity · pen · brain · users
       subtitle  optional line under the name ("" = default text)
       quizzes   [{ id, title, desc, q }]
                   id     = "<subject-id>-quiz-<number>"   e.g. "organic3-quiz-2"
                            (must match a key inside quizDatabase in quiz-player.html)
                   title  = quiz name · desc = short description · q = number of questions
       notes     ["point", "point", ...]  → one box per string (Arabic works too)
     ═══════════════════════════════════════════════════════════════════════ */
  Q.subjects = [
    {
      id: "organic3",
      name: "Organic III",
      icon: "flask",
      subtitle: "",
      quizzes: [
        { id: "organic1", title: "Quiz I", desc: "Heterocylce Nomenclature", q: 15 },
        { id: "organic2", title: "Quiz II", desc: "Pyridine", q: 25 },
        // { id: "organic3-quiz-1", title: "Quiz I", desc: "Short description", q: 20 },
      ],
      notes: ["Why E.S.R on pyridine is difficult: Due to the deactivating effect of the Nitrogen atom","Why electrophiles do not attack positions 2, 4, and 6:  Due to the deactivation effect exerted by Nitrogen on these specific positions","Friedel-Crafts (F.C) reactions:  Do not occur for pyridine because of the deactivating effect of Nitrogen.","Pyridine is a basic compound: It has a localized lone pair lying in an sp^2 orbital, while the $\pi$ electrons lie in a $2pz$ orbital; therefore, they are perpendicular to each other, leaving the lone pair free for protonation.","Piperidine is more basic than pyridine:Piperidine's lone pair is found in an $sp^3$ orbital, whereas pyridine's lone pair is present in an sp^2 orbital "]
    },
    {
      id: "biochemistry1",
      name: "Biochemistry I",
      icon: "atom",
      subtitle: "",
      quizzes: [
        { id: "biochemistry0", title: "Quiz 1 Online Dr.Eman", desc: "Biochemistry Quiz 1", q: 10 },
        { id: "biochemistry1", title: "Quiz I", desc: "Biochemistry Lec 1 Part 1", q: 30 }
      ],
      notes: []
    },
    {
      id: "pharmacology",
      name: "Pharmacology",
      icon: "pill",
      subtitle: "",
      quizzes: [
        { id: "pharmacology1", title: "Quiz I", desc: "Introduction", q: 30 },
        // { id: "pharmacology-quiz-1", title: "Quiz I", desc: "Short description", q: 20 },
      ],
      notes: []
    },
    {
      id: "ceutics1",
      name: "Ceutics I",
      icon: "bottle",
      subtitle: "",
      quizzes: [
        // { id: "ceutics1-quiz-1", title: "Quiz I", desc: "Short description", q: 20 },
      ],
      notes: []
    },
    {
      id: "physiology",
      name: "Physiology",
      icon: "activity",
      subtitle: "",
      quizzes: [
        { id: "physiology0", title: "First Quiz Dr.Heba", desc: "Blood Part 1 Quiz", q: 5 },
        { id: "physiology00", title: "Second Quiz Dr.Heba", desc: "Blood Part 2 Quiz", q: 5 },
        { id: "physiology1", title: "Quiz I", desc: "Blood", q: 20 },
        { id: "physiology2", title: "Quiz II", desc: "Circulation", q: 43 },
        // { id: "physiology-quiz-1", title: "Quiz I", desc: "Short description", q: 20 },
      ],
      notes: []
    },
    {
      id: "scientific-writing",
      name: "Scientific Writing",
      icon: "pen",
      subtitle: "",
      quizzes: [
        // { id: "scientific-writing-quiz-1", title: "Quiz I", desc: "Short description", q: 20 },
      ],
      notes: []
    },
    {
      id: "psychology",
      name: "Psychology",
      icon: "brain",
      subtitle: "",
      quizzes: [
        // { id: "psychology-quiz-1", title: "Quiz I", desc: "Short description", q: 20 },
      ],
      notes: []
    },
    {
      id: "leadership",
      name: "Leadership",
      icon: "users",
      subtitle: "",
      quizzes: [
        // { id: "leadership-quiz-1", title: "Quiz I", desc: "Short description", q: 20 },
      ],
      notes: []
    }
  ];

  /* ── Icons: one tiny inline SVG sprite (outline style, 24px grid) ── */
  var P = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    back: '<path d="m12 19-7-7 7-7M19 12H5"/>',
    play: '<path d="M7 4.5v15a.5.5 0 0 0 .76.43l12.2-7.5a.5.5 0 0 0 0-.86L7.76 4.07A.5.5 0 0 0 7 4.5Z"/>',
    up: '<path d="m5 12 7-7 7 7M12 19V5"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    headset: '<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/>',
    sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5a2 2 0 0 0 1.44 1.44l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
    notes: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M8 13h8M8 17h5"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1ZM4 22v-7"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14Z"/>',
    book: '<path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-1.04 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98 1.04 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0Z"/>',
    redo: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
    palette: '<circle cx="13.5" cy="6.5" r=".6" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".6" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".6" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".6" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2Z"/>',
    history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01"/>',
    /* subjects */
    flask: '<path fill="currentColor" fill-opacity=".22" d="M7.3 14.5h9.4l2.1 4.3A1.6 1.6 0 0 1 17.4 21H6.6a1.6 1.6 0 0 1-1.4-2.2Z"/><path d="M9.5 3h5M10 3v6.1L5.2 18.7A1.9 1.9 0 0 0 6.9 21.5h10.2a1.9 1.9 0 0 0 1.7-2.8L14 9.1V3"/><circle cx="11" cy="17.3" r=".9" fill="currentColor" stroke="none"/><circle cx="14" cy="16" r=".7" fill="currentColor" stroke="none"/>',
    atom: '<ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4"/><circle cx="12" cy="12" r="2.1" fill="currentColor"/>',
    pill: '<g transform="rotate(-45 12 12)"><path fill="currentColor" fill-opacity=".22" d="M12 8H6.5a4 4 0 0 0 0 8H12Z"/><rect x="2.5" y="8" width="19" height="8" rx="4"/><path d="M12 8v8"/></g>',
    beaker: '<path d="M4.5 3h15M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3M6 14h12"/>',
    activity: '<path fill="currentColor" fill-opacity=".22" d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/><path d="M5.5 12h3l1.7-3 3 6 1.6-3h3.2"/>',
    pen: '<path fill="currentColor" fill-opacity=".22" d="M16.6 3.4a2.2 2.2 0 0 1 3.1 3.1L8.4 17.8l-4.7 1.3 1.3-4.7Z"/><path d="m14.5 5.5 4 4M13 21h8"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>',
    bottle: '<rect x="8" y="2.8" width="8" height="3.2" rx="1"/><path d="M7.5 6h9l1.2 3.2V19a2.2 2.2 0 0 1-2.2 2.2h-7A2.2 2.2 0 0 1 6.3 19V9.2Z"/><rect fill="currentColor" fill-opacity=".22" x="9" y="12" width="6" height="5" rx="1.2"/>',
    brain: '<path fill="currentColor" fill-opacity=".22" d="M12 4.5A3.2 3.2 0 0 0 6.2 3.2 3.6 3.6 0 0 0 4 9.8a3.7 3.7 0 0 0 .6 6.5A3.4 3.4 0 0 0 12 19.3Z"/><path d="M12 4.5a3.2 3.2 0 0 1 5.8-1.3A3.6 3.6 0 0 1 20 9.8a3.7 3.7 0 0 1-.6 6.5A3.4 3.4 0 0 1 12 19.3V4.5Z"/><path d="M9 9.5h1.5M13.5 9.5H15M9 14h1.8M13.2 14H15M12 19.3V22"/>',
    users: '<circle fill="currentColor" fill-opacity=".22" cx="9" cy="8" r="3.6"/><path fill="currentColor" fill-opacity=".22" d="M2.5 20.5v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1Z"/><path d="M16.2 4.6a3.6 3.6 0 0 1 0 6.8M18.8 14.7a5 5 0 0 1 2.7 4.8v1"/>'
  };
  Q.icon = function (name, cls) {
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"/></svg>';
  };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">';
  for (var k in P) sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + P[k] + '</symbol>';
  document.body.insertAdjacentHTML('afterbegin', sprite + '</svg>');


  /* ── Background: blended gradient orbs + the falling/floating pieces of the current theme ──
     Built from Q.themes[i].fx, animated with transform/opacity only, paused when the tab is hidden. */
  var FX = {                          // n = [desktop, mobile]; ranges are [min, max]
    blush:    { n: [16, 9],  mix: ['lp1', 'lp2', 'lp3', 'lp1', 'lp4', 'lp2'], w: [26, 42], t: [14, 26], dx: 150, rs: 380, o: [.85, 1] },     // Princess: tree leaves
    // fronds:   { n: [14, 8],  mix: ['fa', 'fb', 'fc', 'fa'],                  w: [28, 48], t: [12, 22], dx: 160, rs: 420, o: [.75, 1] },    // GTA: palm fronds
    fronds:   { n: [14, 8],  mix: ['fa', 'fb', 'fc', 'fa'],                  w: [28, 48], t: [19, 36], dx: 160, rs: 420, o: [.75, 1] },    // GTA: palm fronds
    rain:     { n: [46, 24], mix: ['rain'],                                  h: [40, 95], t: [.65, 1.25], o: [.22, .55] },
    stars:    { n: [44, 22], mix: ['star'],                                  w: [2, 5],   t: [2.6, 6.5], o: [.55, 1] },                   // Aurora
    dust:     { n: [22, 12], mix: ['spark', 'spark', 'dot'],                 w: [9, 19],  t: [20, 34], dx: 60,  rs: 200, o: [.5, .95] },  // Gold
    feathers: { n: [12, 7],  mix: ['feather'],                               w: [18, 30], t: [16, 28], dx: 130, rs: 140, o: [.75, 1] },    // Peacock
    study:    { n: [16, 9],  mix: ['book', 'heart', 'pencil', 'sstar', 'note', 'daisy', 'heart', 'book', 'sstar', 'pencil'], w: [22, 36], t: [14, 26], dx: 130, rs: 260, o: [.88, 1], scale: { pencil: .5 } },   // Study: pastel stationery
    bubbles:  { n: [26, 13], mix: ['bubble'],                                w: [8, 30],  t: [12, 24], dx: 50,  rs: 40,  o: [.5, .9] }     // Coral
  };
  function R(a, b) { return a + Math.random() * (b - a); }

  Q.bg = function (count) {
    if (Q.embed) return;
    if (count != null) Q._bgLite = count <= 6;          // pages that want a calmer background (quiz player) pass a small number
    var old = document.querySelector('.bg'); if (old) old.remove();
    var small = window.innerWidth <= 650, lite = !!Q._bgLite;
    var fxName = Q.theme ? Q.theme.fx() : 'sheet', cfg = FX[fxName];
    var el = document.createElement('div');
    el.className = 'bg' + (cfg ? ' fx-' + fxName : ''); el.setAttribute('aria-hidden', 'true');
    var h = '<i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i>', i;

    if (!cfg) {                                          // default + light: the original drifting study pages
      var n = lite ? 5 : (small ? 5 : 8);
      for (i = 0; i < n; i++) {
        var dot = i % 4 === 3;
        var w = dot ? 6 + Math.random() * 8 : 16 + Math.random() * 14;
        var rs = (Math.random() < .5 ? -1 : 1) * (120 + Math.random() * 240);
        h += '<i class="pg' + (dot ? ' dot' : '') + '" style="--x:' + (Math.random() * 96).toFixed(1) + '%;--w:' + w.toFixed(0) + 'px;--t:' + (19 + Math.random() * 17).toFixed(1) +
          's;--d:-' + (Math.random() * 32).toFixed(1) + 's;--dx:' + ((Math.random() - .5) * 140).toFixed(0) + 'px;--r0:' + (Math.random() * 60 - 30).toFixed(0) +
          'deg;--rs:' + rs.toFixed(0) + 'deg;--o:' + (dot ? .45 : .32 + Math.random() * .26).toFixed(2) + '"></i>';
      }
    } else {
      var count2 = Math.round(cfg.n[small ? 1 : 0] * (lite ? .6 : 1));
      for (i = 0; i < count2; i++) {
        var kind = cfg.mix[i % cfg.mix.length], t = R(cfg.t[0], cfg.t[1]), s;
        if (kind === 'rain') {
          s = '--x:' + R(0, 125).toFixed(1) + '%;--h:' + R(cfg.h[0], cfg.h[1]).toFixed(0) + 'px;--t:' + t.toFixed(2) + 's;--d:-' + R(0, t).toFixed(2) + 's;--o:' + R(cfg.o[0], cfg.o[1]).toFixed(2);
        } else if (kind === 'star') {
          s = '--x:' + R(0, 99).toFixed(1) + '%;--y:' + R(0, 96).toFixed(1) + '%;--w:' + R(cfg.w[0], cfg.w[1]).toFixed(1) + 'px;--t:' + t.toFixed(1) + 's;--d:-' + R(0, t).toFixed(1) + 's;--o:' + R(cfg.o[0], cfg.o[1]).toFixed(2);
        } else {
          var ws = R(cfg.w[0], cfg.w[1]) * ((cfg.scale && cfg.scale[kind]) || 1);
          s = '--x:' + R(0, 96).toFixed(1) + '%;--w:' + ws.toFixed(0) + 'px;--t:' + t.toFixed(1) + 's;--d:-' + R(0, t).toFixed(1) + 's;--dx:' + ((Math.random() - .5) * cfg.dx).toFixed(0) +
            'px;--r0:' + R(-40, 40).toFixed(0) + 'deg;--rs:' + ((Math.random() < .5 ? -1 : 1) * R(cfg.rs * .4, cfg.rs)).toFixed(0) + 'deg;--o:' + R(cfg.o[0], cfg.o[1]).toFixed(2);
        }
        h += '<i class="pg k-' + kind + '" style="' + s + '"></i>';
      }
    }
    el.innerHTML = h;
    document.body.insertBefore(el, document.body.firstChild.nextSibling || null);
  };
  document.addEventListener('visibilitychange', function () {
    var el = document.querySelector('.bg'); if (el) el.classList.toggle('paused', document.hidden);
  });

  /* ── Text helpers ── */
  Q.esc = function (s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  /* Safe message formatting: escape first, then allow `code` and **bold** */
  Q.fmt = function (s) {
    return Q.esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  };

  /* ── Arabic readiness (page stays LTR; font loads only when Arabic appears) ── */
  var AR = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  var arLoaded = false;
  Q.lang = {
    has: function (t) { return AR.test(t || ''); },
    ensureFont: function () {
      if (arLoaded) return; arLoaded = true;
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    },
    /* Call on any element that receives user/AI/content text */
    mark: function (el, text) {
      var t = text == null ? el.textContent : text;
      if (AR.test(t)) { el.classList.add('ar'); Q.lang.ensureFont(); }
      return el;
    }
  };

  /* ── Scrollbar reveal: .is-scrolling is added while an element scrolls (or the pointer is at the right edge) ── */
  var scrollTimers = new WeakMap();
  function revealScrollbar(el) {
    if (!el || !el.classList) return;
    el.classList.add('is-scrolling');
    clearTimeout(scrollTimers.get(el));
    scrollTimers.set(el, setTimeout(function () { el.classList.remove('is-scrolling'); }, 900));
  }
  document.addEventListener('scroll', function (e) {
    revealScrollbar(e.target === document ? document.documentElement : e.target);
  }, { capture: true, passive: true });
  document.addEventListener('mousemove', function (e) {          // lets you grab the bar: show it near the right edge
    if (e.clientX > window.innerWidth - 22) revealScrollbar(document.documentElement);
  }, { passive: true });
  document.addEventListener('visibilitychange', function () {   // pause every animation while the tab is hidden
    document.documentElement.classList.toggle('tab-hidden', document.hidden);
  });

  /* ── Themes: the chosen style is saved in localStorage ("q-style") and applied on every page ──
     swatch = the 3 colours shown in the picker circle · bar = browser address-bar colour · fx = falling effect (see FX above) */
  Q.themes = [
    { id: 'default',  label: 'Default',  swatch: ['#0adaf1', '#3a7bd5', '#111318'], bar: '#111318', fx: 'sheet' },
    { id: 'gta',      label: 'GTA 6',    swatch: ['#ff2f92', '#ff8a1f', '#2a0e66'], bar: '#12062b', fx: 'fronds' },
    { id: 'princess', label: 'Princess', swatch: ['#ff7eb6', '#b66cff', '#fff1f6'], bar: '#fff1f6', fx: 'blush' },
    { id: 'study',    label: 'Study',    swatch: ['#a08af5', '#f58fb5', '#f8f3ff'], bar: '#f8f3ff', fx: 'study' },
    { id: 'rain',     label: 'Rain',     swatch: ['#d4dde9', '#8a99ae', '#0c0e11'], bar: '#0c0e11', fx: 'rain' },
    { id: 'aurora',   label: 'Aurora',   swatch: ['#6dffc0', '#b57bff', '#120d33'], bar: '#0b0920', fx: 'stars' },
    { id: 'gold',     label: 'Gold',     swatch: ['#f6d77a', '#c9902d', '#0b0906'], bar: '#0b0906', fx: 'dust' },
    { id: 'peacock',  label: 'Peacock',  swatch: ['#f2c94c', '#19c9a8', '#063a34'], bar: '#04201d', fx: 'feathers' },
    { id: 'coral',    label: 'Coral Reef', swatch: ['#ff6f61', '#ffb347', '#062c4a'], bar: '#041a2e', fx: 'bubbles' }
  ];
  function themeById(id) { for (var i = 0; i < Q.themes.length; i++) if (Q.themes[i].id === id) return Q.themes[i]; return Q.themes[0]; }
  function syncThemeUI() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', themeById(Q.theme.get()).bar);
  }
  Q.theme = {
    get: function () { return document.documentElement.dataset.theme || 'default'; },
    fx: function () { return themeById(Q.theme.get()).fx; },
    set: function (id, persist) {
      var t = themeById(id), root = document.documentElement;
      root.dataset.theme = t.id;
      root.classList.toggle('light-mode', t.id === 'light');
      if (persist !== false) { try { localStorage.setItem('q-style', t.id); } catch (_) {} }
      syncThemeUI();
      if (document.querySelector('.bg')) Q.bg();            // rebuild the falling effect for the new theme
      document.dispatchEvent(new CustomEvent('q-theme', { detail: t.id }));
    }
  };
  /* ── Theme picker: mounted into every [data-theme-picker] (home + subject pages; not the quiz page) ──
     A palette button opens a small list of colour circles. The choice is saved and applies to the whole site.
     First visit (nothing chosen yet): a small message appears once from the button. */
  function mountThemePicker(box) {
    box.classList.add('theme-wrap');
    box.innerHTML =
      '<button class="icon-btn" type="button" aria-label="Choose a style" aria-haspopup="true" aria-expanded="false">' + Q.icon('palette') + '</button>' +
      '<div class="theme-pop" role="radiogroup" aria-label="Site style">' + Q.themes.map(function (t) {
        return '<button class="swatch" type="button" role="radio" aria-checked="false" data-id="' + t.id + '" aria-label="' + t.label + '" style="--c1:' + t.swatch[0] + ';--c2:' + t.swatch[1] + ';--c3:' + t.swatch[2] + '"><i></i></button>';
      }).join('') + '</div>' +
      '<div class="theme-hint" role="status"><button class="hint-x" type="button" aria-label="Close message">' + Q.icon('x') + '</button><span dir="auto">تقدر تختار الثيم اللي يعجبك من هنا</span></div>';
    var btn = box.querySelector('.icon-btn'), pop = box.querySelector('.theme-pop'), hint = box.querySelector('.theme-hint');
    var swatches = [].slice.call(pop.querySelectorAll('.swatch'));
    Q.lang.mark(hint.querySelector('span'));
    function mark() { swatches.forEach(function (s) { s.setAttribute('aria-checked', String(s.dataset.id === Q.theme.get())); }); }
    function isOpen() { return pop.classList.contains('open'); }
    var hintTimer = 0;
    function hideHint() { clearTimeout(hintTimer); hint.classList.remove('show'); }
    var hintOff = false;                                       // set once the user opened the list or closed the message
    function closeHint() { hintOff = true; hideHint(); }   // X just removes it for this visit — it comes back every time the site is opened
    function open() { closeHint(); pop.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); mark(); }
    function close(refocus) { pop.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); if (refocus) btn.focus(); }
    btn.addEventListener('click', function () { isOpen() ? close() : open(); });
    pop.addEventListener('click', function (e) { var s = e.target.closest('.swatch'); if (s) { Q.theme.set(s.dataset.id); mark(); } });
    pop.addEventListener('keydown', function (e) {
      var i = swatches.indexOf(document.activeElement); if (i < 0) return;
      var step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (step) { e.preventDefault(); swatches[(i + step + swatches.length) % swatches.length].focus(); }
    });
    document.addEventListener('click', function (e) { if (isOpen() && !box.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) close(true); });
    hint.addEventListener('click', function (e) { if (e.target.closest('.hint-x')) return closeHint(); open(); });
    mark();

    // ### THEME HINT — appears EVERY time the page opens (not only the first visit) until the user closes it with X.
    // It waits while the rating window is open.
       // ### THEME HINT — home page only, once per browser session
    var HINT_COOKIE = 'q_style_hint';
    if (box.hasAttribute('data-hint') && document.cookie.indexOf(HINT_COOKIE + '=1') === -1) {
      var tryShow = function () {
        var r = document.getElementById('rating-overlay');
        if (hintOff) return;
        if (r && r.classList.contains('visible')) return setTimeout(tryShow, 700);
        hint.classList.add('show');
        document.cookie = HINT_COOKIE + '=1; path=/; SameSite=Lax';   // no expiry = deleted when the browser closes
      };
      setTimeout(tryShow, 1200);
    }
  }
  

  /* ── History of finished quizzes (saved on this device) ──
     Each attempt: { t: time, quiz: id, title, subject, score, total, missed: [{ q, user, correct, image }] } — newest first, max 60 */
  Q.history = {
    key: 'q-history',
    list: function () { try { return JSON.parse(localStorage.getItem('q-history') || '[]') || []; } catch (e) { return []; } },
    add: function (attempt) {
      try { var l = Q.history.list(); l.unshift(attempt); localStorage.setItem('q-history', JSON.stringify(l.slice(0, 60))); } catch (e) {}
    },
    clear: function () { try { localStorage.removeItem('q-history'); } catch (e) {} }
  };

  /* ── Segmented / tab controls with roving tabindex + arrow keys ── */
  Q.seg = function (el, onSelect) {
    var tabs = [].slice.call(el.querySelectorAll('[role="tab"]'));
    el.style.setProperty('--n', tabs.length);
    function select(i, focus, silent) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
      el.style.setProperty('--i', i);
      if (focus) tabs[i].focus();
      if (!silent && onSelect) onSelect(i, tabs[i]);
    }
    tabs.forEach(function (t, i) { t.addEventListener('click', function () { select(i); }); });
    el.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement); if (i < 0) return;
      var n = null, len = tabs.length;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % len;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + len) % len;
      else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = len - 1;
      if (n !== null) { e.preventDefault(); select(n, true); }
    });
    var cur = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    select(cur < 0 ? 0 : cur, false, true);
    return { select: select, tabs: tabs };
  };


  /* ── Click counting for links marked data-track="name" ── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]'); if (!a) return;
    var name = a.getAttribute('data-track');
    try { if (window.va) window.va('event', { name: name }); } catch (_) {}    // Vercel (Pro plan)
    try { if (window.gtag) window.gtag('event', name); } catch (_) {}           // Google Analytics (free)
  });

  
  /* ── Toast ── */
  Q.notify = function (message, seconds) {
    seconds = seconds || 5;
    var box = document.getElementById('toast-container');
    if (!box) { box = document.createElement('div'); box.id = 'toast-container'; box.setAttribute('role', 'status'); document.body.appendChild(box); }
    var t = document.createElement('div'); t.className = 'toast-message';
    t.innerHTML = '<span class="toast-ico">' + Q.icon('bell') + '</span><span></span>';
    t.lastChild.textContent = message;
    box.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('show'); }); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 320); }, seconds * 1000);
  };

  /* ── Chat helpers shared by Support and AI ── */
  Q.chat = {
    add: function (box, text, who) {
      var row = document.createElement('div'); row.className = 'msg ' + who;
      var b = document.createElement('div'); b.className = 'bubble'; b.setAttribute('dir', 'auto');
      b.innerHTML = Q.fmt(text); Q.lang.mark(b, text);
      row.appendChild(b); box.appendChild(row); box.scrollTop = box.scrollHeight;
      return row;
    },
    typing: function (box) {
      var row = document.createElement('div'); row.className = 'msg bot';
      row.innerHTML = '<div class="bubble" aria-label="Typing"><span class="dots"><i></i><i></i><i></i></span></div>';
      box.appendChild(row); box.scrollTop = box.scrollHeight; return row;
    },
    resize: function (el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 140) + 'px'; },
    /* Reveals text in frame-sized chunks (no per-character DOM rewrites) */
    reveal: function (bubble, text, box, done) {
      bubble.setAttribute('dir', 'auto'); Q.lang.mark(bubble, text);
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      var step = Math.max(2, Math.ceil(text.length / 80)), n = 0;
      function finish() { bubble.innerHTML = Q.fmt(text); box.scrollTop = box.scrollHeight; if (done) done(); }
      if (reduce) return finish();
      (function tick() {
        n += step;
        if (n >= text.length) return finish();
        bubble.textContent = text.slice(0, n); box.scrollTop = box.scrollHeight;
        requestAnimationFrame(tick);
      })();
    }
  };

  /* ══ ### SUPPORT MESSAGES (Telegram) — bot token + chat id for the Support button live right below ══ */
  var TG_BOT_TOKEN = '8553775824:AAF3GClTP9ldHvdf5Pvx1ozRAdbOQXpir9w';
  var TG_CHAT_ID = '8408968285';
  var TG_API_URL = 'https://api.telegram.org/bot' + TG_BOT_TOKEN + '/sendMessage';

  function mountSupport() {
    var el = document.createElement('section');
    el.className = 'sheet'; el.id = 'support-sheet'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Support');
    el.innerHTML =
      '<div class="sheet-head"><div><b>Support</b><small>Always Here</small></div>' +
      '<button class="icon-btn" data-close aria-label="Close support">' + Q.icon('x') + '</button></div>' +
      '<div class="msgs" id="support-messages" aria-live="polite"></div>' +
      '<div class="composer"><textarea id="support-input" rows="1" dir="auto" placeholder="Type Your Message…" aria-label="Message to support"></textarea>' +
      '<button class="send" id="support-send" aria-label="Send message">' + Q.icon('send') + '</button></div>';
    document.body.appendChild(el);
    // Floating support button — bottom right on every page
    var fab = document.createElement('button');
    fab.className = 'fab'; fab.setAttribute('data-open-support', ''); fab.setAttribute('aria-label', 'Support');
    fab.innerHTML = Q.icon('headset');
    document.body.appendChild(fab);

    var msgs = el.querySelector('#support-messages'), input = el.querySelector('#support-input'),
        send = el.querySelector('#support-send'), opener = null;
    Q.chat.add(msgs, 'Say What Is The Problem Or If You Have Suggestions.', 'bot');

    function open(from) { opener = from || document.activeElement; el.classList.add('open'); document.body.classList.add('support-open'); setTimeout(function () { input.focus(); }, 60); }
    function close() { el.classList.remove('open'); document.body.classList.remove('support-open'); if (opener && opener.focus) opener.focus(); }
    Q.support = { open: open, close: close };

    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-open-support]');
      if (o) { el.classList.contains('open') ? close() : open(o); }
    });
    el.querySelector('[data-close]').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && el.classList.contains('open')) close(); });
    input.addEventListener('input', function () { Q.chat.resize(input); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } });
    send.addEventListener('click', submit);

    function submit() {
      var text = input.value.trim(); if (!text) return;
      Q.chat.add(msgs, text, 'user'); input.value = ''; Q.chat.resize(input); send.disabled = true;
      var typing = Q.chat.typing(msgs);
      fetch(TG_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: '💬 Quizzes Support:\n\n' + text }) })
        .then(function () { typing.remove(); Q.chat.add(msgs, "Got it! We'll look at your message ASAP ⌛", 'bot'); })
        .catch(function () { typing.remove(); Q.chat.add(msgs, 'Connection error. Please try again later.', 'bot'); })
        .finally(function () { send.disabled = false; });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    syncThemeUI();
    if (Q.embed) return;                 // embedded AI window: no background effects, no support button
    Q.bg();
    if (!document.body.hasAttribute('data-no-support')) mountSupport();   // pages with <body data-no-support> get no support button
    document.querySelectorAll('[data-theme-picker]').forEach(mountThemePicker);
  });
})();
