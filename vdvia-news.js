/* VDVIA News 페이지 웹 컴포넌트 <vdvia-news>  (2026-11-05)
 * 정본: Figma [VDVIA] Design › 'VDVIA News EN 1440 (PC)_sol 수정_3' (섹션 1210:259, 보드 1210:260). 문구는 피그마에서 그대로 뽑아 넣었다.
 * 1440 기준, 헤더(64) 아래부터:
 *   히어로 440: Latest 39.12 / News 94.04, Adobe Garamond 400, 줄높이 100%, 자간 -2%, 글상자 위 264
 *   소개 129: 룰(위에서 32, 라벨 News는 2026-11-10 Sol 지시로 지우고 자리만 유지), 리드 23/33 SemiBold 480폭 + 본문 16/26 592폭(x 592), 룰 아래 30
 *   여백 200 → 목록: 2026 90px Garamond 86% -1%, 제목 아래 191에 첫 룰,
 *   행 = 룰 → 55 → 날짜 16/19 180폭 | 제목 23/33 SemiBold 478폭(x 204) | 설명 16/26 #555 478폭(x 706) → 55 → 룰, 끝 여백 180
 * 폭(2026-11-06 Sol, 1920, 1440, 1024, 768, 390): 1281 이상 컨테이너 1184 가운데(피그마 그대로). 1024~1280 좌우 48, 768~1023 좌우 32, 같은 배치에서 글자와 여백을 폭에 비례해 줄인다(fv()). 767 이하는 390 배치(좌우 29.25), 390보다 좁으면 zoom으로 그대로 줄인다(윅스 모바일 320 포함).
 * 768 이하(윅스 모바일 320 포함): ../_build/figma_home_build.js 하위 페이지 모바일 규칙(SUBm)을 수정_3 히어로 비율(약 0.65)로 줄여 적용.
 *   피그마에 모바일 보드가 없어 이 부분은 Claude가 정한 값이다.
 * 제목 안 U+2028(피그마 Shift+Enter)은 데스크톱에서만 줄바꿈, 모바일에서는 공백으로 이어진다.
 * 윅스: Custom Element, Server URL = 이 파일, Tag = vdvia-news, 전체 폭. 폰트 링크는 document.head에 한 번만 넣는다(홈, 헤더 컴포넌트와 같은 id).
 */
