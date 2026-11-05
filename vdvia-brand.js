/* VDVIA Brand 페이지 웹 컴포넌트 <vdvia-brand>  (2026-11-05)
 * 정본: Figma [VDVIA] Design › 'VDVIA Brand EN 1440 (PC)_sol 수정_3' (섹션 1209:2509, 보드 1209:2510). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 1440 기준 헤더(64) 아래 1619.32: 여백 116 | Brands 1323.32 | 여백 180
 *   라벨 16/26 Bold → 6 → 룰 둘(왼쪽 378.67, 오른쪽은 피그마 그대로 x 531에서 782폭) → 디스플레이 82 Garamond 105%(줄 86) 2줄(룰 아래 21)
 *   | 오른쪽 23/33 SemiBold(룰 아래 31) + Helvetica 16/26 #555(18 아래)
 *   → 312 → 브랜드 둘(x 530.67, 폭 781.33): 로고 → 룰(레몬더마 25, 쏘마지 코스메틱 14 아래) → 16 → 사진 378.67 | 24 | 글 378.67(Pretendard 16/26 → 8 → Helvetica 16/26 #555), 두 브랜드 사이 110
 * 사진 2장(2배 JPG)과 로고 2장(3배 PNG)은 피그마 노드를 그대로 내보낸 것. 기본 주소 IMG_BASE, 속성 img-base로 바꾼다.
 * 1281 이상: 컨테이너 1184 가운데(3열 378.67, 간격 24). 769~1280: 같은 배치를 좌우 24 여백으로, 큰 세리프는 폭에 비례해 줄인다.
 * 768 이하(윅스 모바일 320 포함): 한 줄씩 쌓는 모바일 배치. 피그마에 모바일 보드가 없어 홈, News 모바일 규칙을 따라 Claude가 정한 값.
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
      "lead": "A vegan dermacosmetic born from Jeju lemon and exosome science.",
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
      "alt": "ZISHEL XOMAGE COSMETICS skincare bottles on a white background",
      "lead": "Zishel Group’s clinic skin-booster exosomes, trusted in 50 countries, now in everyday skincare.",
      "body": "Exo PDRN skincare from Korea, from masks to daily essentials. Enjoy clinic-inspired care at home."
    }
  ]
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

  var CSS = [
    ':host{display:block;background:#fff;color:#141414;font-family:' + SANS + ';font-size:16px;line-height:26px;letter-spacing:-0.16px;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}',
    '*{box-sizing:border-box;margin:0;padding:0}',
    '.in{max-width:1184px;margin:0 auto;position:relative}',
    'img{display:block}',
    '.serif{font-family:' + SERIF + ';font-weight:400}',
    '.rule{height:1px;background:#141414}',
    '.g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:24px}', /* 1184 = 378.67 x 3 + 24 x 2 */
    '.gap116{height:116px}.gap180{height:180px}',
    '.lab{font-weight:700;font-size:16px;line-height:26px;position:relative;top:var(--lab-dy,1px)}',
    '.rules{margin-top:6px}',
    /* 피그마는 위쪽 오른쪽 룰과 글을 x 531에서 782폭(1313까지)으로 둔다. 아래 브랜드 칸(530.67, 781.33)과 0.33px, 1px 다른 것까지 그대로 */
    '.rules .rule:last-child,.top .r{grid-column:2/4;margin-left:.33px;margin-right:-1px}',
    '.top{align-items:start}',
    '.disp{grid-column:1;font-size:min(82px, calc((100vw - 48px) * 0.069257));line-height:min(86px, calc((100vw - 48px) * 0.072635));letter-spacing:-0.01em;white-space:nowrap;margin-top:21px;position:relative;top:var(--d82-dy,-5px)}',
    '.top .r{margin-top:31px}',
    '.t23{font-weight:600;font-size:23px;line-height:33px;position:relative;top:var(--t23-dy,1px)}',
    '.t16{font-size:16px;line-height:26px;position:relative;top:var(--t16-dy,2px)}',
    '.helv{font-family:' + HELV + ';color:#555;position:relative;top:var(--helv-dy,1px)}', /* 홈은 2, 여기는 피그마 대조로 1 */
    '.top .helv{margin-top:18px}',
    '.list{list-style:none;margin-top:312px}',
    '.brand{grid-column:2/4;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:24px;align-items:start}',
    '.brand + .brand{margin-top:110px}',
    '.bname{grid-column:1/3;font-size:0;line-height:0}',
    '.b1 .logo{width:220px;height:33px}.b2 .logo{width:95px;height:56px}',
    '.brand .rule{grid-column:1/3}',
    '.b1 .rule{margin-top:25px}.b2 .rule{margin-top:14px}',
    '.photo{grid-column:1;width:100%;height:auto;margin-top:16px;object-fit:cover}',
    '.b1 .photo{aspect-ratio:378.67/276.32}.b2 .photo{aspect-ratio:378.67/237}',
    '.txt{grid-column:2;margin-top:16px}',
    '.txt .helv{margin-top:8px}',
    /* 769~1280: 같은 배치, 좌우 24 */
    '@media (max-width:1280px){.in{max-width:none;margin:0 24px}}',
    /* 768 이하: 모바일 */
    '@media (max-width:768px){',
    '.gap116{height:80px}',
    '.g3,.brand{display:block}',
    '.rules .rule:first-child{display:none}',
    '.rules .rule:last-child,.top .r{margin-left:0;margin-right:0}',
    '.disp{font-size:48px;line-height:51px;top:0;white-space:normal}', /* 피그마처럼 줄 높이 정수 */
    '.top .r{margin-top:32px}',
    '.t23{font-size:20px;line-height:30px;text-wrap:balance}', /* 320에서 ritual. 한 단어만 남지 않게 */
    '.top .helv{margin-top:12px}',
    '.list{margin-top:120px}',
    '.brand + .brand{margin-top:80px}',
    '.txt{margin-top:20px}',
    '.gap180{height:120px}',
    '}'
  ].join('\n');

  function html(D, base) {
    return '<style>' + CSS + '</style>' +
      '<div class="gap116" aria-hidden="true"></div>' +
      '<section class="brands"><div class="in">' +
      '<p class="lab">' + esc(D.label) + '</p>' +
      '<div class="g3 rules" role="presentation"><div class="rule"></div><div class="rule"></div></div>' +
      '<div class="g3 top"><h1 class="disp serif">' + lines(D.title) + '</h1><div class="r"><p class="t23">' + lines(D.lead) + '</p><p class="helv">' + lines(D.body) + '</p></div></div>' +
      '<ul class="g3 list" role="list">' + D.brands.map(function (b, i) {
        return '<li class="brand b' + (i + 1) + '"><h2 class="bname"><img class="logo" src="' + esc(base + b.logo) + '" width="' + b.logoW + '" height="' + b.logoH + '" alt="' + esc(b.name) + '"></h2>' +
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
    connectedCallback() { injectFonts(); this._render(); }
    attributeChangedCallback() { if (this.shadowRoot.firstChild) this._render(); }
    _render() { this.shadowRoot.innerHTML = html(DATA, this.getAttribute('img-base') || IMG_BASE); }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    var p = function (s) { return '<p>' + esc(String(s).replace(/\s*[\u2028\n]\s*/g, ' ')) + '</p>'; };
    window.VDVIA_BRAND_SEO_HTML = '<h1>' + esc(DATA.title.replace(/\s*\n\s*/g, ' ')) + '</h1>' + p(DATA.lead) + p(DATA.body) +
      DATA.brands.map(function (b) { return '<h2>' + esc(b.name) + '</h2>' + p(b.lead) + p(b.body); }).join('');
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-brand')) customElements.define('vdvia-brand', VdviaBrand);
})();
