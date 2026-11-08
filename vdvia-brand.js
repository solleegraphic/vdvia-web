/* VDVIA Brand 페이지 웹 컴포넌트 <vdvia-brand>  (2026-11-05)
 * 정본: Figma [VDVIA] Design › 'VDVIA Brand EN 1440 (PC)_sol 수정_3' (섹션 1209:2509, 보드 1209:2510). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 1440 기준 헤더(64) 아래 1619.32: 여백 116 | Brands 1323.32 | 여백 180
 *   라벨 16/26 Bold → 6 → 룰 둘(왼쪽 378.67, 오른쪽은 피그마 그대로 x 531에서 782폭) → 디스플레이 82 Garamond 105%(줄 86) 2줄(룰 아래 21)
 *   | 오른쪽 23/33 SemiBold(룰 아래 31) + Helvetica 16/26 #555(18 아래)
 *   → 312 → 브랜드 둘(x 530.67, 폭 781.33): 로고 → 룰(레몬더마 25, 쏘마지 코스메틱 14 아래) → 16 → 사진 378.67 | 24 | 글 378.67(Pretendard 16/26 → 8 → Helvetica 16/26 #555), 두 브랜드 사이 110
 * 사진 2장(2배 JPG)과 로고 2장(3배 PNG)은 피그마 노드를 그대로 내보낸 것. 기본 주소 IMG_BASE, 속성 img-base로 바꾼다.
 * 폭(2026-11-06 Sol, 1920, 1440, 1024, 768, 390): 1281 이상 컨테이너 1184 가운데(3열 378.67, 간격 24, 피그마 그대로). 1024~1280 좌우 48, 768~1023 좌우 32, 같은 배치에서 글자와 여백을 폭에 비례해 줄인다(fv()), 900 이하는 브랜드 칸을 전체 폭으로.
 * 767 이하: 한 줄씩 쌓는 390 배치(좌우 29.25). 390보다 좁으면 zoom으로 그대로 줄인다(윅스 모바일 320 포함).
 * 글자 세로 위치는 피그마 PNG와 픽셀 대조로 position:relative top 보정(배치에는 영향 없음).
 * 윅스: Custom Element, Server URL = 이 파일, Tag = vdvia-brand, 전체 폭.
 */
