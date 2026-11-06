/* VDVIA Home 웹 컴포넌트 <vdvia-home>  (2026-11-05 새로 작성, 이전 예전 빌드 기준 코드를 대체)
 * 정본: Figma [VDVIA] Design › 'VDVIA Home 1440 (PC)_sol 수정_3' (섹션 1209:2275, 보드 1209:2276). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 1440 기준 헤더(64) 아래 5039: 히어로 550 | About 932 | 53 | Mission 274 | 280 | Vision 258 | 280 | Core Value 988 | 280 | Structure 964 | 180
 * 사진 4장(about, healthcare, lifestyle, creativity)은 피그마에서 필터와 크롭을 적용한 채 2배로 내보낸 JPG. 기본 주소 IMG_BASE, 속성 img-base로 바꿀 수 있다.
 * 폭(2026-11-06 Sol, 1920, 1440, 1024, 768, 390): 1281 이상 컨테이너 1184 가운데(피그마 그대로). 1024~1280 좌우 48, 768~1023 좌우 32, 같은 배치에서 글자와 여백을 폭에 비례해 줄인다(fv()).
 * 767 이하: 한 줄씩 쌓는 390 배치(좌우 24). 390보다 좁으면 zoom으로 그대로 줄인다(윅스 모바일 320 포함).
 * 피그마와 브라우저의 글자 세로 위치 차이는 position:relative top으로 보정한다(배치에는 영향 없음). 값은 피그마 PNG와 픽셀 대조로 정했다.
 * 윅스: Custom Element, Server URL = 이 파일, Tag = vdvia-home, 전체 폭.
 */
