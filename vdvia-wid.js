/* VDVIA What is Different 페이지 웹 컴포넌트 <vdvia-wid>  (2026-11-05)
 * 정본: Figma [VDVIA] Design › 'VDVIA What is Different EN 1440 (PC)_sol 수정_3' (섹션 1209:2629, 보드 1209:2630). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 배치는 News 페이지(vdvia-news.js)와 같다. 1440 기준 헤더(64) 아래 1978:
 *   히어로 440: What is 39.12 / Different 94.04, Adobe Garamond 400, 줄높이 100%, 자간 -2%, 글상자 위 264
 *   소개 167: 라벨 Difference 16/26 Bold, 룰(라벨 위에서 32), 리드 23/33 SemiBold 480폭 + 본문 16/26 592폭(x 720), 룰 아래 30
 *   여백 200 → 행 991: Three Differences 90px Garamond 86%(두 줄이라 줄 77, 피그마 정수 반올림) -1%, 제목 아래 191에 첫 룰,
 *   행 = 룰 → 55 → 번호 16/19 180폭 | 제목 23/33 SemiBold 478폭(x 332) | 설명 16/26 #555 478폭(x 834) → 55 → 룰, 끝 여백 180
 * 폭(2026-11-06 Sol, 1920, 1440, 1024, 768, 390): 1281 이상 컨테이너 1184 가운데(피그마 그대로). 1024~1280 좌우 48, 768~1023 좌우 32, 같은 배치에서 글자와 여백을 폭에 비례해 줄인다(fv()). 767 이하는 390 배치(좌우 29.25), 390보다 좁으면 zoom으로 그대로 줄인다(윅스 모바일 320 포함).
 * 768 이하(윅스 모바일 320 포함): News 모바일 규칙을 따른다. Three Differences는 320에서도 한 줄에 들어가게 폭 비례로 줄인다. 피그마에 모바일 보드가 없어 Claude가 정한 값.
 * 글 안 U+2028(피그마 Shift+Enter)은 1101 이상에서만 줄바꿈, 그 아래는 공백. 줄바꿈 문자(Enter)는 항상 줄바꿈.
 * 윅스: Custom Element, Server URL = 이 파일, Tag = vdvia-wid, 전체 폭. 폰트 링크는 document.head에 한 번만(다른 컴포넌트와 같은 id).
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
    "What is",
    "Different"
  ],
  "label": "Difference",
  "lead": "A bio company stands \u2028behind every brand we build.",
  "body": "VDVIA is a subsidiary of Zishel, a Korean regenerative-medicine company \u2028founded in 2008. Zishel researches and produces the active ingredients. \nVDVIA builds the brands and takes them to the world. That parent company is what makes us different.",
  "display": "Three\nDifferences",
  "items": [
    [
      "I",
      "Science at the source.",
      "Our exosomes come from Zishel’s own patented platform, produced in its aseptic GMP facility. The science is invented and made inside our group."
    ],
    [
      "II",
      "Decided by data, \nexecuted by AI.",
      "VDVIA runs on a proprietary AI operating system we built in-house. It reads market data and consumer response across every market in real time, and carries every decision through to execution, from content and advertising to daily operations. We decide on evidence, not instinct, and move before the market does."
    ],
    [
      "III",
      "From research to retail, \nin one group.",
      "Zishel’s technology reaches 46+ countries through more than 59 partners. VDVIA turns that technology into brands and brings them directly to consumers worldwide. Between research and the market, there is no distance."
    ]
  ]
};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function br(s) { return esc(s).replace(/ ?\u2028/g, ' <br class="d">').replace(/ ?\n/g, ' <br>'); } /* 줄 끝 공백은 그려지지 않고, textContent에서 낱말이 붙지 않게 */
  function flat(s) { return String(s).replace(/\s*[\u2028\n]\s*/g, ' '); }
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
    '.in{max-width:1184px;margin:0 auto}',
    '.serif{font-family:' + SERIF + ';font-weight:400}',
    /* 히어로 */
    '.hero{position:relative;height:' + fv(300, 440) + '}',
    '.ht{position:absolute;left:0;top:' + fv(186, 264) + ';font-weight:400}',
    '.ht span{display:block;white-space:nowrap;letter-spacing:-0.02em}', /* 자간은 줄마다 자기 크기 기준 */
    /* 피그마는 둘째 줄 기준선을 첫 줄 기준선 + 94.04에 둔다(브라우저는 줄 상자를 쌓아 10px 위). 실측 보정: l1 -2, l2 +10 */
    '.ht .l1{font-size:' + fv(24, 39.12) + ';line-height:' + fv(24, 39.12) + ';position:relative;top:' + fv(-1, -2) + '}',
    '.ht .l2{font-size:' + fv(56, 94.04) + ';line-height:' + fv(56, 94.04) + ';position:relative;top:' + fv(6, 10) + '}',
    /* 소개 */
    '.lab{font-weight:700;font-size:16px;line-height:26px;position:relative;top:var(--lab-dy,1px)}', /* 기준선을 피그마에 맞춤(홈, Brand와 같은 보정) */
    '.rule{height:1px;background:#141414}',
    '.intro .rule{margin-top:6px}',
    '.two{display:grid;grid-template-columns:minmax(0,480fr) minmax(0,112fr) minmax(0,592fr);margin-top:' + fv(24, 30) + '}',
    /* Pretendard 실측 보정(피그마 대비): 23/33은 1px, 16/26은 2px 아래로. 배치에는 영향 없음 */
    '.lead{grid-column:1;font-weight:600;font-size:' + fv(20, 23) + ';line-height:' + fv(29, 33) + ';position:relative;top:var(--t23-dy,1px)}',
    '.body{grid-column:3;font-size:16px;line-height:26px;position:relative;top:var(--t16-dy,2px)}',
    '.gap1{height:' + fv(120, 200) + '}',
    /* 행 */
    '.disp{font-size:' + fv(54, 90) + ';line-height:' + fv(46, 77) + ';letter-spacing:-0.01em;position:relative;top:' + fv(-3, -5) + '}',
    '.rows{list-style:none;margin-top:' + fv(96, 191) + '}',
    '.row:first-child{border-top:1px solid #141414}', /* 윗줄도 첫 칸과 함께 나타나게(자리는 그대로) */
    '.row{display:grid;grid-template-columns:minmax(0,180fr) ' + fv(32, 24) + ' minmax(0,478fr) ' + fv(32, 24) + ' minmax(0,478fr);padding:' + fv(36, 55) + ' 0;border-bottom:1px solid #141414}',
    '.num{grid-column:1;font-size:16px;line-height:19px}',
    '.ttl{grid-column:3;font-weight:600;font-size:' + fv(19, 23) + ';line-height:' + fv(27, 33) + ';position:relative;top:var(--t23-dy,1px)}',
    '.desc{grid-column:5;font-size:16px;line-height:26px;color:#555;position:relative;top:var(--t16-dy,2px)}',
    '.gap2{height:' + fv(110, 180) + '}',
    /* 1024~1280 좌우 48, 768~1023 좌우 32: 같은 배치. 피그마가 줄을 정한 1281 이상은 그대로 두고 그 아래만 마지막 줄 한 단어 방지 */
    '@media (max-width:1280.98px){.in{max-width:none;margin:0 48px}.lead,.body,.desc{text-wrap:pretty}}',
    '@media (max-width:1023.98px){.in{margin:0 32px}}',
    /* U+2028 강제 줄바꿈은 글 열이 충분히 넓은 1101 이상에서만(News와 같음) */
    '@media (max-width:1100.98px){.d{display:none}}',
    /* 767 이하: 390 배치 */
    '@media (max-width:767.98px){',
    '.in{margin:0 29.25px}',
    '.hero{height:auto;padding:200px 0 40px}',
    '.ht{position:static}',
    '.ht .l1{font-size:24px;line-height:28.5px;letter-spacing:0;top:0}',
    '.ht .l2{font-size:58px;line-height:55.5px;letter-spacing:-1.0725px;top:0;margin-top:23px}',
    '.lab{font-size:19.5px;line-height:31.6875px;letter-spacing:-.195px;top:0}',
    '.intro .rule{margin-top:6.7px}',
    '.two{display:block;margin-top:25.8px}',
    '.lead{font-size:21.5px;line-height:30.5px;letter-spacing:-.195px;top:0;text-wrap:balance}',
    '.body{margin-top:39.8px;font-size:18px;line-height:26px;letter-spacing:-.195px;top:0}',
    '.gap1{height:128px}',
    '.disp{font-size:55.5px;line-height:64px;letter-spacing:-.585px;top:0}',
    '.rows{margin-top:57.7px}',
    '.row:first-child{border-top:1px solid rgba(20,20,20,.3)}',
    '.row{display:block;padding:29.5px 0 41.8px;border-bottom:1px solid rgba(20,20,20,.3)}',
    '.num{display:block;font-size:14px;line-height:21.9375px;letter-spacing:-.195px;top:0}',
    '.ttl{margin-top:25px;font-size:21.5px;line-height:30.5px;letter-spacing:-.195px;top:0;text-wrap:balance}',
    '.desc{margin-top:12.3px;font-size:18px;line-height:26px;letter-spacing:-.195px;top:0}',
    '.gap2{height:75.5px}',
    '}',
    ZOOM,
    MOTION_CSS
  ].join('\n');

  function html(D) {
    return '<style>' + CSS + '</style><div lang="en">' +
      '<section class="hero"><div class="in" style="position:relative;height:100%"><h1 class="ht serif">' + mk('l1 d6', esc(D.hero[0])) + ' ' + mk('l2 d8', esc(D.hero[1])) + '</h1></div></section>' +
      '<section class="intro rv"><div class="in"><p class="lab">' + esc(D.label) + '</p><div class="rule" role="presentation"></div>' +
      '<div class="two"><p class="lead">' + br(D.lead) + '</p><p class="body">' + br(D.body) + '</p></div></div></section>' +
      '<div class="gap1" aria-hidden="true"></div>' +
      '<section class="list"><div class="in"><h2 class="disp serif rv">' + br(D.display) + '</h2><ol class="rows" role="list">' +
      D.items.map(function (it) { return '<li class="row rv rs"><p class="num" aria-hidden="true">' + esc(it[0]) + '</p><h3 class="ttl">' + br(it[1]) + '</h3><p class="desc">' + br(it[2]) + '</p></li>'; }).join('') +
      '</ol></div></section><div class="gap2" aria-hidden="true"></div></div>';
  }

  class VdviaWid extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { fitOn(this); injectFonts(); this.shadowRoot.innerHTML = html(DATA); if (this._mo) this._mo.disconnect(); this._mo = motionOn(this.shadowRoot); }
    disconnectedCallback() { fitOff(); if (this._mo) this._mo.disconnect(); }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    window.VDVIA_WID_SEO_HTML = '<h1>' + esc(DATA.hero.join(' ')) + '</h1><p>' + esc(flat(DATA.lead)) + '</p><p>' + esc(flat(DATA.body)) + '</p><h2>' + esc(flat(DATA.display)) + '</h2><ol>' +
      DATA.items.map(function (it) { return '<li><h3>' + esc(flat(it[1])) + '</h3><p>' + esc(flat(it[2])) + '</p></li>'; }).join('') + '</ol>';
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-wid')) customElements.define('vdvia-wid', VdviaWid);
})();