(function () {
  'use strict';
  var SERIF = "'adobe-garamond-pro','Adobe Garamond Pro','EB Garamond',Garamond,serif";
  var SANS = '"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,sans-serif';
  var FONT_LINKS = [
    ['vdvia-font-pretendard', 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'],
    ['vdvia-font-garamond', 'https://use.typekit.net/cle2qyf.css']
  ];
  var DATA = {
  "hero": [
    "Latest",
    "News"
  ],
  "lead": "Updates from VDVIA\nand our brands.",
  "body": "Launches, new markets and partnerships, newest first.",
  "year": "2026",
  "items": [
    [
      "2026.10",
      "Lemonderma enters Japan.",
      "Our first direct-to-consumer channel in Japan, shipped cross-border from Korea, starting with the Lemonshot serum."
    ],
    [
      "2026.09",
      "ZISHEL XOMAGE COSMETICS launches.",
      "Zishel Group appointed VDVIA to run Amazon US sales and marketing for its exosome and PDRN based cosmetic brand."
    ],
    [
      "2026.08",
      "Lemonshot serum and cream earn \u2028Amazon’s Choice in the US.",
      "The Lemonshot 150 Exo:Booster Serum received the Amazon’s Choice ‘Overall Pick’ badge on Amazon US."
    ],
    [
      "2026.07",
      "Lemonderma launches in the UAE.",
      "Our first market in the Middle East, selling directly on Amazon.ae."
    ],
    [
      "2026 Q2",
      "Lemonderma begins \u2028sales in the United States.",
      "The Lemonshot serum and cream went on sale on Amazon US, our first and largest market."
    ]
  ]
};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function br(s) { return esc(s).replace(/ ?\u2028/g, ' <br class="d">').replace(/\n/g, '<br>'); }
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
  var MOTION_CSS = '.mk,.mi,.ri{display:block}@media (prefers-reduced-motion:no-preference){' +
    '.rv{opacity:0;transition:opacity .8s ' + RV_EASE + ' var(--rv-d,0ms)}.rv.on{opacity:1}' +
    '.mk{clip-path:inset(-.12em -1em -.24em -1em)}.mk .mi{transform:translate3d(0,130%,0);transition:transform .4s ' + RV_EASE + ' var(--rv-d,0ms)}.mk.on .mi{transform:none}' +
    '.d2{--rv-d:200ms}.d6{--rv-d:600ms}.d8{--rv-d:800ms}' +
    /* 목록 칸: 날짜, 제목, 설명이 메인 제목과 같은 가리개와 이동으로 0.1초씩 차례로 올라온다(2026-11-06 Sol "메인처럼"). 글자는 흐려지지 않고 칸 선만 나타난다. 가리개 상자는 글 높이로(칸 높이로 늘어나면 가린 글이 비친다) */
    '.row.rv{opacity:1;transition:border-color .8s ' + RV_EASE + ' var(--rv-d,0ms)}.row.rv:not(.on){border-color:transparent}' +
    '.row.rv .date,.row.rv .ttl,.row.rv .desc{align-self:start;clip-path:inset(-.12em -1em -.24em -1em)}.row.rv .ri{transform:translate3d(0,130%,0);transition:transform .4s ' + RV_EASE + ' var(--rv-d,0ms)}.row.rv .ttl .ri{transition-delay:calc(var(--rv-d,0ms) + 100ms)}.row.rv .desc .ri{transition-delay:calc(var(--rv-d,0ms) + 200ms)}.row.rv.on .ri{transform:none}' +
    '}@media print{.rv{opacity:1!important}.mk .mi,.ri{transform:none!important}.row.rv:not(.on){border-color:rgba(20,20,20,.3)!important}}';
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
    '.in{max-width:1184px;margin:0 auto}',
    '.serif{font-family:' + SERIF + ';font-weight:400}',
    /* 히어로 */
    '.hero{position:relative;height:' + fv(300, 440) + '}',
    '.ht{position:absolute;left:0;top:' + fv(186, 264) + ';font-weight:400}',
    '.ht span{display:block;white-space:nowrap;letter-spacing:-0.02em}', /* 자간은 줄마다 자기 크기 기준(부모 em을 상속하면 px로 굳어 틀어진다) */
    /* 피그마는 둘째 줄 기준선을 첫 줄 기준선 + 94.04에 둔다(브라우저는 줄 상자를 쌓아 10px 위). 실측 보정: l1 -2, l2 +10 */
    '.ht .l1{font-size:' + fv(24, 39.12) + ';line-height:' + fv(24, 39.12) + ';position:relative;top:' + fv(-1, -2) + '}',
    '.ht .l2{font-size:' + fv(56, 94.04) + ';line-height:' + fv(56, 94.04) + ';position:relative;top:' + fv(6, 10) + '}',
    /* 소개 */
    '.intro .in{padding-top:32px}', /* 라벨을 지운 자리(26 + 6)를 비워 선과 아래 내용 위치를 유지, 2026-11-10 Sol */
    '.rule{height:1px;background:#141414}',
    '.two{display:grid;grid-template-columns:minmax(0,480fr) minmax(0,112fr) minmax(0,592fr);margin-top:' + fv(24, 30) + '}',
    /* Pretendard 실측 보정(피그마 대비): 23/33은 1px, 16/26은 2px 아래로. 배치에는 영향 없음 */
    '.lead{grid-column:1;font-weight:600;font-size:' + fv(20, 23) + ';line-height:' + fv(29, 33) + ';position:relative;top:1px}',
    '.body{grid-column:3;font-size:16px;line-height:26px;position:relative;top:2px}',
    '.gap1{height:' + fv(120, 200) + '}',
    /* 목록 */
    '.year{font-size:' + fv(54, 90) + ';line-height:' + fv(46.44, 77.4) + ';letter-spacing:-0.01em;position:relative;top:' + fv(-3, -5) + '}',
    '.rows{list-style:none;margin-top:' + fv(96, 191) + '}',
    '.row:first-child{border-top:1px solid #141414}', /* 윗줄도 첫 칸과 함께 나타나게(자리는 그대로) */
    '.row{display:grid;grid-template-columns:minmax(0,180fr) ' + fv(32, 24) + ' minmax(0,478fr) ' + fv(32, 24) + ' minmax(0,478fr);padding:' + fv(36, 55) + ' 0;border-bottom:1px solid #141414}',
    '.date{grid-column:1;font-size:16px;line-height:19px}',
    '.ttl{grid-column:3;font-weight:600;font-size:' + fv(19, 23) + ';line-height:' + fv(27, 33) + ';position:relative;top:1px}',
    '.desc{grid-column:5;font-size:16px;line-height:26px;color:#555;position:relative;top:2px}',
    '.gap2{height:' + fv(110, 180) + '}',
    /* 1024~1280 좌우 48, 768~1023 좌우 32: 같은 배치. 피그마가 줄을 정한 1281 이상은 그대로 두고 그 아래만 마지막 줄 한 단어 방지 */
    '@media (max-width:1280.98px){.in{max-width:none;margin:0 48px}.lead,.body,.desc{text-wrap:pretty}.ttl{text-wrap:balance}}',
    '@media (max-width:1023.98px){.in{margin:0 32px}}',
    /* 제목 강제 줄바꿈(U+2028)은 제목 열이 충분히 넓은 1101 이상에서만. 그 아래는 짧은 줄이 남아(검토 에이전트 800px 실측) 공백으로 잇는다 */
    '@media (max-width:1100.98px){.d{display:none}}',
    /* 1281 이상: Sol 1920 Home 수정본의 규칙 */
    '@media (min-width:1281px){',
    '.ht .l1{top:-5px}.ht .l2{top:17.4px}',
    '.year{font-size:82px;line-height:89px;letter-spacing:0;top:-9px}',
    '.lead{letter-spacing:0}',
    '.body{line-height:23px;letter-spacing:0}',
    '.rows{margin-top:124.5px}',
    '.row:first-child{border-top-color:rgba(20,20,20,.3)}',
    '.row{border-bottom-color:rgba(20,20,20,.3)}',
    '.desc{line-height:23px}',
    '.gap2{height:162px}',
    '}',
    /* 1024~1280: Sol 1024 Home 수정본의 규칙 */
    '@media (min-width:1024px) and (max-width:1280.98px){',
    '.ht .l1{top:' + fw(-3.5, -5) + '}.ht .l2{top:' + fw(17, 17.4) + '}',
    '.year{font-size:' + fw(72, 82) + ';line-height:' + fw(76, 89) + ';letter-spacing:' + fw(-0.72, 0) + ';top:' + fw(-8, -9) + '}',
    '.lead{line-height:' + fw(29, 33) + ';letter-spacing:' + fw(-0.16, 0) + '}',
    '.body{line-height:' + fw(24, 23) + ';letter-spacing:' + fw(-0.16, 0) + '}',
    '.rows{margin-top:' + fw(127, 124.5) + '}',
    '.row:first-child{border-top-color:rgba(20,20,20,.3)}',
    '.row{border-bottom-color:rgba(20,20,20,.3)}',
    '.desc{line-height:23px}',
    '.gap2{height:' + fw(120.5, 162) + '}',
    '}',
    /* 768~1023: Sol 768 Home 수정본의 규칙 */
    '@media (min-width:768px) and (max-width:1023.98px){',
    '.ht .l1{top:-.5em}.ht .l2{top:3px}',
    '.year{top:-6px}',
    '.year{line-height:1.05556}',
    '.rows{margin-top:' + fv(72, 182) + '}',
    '.lead{line-height:26px}.body{line-height:23px;letter-spacing:0}',
    '.row:first-child{border-top-color:rgba(20,20,20,.3)}',
    '.row{border-bottom-color:rgba(20,20,20,.3)}',
    '.desc{line-height:22px;letter-spacing:0;top:3px}',
    '.gap2{height:139.06px}',
    '}',
    /* 767 이하: 390 배치 */
    '@media (max-width:767.98px){',
    '.in{margin:0 29.25px}',
    '.hero{height:auto;padding:200px 0 40px}',
    '.ht{position:static}',
    '.ht .l1{font-size:24px;line-height:28.5px;letter-spacing:0;top:0}',
    '.ht .l2{font-size:58px;line-height:55.5px;letter-spacing:-1.0725px;top:0;margin-top:23px}',
    '.intro .in{padding-top:38.3875px}',
    '.two{display:block;margin-top:25.8px}',
    '.lead{font-size:21.5px;line-height:30.5px;letter-spacing:-.195px;top:0;text-wrap:balance}',
    '.body{margin-top:39.8px;font-size:18px;line-height:26px;letter-spacing:-.195px;top:0}',
    '.gap1{height:128px}',
    '.year{font-size:55.5px;line-height:64px;letter-spacing:-.585px;top:0}',
    '.rows{margin-top:57.7px}',
    '.row:first-child{border-top:1px solid rgba(20,20,20,.3)}',
    '.row{display:block;padding:29.5px 0 41.8px;border-bottom:1px solid rgba(20,20,20,.3)}',
    '.date{display:block;font-size:14px;line-height:21.9375px;letter-spacing:-.195px;top:0}',
    '.ttl{margin-top:25px;font-size:21.5px;line-height:30.5px;letter-spacing:-.195px;top:0}',
    '.desc{margin-top:12.3px;font-size:18px;line-height:26px;letter-spacing:-.195px;top:0}',
    '.gap2{height:75.5px}',
    '}',
    ZOOM,
    MOTION_CSS
  ].join('\n');

  function html(D) {
    return '<style>' + CSS + '</style>' +
      '<section class="hero"><div class="in" style="position:relative;height:100%"><h1 class="ht serif">' + mk('l1 d6', esc(D.hero[0])) + mk('l2 d8', esc(D.hero[1])) + '</h1></div></section>' +
      '<section class="intro rv"><div class="in"><div class="rule" role="presentation"></div>' +
      '<div class="two"><p class="lead">' + br(D.lead) + '</p><p class="body">' + br(D.body) + '</p></div></div></section>' +
      '<div class="gap1" aria-hidden="true"></div>' +
      '<section class="list"><div class="in"><h2 class="year serif rv">' + esc(D.year) + '</h2><ol class="rows" role="list">' +
      D.items.map(function (it) { var m = /^(\d{4})\.(\d{2})$/.exec(it[0]); return '<li class="row rv rs"><time class="date"' + (m ? ' datetime="' + m[1] + '-' + m[2] + '"' : '') + '><span class="ri">' + esc(it[0]) + '</span></time><h3 class="ttl"><span class="ri">' + br(it[1]) + '</span></h3><p class="desc"><span class="ri">' + br(it[2]) + '</span></p></li>'; }).join('') +
      '</ol></div></section><div class="gap2" aria-hidden="true"></div>';
  }

  class VdviaNews extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { fitOn(this); injectFonts(); this.shadowRoot.innerHTML = html(DATA); if (this._mo) this._mo.disconnect(); this._mo = motionOn(this.shadowRoot); }
    disconnectedCallback() { fitOff(); if (this._mo) this._mo.disconnect(); }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    window.VDVIA_NEWS_SEO_HTML = '<h1>' + esc(DATA.hero.join(' ')) + '</h1><p>' + esc(DATA.lead.replace(/\n/g, ' ')) + '</p><p>' + esc(DATA.body) + '</p><h2>' + esc(DATA.year) + '</h2><ol>' +
      DATA.items.map(function (it) { return '<li><time>' + esc(it[0]) + '</time> <h3>' + esc(it[1].replace(/ ?\u2028/g, ' ')) + '</h3><p>' + esc(it[2]) + '</p></li>'; }).join('') + '</ol>';
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-news')) customElements.define('vdvia-news', VdviaNews);
})();
