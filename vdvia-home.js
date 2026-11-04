/* VDVIA 홈 웹 컴포넌트 <vdvia-home>
 * 정본: ../_build/figma_home_build.js (T_KR, SPECS, TSd/TSm, Gd/Gm, LH, 홈 레이아웃 함수). 숫자는 전부 거기서 가져왔다.
 * 빌드 도구 없음, 바닐라 ES2017, 외부 의존성은 폰트뿐 (Pretendard Variable, EB Garamond = Adobe Garamond Pro 대체).
 * 1281px 이상 = 컨테이너 1184 가운데(데스크톱 *Desk), 1280px 이하 = 좌우 24 단일 컬럼(모바일 *Mob).
 */
(function () {
  'use strict';

  var T = {
    nav: ['Company', 'Brand', 'What is Different', 'Contact'],
    hero: { lead: '우리가 추구하는 가치를 향해\n나아가는 길.', small: 'Leading Innovation Across Products,\nServices and Experiences.', display: ['Global D2C', 'Innovator'] },
    mission: { caption: ['Mission', 'VDVIA'], display: 'Mission', lead: '과학과 데이터 기반, 고효능 저자극 헬스 & 뷰티 솔루션으로 전 세계의 삶의 질을 높인다.', body: 'We improve quality of life worldwide with science-backed, high-efficacy, low-irritation health & beauty solutions.' },
    vision: { label: 'Vision', display: 'Research-\nto-\nRetail', lead: '차세대 바이오메디컬 기술과 AI로 Research-to-Retail 밸류체인을 혁신하는, 가장 신뢰받는 글로벌 헬스 & 뷰티 브랜드 그룹이 된다.', body: 'To become the most trusted global health & beauty brand group, transforming the end-to-end research-to-retail value chain with next-generation biomedical technologies and AI.' },
    values: { label: 'Core Value', display: 'Value-\nDriven', body: 'VDVIA = Value-Driven, VIA.\nVIA는 길, 경로를 뜻합니다.', cells: [
      ['Scientific Integrity | 과학적 정직성', '재현 가능한 근거와 투명한 검증을 최우선으로.', 'Evidence that’s reproducible, verification that’s transparent.'],
      ['Accessibility | 접근성', '좋은 것을 더 많은 사람에게, 합리적인 방식으로.', 'Making the best accessible—fairly and widely.'],
      ['Innovation with AI | AI 혁신', 'AI로 빠르게 실험하고 정확히 개선합니다.', 'Rapid experimentation, precise improvement—powered by AI.'],
      ['Collaboration | 협업', '열린 파트너십으로 더 큰 가치를 만듭니다.', 'Open partnerships that compound value.'],
      ['Sustainability | 지속가능성', '환경과 사회적 책임을 이익과 함께 설계합니다.', 'Designing profit with environmental and social responsibility.'],
      ['Customer-Centricity | 고객 중심', '고객 여정의 매 순간을 데이터로 더 좋게.', 'Improving every moment of the customer journey with data.'] ] },
    structure: { label: 'Structure', display: 'Healthcare.\nLifestyle.\nCreativity.', body: 'VDVIA는 Healthcare, Lifestyle, Creativity\n세 축으로 구성됩니다.', cells: [
      ['Healthcare', 'VDVIA HEALTHCARE는 온오프라인 헬스 & 웰니스 브랜드와 서비스의 그룹입니다. R&D, 제조, 마케팅을 아우르는 수직 통합 풀컨트롤 비즈니스 모델로 운영됩니다.', 'VDVIA HEALTHCARE is group of on/offline Health & Wellness brands and services. This business is driven by vertically-integrated full-control business model with R&D manufacturing and marketing.'],
      ['Lifestyle', 'VDVIA LIFESTYLE은 온라인 뷰티 라이프스타일 브랜드, 구독 서비스, 제조 역량을 바탕으로 상호 보완적인 제품과 서비스 네트워크를 제공합니다.', 'VDVIA LIFESTYLE is leading online beauty lifestyle brands, subscription services and manufacturing capabilities to provide a complementary network of product and service offerings.'],
      ['Creativity', 'VDVIA CREATIVITY는 인하우스 브랜드 빌딩과 콘텐츠 제작을 담당하며, 최고 수준의 마케팅 인프라, K-콘텐츠 제작, 브랜드를 위한 엔드투엔드 이커머스 솔루션을 제공합니다.', 'VDVIA CREATIVITY provides in house brand building and content creation, delivered through a best-in-class marketing infrastructure instant access with K-contents creations and end-to-end ecommerce solutions for brands.'] ] },
    footer: { copy: '© 2026 VDVIA', info: ['회사명 : 주식회사 비디비아', '대표이사 : 이승환', '본사주소 : 서울특별시 강남구 압구정로28길 18, 5층', '사업자등록번호 : 331-86-01800'], privacy: '개인정보처리방침', family: 'Family Site', tagline: 'a ZISHEL company',
      cols: [['Company', ['Mission', 'Vision', 'Core Value', 'Structure']], ['Brand', ['Lemonderma', 'ZISHEL XOMAGE COSMETICS']], ['What is Different', []], ['Contact', []]] }
  };

  var WM_PATHS = '<path fill-rule="nonzero" d="M 196.84375 284.214844 L 188.394531 300.722656 L 149.699219 376.652344 L 111.007812 300.722656 L 102.554688 284.214844 L 121.042969 284.214844 L 129.496094 300.722656 L 149.699219 340.335938 L 169.90625 300.722656 L 178.355469 284.214844 Z M 196.84375 284.214844 "/><path fill-rule="nonzero" d="M 247.691406 360.277344 L 277.402344 360.277344 C 293.777344 360.277344 307.117188 346.941406 307.117188 330.566406 C 307.117188 314.191406 293.777344 300.851562 277.402344 300.851562 L 247.691406 300.851562 Z M 277.402344 284.34375 C 302.890625 284.34375 323.625 304.945312 323.625 330.433594 C 323.625 341.789062 319.53125 352.222656 312.664062 360.277344 C 311.871094 361.203125 310.945312 362.128906 310.023438 363.050781 C 301.703125 371.503906 290.210938 376.652344 277.535156 376.652344 L 231.316406 376.652344 L 231.316406 284.214844 Z M 277.402344 284.34375 "/><path fill-rule="nonzero" d="M 457.945312 284.214844 L 449.496094 300.722656 L 410.800781 376.652344 L 372.109375 300.722656 L 363.65625 284.214844 L 382.144531 284.214844 L 390.597656 300.722656 L 410.800781 340.335938 L 431.007812 300.722656 L 439.460938 284.214844 Z M 457.945312 284.214844 "/><path fill-rule="nonzero" d="M 492.417969 284.214844 L 508.925781 284.214844 L 508.925781 376.652344 L 492.417969 376.652344 Z M 492.417969 284.214844 "/><path fill-rule="nonzero" d="M 637.679688 376.652344 L 619.191406 376.652344 L 610.742188 360.148438 L 590.535156 320.527344 L 570.332031 360.148438 L 561.878906 376.652344 L 543.390625 376.652344 L 551.84375 360.148438 L 590.535156 284.214844 L 629.230469 360.148438 Z M 637.679688 376.652344 "/>';
  var SERIF = "'Adobe Garamond Pro','EB Garamond',Garamond,serif";
  var FONT_LINKS = [
    ['vdvia-font-pretendard', 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'],
    ['vdvia-font-garamond', 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400&display=swap']
  ];
  var REF_CAP = 0.2465; // goodai 블록(Pretendard Bold 120%)에서 대문자 윗선/기준선이 블록 위/아래 끝에서 떨어진 거리 (1.2em 줄 중앙 정렬, 대문자 0.707em)

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function br(s) { return esc(s).replace(/\n/g, '<br>'); }
  function wm(cls) { return '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="102.555 284.215 535.125 92.438" fill="currentColor" role="img" aria-label="VDVIA">' + WM_PATHS + '</svg>'; }
  var CHEV = '<svg class="chev" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M0.4 0.4 L5 5 L9.6 0.4"/></svg>';

  // ---------- SEO 평문 ----------
  function buildSeo() {
    var h = '<h1>' + esc(T.hero.display.join(' ')) + '</h1><p>' + esc(T.hero.lead.replace(/\n/g, ' ')) + '</p><p>' + esc(T.hero.small.replace(/\n/g, ' ')) + '</p>';
    h += '<nav><ul>' + T.nav.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></nav>';
    h += '<h2>' + esc(T.mission.display) + '</h2><p>' + esc(T.mission.lead) + '</p><p>' + esc(T.mission.body) + '</p>';
    h += '<h2>' + esc(T.vision.label) + ': ' + esc(T.vision.display.replace(/\n/g, '')) + '</h2><p>' + esc(T.vision.lead) + '</p><p>' + esc(T.vision.body) + '</p>';
    h += '<h2>' + esc(T.values.label) + ': ' + esc(T.values.display.replace(/\n/g, '')) + '</h2><p>' + esc(T.values.body.replace(/\n/g, ' ')) + '</p><ul>' +
      T.values.cells.map(function (c) { return '<li><h3>' + esc(c[0]) + '</h3><p>' + esc(c[1]) + '</p><p>' + esc(c[2]) + '</p></li>'; }).join('') + '</ul>';
    h += '<h2>' + esc(T.structure.label) + ': ' + esc(T.structure.display.replace(/\n/g, ' ')) + '</h2><p>' + esc(T.structure.body.replace(/\n/g, ' ')) + '</p><ul>' +
      T.structure.cells.map(function (c) { return '<li><h3>' + esc(c[0]) + '</h3><p>' + esc(c[1]) + '</p><p>' + esc(c[2]) + '</p></li>'; }).join('') + '</ul>';
    var f = T.footer;
    h += '<footer><p>' + esc(f.copy) + '</p>' + f.info.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') + '<p>' + esc(f.privacy) + '</p><ul>' +
      f.cols.map(function (c) { return '<li>' + esc(c[0]) + (c[1].length ? '<ul>' + c[1].map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' : '') + '</li>'; }).join('') +
      '</ul><p>VDVIA ' + esc(f.tagline) + '</p></footer>';
    return h;
  }
  if (typeof window !== 'undefined') window.VDVIA_HOME_SEO_HTML = buildSeo();

  // ---------- CSS ----------
  var CSS = [
':host{display:block;background:#fff;color:#141414;font-family:"Pretendard Variable",Pretendard,sans-serif;font-size:16px;letter-spacing:-0.16px;overflow-x:hidden;--ink:#141414;--sub:#555555;--ph:#e9e9e9;--htm-d:.146;--htm-m:.126;--hbm-d:.2;--hbm-m:.18}',
'*{box-sizing:border-box;margin:0;padding:0}',
'a{color:inherit;text-decoration:none}ul{list-style:none}button{font:inherit;color:inherit;letter-spacing:inherit;background:none;border:0;cursor:pointer;text-align:left}',
'.page{background:#fff}',
'.serif{font-family:' + SERIF + ';font-weight:400}',
'.in{padding:0 24px}',
'.sec{margin-top:120px}',
/* header */
'.hd{height:64px;background:#fff}',
'.hd .in{height:64px;display:flex;align-items:center;justify-content:space-between;position:relative}',
'.logo{display:block;width:96px;height:auto;aspect-ratio:535.125/92.438;color:#141414;flex:none}',
'.nav{display:none}',
'.menu{width:22px;height:11px;position:relative;flex:none}.menu i{position:absolute;left:0;width:22px;height:1.5px;background:#141414}.menu i+i{top:9.5px}',
/* hero */
'.hero{padding-top:60px}',
'.hero-top{display:flex;flex-direction:column}',
'.hlead{width:240px;max-width:100%;font-size:20px;line-height:30px;font-weight:600}',
'.hsmall{width:60%;margin-left:auto;font-size:16px;line-height:26px}',
'.hdisp{display:flow-root;margin-top:36px;font-weight:400}',
'.hl{display:block;width:max-content;white-space:nowrap;font-family:' + SERIF + ';font-weight:400;font-size:90px;line-height:.84;letter-spacing:-.02em;--htm:var(--htm-m);--hbm:var(--hbm-m)}',
'.hl:first-child{margin-top:calc(var(--htm) * 1em)}',
'.hl:last-child{margin-bottom:calc(var(--hbm) * 1em + 8px)}',
/* rule + image */
'.rule{height:1px;background:var(--ink)}',
'.img{background-color:var(--ph);background-image:var(--img,none);background-size:cover;background-position:center;background-repeat:no-repeat}',
/* mission */
'.m-body{margin-top:36px}',
'.m-img{width:100%;aspect-ratio:1/1.413;background-image:var(--img-mission,none)}',
'.m-cap{margin-top:10px;font-size:13px;line-height:18px}.m-cap span{display:block}.m-cap .sep{display:none}',
'.m-col{margin-top:105px}',
'.disp{display:block;width:max-content;white-space:nowrap;font-family:' + SERIF + ';font-weight:400;font-size:72px;line-height:.86;letter-spacing:-.01em}',
'.lead{font-size:20px;line-height:30px;font-weight:600}',
'.body{font-size:16px;line-height:26px}.body.sub,.serif.body{color:var(--sub)}',
'.m-col .lead{margin-top:32px}.m-col .body{margin-top:50px}',
/* label rows */
'.lab{font-size:16px;line-height:26px;font-weight:700;margin-bottom:6px}',
'.rules{display:grid;grid-template-columns:1fr;margin-bottom:21px}.rules i{display:block;height:1px;background:var(--ink)}.rules i:nth-child(n+2){display:none}',
/* vision */
'.v-c2{margin-top:32px}.v-c3{margin-top:48px}',
/* grid head */
'.gh{margin-bottom:98px}.gh-b{margin-top:48px;font-size:16px;line-height:26px}',
/* cells */
'.cells{display:grid;grid-template-columns:1fr}',
'.cells::after{content:"";display:block;height:1px;background:var(--ink);grid-column:1/-1}',
'.cell{position:relative;margin-top:1px}',
'.cell::before{content:"";position:absolute;left:0;right:0;top:-1px;height:1px;background:var(--ink)}',
'.vcell{height:220px;display:flex;flex-direction:column;justify-content:space-between;padding:21px 4px;overflow:hidden}',
'.cname{font-size:16px;line-height:25px;font-weight:500}',
'.vkr{font-size:18px;line-height:28px;font-weight:600}.ven{margin-top:10px;font-size:14px;line-height:20px;color:var(--sub)}',
'.scell{padding:21px 4px 24px}',
'.simg{width:100%;aspect-ratio:8/5}',
'.scell .cname{margin-top:20px}',
'.skr{margin-top:10px;font-size:14px;line-height:22px}.sen{margin-top:8px;font-size:13px;line-height:20px;color:var(--sub)}',
'.simg.s1{background-image:var(--img-healthcare,none)}.simg.s2{background-image:var(--img-lifestyle,none)}.simg.s3{background-image:var(--img-creativity,none)}',
/* footer */
'.ft{background:#000;color:#fff;margin-top:120px;padding:40px 0}',
'.fc .fh{display:flex;justify-content:space-between;padding:16px 0;font-size:14px;line-height:20px;color:#fff;border-bottom:1px solid #2a2a2a}',
'.fc ul{display:none}',
'.f-copy{margin-top:40px;font-size:14px;line-height:24px}',
'.f-info{margin-top:16px;font-size:13px;line-height:22px;color:#9d9d9d}',
'.f-priv{display:block;margin-top:10px;font-size:13px;line-height:22px;color:#fff}',
'.sel{display:flex;align-items:flex-start;justify-content:space-between;width:180px;height:40px;margin-top:40px;padding:8px 12px;border:1px solid #3a3a3a;color:#fff;font-size:14px;line-height:24px;position:relative}.sel .chev{position:absolute;right:12px;top:16px}',
'.lockup{margin-top:60px;color:#fff}.lockup .logo{width:100%;color:#fff}',
'.tg{display:block;text-align:center;line-height:1;font-family:' + SERIF + ';font-weight:400;letter-spacing:0;white-space:nowrap;font-size:20px;margin-top:14px}',
/* ---------------- desktop ---------------- */
'@media (min-width:1281px){',
'.in{max-width:1184px;margin:0 auto;padding:0}',
'.sec{margin-top:280px}',
'.logo{width:110px}',
'.nav{display:flex;gap:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:17px;line-height:20px;font-weight:600;white-space:nowrap}',
'.menu{display:none}',
'.hero{padding-top:116px}',
'.hero-top{flex-direction:row;justify-content:space-between;align-items:flex-start}',
'.hlead{width:491px;font-size:23px;line-height:33px}',
'.hsmall{width:261px;margin-left:0}',
'.hdisp{margin-top:0}',
'.hl{font-size:168px;line-height:.8;--htm:var(--htm-d);--hbm:var(--hbm-d)}',
'.hl:last-child{margin-bottom:calc(var(--hbm) * 1em + 40px)}',
'.m-body{margin-top:17px;position:relative;display:grid;grid-template-columns:528px 1fr 284px;align-items:start}',
'.m-img{width:528px;height:746px;aspect-ratio:auto}',
'.m-cap{position:absolute;left:544px;top:0;margin-top:0;writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap}.m-cap span{display:inline}.m-cap .sep{display:inline}',
'.m-col{grid-column:3;margin-top:0;position:relative}',
'.m-col::before{content:"";position:absolute;left:-14px;top:0;width:1px;height:100%;background:var(--ink)}',
'.disp{font-size:90px}',
'.lead{font-size:23px;line-height:33px}',
'.m-col .lead{margin-top:32px}.m-col .body{margin-top:60px}',
'.lab{margin-bottom:6px}',
'.rules{grid-template-columns:repeat(3,1fr);column-gap:24px}.rules i:nth-child(n+2){display:block}',
'.v-cols{display:grid;grid-template-columns:repeat(3,1fr);column-gap:24px;align-items:start}',
'.vision .disp{line-height:.76}',
'.v-c2{margin-top:10px}.v-c3{margin-top:10px}',
'.gh{display:grid;grid-template-columns:804px 380px;justify-content:space-between;align-items:start;margin-bottom:236px}.gh-b{margin-top:10px}',
'.cells{grid-template-columns:repeat(3,1fr)}',
'.cell{margin-top:0}.cell::before{top:0}',
'.cell:not(:nth-child(3n+1))::after{content:"";position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--ink)}',
'.vcell{height:280px;padding:21px 18px}',
'.cname{font-size:15px;line-height:25px;font-weight:600}',
'.scell{padding:21px 18px 24px}',
'.ft{margin-top:180px;padding:0}',
'.f-in{position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:680px;padding-bottom:60px;box-sizing:border-box}',
'.f-cols{position:absolute;left:342px;top:30px;display:flex;gap:24px}',
'.fc{width:170px}.fc .fh{display:block;padding:0;border:0;font-size:14px;line-height:18px;color:#959595;margin-bottom:19px}.fc .sg{display:none}',
'.fc ul{display:block}.fc li{font-size:14px;line-height:24px;color:#ccc}',
'.f-left{position:absolute;left:0;top:0}',
'.f-copy{margin-top:30px}',
'.f-info{margin-top:15px;width:250px;font-size:14px;line-height:24px}',
'.f-priv{margin-top:10px;font-size:14px;line-height:24px}',
'.sel{position:absolute;left:0;top:279px;margin-top:0}',
'.lockup{position:relative;width:100%;margin-top:343px}', /* Family Site 박스 하단 319 + 24, 락업이 크면 푸터가 680보다 늘어난다 (2026-11-04 겹침 수정) */
'}'
  ].join('\n');

  // ---------- 마크업 ----------
  function render() {
    var s = '<div class="page">';
    // header
    s += '<header class="hd"><div class="in">' + wm('logo') + '<nav class="nav">' + T.nav.map(function (n) { return '<a href="#">' + esc(n) + '</a>'; }).join('') + '</nav><div class="menu" aria-label="Menu" role="button"><i></i><i></i></div></div></header>';
    // hero
    s += '<section class="hero"><div class="in"><div class="hero-top"><p class="hlead">' + br(T.hero.lead) + '</p><p class="hsmall">' + br(T.hero.small) + '</p></div>' +
      '<h1 class="hdisp">' + T.hero.display.map(function (l) { return '<span class="hl" data-fit="168" data-fit-m="176,90" data-group="hero">' + esc(l) + '</span>'; }).join('') + '</h1></div></section>';
    // mission
    var m = T.mission;
    s += '<section class="mission"><div class="in"><div class="rule"></div><div class="m-body"><div class="m-img img"></div>' +
      '<p class="m-cap"><span>' + esc(m.caption[0]) + '</span><span class="sep"> / </span><span>' + esc(m.caption[1]) + '</span></p>' +
      '<div class="m-col"><h2 class="disp" data-fit="90" data-fit-m="72">' + esc(m.display) + '</h2><p class="lead">' + esc(m.lead) + '</p><p class="body serif">' + esc(m.body) + '</p></div></div></div></section>';
    // vision
    var v = T.vision;
    s += '<section class="vision sec"><div class="in"><div class="lab">' + esc(v.label) + '</div><div class="rules"><i></i><i></i><i></i></div>' +
      '<div class="v-cols"><div class="v-c1"><h2 class="disp" data-fit="90" data-fit-m="72">' + br(v.display) + '</h2></div><p class="lead v-c2">' + esc(v.lead) + '</p><p class="body serif v-c3">' + esc(v.body) + '</p></div></div></section>';
    // values
    var a = T.values;
    s += '<section class="values sec"><div class="in"><div class="lab">' + esc(a.label) + '</div><div class="rules"><i></i></div>' +
      '<div class="gh"><div class="gh-l"><h2 class="disp" data-fit="90" data-fit-m="72">' + br(a.display) + '</h2></div><p class="gh-b">' + br(a.body) + '</p></div>' +
      '<div class="cells">' + a.cells.map(function (c) {
        return '<div class="cell vcell"><div class="cname">' + esc(c[0]) + '</div><div><p class="vkr">' + esc(c[1]) + '</p><p class="ven serif">' + esc(c[2]) + '</p></div></div>';
      }).join('') + '</div></div></section>';
    // structure
    var b = T.structure;
    s += '<section class="structure sec"><div class="in"><div class="lab">' + esc(b.label) + '</div><div class="rules"><i></i></div>' +
      '<div class="gh"><div class="gh-l"><h2 class="disp" data-fit="90" data-fit-m="72">' + br(b.display) + '</h2></div><p class="gh-b">' + br(b.body) + '</p></div>' +
      '<div class="cells">' + b.cells.map(function (c, i) {
        return '<div class="cell scell"><div class="simg img s' + (i + 1) + '"></div><div class="cname">' + esc(c[0]) + '</div><p class="skr">' + esc(c[1]) + '</p><p class="sen serif">' + esc(c[2]) + '</p></div>';
      }).join('') + '</div></div></section>';
    // footer
    var f = T.footer;
    s += '<footer class="ft"><div class="in f-in"><div class="f-cols">' + f.cols.map(function (c) {
      return '<div class="fc"><div class="fh"><span>' + esc(c[0]) + '</span><i class="sg">' + (c[1].length ? '+' : '↗') + '</i></div>' +
        (c[1].length ? '<ul>' + c[1].map(function (n) { return '<li><a href="#">' + esc(n) + '</a></li>'; }).join('') + '</ul>' : '') + '</div>';
    }).join('') + '</div>' +
      '<div class="f-left"><p class="f-copy">' + esc(f.copy) + '</p><div class="f-info">' + f.info.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') + '</div>' +
      '<a class="f-priv" href="#">' + esc(f.privacy) + '</a><button class="sel" type="button" aria-haspopup="listbox"><span>' + esc(f.family) + '</span>' + CHEV + '</button></div>' +
      '<div class="lockup">' + wm('logo') + '<span class="tg">' + esc(f.tagline) + '</span></div></div></footer>';
    return s + '</div>';
  }

  // ---------- 컴포넌트 ----------
  function injectFonts() {
    if (typeof document === 'undefined') return;
    FONT_LINKS.forEach(function (f) {
      if (document.getElementById(f[0])) return;
      var l = document.createElement('link'); l.id = f[0]; l.rel = 'stylesheet'; l.href = f[1]; document.head.appendChild(l);
    });
  }

  class VdviaHome extends HTMLElement {
    static get observedAttributes() { return ['images']; }
    constructor() {
      super();
      this._ready = false; this._raf = 0; this._lastW = -1;
      this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
      var self = this;
      if (!this._ready) {
        injectFonts();
        this.shadowRoot.innerHTML = '<style>' + CSS + '</style>' + render();
        this._ready = true;
        this._applyImages();
        this._onResize = function () { self._schedule(); };
        window.addEventListener('resize', this._onResize);
        if (typeof ResizeObserver !== 'undefined') {
          this._ro = new ResizeObserver(function () { var w = self.clientWidth; if (w !== self._lastW) { self._lastW = w; self._schedule(); } });
          this._ro.observe(this);
        }
        if (document.fonts) {
          document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', function () { self._schedule(); });
          document.fonts.load("400 100px 'EB Garamond'").catch(function () {});
          document.fonts.load('600 20px "Pretendard Variable"').catch(function () {});
          document.fonts.ready.then(function () { self._schedule(); });
        }
        FONT_LINKS.forEach(function (f) { var l = document.getElementById(f[0]); if (l) l.addEventListener('load', function () { self._schedule(); }); });
      }
      this._layout();
    }
    disconnectedCallback() {
      if (this._onResize) window.removeEventListener('resize', this._onResize);
      if (this._ro) this._ro.disconnect();
      this._ready = false; this._ro = null;
    }
    attributeChangedCallback(name) { if (name === 'images' && this._ready) this._applyImages(); }
    _applyImages() {
      var raw = this.getAttribute('images'); if (!raw) return;
      var o; try { o = JSON.parse(raw); } catch (e) { return; }
      var self = this;
      ['mission', 'healthcare', 'lifestyle', 'creativity'].forEach(function (k) {
        var v = o && o[k]; if (!v) return;
        self.style.setProperty('--img-' + k, /^\s*(url|linear-gradient|image-set)\(/.test(v) ? v : 'url("' + String(v).replace(/"/g, '%22') + '")');
      });
    }
    _schedule() {
      var self = this; clearTimeout(this._t);
      this._t = setTimeout(function () { self._layout(); }, 60);
    }
    // 가라몬드 실제 폰트 메트릭으로 히어로 위아래 보정(em)을 계산
    _calibrate() {
      try {
        var c = document.createElement('canvas').getContext('2d');
        c.font = "400 1000px " + SERIF;
        var mt = c.measureText('H'), asc = mt.fontBoundingBoxAscent, desc = mt.fontBoundingBoxDescent, cap = mt.actualBoundingBoxAscent;
        if (!asc || !cap) return;
        var top = function (lh) { return REF_CAP - ((lh * 1000 - (asc + desc)) / 2 + (asc - cap)) / 1000; };
        var bot = function (lh) { return REF_CAP - (lh * 1000 - ((lh * 1000 - (asc + desc)) / 2 + asc)) / 1000; };
        var st = this.style, r = function (n) { return String(Math.round(n * 10000) / 10000); };
        st.setProperty('--htm-d', r(top(.8))); st.setProperty('--hbm-d', r(bot(.8)));
        st.setProperty('--htm-m', r(top(.84))); st.setProperty('--hbm-m', r(bot(.84)));
      } catch (e) {}
    }
    // fit(): 최대 크기로 시작해 부모 가용 폭을 넘으면 줄인다(최소 8px). 락업 태그라인은 워드마크 폭의 58%.
    _layout() {
      if (!this._ready) return;
      var root = this.shadowRoot, desk = window.matchMedia('(min-width:1281px)').matches, vw = window.innerWidth;
      this._calibrate();
      var els = root.querySelectorAll('[data-fit]'), sizes = [], groups = {}, i;
      for (i = 0; i < els.length; i++) {
        var el = els[i], max;
        if (desk) max = +el.getAttribute('data-fit');
        else { var mm = el.getAttribute('data-fit-m').split(','); max = mm.length > 1 ? (vw >= 768 ? +mm[0] : +mm[1]) : +mm[0]; }
        el.style.fontSize = max + 'px';
        var p = el.parentElement, cs = getComputedStyle(p);
        var avail = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        var w = el.getBoundingClientRect().width, fs = max;
        if (avail > 0 && w > avail) fs = Math.max(8, Math.floor(max * avail / w));
        sizes.push(fs);
        var g = el.getAttribute('data-group');
        if (desk && g) groups[g] = Math.min(groups[g] || 1e9, fs);
      }
      for (i = 0; i < els.length; i++) {
        var gg = els[i].getAttribute('data-group');
        els[i].style.fontSize = ((desk && gg) ? groups[gg] : sizes[i]) + 'px';
      }
      var lk = root.querySelectorAll('.lockup');
      for (i = 0; i < lk.length; i++) {
        var L = lk[i], svg = L.querySelector('.logo'), tg = L.querySelector('.tg'), W = L.clientWidth;
        if (!W) continue;
        tg.style.fontSize = '100px'; tg.style.marginTop = '0';
        var tw = tg.scrollWidth || tg.getBoundingClientRect().width;
        // 인라인 span이 아닌 block이라 폭이 W로 늘어나므로 Range로 글자 폭을 잰다
        var rg = document.createRange(); rg.selectNodeContents(tg); tw = rg.getBoundingClientRect().width;
        var size = Math.max(6, Math.round(100 * (W * 0.58) / tw * 10) / 10);
        tg.style.fontSize = size + 'px';
        var wmH = svg.getBoundingClientRect().height;
        tg.style.marginTop = Math.round(wmH * 0.22 - size * 0.2) + 'px';
      }
    }
  }

  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-home')) customElements.define('vdvia-home', VdviaHome);
})();

/* ---- 윅스에서 쓰는 법 ----
 * 1) 이 파일을 윅스 저장소(solleegraphic/VDVIA) src/public/custom-elements/vdvia-home.js 로 복사해 main에 푸시.
 * 2) 에디터: Add Elements > Embed > Popular Embeds > Custom Element > Choose Source > Velo file > vdvia-home.js, Tag Name = vdvia-home.
 * 3) SEO: 페이지 코드(src/pages/<페이지>.js)에서
 *      import { SEO_HTML } from 'public/vdvia-home-seo.js';   // 아래 SEO_HTML 문자열을 export 하는 모듈(이 파일의 window.VDVIA_HOME_SEO_HTML 값을 복사)
 *      $w.onReady(() => { $w('#customElement1').seoMarkup = SEO_HTML; });
 *    (브라우저에서 이 파일을 <script src>로 불러오면 window.VDVIA_HOME_SEO_HTML 에 같은 문자열이 담긴다. 페이지 코드는 Velo 서버/프런트 모듈 환경이라 window 가 없으므로 공개 폴더 모듈로 한 번 복사해 import 한다.)
 */
