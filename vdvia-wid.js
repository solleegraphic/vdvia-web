/* VDVIA What is Different 페이지 웹 컴포넌트 <vdvia-wid>  (2026-11-05)
 * 정본: Figma [VDVIA] Design › 'VDVIA What is Different EN 1440 (PC)_sol 수정_3' (섹션 1209:2629, 보드 1209:2630). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 배치는 News 페이지(vdvia-news.js)와 같다. 1440 기준 헤더(64) 아래 1978:
 *   히어로 440: What is 39.12 / Different 94.04, Adobe Garamond 400, 줄높이 100%, 자간 -2%, 글상자 위 264
 *   소개 167: 라벨 Difference 16/26 Bold, 룰(라벨 위에서 32), 리드 23/33 SemiBold 480폭 + 본문 16/26 592폭(x 720), 룰 아래 30
 *   여백 200 → 행 991: Three Differences 90px Garamond 86%(두 줄이라 줄 77, 피그마 정수 반올림) -1%, 제목 아래 191에 첫 룰,
 *   행 = 룰 → 55 → 번호 16/19 180폭 | 제목 23/33 SemiBold 478폭(x 332) | 설명 16/26 #555 478폭(x 834) → 55 → 룰, 끝 여백 180
 * 1281 이상: 컨테이너 1184 가운데. 769~1280: 같은 배치를 좌우 24 여백으로 비율 유지(그리드 fr).
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

  var CSS = [
    ':host{display:block;background:#fff;color:#141414;font-family:' + SANS + ';font-size:16px;line-height:26px;letter-spacing:-0.16px;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}',
    '*{box-sizing:border-box;margin:0;padding:0}',
    '.in{max-width:1184px;margin:0 auto}',
    '.serif{font-family:' + SERIF + ';font-weight:400}',
    /* 히어로 */
    '.hero{position:relative;height:440px}',
    '.ht{position:absolute;left:0;top:264px;font-weight:400}',
    '.ht span{display:block;white-space:nowrap;letter-spacing:-0.02em}', /* 자간은 줄마다 자기 크기 기준 */
    /* 피그마는 둘째 줄 기준선을 첫 줄 기준선 + 94.04에 둔다(브라우저는 줄 상자를 쌓아 10px 위). 실측 보정: l1 -2, l2 +10 */
    '.ht .l1{font-size:39.12px;line-height:39.12px;position:relative;top:var(--l1-dy,-2px)}',
    '.ht .l2{font-size:94.04px;line-height:94.04px;position:relative;top:var(--l2-dy,10px)}',
    /* 소개 */
    '.lab{font-weight:700;font-size:16px;line-height:26px;position:relative;top:var(--lab-dy,1px)}', /* 기준선을 피그마에 맞춤(홈, Brand와 같은 보정) */
    '.rule{height:1px;background:#141414}',
    '.intro .rule{margin-top:6px}',
    '.two{display:grid;grid-template-columns:minmax(0,480fr) minmax(0,112fr) minmax(0,592fr);margin-top:30px}',
    /* Pretendard 실측 보정(피그마 대비): 23/33은 1px, 16/26은 2px 아래로. 배치에는 영향 없음 */
    '.lead{grid-column:1;font-weight:600;font-size:23px;line-height:33px;position:relative;top:var(--t23-dy,1px)}',
    '.body{grid-column:3;font-size:16px;line-height:26px;position:relative;top:var(--t16-dy,2px)}',
    '.gap1{height:200px}',
    /* 행 */
    '.disp{font-size:90px;line-height:77px;letter-spacing:-0.01em;position:relative;top:var(--d90-dy,-5px)}',
    '.rows{list-style:none;margin-top:191px;border-top:1px solid #141414}',
    '.row{display:grid;grid-template-columns:minmax(0,180fr) minmax(0,24fr) minmax(0,478fr) minmax(0,24fr) minmax(0,478fr);padding:55px 0;border-bottom:1px solid #141414}',
    '.num{grid-column:1;font-size:16px;line-height:19px}',
    '.ttl{grid-column:3;font-weight:600;font-size:23px;line-height:33px;position:relative;top:var(--t23-dy,1px)}',
    '.desc{grid-column:5;font-size:16px;line-height:26px;color:#555;position:relative;top:var(--t16-dy,2px)}',
    '.gap2{height:180px}',
    /* 769~1280: 같은 배치, 좌우 24. 피그마가 줄을 정한 1281 이상은 그대로 두고 그 아래만 마지막 줄 한 단어 방지 */
    '@media (max-width:1280px){.in{max-width:none;margin:0 24px}.lead,.body,.desc{text-wrap:pretty}}',
    /* U+2028 강제 줄바꿈은 글 열이 충분히 넓은 1101 이상에서만(News와 같음) */
    '@media (max-width:1100px){.d{display:none}}',
    /* 768 이하: 모바일(News 규칙) */
    '@media (max-width:768px){',
    '.hero{height:auto;padding:184px 0 40px}',
    '.ht{position:static}',
    '.ht .l1{font-size:17px;line-height:17px;top:-1px}',
    '.ht .l2{font-size:48px;line-height:48px;top:5px}',
    '.two{display:block;margin-top:21px}',
    '.lead{font-size:20px;line-height:30px;top:1px}',
    '.body{margin-top:24px}',
    '.gap1{height:120px}',
    '.disp{font-size:min(72px, calc((100vw - 48px) * 0.21));line-height:min(62px, calc((100vw - 48px) * 0.1806));top:-3px}', /* Differences가 320(글 폭 272)에서 한 줄에 들어가게 */
    '.rows{margin-top:90px}',
    '.row{display:block;padding:36px 0 35px}',
    '.num{display:block}',
    '.ttl{margin-top:30px;font-size:20px;line-height:30px}',
    '.desc{margin-top:12px}',
    '.gap2{height:120px}',
    '}'
  ].join('\n');

  function html(D) {
    return '<style>' + CSS + '</style><div lang="en">' +
      '<section class="hero"><div class="in" style="position:relative;height:100%"><h1 class="ht serif"><span class="l1">' + esc(D.hero[0]) + '</span> <span class="l2">' + esc(D.hero[1]) + '</span></h1></div></section>' +
      '<section class="intro"><div class="in"><p class="lab">' + esc(D.label) + '</p><div class="rule" role="presentation"></div>' +
      '<div class="two"><p class="lead">' + br(D.lead) + '</p><p class="body">' + br(D.body) + '</p></div></div></section>' +
      '<div class="gap1" aria-hidden="true"></div>' +
      '<section class="list"><div class="in"><h2 class="disp serif">' + br(D.display) + '</h2><ol class="rows" role="list">' +
      D.items.map(function (it) { return '<li class="row"><p class="num" aria-hidden="true">' + esc(it[0]) + '</p><h3 class="ttl">' + br(it[1]) + '</h3><p class="desc">' + br(it[2]) + '</p></li>'; }).join('') +
      '</ol></div></section><div class="gap2" aria-hidden="true"></div></div>';
  }

  class VdviaWid extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { injectFonts(); this.shadowRoot.innerHTML = html(DATA); }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    window.VDVIA_WID_SEO_HTML = '<h1>' + esc(DATA.hero.join(' ')) + '</h1><p>' + esc(flat(DATA.lead)) + '</p><p>' + esc(flat(DATA.body)) + '</p><h2>' + esc(flat(DATA.display)) + '</h2><ol>' +
      DATA.items.map(function (it) { return '<li><h3>' + esc(flat(it[1])) + '</h3><p>' + esc(flat(it[2])) + '</p></li>'; }).join('') + '</ol>';
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-wid')) customElements.define('vdvia-wid', VdviaWid);
})();