(function () {
  'use strict';
  var SERIF = "'adobe-garamond-pro','Adobe Garamond Pro','EB Garamond',Garamond,serif";
  var SANS = '"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,sans-serif';
  var HELV = 'Helvetica,"Helvetica Neue",Arial,sans-serif'; /* 피그마에서 Helvetica Regular로 지정된 본문 3곳(About 오른쪽, Mission, Vision) */
  var IMG_BASE = 'https://solleegraphic.github.io/vdvia-web/img/';
  var FONT_LINKS = [
    ['vdvia-font-pretendard', 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'],
    ['vdvia-font-garamond', 'https://use.typekit.net/cle2qyf.css']
  ];
  var DATA = {
  "heroLead": "The way science reaches\neveryday life.",
  "heroTitle": [
    "How Brands Connect with Consumers Worldwide",
    "Global D2C Innovator"
  ],
  "about": {
    "caption": "About / VDVIA",
    "under": "From planning and development to production management and global distribution, we lead the entire journey ourselves, steadily expanding our presence worldwide.",
    "head": "Designed by science.\nProven by data.\nDelivered to the world.",
    "body": "VDVIA combines our group’s biotechnology with advanced AI to create the right answer for every market, faster and more precisely."
  },
  "mission": {
    "label": "Mission",
    "display": "Quality \u2028of Life",
    "lead": "Better everyday life, backed by science.",
    "body": "Our mission is to improve quality of life worldwide with science-backed, high-efficacy, low-irritation health & beauty solutions. Every product starts from research and data, so what is proven in the lab works just as well in daily routines."
  },
  "vision": {
    "label": "Vision",
    "display": "Research\nto Retail",
    "lead": "The most trusted health & beauty brand group.",
    "body": "Our vision is to transform the entire research-to-retail value chain with next-generation biomedical technology and AI. From Zishel’s laboratory research to the brands in our customers’ hands, we design the whole journey."
  },
  "core": {
    "label": "Core Value",
    "display": "Value\nDriven",
    "body": "VDVIA = Value-Driven, VIA.\nVIA means the way, the path.",
    "cells": [
      [
        "Scientific Integrity",
        "Evidence that’s reproducible, verification that’s transparent."
      ],
      [
        "Accessibility",
        "Making the best accessible, fairly and widely."
      ],
      [
        "Innovation with AI",
        "Rapid experimentation, precise improvement, powered by AI."
      ],
      [
        "Collaboration",
        "Open partnerships that compound value."
      ],
      [
        "Sustainability",
        "Designing profit with environmental and social responsibility."
      ],
      [
        "Customer-Centricity",
        "Improving every moment of the customer journey with data."
      ]
    ]
  },
  "structure": {
    "label": "Structure",
    "display": "Healthcare,\nLifestyle,\nCreativity",
    "body": "VDVIA is built on three pillars:\nHealthcare, Lifestyle and Creativity.",
    "cells": [
      [
        "Healthcare",
        "VDVIA HEALTHCARE builds online and offline wellness brands and services, operating on a vertically integrated model that spans R&D, manufacturing, marketing and distribution.",
        "healthcare.jpg",
        "Researchers working in a laboratory"
      ],
      [
        "Lifestyle",
        "VDVIA LIFESTYLE creates beauty brands grounded in exosome science. Through Lemonderma and ZISHEL XOMAGE COSMETICS, we bring clinic-proven technology into everyday skincare for consumers worldwide.",
        "lifestyle.jpg",
        "Woman doing a skincare routine at a window"
      ],
      [
        "Creativity",
        "VDVIA CREATIVITY provides in-house brand building and content creation, backed by best-in-class marketing infrastructure, instant access to K-content production and end-to-end e-commerce solutions for brands.",
        "creativity.jpg",
        "Photographing cosmetics for brand content"
      ]
    ]
  }
};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function lines(s) { return esc(s).replace(/ ?(\u2028|\n)/g, '<br>'); }
  function injectFonts() {
    if (typeof document === 'undefined') return;
    FONT_LINKS.forEach(function (f) {
      if (document.getElementById(f[0])) return;
      var l = document.createElement('link'); l.id = f[0]; l.rel = 'stylesheet'; l.href = f[1]; document.head.appendChild(l);
    });
  }

  /* 두 폭 사이 값: 768에서 a, 1280 이상에서 b(피그마 1440 값). 사이는 직선이라 1024와 그 사이 폭이 저절로 맞는다 */
  function fv(a, b) { return 'clamp(' + Math.min(a, b) + 'px, calc(' + a + 'px + (100vw - 768px) * ' + ((b - a) / 512).toFixed(6) + '), ' + Math.max(a, b) + 'px)'; }
  /* 윅스 맞춤: 윅스는 에디터 높이를 host 최소 높이로 걸고(폭마다 내용 높이가 달라 푼다), 데스크톱 화면은 창이 980보다 좁아도 페이지를 980으로 고정한다(새 페이지가 떠 있을 때만 푼다, 옛 페이지는 980 기준이라 그대로) */
  var FIT_CSS = '@media (max-width:979.98px){body:not(.device-mobile-optimized){--site-width:100%!important}body:not(.device-mobile-optimized) [data-block-level-container="ClassicSection"]{min-width:0!important}}';
  function fitOn(el) { el.style.setProperty('min-height', '0', 'important'); el.style.setProperty('width', '100%', 'important'); /* 윅스 모바일이 거는 width:320px는 zoom에 같이 줄어든다 */ if (document.body.classList.contains('device-mobile-optimized') && el.parentElement) el.parentElement.style.setProperty('width', '100%', 'important'); window.__vdviaFit = (window.__vdviaFit || 0) + 1; if (!document.getElementById('vdvia-fit')) { var st = document.createElement('style'); st.id = 'vdvia-fit'; st.textContent = FIT_CSS; document.head.appendChild(st); } }
  function fitOff() { window.__vdviaFit = Math.max(0, (window.__vdviaFit || 1) - 1); if (!window.__vdviaFit) { var st = document.getElementById('vdvia-fit'); if (st) st.parentNode.removeChild(st); } }
  /* 390보다 좁으면 390 화면을 그대로 줄인다. 윅스 모바일은 320으로 그려 폰 폭으로 키우므로 폰에서 390 디자인 그대로 보인다 */
  var ZOOM = '@media (max-width:389.98px){:host{zoom:.96154}}@media (max-width:374.98px){:host{zoom:.92308}}@media (max-width:359.98px){:host{zoom:.82051}}';

  /* 등장 애니메이션(구다이 글로벌 기준, 2026-11-06). 움직임 줄이기 설정, 에디터 미리보기(iframe)에서는 전부 바로 보인다. */
  var RV_EASE = 'cubic-bezier(.215,.61,.355,1)'; /* GSAP power2.out */
  var MOTION_CSS = '.mk,.mi{display:block}@media (prefers-reduced-motion:no-preference){' +
    '.rv{opacity:0;transition:opacity .8s ' + RV_EASE + ' var(--rv-d,0ms)}.rv.on{opacity:1}' +
    '.mk{clip-path:inset(-.12em -1em -.24em -1em)}.mk .mi{transform:translate3d(0,130%,0);transition:transform .4s ' + RV_EASE + ' var(--rv-d,0ms)}.mk.on .mi{transform:none}' +
    '.d2{--rv-d:200ms}.d6{--rv-d:600ms}.d8{--rv-d:800ms}' +
    '}@media print{.rv{opacity:1!important}.mk .mi{transform:none!important}}';
  /* 제목 한 줄: .mk가 가리개, .mi가 아래에서 올라온다 */
  function mk(cls, inner) { return '<span class="' + cls + ' mk hs"><span class="mi">' + inner + '</span></span>'; }
  function motionOn(root) {
    var on = function (el) { el.classList.add('on'); };
    var hero = root.querySelectorAll('.hs'), rest = root.querySelectorAll('.rv:not(.hs)');
    var live = window.self === window.top && window.IntersectionObserver && window.matchMedia('(prefers-reduced-motion:no-preference)').matches;
    if (!live) { [].forEach.call(hero, on); [].forEach.call(rest, on); return null; }
    /* 첫 화면은 제목 글꼴이 온 뒤에 시작한다(늦어도 1.5초). 시작 전에 글꼴이 바뀌어 튀지 않게 */
    var started = false, go = function () { if (started) return; started = true; requestAnimationFrame(function () { [].forEach.call(hero, on); }); };
    var load = function () { if (document.fonts && document.fonts.load) document.fonts.load('400 40px adobe-garamond-pro').then(go, go); else go(); };
    var link = document.getElementById('vdvia-font-garamond');
    setTimeout(go, 1500);
    if (link && !link.sheet) link.addEventListener('load', load, { once: true }); else load();
    /* 나머지는 윗선이 화면 70%(767 이하는 85%)에 닿으면 한 번만(2026-11-06 Sol: 85%는 라벨만 보일 때 끝나 등장이 안 보였다). 첫 화면에 이미 있는 것은 바로. 목록 칸(.rs)은 0.1초 지연, 한꺼번에 들어오면 0.1초씩 차례로 */
    var io = new IntersectionObserver(function (es) {
      var n = 0;
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        if (e.target.classList.contains('rs')) e.target.style.setProperty('--rv-d', (100 + 100 * n++) + 'ms');
        on(e.target);
      });
    }, { rootMargin: '0px 0px ' + (window.matchMedia('(min-width:768px)').matches ? '-30%' : '-15%') + ' 0px' });
    [].forEach.call(rest, function (el) { if (el.getBoundingClientRect().top < window.innerHeight * .85) on(el); else io.observe(el); });
    return io;
  }

  var CSS = [
    ':host{display:block;background:#fff;color:#141414;font-family:' + SANS + ';font-size:16px;line-height:26px;letter-spacing:-0.16px;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}',
    '*{box-sizing:border-box;margin:0;padding:0}',
    '.in{max-width:1184px;margin:0 auto;position:relative}',
    'img{display:block;width:100%;height:auto}',
    '.serif{font-family:' + SERIF + ';font-weight:400}',
    '.rule{height:1px;background:#141414}',
    '.lab{font-weight:700;font-size:16px;line-height:26px;position:relative;top:var(--lab-dy,1px)}',
    '.t23{font-weight:600;font-size:' + fv(20, 23) + ';line-height:' + fv(29, 33) + ';position:relative;top:1px}',
    '.t16{font-size:16px;line-height:26px;position:relative;top:2px}',
    '.helv{font-family:' + HELV + ';color:#555;position:relative;top:var(--helv-dy,2px)}',
    /* 히어로 550: 리드 위 116, 제목 위 367 (News와 같은 두 크기 제목 보정: 첫 줄 -2, 둘째 줄 +10) */
    '.hero{height:' + fv(340, 550) + '}',
    '.hero .in{height:100%}',
    '.hlead{position:absolute;left:0;top:' + fv(72, 117) + ';width:491px;max-width:100%}', /* 116 + Pretendard 23/33 보정 1 (.t23의 top을 덮으므로 여기서 합산) */
    '.ht{position:absolute;left:0;top:' + fv(228, 367) + ';font-weight:400}',
    '.ht span{display:block;white-space:nowrap;letter-spacing:-0.02em}',
    '.ht .l1{font-size:' + fv(24, 39.12) + ';line-height:' + fv(24, 39.12) + ';position:relative;top:' + fv(-1, -2) + '}',
    '.ht .l2{font-size:' + fv(56, 94.04) + ';line-height:' + fv(56, 94.04) + ';position:relative;top:' + fv(6, 10) + '}',
    /* About 932 */
    '.about{min-height:' + fv(590, 932) + '}',
    '.ab-grid{display:grid;grid-template-columns:minmax(0,612fr) ' + fv(44, 274) + ' 14px minmax(0,284fr);margin-top:17px}',
    '.ab-img img{aspect-ratio:612/390;object-fit:cover}',
    '.ab-under{width:86.2745%;margin-top:14px;letter-spacing:0;position:relative;top:var(--under-dy,2px)}',
    '.ab-cap{grid-column:2;justify-self:start;align-self:start;writing-mode:vertical-rl;font-size:13px;line-height:18px;margin-left:9px;position:relative;left:var(--cap-dx,-1px);top:var(--cap-dy,0px)}',
    '.ab-vr{grid-column:3;width:1px;height:' + fv(300, 384) + ';background:#141414}',
    '.ab-txt{grid-column:4}',
    '.ab-head{font-weight:600;font-size:' + fv(17, 18) + ';line-height:26px;position:relative;top:var(--h18-dy,0px)}',
    '.ab-body{margin-top:' + fv(24, 32) + '}',
    '.gap53{height:' + fv(32, 53) + '}.gap280{height:' + fv(150, 280) + '}.gap180{height:' + fv(110, 180) + '}',
    /* Mission 274, Vision 258: 라벨 → 룰 둘(378.67 | 24.33 | 782) → 디스플레이 82 / 리드 23 + 본문 */
    '.mv .cols{display:grid;grid-template-columns:minmax(0,378.67fr) minmax(0,24.33fr) minmax(0,782fr)}',
    '.mv .rules{margin-top:6px}',
    '.mv .rules .rule:last-child{grid-column:3}',
    '.mission{min-height:' + fv(150, 274) + '}.vision{min-height:' + fv(150, 258) + '}',
    '.disp{font-size:' + fv(49, 82) + ';line-height:' + fv(52, 87) + ';letter-spacing:-0.01em;position:relative;top:' + fv(-2, -4) + '}',
    '.mv .disp{margin-top:' + fv(16, 21) + '}',
    '.mv .r{grid-column:3}',
    '.mv .t23{margin-top:' + fv(22, 31) + '}',
    '.mv .helv{margin-top:' + fv(28, 67) + '}',
    /* Core Value 988: 라벨 → 룰 → 디스플레이(804) | 본문(380) → 216 → 칸 2열 3행(568 | 48 | 568, 행 간격 80) */
    '.core{min-height:' + fv(560, 988) + '}',
    '.head2{display:grid;grid-template-columns:minmax(0,804fr) minmax(0,380fr)}',
    '.head2 .disp{margin-top:' + fv(16, 21) + '}',
    '.head2 .t16{margin-top:' + fv(22, 31) + '}',
    '.cells{display:grid;grid-template-columns:minmax(0,568fr) minmax(0,48fr) minmax(0,568fr);row-gap:' + fv(44, 80) + ';margin-top:' + fv(72, 216) + '}',
    '.cell:nth-child(2n){grid-column:3}',
    '.cname{font-size:' + fv(41, 68) + ';line-height:' + fv(41, 68) + ';letter-spacing:-0.01em;white-space:nowrap;position:relative;top:' + fv(-2, -4) + '}',
    '.cell .rule{margin-top:' + fv(10, 13) + '}',
    '.cell .t16{margin-top:' + fv(14, 20) + '}',
    /* Structure 964: 라벨 → 룰 → 디스플레이 90 3줄 | 본문 → 182 → 칸 3개(394.67, 위아래 룰, 세로 룰 위아래 12 안쪽) */
    '.st .disp90{font-size:' + fv(54, 90) + ';line-height:' + fv(57, 95) + ';letter-spacing:-0.01em;margin-top:' + fv(16, 21) + ';position:relative;top:' + fv(-3, -5) + '}',
    '.scells{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:' + fv(72, 182) + ';border-top:1px solid #141414;border-bottom:1px solid #141414;position:relative}',
    '.scell{min-height:' + fv(300, 441) + ';padding:' + fv(14, 20) + ' ' + fv(14, 18) + ' ' + fv(20, 8) + '}',
    '.scell + .scell{border-left:0}',
    '.svr{position:absolute;top:12px;bottom:12px;width:1px;background:#141414}',
    '.scell img{aspect-ratio:358.67/224;object-fit:cover}',
    '.stitle{margin-top:20px;font-weight:600;font-size:15px;line-height:25px;position:relative;top:var(--t15-dy,1px)}',
    '.sbody{margin-top:10px;font-size:14px;line-height:22px;position:relative;top:var(--t14-dy,1px)}',
    /* 1024~1280 좌우 48, 768~1023 좌우 32: 같은 배치. 피그마가 줄을 정한 1281 이상은 그대로 두고 그 아래만 마지막 줄 한 단어 방지 */
    '@media (max-width:1280.98px){.in{max-width:none;margin:0 48px}.t16,.helv,.sbody{text-wrap:pretty}.cname{white-space:normal}}', /* 글자가 칸보다 커져도(사파리 화면 확대 등) 가로로 넘치지 않게 */
    '@media (max-width:1023.98px){.in{margin:0 32px}}',
    /* 767 이하: 390 배치 */
    '@media (max-width:767.98px){',
    '.in{margin:0 24px}',
    '.hero{height:auto;padding:80px 0 60px}',
    '.hlead,.ht{position:static;width:auto}',
    '.ht{margin-top:120px}',
    '.ht span{white-space:normal;text-wrap:balance}', /* 320에서 첫 줄 끝에 한 단어만 남지 않게 */
    '.ht .l1{font-size:17px;line-height:20px;top:0}',
    '.ht .l2{font-size:48px;line-height:48px;top:0;margin-top:8px}',
    '.hlead{font-size:20px;line-height:30px}',
    '.about{min-height:0}',
    '.ab-grid{display:flex;flex-direction:column;margin-top:16px}',
    '.ab-cap{order:-1;writing-mode:horizontal-tb;margin:0 0 10px;left:0;top:0}',
    '.ab-vr{display:none}',
    '.ab-under{width:auto}',
    '.ab-txt{margin-top:48px}',
    '.ab-head{font-size:18px}',
    '.ab-body{margin-top:24px}',
    '.gap53,.gap280,.gap180{height:120px}',
    '.mission,.vision,.core{min-height:0}',
    '.mv .cols,.head2{display:block}',
    '.mv .rules .rule:first-child{display:none}',
    '.disp,.st .disp90{font-size:48px;line-height:51px;top:0}', /* 피그마처럼 줄 높이 정수 */
    '.mv .disp,.head2 .disp,.st .disp90{margin-top:21px}',
    '.mv .t23,.head2 .t16{margin-top:32px}',
    '.mv .t23{font-size:20px;line-height:30px;text-wrap:balance}', /* 마지막 줄 한 단어 방지 */
    '.mv .helv{margin-top:24px}',
    '.cells{display:block;margin-top:60px}',
    '.cell + .cell{margin-top:48px}',
    '.cell .rule{margin-top:13px}.cell .t16{margin-top:20px}',
    '.cname{font-size:36px;line-height:36px;white-space:normal;top:0}',
    '.scells{display:block;margin-top:60px;border-bottom:0}',
    '.svr{display:none}',
    '.scell{min-height:0;padding:24px 0 32px;border-bottom:1px solid #141414}',
    '}',
    ZOOM,
    MOTION_CSS
  ].join('\n');

  function html(D, base) {
    var mv = function (cls, M) {
      return '<section id="' + cls + '" class="mv ' + cls + ' rv"><div class="in"><p class="lab">' + esc(M.label) + '</p>' +
        '<div class="cols rules"><div class="rule"></div><div class="rule"></div></div>' +
        '<div class="cols"><h2 class="disp serif">' + lines(M.display) + '</h2><div class="r"><p class="t23">' + lines(M.lead) + '</p><p class="t16 helv">' + lines(M.body) + '</p></div></div></div></section>';
    };
    var C = D.core, S = D.structure, A = D.about;
    return '<style>' + CSS + 'section[id]{scroll-margin-top:88px}</style>' +
      '<section class="hero"><div class="in"><p class="hlead t23 rv hs">' + lines(D.heroLead) + '</p>' +
      '<h1 class="ht serif">' + mk('l1 d6', esc(D.heroTitle[0])) + mk('l2 d8', esc(D.heroTitle[1])) + '</h1></div></section>' +
      '<section class="about rv"><div class="in"><div class="rule"></div><div class="ab-grid">' +
      '<div class="ab-left"><figure class="ab-img"><img src="' + esc(base + 'about.jpg') + '" width="612" height="390" alt="World map with network connections" loading="eager"></figure><p class="ab-under t16">' + lines(A.under) + '</p></div>' +
      '<p class="ab-cap">' + esc(A.caption) + '</p><div class="ab-vr" role="presentation"></div>' +
      '<div class="ab-txt"><p class="ab-head">' + lines(A.head) + '</p><p class="ab-body t16 helv">' + lines(A.body) + '</p></div></div></div></section>' +
      '<div class="gap53" aria-hidden="true"></div>' + mv('mission', D.mission) + '<div class="gap280" aria-hidden="true"></div>' + mv('vision', D.vision) + '<div class="gap280" aria-hidden="true"></div>' +
      '<section id="core-value" class="core"><div class="in"><p class="lab rv">' + esc(C.label) + '</p><div class="rule rv" style="margin-top:6px"></div>' +
      '<div class="head2 rv"><h2 class="disp serif">' + lines(C.display) + '</h2><p class="t16">' + lines(C.body) + '</p></div>' +
      '<div class="cells" role="list">' + C.cells.map(function (c) { return '<div class="cell rv rs" role="listitem"><h3 class="cname serif">' + esc(c[0]) + '</h3><div class="rule"></div><p class="t16">' + esc(c[1]) + '</p></div>'; }).join('') + '</div></div></section>' +
      '<div class="gap280" aria-hidden="true"></div>' +
      '<section id="structure" class="st"><div class="in"><p class="lab rv">' + esc(S.label) + '</p><div class="rule rv" style="margin-top:6px"></div>' +
      '<div class="head2 rv"><h2 class="disp90 serif">' + lines(S.display) + '</h2><p class="t16">' + lines(S.body) + '</p></div>' +
      '<div class="scells rv" role="list"><i class="svr" aria-hidden="true" style="left:33.3333%"></i><i class="svr" aria-hidden="true" style="left:66.6667%"></i>' + S.cells.map(function (c) { return '<div class="scell rv rs" role="listitem"><img src="' + esc(base + c[2]) + '" width="359" height="224" alt="' + esc(c[3]) + '" loading="lazy"><h3 class="stitle">' + esc(c[0]) + '</h3><p class="sbody">' + esc(c[1]) + '</p></div>'; }).join('') + '</div></div></section>' +
      '<div class="gap180" aria-hidden="true"></div>';
  }

  var SECTIONS = /^(mission|vision|core-value|structure)$/; // 푸터 Company 하위 링크가 오는 자리(/#mission 등, Sol 2026-11-06)

  class VdviaHome extends HTMLElement {
    static get observedAttributes() { return ['img-base']; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { fitOn(this); injectFonts(); this._render(); this._bindHash(); }
    disconnectedCallback() { fitOff(); window.removeEventListener('hashchange', this._onHash); if (this._mo) this._mo.disconnect(); }
    attributeChangedCallback() { if (this.shadowRoot.firstChild) this._render(); }
    _render() { this.shadowRoot.innerHTML = html(DATA, this.getAttribute('img-base') || IMG_BASE); if (this._mo) this._mo.disconnect(); this._mo = motionOn(this.shadowRoot); }
    // 섀도 안 섹션은 브라우저 기본 앵커 이동이 닿지 않아 직접 스크롤한다.
    goTo(id, smooth) {
      var t = SECTIONS.test(id) && this.shadowRoot.getElementById(id);
      if (!t) return false;
      t.scrollIntoView({ block: 'start', behavior: smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto' });
      return true;
    }
    _bindHash() {
      var self = this, id = function () { return location.hash.slice(1); };
      this._onHash = function () { self.goTo(id(), true); };
      window.addEventListener('hashchange', this._onHash);
      if (!SECTIONS.test(id())) return;
      // 다른 페이지에서 올 때: 윅스와 글꼴 로드로 높이가 바뀌므로 사용자가 움직이기 전까지 몇 번 다시 맞춘다.
      var moved = false, stop = function () { moved = true; };
      window.addEventListener('wheel', stop, { once: true, passive: true });
      ['touchstart', 'pointerdown', 'keydown'].forEach(function (t) { window.addEventListener(t, stop, { once: true, passive: true }); });
      [0, 300, 1000, 2500].forEach(function (ms) { setTimeout(function () { if (!moved) self.goTo(id(), false); }, ms); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!moved) self.goTo(id(), false); });
    }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    var p = function (s) { return '<p>' + esc(String(s).replace(/ ?(\u2028|\n)/g, ' ')) + '</p>'; };
    var D = DATA;
    window.VDVIA_HOME_SEO_HTML = '<h1>' + esc(D.heroTitle.join(' ')) + '</h1>' + p(D.heroLead) + p(D.about.head) + p(D.about.body) + p(D.about.under) +
      [D.mission, D.vision].map(function (m) { return '<h2>' + esc(m.display.replace(/ ?(\u2028|\n)/g, ' ')) + '</h2>' + p(m.lead) + p(m.body); }).join('') +
      '<h2>' + esc(D.core.display.replace(/\n/g, ' ')) + '</h2>' + p(D.core.body) + D.core.cells.map(function (c) { return '<h3>' + esc(c[0]) + '</h3>' + p(c[1]); }).join('') +
      '<h2>' + esc(D.structure.display.replace(/\n/g, ' ')) + '</h2>' + p(D.structure.body) + D.structure.cells.map(function (c) { return '<h3>' + esc(c[0]) + '</h3>' + p(c[1]); }).join('');
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-home')) customElements.define('vdvia-home', VdviaHome);
})();
