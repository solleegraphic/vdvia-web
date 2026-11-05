/* VDVIA Home 웹 컴포넌트 <vdvia-home>  (2026-11-05 새로 작성, 이전 예전 빌드 기준 코드를 대체)
 * 정본: Figma [VDVIA] Design › 'VDVIA Home 1440 (PC)_sol 수정_3' (섹션 1209:2275, 보드 1209:2276). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 1440 기준 헤더(64) 아래 5039: 히어로 550 | About 932 | 53 | Mission 274 | 280 | Vision 258 | 280 | Core Value 988 | 280 | Structure 964 | 180
 * 사진 4장(about, healthcare, lifestyle, creativity)은 피그마에서 필터와 크롭을 적용한 채 2배로 내보낸 JPG. 기본 주소 IMG_BASE, 속성 img-base로 바꿀 수 있다.
 * 1281 이상: 컨테이너 1184 가운데. 769~1280: 같은 배치를 좌우 24 여백으로, 큰 세리프는 폭에 비례해 줄인다(fl()).
 * 768 이하(윅스 모바일 320 포함): 한 줄씩 쌓는 모바일 배치. 피그마에 모바일 보드가 없어 Claude가 예전 하위 페이지 모바일 규칙을 따라 정한 값.
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
        "healthcare.jpg"
      ],
      [
        "Lifestyle",
        "VDVIA LIFESTYLE creates beauty brands grounded in exosome science. Through Lemonderma and ZISHEL XOMAGE COSMETICS, we bring clinic-proven technology into everyday skincare for consumers worldwide.",
        "lifestyle.jpg"
      ],
      [
        "Creativity",
        "VDVIA CREATIVITY provides in-house brand building and content creation, backed by best-in-class marketing infrastructure, instant access to K-content production and end-to-end e-commerce solutions for brands.",
        "creativity.jpg"
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

  var CSS = [
    ':host{display:block;background:#fff;color:#141414;font-family:' + SANS + ';font-size:16px;line-height:26px;letter-spacing:-0.16px;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}',
    '*{box-sizing:border-box;margin:0;padding:0}',
    '.in{max-width:1184px;margin:0 auto;position:relative}',
    'img{display:block;width:100%;height:auto}',
    '.serif{font-family:' + SERIF + ';font-weight:400}',
    '.rule{height:1px;background:#141414}',
    '.lab{font-weight:700;font-size:16px;line-height:26px;position:relative;top:var(--lab-dy,1px)}',
    '.t23{font-weight:600;font-size:23px;line-height:33px;position:relative;top:1px}',
    '.t16{font-size:16px;line-height:26px;position:relative;top:2px}',
    '.helv{font-family:' + HELV + ';color:#555;position:relative;top:var(--helv-dy,2px)}',
    /* 히어로 550: 리드 위 116, 제목 위 367 (News와 같은 두 크기 제목 보정: 첫 줄 -2, 둘째 줄 +10) */
    '.hero{height:550px}',
    '.hero .in{height:100%}',
    '.hlead{position:absolute;left:0;top:116px;width:491px;max-width:100%}',
    '.ht{position:absolute;left:0;top:367px;font-weight:400}',
    '.ht span{display:block;white-space:nowrap;letter-spacing:-0.02em}',
    '.ht .l1{font-size:min(39.12px, calc((100vw - 48px) * 0.03304));line-height:min(39.12px, calc((100vw - 48px) * 0.03304));position:relative;top:-2px}',
    '.ht .l2{font-size:min(94.04px, calc((100vw - 48px) * 0.07943));line-height:min(94.04px, calc((100vw - 48px) * 0.07943));position:relative;top:10px}',
    /* About 932 */
    '.about{min-height:932px}',
    '.ab-grid{display:grid;grid-template-columns:minmax(0,612fr) minmax(0,274fr) minmax(0,14fr) minmax(0,284fr);margin-top:17px}',
    '.ab-img img{aspect-ratio:612/390;object-fit:cover}',
    '.ab-under{width:86.2745%;margin-top:14px;letter-spacing:0;position:relative;top:var(--under-dy,2px)}',
    '.ab-cap{grid-column:2;justify-self:start;align-self:start;writing-mode:vertical-rl;font-size:13px;line-height:18px;margin-left:9px;position:relative;left:var(--cap-dx,-1px);top:var(--cap-dy,0px)}',
    '.ab-vr{grid-column:3;width:1px;height:384px;background:#141414}',
    '.ab-txt{grid-column:4}',
    '.ab-head{font-weight:600;font-size:18px;line-height:26px;position:relative;top:var(--h18-dy,0px)}',
    '.ab-body{margin-top:32px}',
    '.gap53{height:53px}.gap280{height:280px}.gap180{height:180px}',
    /* Mission 274, Vision 258: 라벨 → 룰 둘(378.67 | 24.33 | 782) → 디스플레이 82 / 리드 23 + 본문 */
    '.mv .cols{display:grid;grid-template-columns:minmax(0,378.67fr) minmax(0,24.33fr) minmax(0,782fr)}',
    '.mv .rules{margin-top:6px}',
    '.mv .rules .rule:last-child{grid-column:3}',
    '.mission{min-height:274px}.vision{min-height:258px}',
    '.disp{font-size:min(82px, calc((100vw - 48px) * 0.06926));line-height:min(87px, calc((100vw - 48px) * 0.07348));letter-spacing:-0.01em;position:relative;top:var(--d82-dy,-4px)}',
    '.mv .disp{margin-top:21px}',
    '.mv .r{grid-column:3}',
    '.mv .t23{margin-top:31px}',
    '.mv .helv{margin-top:67px}',
    /* Core Value 988: 라벨 → 룰 → 디스플레이(804) | 본문(380) → 216 → 칸 2열 3행(568 | 48 | 568, 행 간격 80) */
    '.core{min-height:988px}',
    '.head2{display:grid;grid-template-columns:minmax(0,804fr) minmax(0,380fr)}',
    '.head2 .disp{margin-top:21px}',
    '.head2 .t16{margin-top:31px}',
    '.cells{display:grid;grid-template-columns:minmax(0,568fr) minmax(0,48fr) minmax(0,568fr);row-gap:80px;margin-top:216px}',
    '.cell:nth-child(2n){grid-column:3}',
    '.cname{font-size:min(68px, calc((100vw - 48px) * 0.05743));line-height:min(68px, calc((100vw - 48px) * 0.05743));letter-spacing:-0.01em;white-space:nowrap;position:relative;top:var(--d68-dy,-4px)}',
    '.cell .rule{margin-top:13px}',
    '.cell .t16{margin-top:20px}',
    /* Structure 964: 라벨 → 룰 → 디스플레이 90 3줄 | 본문 → 182 → 칸 3개(394.67, 위아래 룰, 세로 룰 위아래 12 안쪽) */
    '.st .disp90{font-size:min(90px, calc((100vw - 48px) * 0.07601));line-height:min(95px, calc((100vw - 48px) * 0.08024));letter-spacing:-0.01em;margin-top:21px;position:relative;top:var(--d90-dy,-5px)}',
    '.scells{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:182px;border-top:1px solid #141414;border-bottom:1px solid #141414;position:relative}',
    '.scell{min-height:441px;padding:20px 18px 8px}',
    '.scell + .scell{border-left:0}',
    '.svr{position:absolute;top:12px;bottom:12px;width:1px;background:#141414}',
    '.scell img{aspect-ratio:358.67/224;object-fit:cover}',
    '.stitle{margin-top:20px;font-weight:600;font-size:15px;line-height:25px;position:relative;top:var(--t15-dy,1px)}',
    '.sbody{margin-top:10px;font-size:14px;line-height:22px;position:relative;top:var(--t14-dy,1px)}',
    /* 769~1280: 같은 배치, 좌우 24 */
    '@media (max-width:1280px){.in{max-width:none;margin:0 24px}}',
    /* 768 이하: 모바일 */
    '@media (max-width:768px){',
    '.hero{height:auto;padding:80px 0 60px}',
    '.hlead,.ht{position:static;width:auto}',
    '.ht{margin-top:120px}',
    '.ht span{white-space:normal}',
    '.ht .l1{font-size:17px;line-height:20px;top:0}',
    '.ht .l2{font-size:44px;line-height:44px;top:0;margin-top:8px}',
    '.hlead{font-size:20px;line-height:30px}',
    '.about{min-height:0}',
    '.ab-grid{display:flex;flex-direction:column;margin-top:16px}',
    '.ab-cap{order:-1;writing-mode:horizontal-tb;margin:0 0 10px;left:0;top:0}',
    '.ab-vr{display:none}',
    '.ab-under{width:auto}',
    '.ab-txt{margin-top:48px}',
    '.ab-body{margin-top:24px}',
    '.gap53,.gap280,.gap180{height:120px}',
    '.mission,.vision,.core{min-height:0}',
    '.mv .cols,.head2{display:block}',
    '.mv .rules .rule:first-child{display:none}',
    '.disp,.st .disp90{font-size:48px;line-height:51px;top:0}', /* 피그마처럼 줄 높이 정수 */
    '.mv .t23,.head2 .t16{margin-top:32px}',
    '.mv .t23{font-size:20px;line-height:30px}',
    '.mv .helv{margin-top:24px}',
    '.cells{display:block;margin-top:60px}',
    '.cell + .cell{margin-top:48px}',
    '.cname{font-size:36px;line-height:36px;white-space:normal;top:0}',
    '.scells{display:block;margin-top:60px;border-bottom:0}',
    '.svr{display:none}',
    '.scell{min-height:0;padding:24px 0 32px;border-bottom:1px solid #141414}',
    '}'
  ].join('\n');

  function html(D, base) {
    var mv = function (cls, M) {
      return '<section class="mv ' + cls + '"><div class="in"><p class="lab">' + esc(M.label) + '</p>' +
        '<div class="cols rules"><div class="rule"></div><div class="rule"></div></div>' +
        '<div class="cols"><h2 class="disp serif">' + lines(M.display) + '</h2><div class="r"><p class="t23">' + lines(M.lead) + '</p><p class="t16 helv">' + lines(M.body) + '</p></div></div></div></section>';
    };
    var C = D.core, S = D.structure, A = D.about;
    return '<style>' + CSS + '</style>' +
      '<section class="hero"><div class="in"><p class="hlead t23">' + lines(D.heroLead) + '</p>' +
      '<h1 class="ht serif"><span class="l1">' + esc(D.heroTitle[0]) + '</span><span class="l2">' + esc(D.heroTitle[1]) + '</span></h1></div></section>' +
      '<section class="about"><div class="in"><div class="rule"></div><div class="ab-grid">' +
      '<div class="ab-left"><figure class="ab-img"><img src="' + esc(base + 'about.jpg') + '" width="612" height="390" alt="World map with network connections" loading="eager"></figure><p class="ab-under t16">' + lines(A.under) + '</p></div>' +
      '<p class="ab-cap">' + esc(A.caption) + '</p><div class="ab-vr" role="presentation"></div>' +
      '<div class="ab-txt"><p class="ab-head">' + lines(A.head) + '</p><p class="ab-body t16 helv">' + lines(A.body) + '</p></div></div></div></section>' +
      '<div class="gap53" aria-hidden="true"></div>' + mv('mission', D.mission) + '<div class="gap280" aria-hidden="true"></div>' + mv('vision', D.vision) + '<div class="gap280" aria-hidden="true"></div>' +
      '<section class="core"><div class="in"><p class="lab">' + esc(C.label) + '</p><div class="rule" style="margin-top:6px"></div>' +
      '<div class="head2"><h2 class="disp serif">' + lines(C.display) + '</h2><p class="t16">' + lines(C.body) + '</p></div>' +
      '<div class="cells" role="list">' + C.cells.map(function (c) { return '<div class="cell" role="listitem"><h3 class="cname serif">' + esc(c[0]) + '</h3><div class="rule"></div><p class="t16">' + esc(c[1]) + '</p></div>'; }).join('') + '</div></div></section>' +
      '<div class="gap280" aria-hidden="true"></div>' +
      '<section class="st"><div class="in"><p class="lab">' + esc(S.label) + '</p><div class="rule" style="margin-top:6px"></div>' +
      '<div class="head2"><h2 class="disp90 serif">' + lines(S.display) + '</h2><p class="t16">' + lines(S.body) + '</p></div>' +
      '<div class="scells" role="list"><i class="svr" style="left:33.3333%"></i><i class="svr" style="left:66.6667%"></i>' + S.cells.map(function (c) { return '<div class="scell" role="listitem"><img src="' + esc(base + c[2]) + '" width="359" height="224" alt="" loading="lazy"><h3 class="stitle">' + esc(c[0]) + '</h3><p class="sbody">' + esc(c[1]) + '</p></div>'; }).join('') + '</div></div></section>' +
      '<div class="gap180" aria-hidden="true"></div>';
  }

  class VdviaHome extends HTMLElement {
    static get observedAttributes() { return ['img-base']; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { injectFonts(); this._render(); }
    attributeChangedCallback() { if (this.shadowRoot.firstChild) this._render(); }
    _render() { this.shadowRoot.innerHTML = html(DATA, this.getAttribute('img-base') || IMG_BASE); }
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