(function () {
  'use strict';
  var SERIF = "'adobe-garamond-pro','Adobe Garamond Pro','EB Garamond',Garamond,serif";
  var SANS = '"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,sans-serif';
  var HELV = 'Helvetica,"Helvetica Neue",Arial,sans-serif'; /* 피그마에서 Helvetica Regular로 지정된 본문 3곳 */
  var IMG_BASE = 'https://solleegraphic.github.io/vdvia-web/img/';
  var FONT_LINKS = [
    ['vdvia-font-pretendard', 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'],
    ['vdvia-font-garamond', 'https://use.typekit.net/cle2qyf.css']
  ];
  var DATA = {
  "label": "Brands",
  "title": "Our\nBrands",
  "lead": "Where science becomes ritual.",
  "body": "Each VDVIA brand begins in the laboratory and ends in your daily ritual. Crafted with precision, made for skin that deserves more.",
  "brands": [
    {
      "name": "Lemonderma",
      "logo": "logo_lemonderma.png",
      "logoW": 220,
      "logoH": 33,
      "photo": "brand_lemonderma.jpg",
      "photoW": 758,
      "photoH": 553,
      "alt": "Lemonderma serum and cream with fresh lemons and laboratory glassware",
      "lead": "A vegan dermacosmetic born from \u2029Jeju lemon and exosome science.",
      "body": "Lemon exosome and liposomal vitamin C for skin that looks brighter and more radiant. Sold exclusively in pharmacies in Korea."
    },
    {
      "name": "ZISHEL XOMAGE COSMETICS",
      "logo": "logo_xomage.png",
      "logoW": 95,
      "logoH": 56,
      "photo": "brand_xomage.jpg",
      "photoW": 758,
      "photoH": 474,
      "alt": "ZISHEL XOMAGE COSMETICS skincare bottles and a round jar on a white background",
      "lead": "Zishel Group’s clinic skin-booster exosomes, trusted in 50 countries, \u2029now in everyday skincare.",
      "body": "Exo PDRN skincare from Korea, from masks to daily essentials. Enjoy clinic-inspired care at home."
    }
  ]
};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function lines(s) { return esc(s).replace(/ ?\u2029/g, ' <br class="m">').replace(/ ?(\u2028|\n)/g, '<br>'); } /* U+2029 = 767 이하에서만 끊는 자리 */
  function injectFonts() {
    if (typeof document === 'undefined') return;
    FONT_LINKS.forEach(function (f) {
      if (document.getElementById(f[0])) return;
      var l = document.createElement('link'); l.id = f[0]; l.rel = 'stylesheet'; l.href = f[1]; document.head.appendChild(l);
    });
  }

  /* 두 폭 사이 값: 768에서 a, 1280 이상에서 b(피그마 1440 값). 사이는 직선이라 1024와 그 사이 폭이 저절로 맞는다 */
  function fv(a, b) { return 'clamp(' + Math.min(a, b) + 'px, calc(' + a + 'px + (100vw - 768px) * ' + ((b - a) / 512).toFixed(6) + '), ' + Math.max(a, b) + 'px)'; }
  function fw(a, b) { return 'clamp(' + Math.min(a, b) + 'px, calc(' + a + 'px + (100vw - 1024px) * ' + ((b - a) / 256).toFixed(6) + '), ' + Math.max(a, b) + 'px)'; } /* 1024에서 a, 1280에서 b */
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
    'img{display:block}',
    '.serif{font-family:' + SERIF + ';font-weight:400}',
    '.rule{height:1px;background:#141414}',
    '.m{display:none}',
    '.g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:' + fv(16, 24) + '}', /* 1184 = 378.67 x 3 + 24 x 2 */
    '.gap116{height:' + fv(64, 116) + '}.gap180{height:' + fv(110, 180) + '}',
    '.lab{font-weight:700;font-size:16px;line-height:26px;position:relative;top:var(--lab-dy,1px)}',
    '.rules{margin-top:6px}',
    /* 피그마는 위쪽 오른쪽 룰과 글을 x 531에서 782폭(1313까지)으로 둔다. 아래 브랜드 칸(530.67, 781.33)과 0.33px, 1px 다른 것까지 그대로 */
    '.rules .rule:last-child,.top .r{grid-column:2/4;margin-left:.33px;margin-right:-1px}',
    '.top{align-items:start}',
    '.disp{grid-column:1;font-size:' + fv(49, 82) + ';line-height:' + fv(52, 86) + ';letter-spacing:-0.01em;white-space:nowrap;margin-top:' + fv(16, 21) + ';position:relative;top:' + fv(-3, -5) + '}',
    '.top .r{margin-top:' + fv(22, 31) + '}',
    '.t23{font-weight:600;font-size:' + fv(20, 23) + ';line-height:' + fv(29, 33) + ';position:relative;top:var(--t23-dy,1px)}',
    '.t16{font-size:16px;line-height:26px;position:relative;top:var(--t16-dy,2px)}',
    '.helv{font-family:' + HELV + ';color:#555;position:relative;top:var(--helv-dy,1px)}', /* 홈은 2, 여기는 피그마 대조로 1 */
    '.top .helv{margin-top:' + fv(12, 18) + '}',
    '.list{list-style:none;margin-top:' + fv(110, 312) + '}',
    '.brand{grid-column:2/4;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:' + fv(16, 24) + ';align-items:start}',
    '.brand + .brand{margin-top:' + fv(64, 110) + '}',
    '.bname{grid-column:1/3;font-size:0;line-height:0}',
    '.b1 .logo{width:220px;height:33px}.b2 .logo{width:95px;height:56px}',
    '.brand .rule{grid-column:1/3;background:rgba(20,20,20,.3)}', /* 목록 안 선은 30%(Sol 390, 768, 1024, 1920 보드의 칸 선 규칙, 2026-11-08) */
    '.b1 .rule{margin-top:25px}.b2 .rule{margin-top:14px}',
    '.photo{grid-column:1;width:100%;height:auto;margin-top:16px;object-fit:cover}',
    '.b1 .photo{aspect-ratio:378.67/276.32}.b2 .photo{aspect-ratio:378.67/237}',
    '.txt{grid-column:2;margin-top:16px}',
    '.txt .helv{margin-top:8px}',
    /* 1024~1280 좌우 48, 768~1023 좌우 32: 같은 배치 */
    '@media (max-width:1280.98px){.in{max-width:none;margin:0 48px}.t16,.helv{text-wrap:pretty}}', /* 피그마가 줄을 정한 1281 이상은 그대로, 그 아래만 마지막 줄 한 단어 방지 */
    '@media (max-width:1023.98px){.in{margin:0 32px}}',
    /* 900 이하: 2열이 너무 좁아져 브랜드 칸을 전체 폭으로 편다 */
    '@media (max-width:900.98px){.brand{grid-column:1/4}}',
    /* 1281 이상: Sol 1920 Home 수정본의 규칙 */
    '@media (min-width:1281px){',
    '.disp{line-height:89px;letter-spacing:0;top:-10px}',
    '.t23{letter-spacing:0}',
    '.helv{line-height:23px;letter-spacing:0}',
    '.txt .t16{line-height:23px}',
    '.list{margin-top:306px}',
    '.gap180{height:162px}',
    '}',
    /* 1024~1280: Sol 1024 Home 수정본의 규칙 */
    '@media (min-width:1024px) and (max-width:1280.98px){',
    '.disp{line-height:' + fw(73.5, 89) + ';letter-spacing:0;top:' + fw(-8, -10) + '}',
    ':host{--lab-dy:2px;--helv-dy:2px}',
    '.t23{line-height:' + fw(29, 33) + ';letter-spacing:' + fw(-0.16, 0) + '}',
    '.helv{line-height:' + fw(24, 23) + ';letter-spacing:' + fw(-0.16, 0) + '}',
    '.txt .t16{line-height:23px}',
    '.list{margin-top:' + fw(203, 306) + '}',
    '.gap180{height:' + fw(120.5, 162) + '}',
    '}',
    /* 768~1023: Sol 768 Home 수정본의 규칙 */
    '@media (min-width:768px) and (max-width:1023.98px){',
    '.disp{line-height:1.11224;letter-spacing:0;top:-5.5px}',
    ':host{--lab-dy:2px;--helv-dy:3px}',
    '.t23{line-height:26px}.helv{line-height:23px}',
    '.list{margin-top:calc(' + fv(110, 312) + ' - 5px)}',
    '.txt .t16{line-height:22px;letter-spacing:0;top:3px}',
    '.gap180{height:139.06px}',
    '}',
    /* 767 이하: 390 배치 */
    '@media (max-width:767.98px){',
    '.in{margin:0 29.25px}',
    '.m{display:inline}',
    '.gap116{height:97.5px}',
    '.g3,.brand{display:block}',
    '.lab{font-size:19.5px;line-height:31.6875px;letter-spacing:-.195px;top:0}',
    '.rules{margin-top:6.7px}',
    '.rules .rule:first-child{display:none}',
    '.rules .rule:last-child,.top .r{margin-left:0;margin-right:0}',
    '.disp{font-size:55.5px;line-height:64px;letter-spacing:-.585px;top:0;white-space:normal;margin-top:25.8px}',
    '.top .r{margin-top:6.6px}',
    '.t23{font-size:21.5px;line-height:30.5px;letter-spacing:-.195px;top:0;text-wrap:balance}',
    '.t16,.helv{font-size:18px;line-height:26px;letter-spacing:-.195px;top:0}',
    '.top .helv{margin-top:72.5px}',
    '.list{margin-top:128px}',
    '.brand + .brand{margin-top:128px}',
    '.photo{margin-top:29.5px}',
    '.txt{margin-top:25px}',
    '.txt .helv{margin-top:12.3px}',
    '.gap180{height:75.5px}',
    '}',
    ZOOM,
    MOTION_CSS
  ].join('\n');

  function html(D, base) {
    return '<style>' + CSS + '</style>' +
      '<div class="gap116" aria-hidden="true"></div>' +
      '<section class="brands" lang="en" aria-labelledby="vb-title"><div class="in">' +
      '<p class="lab rv hs">' + esc(D.label) + '</p>' +
      '<div class="g3 rules rv hs" role="presentation"><div class="rule"></div><div class="rule"></div></div>' +
      '<div class="g3 top"><h1 class="disp serif" id="vb-title">' + D.title.split(/\u2028|\n/).map(function (t, i) { return mk(i ? 'd8' : 'd6', esc(t.trim())); }).join(' ') + '</h1><div class="r rv hs d2"><p class="t23">' + lines(D.lead) + '</p><p class="helv">' + lines(D.body) + '</p></div></div>' +
      '<ul class="g3 list" role="list">' + D.brands.map(function (b, i) {
        return '<li class="brand b' + (i + 1) + ' rv"><h2 class="bname"><img class="logo" src="' + esc(base + b.logo) + '" width="' + b.logoW + '" height="' + b.logoH + '" alt="' + esc(b.name) + '"></h2>' +
          '<div class="rule" role="presentation"></div>' +
          '<img class="photo" src="' + esc(base + b.photo) + '" width="' + b.photoW + '" height="' + b.photoH + '" alt="' + esc(b.alt) + '" loading="lazy">' +
          '<div class="txt"><p class="t16">' + lines(b.lead) + '</p><p class="helv">' + lines(b.body) + '</p></div></li>';
      }).join('') + '</ul>' +
      '</div></section>' +
      '<div class="gap180" aria-hidden="true"></div>';
  }

  class VdviaBrand extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    static get observedAttributes() { return ['img-base']; }
    connectedCallback() { fitOn(this); injectFonts(); this._render(); }
    disconnectedCallback() { fitOff(); if (this._mo) this._mo.disconnect(); }
    attributeChangedCallback() { if (this.shadowRoot.firstChild) this._render(); }
    _render() { this.shadowRoot.innerHTML = html(DATA, (this.getAttribute('img-base') || IMG_BASE).replace(/\/?$/, '/')); if (this._mo) this._mo.disconnect(); this._mo = motionOn(this.shadowRoot); } /* 끝 슬래시가 없어도 되게 */
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    var p = function (s) { return '<p>' + esc(String(s).replace(/\s*[\u2028\n]\s*/g, ' ')) + '</p>'; };
    window.VDVIA_BRAND_SEO_HTML = '<h1>' + esc(DATA.title.replace(/\s*\n\s*/g, ' ')) + '</h1>' + p(DATA.lead) + p(DATA.body) +
      DATA.brands.map(function (b) { return '<h2>' + esc(b.name) + '</h2>' + p(b.lead) + p(b.body); }).join('');
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-brand')) customElements.define('vdvia-brand', VdviaBrand);
})();
