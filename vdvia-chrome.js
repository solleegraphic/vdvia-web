/* VDVIA 헤더, 푸터 웹 컴포넌트 <vdvia-header> <vdvia-footer>  (2026-11-04)
 * 정본: Figma [VDVIA] Design › 'VDVIA Home 1440 (PC)_sol 수정_1'(1173:966) 의 Header 1173:968 + Footer 1173:1089 (락업 = 1194:2 흰색 SVG).
 *       헤더 로고(2026-11-05): 수정_2, 수정_3 헤더의 'VDVIA lockup (black svg)' = 검은 락업 110×35.7, #000.
 *       세로 위치는 Sol 조정본(Home EN 수정_3 1209:2278) x128 y22: 락업 윗선 = 메뉴 글줄 윗선(22), VDVIA 글자가 메뉴와 같은 높이, 태그라인은 그 아래.
 *       메뉴(2026-11-05, Sol "메뉴부터 통일"): 수정_3 헤더 Nav 1209:2303 = Company, Brand, What is Different, News, Contact (간격 50, 가운데),
 *       푸터 1209:2405 = 열 5개 x 470+168n 170폭, 회사 정보 콜론 앞 띄어쓰기 없음.
 *       모바일(≤1280)은 ../_build/figma_home_build.js 의 header()/footerMob() 390 스펙.
 * 링크 규칙(Sol 2026-11-04): 로고 = Company = 홈(/). 나머지는 vdvia.com 기존 페이지 주소.
 * 빌드 도구 없음, 바닐라 ES2017, 외부 의존성은 Pretendard Variable CDN 하나.
 * 윅스: 헤더/푸터 컨테이너에 Custom Element(Server URL = 이 파일) 를 넣고 태그 이름을 vdvia-header / vdvia-footer 로.
 */
(function () {
  'use strict';

  // ---------- 링크 (data-* 없이 바꾸려면 요소의 links 속성에 JSON: {"company":"/","brand":"/brands", ...}) ----------
  var LINKS = {
    home: '/', company: '/', brand: '/services-1', wid: '/what-is-difference', contact: '/contact-8',
    mission: '', vision: '', coreValue: '', structure: '', /* 옛 페이지로 가서 링크 뺌(Sol 2026-11-06). 값을 넣으면 다시 링크가 된다 */
    lemonderma: '/services-1', xomage: '/services-1', news: '/news', privacy: ''
  };
  var NAV = [['Company', 'company'], ['Brand', 'brand'], ['What is Different', 'wid'], ['News', 'news'], ['Contact', 'contact']];
  var FOOTER = {
    copy: '© 2026 VDVIA',
    info: ['Company: VDVIA Co., Ltd.', 'CEO: Seung Hwan Lee', 'HQ: 5F, 18 Apgujeong-ro 28-gil, Gangnam-gu, Seoul, Korea', 'Business Registration No.: 331-86-01800'],
    privacy: 'Privacy Policy', family: 'Family Site',
    familySites: [['ZISHEL', 'https://www.zishel.com'], ['Lemonderma', 'https://www.lemonderma.co.kr']],
    cols: [
      ['Company', 'company', [['Mission', 'mission'], ['Vision', 'vision'], ['Core Value', 'coreValue'], ['Structure', 'structure']]],
      ['Brand', 'brand', [['Lemonderma', 'lemonderma'], ['ZISHEL XOMAGE COSMETICS', 'xomage']]],
      ['What is Different', 'wid', []],
      ['News', 'news', []],
      ['Contact', 'contact', []]
    ]
  };

  var FONT_LINKS = [ // 헤더, 푸터는 Pretendard만 쓴다(세리프 없음, 락업은 SVG). 가라몬드 kit은 홈 컴포넌트가 따로 넣는다.
    ['vdvia-font-pretendard', 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css']
  ];

  // 락업 (비디비아_로고_black.svg = _white.svg 같은 모양: 워드마크 + a ZISHEL company 아웃라인, 가이드 rect와 숨긴 레이어 제거, 색은 currentColor)
  // 헤더는 검정(#000), 푸터는 흰색. 폭만 주면 높이는 viewBox 비율(0.3246)로 정해진다: 110 → 35.7, 96 → 31.2
  var LOCKUP_PATHS = '<polyline points="29.94 7.34 33.69 0 41.91 0 38.15 7.34 20.96 41.09 3.76 7.34 0 0 8.22 0 11.97 7.34 20.96 24.95"/><polygon points="237.86 41.09 229.64 41.09 225.89 33.75 216.9 16.14 207.92 33.75 204.17 41.09 195.95 41.09 199.71 33.75 216.9 0 234.1 33.75 237.86 41.09"/><path d="M79.62.06c11.33,0,20.54,9.16,20.54,20.49,0,5.05-1.82,9.69-4.87,13.27-.35.41-.76.82-1.17,1.23-3.7,3.76-8.81,6.05-14.44,6.05h-20.54V0l20.49.06ZM66.41,33.81h13.21c7.28,0,13.21-5.93,13.21-13.21s-5.93-13.21-13.21-13.21h-13.21v26.41Z"/><polygon points="145.95 0 154.17 0 133.21 41.09 112.26 0 120.48 0 133.21 24.95 145.95 0"/><rect x="171.71" y="0" width="7.34" height="41.09"/><path d="M51.81,67.85v-1.75c0-.41-.07-.7-.2-.86-.13-.17-.38-.25-.72-.25-.29,0-.54.06-.75.17-.21.11-.32.24-.32.38.01.03.02.07.03.1.01.03.04.07.08.11.2.25.3.48.3.68,0,.3-.11.56-.33.77-.22.21-.5.32-.83.32s-.61-.1-.82-.28c-.21-.19-.32-.43-.32-.72,0-.57.3-1.02.89-1.35s1.41-.5,2.44-.5c1.99,0,2.98.54,2.98,1.62v4.64c0,.24.11.35.33.35.16,0,.35-.1.56-.3l.13.23-.25.35c-.34.35-.82.53-1.44.53-.49,0-.87-.1-1.14-.31-.27-.2-.47-.54-.62-1.02-.33.45-.67.76-1.01.95-.42.26-.87.38-1.36.38-.58,0-1.04-.17-1.41-.5-.36-.33-.55-.76-.55-1.28,0-.24.04-.47.13-.7.09-.24.21-.43.37-.59.23-.22.58-.43,1.04-.61.34-.13.66-.23.95-.29.29-.06.74-.13,1.35-.22l.49-.05ZM51.81,69.78v-1.62c-.43,0-.78.06-1.08.17-.29.12-.5.27-.62.46-.17.22-.25.54-.25.95,0,.46.08.81.24,1.07s.38.39.65.39.54-.14.75-.42c.21-.28.31-.62.31-1.01Z"/><path d="M59.92,71.91v-.43l6.11-11.23h-2.6c-.29,0-.59.08-.9.25s-.59.39-.82.66c-.24.28-.41.53-.52.78-.11.24-.22.61-.33,1.09h-.4l.15-3.13h8.56v.38l-6.11,11.27h2.53c.93,0,1.69-.35,2.28-1.03.27-.35.47-.68.6-1.02.13-.33.25-.82.37-1.46h.4l-.2,3.86h-9.11Z"/><path d="M70.47,71.91v-.35h1.45v-11.31h-1.45v-.35h5.7v.35h-1.45v11.31h1.45v.35h-5.7Z"/><path d="M77.57,68.57h.33l.13.36c.39.96.82,1.65,1.29,2.05.48.41,1.09.61,1.85.61s1.45-.23,1.99-.68c.54-.45.81-1.01.81-1.66,0-.96-.71-1.64-2.11-2.03l-1.75-.48c-.63-.19-1.14-.44-1.52-.76-.69-.54-1.03-1.37-1.03-2.5s.34-1.99,1.02-2.68c.68-.7,1.56-1.04,2.64-1.04.51,0,.95.07,1.32.2s.82.4,1.37.8l.52-.78h.35v3.15h-.35c-.04-.21-.09-.39-.13-.55-.08-.22-.13-.38-.15-.47-.22-.55-.6-1.02-1.14-1.41-.54-.39-1.09-.58-1.66-.58s-1.04.17-1.48.52c-.24.19-.44.4-.59.65s-.22.48-.22.72c0,.37.13.7.38.98.26.29.6.48,1.03.59l1.86.46c.38.1.7.21.97.33.27.12.52.26.77.44.43.32.79.78,1.08,1.36.28.58.42,1.17.42,1.77s-.15,1.21-.45,1.86c-.3.65-.66,1.16-1.1,1.52-.3.25-.68.45-1.14.6-.46.14-.95.22-1.46.22-.57,0-1.02-.07-1.37-.2s-.82-.42-1.41-.87l-.62.88h-.33l-.12-3.35Z"/><path d="M86.72,71.91v-.35h1.45v-11.31h-1.45v-.35h5.6v.35h-1.35v5.31h3.85v-5.31h-1.37v-.35h5.61v.35h-1.45v11.31h1.45v.35h-5.61v-.35h1.37v-5.65h-3.85v5.65h1.35v.35h-5.6Z"/><path d="M100.36,71.91v-.35h1.45v-11.31h-1.45v-.35h9.39l.18,3.28h-.33c-.14-.7-.38-1.27-.7-1.72-.57-.81-1.27-1.21-2.12-1.21h-2.18v5.43h.27c.16,0,.3,0,.44,0,.14,0,.35-.05.63-.13s.52-.26.71-.55c.15-.2.27-.41.33-.65.07-.23.12-.59.17-1.07h.35v5.15h-.35c-.04-.44-.1-.78-.16-1.01s-.16-.45-.29-.66c-.32-.51-.89-.76-1.7-.76h-.4v5.56h2.22c.39,0,.8-.12,1.22-.35s.79-.54,1.09-.91c.22-.3.39-.59.51-.86.12-.27.25-.71.39-1.31h.28l-.15,3.78h-9.81Z"/><path d="M111.56,71.91v-.35h1.45v-11.31h-1.45v-.35h5.7v.35h-1.45v11.31h1.82c1.07,0,1.85-.32,2.37-.97.24-.31.43-.61.55-.91s.28-.83.47-1.6h.32l-.18,3.83h-9.58Z"/><path d="M133.01,69.55l.32.1c-.23.61-.46,1.07-.69,1.37s-.53.55-.92.74c-.46.24-1.03.37-1.73.37-1.13,0-2.06-.35-2.79-1.04-.73-.69-1.09-1.58-1.09-2.65s.38-1.99,1.15-2.72c.77-.72,1.74-1.08,2.92-1.08.79,0,1.45.2,2,.58.54.39.82.87.82,1.45,0,.32-.12.59-.35.8-.23.21-.53.32-.88.32s-.64-.11-.88-.33c-.24-.22-.37-.49-.37-.81,0-.24.05-.42.17-.55l.4-.38.05-.17c0-.11-.07-.21-.22-.3-.23-.19-.5-.28-.8-.28s-.55.08-.76.23-.34.35-.41.57c-.07.22-.11.57-.11,1.03v1.65l-.05.32c0,.44.01.81.03,1.08s.05.55.1.82c.09.4.26.69.52.87.26.17.62.26,1.08.26s.9-.13,1.28-.38c.29-.19.51-.41.67-.65s.35-.64.56-1.2Z"/><path d="M134.38,68.37c0-1.07.38-1.96,1.15-2.68.77-.72,1.71-1.08,2.83-1.08s1.98.37,2.73,1.1c.76.73,1.13,1.62,1.13,2.67s-.39,1.91-1.16,2.65c-.77.74-1.7,1.11-2.77,1.11s-2-.37-2.76-1.1c-.76-.73-1.15-1.62-1.15-2.66ZM136.95,68.05v.28c0,.87.02,1.49.05,1.87.03.38.08.67.15.88.15.5.53.75,1.13.75s1-.25,1.16-.75c.07-.22.12-.57.16-1.05.04-.48.06-1.07.06-1.76,0-.74-.02-1.31-.05-1.71-.03-.39-.09-.71-.17-.96-.18-.48-.53-.72-1.07-.72-.58,0-.96.2-1.15.61s-.28,1.26-.28,2.56Z"/><path d="M143.07,71.91v-.35h1.1v-6.35h-1.1v-.35h3.43v1.55c.12-.29.24-.5.34-.64.1-.14.27-.3.49-.48.53-.44,1.15-.65,1.83-.65.48,0,.89.11,1.23.33.19.12.35.27.47.44s.25.41.38.75l.48-.68c.48-.56,1.16-.83,2.07-.83.64,0,1.15.16,1.51.48s.55.78.55,1.37v5.06h1.1v.35h-4.5v-.35h.97v-5.61c-.02-.13-.1-.24-.23-.33-.13-.09-.28-.13-.45-.13-.45,0-.81.2-1.09.6-.28.4-.42.94-.42,1.6v3.88h.98v.35h-4.38v-.35h.97v-5.66c-.03-.28-.26-.41-.67-.41-.46,0-.84.21-1.12.63s-.43.98-.43,1.67v3.78h1v.35h-4.53Z"/><path d="M157.38,76.96v-.35h1.1v-11.39h-1.1v-.35h3.43v1.2c.03-.07.1-.17.2-.32.06-.08.11-.16.17-.25.21-.24.49-.44.84-.6.35-.16.7-.24,1.04-.24.88,0,1.61.36,2.22,1.07.6.72.9,1.59.9,2.63s-.32,1.91-.96,2.65-1.4,1.12-2.27,1.12c-.39,0-.76-.08-1.09-.25-.39-.2-.72-.54-.97-1.03v5.74h1.13v.35h-4.63ZM162.39,71.6c.39,0,.67-.16.83-.48.17-.31.25-.86.25-1.62v-2.05c0-.64-.02-1.09-.07-1.32-.04-.24-.14-.45-.3-.63-.19-.22-.41-.33-.68-.33-.39,0-.74.24-1.07.72-.32.48-.48,1.02-.48,1.59v1.73c0,.67.15,1.23.44,1.69.29.46.65.69,1.07.69Z"/><path d="M171.74,67.85v-1.75c0-.41-.07-.7-.2-.86-.13-.17-.37-.25-.72-.25-.29,0-.54.06-.76.17-.21.11-.32.24-.32.38.01.03.02.07.03.1s.04.07.09.11c.2.25.3.48.3.68,0,.3-.11.56-.33.77-.22.21-.5.32-.83.32s-.61-.1-.82-.28-.32-.43-.32-.72c0-.57.3-1.02.89-1.35s1.41-.5,2.44-.5c1.99,0,2.98.54,2.98,1.62v4.64c0,.24.11.35.33.35.16,0,.35-.1.56-.3l.13.23-.25.35c-.34.35-.82.53-1.44.53-.49,0-.87-.1-1.14-.31-.27-.2-.48-.54-.62-1.02-.33.45-.67.76-1.01.95-.42.26-.87.38-1.36.38-.58,0-1.04-.17-1.41-.5s-.55-.76-.55-1.28c0-.24.04-.47.13-.7.09-.24.21-.43.37-.59.23-.22.58-.43,1.04-.61.35-.13.66-.23.95-.29s.74-.13,1.35-.22l.48-.05ZM171.74,69.78v-1.62c-.42,0-.78.06-1.07.17-.29.12-.5.27-.62.46-.17.22-.25.54-.25.95,0,.46.08.81.24,1.07s.37.39.65.39.54-.14.75-.42c.21-.28.31-.62.31-1.01Z"/><path d="M176.16,71.91v-.35h1.1v-6.35h-1.1v-.35h3.43v1.63c.13-.33.26-.59.39-.77.13-.17.3-.35.52-.52.49-.37,1.06-.57,1.72-.57.3,0,.61.05.93.15.24.06.48.17.7.36.22.18.37.37.44.56.07.19.11.46.11.8v5.05h1.09v.35h-4.5v-.35h.98v-5.24c0-.22-.02-.39-.08-.49s-.15-.2-.28-.28c-.13-.08-.27-.11-.41-.11-.22,0-.46.11-.7.33-.25.22-.44.48-.59.81s-.22.67-.22,1.05v3.95h.98v.35h-4.51Z"/><path d="M185.44,65.22v-.35h4.56v.35h-1.08l1.81,4.08,1.6-4.08h-1.42v-.35h2.81v.35h-1.02l-4.03,10.07c-.52,1.28-1.15,1.92-1.88,1.92-.33,0-.61-.11-.84-.33-.23-.22-.34-.49-.34-.81,0-.3.12-.57.35-.82.24-.24.5-.37.8-.37.2,0,.35.03.46.1.11.07.25.22.42.45.04.07.08.11.11.13.03.02.07.04.11.07.09,0,.18-.07.27-.19.09-.12.19-.31.28-.56l1.09-2.81-3.23-6.87h-.81Z"/>';
  function lockup(cls) { return '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.86 77.21" fill="currentColor" role="img" aria-label="VDVIA, a ZISHEL company">' + LOCKUP_PATHS + '</svg>'; }
  var CHEV = '<svg class="chev" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M0.4 0.4 L5 5 L9.6 0.4"/></svg>';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function injectFonts() {
    if (typeof document === 'undefined') return;
    FONT_LINKS.forEach(function (f) {
      if (document.getElementById(f[0])) return;
      var l = document.createElement('link'); l.id = f[0]; l.rel = 'stylesheet'; l.href = f[1]; document.head.appendChild(l);
    });
  }
  function readLinks(el) {
    var o = {}, k; for (k in LINKS) o[k] = LINKS[k];
    var raw = el.getAttribute('links'); if (raw) { try { var j = JSON.parse(raw); for (k in j) o[k] = j[k]; } catch (e) {} }
    return o;
  }
  var BASE_CSS = [
    ':host{display:block;font-family:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;letter-spacing:-0.16px;line-height:1.5;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}',
    '*{box-sizing:border-box;margin:0;padding:0}',
    'a{color:inherit;text-decoration:none}ul{list-style:none}button{font:inherit;color:inherit;letter-spacing:inherit;background:none;border:0;cursor:pointer;text-align:left}',
    'a:focus-visible,button:focus-visible{outline:1px solid currentColor;outline-offset:3px}',
    '.in{padding:0 24px}',
    '@media (min-width:1281px){.in{max-width:1184px;margin:0 auto;padding:0}}'
  ].join('\n');

  // ======================= 헤더 =======================
  var HEADER_CSS = BASE_CSS + '\n' + [
    ':host{background:#fff;color:#141414}',
    '.hd{height:64px;background:#fff}',
    '.hd .in{height:64px;display:flex;align-items:center;justify-content:space-between;position:relative}',
    '.logo{display:block;width:96px;flex:none;color:#000;align-self:flex-start;margin-top:24px}.logo svg{display:block;width:100%;height:auto}', /* 세로 가운데가 아니라 VDVIA 글자를 메뉴 버튼 높이에 (모바일 24, 1440 22 = 피그마) */
    '.nav{display:none}',
    '.menu{width:22px;height:11px;position:relative;flex:none;padding:0}.menu i{position:absolute;left:0;top:0;width:22px;height:1.5px;background:#141414}.menu i+i{top:9.5px}',
    '@media (min-width:1281px){',
    '.logo{width:110px;margin-top:22px}',
    '.nav{display:flex;gap:50px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:17px;line-height:20px;font-weight:600;white-space:nowrap}',
    '.nav a:hover{opacity:.6}',
    '.menu{display:none}',
    '}'
  ].join('\n');
  // 모바일 메뉴 오버레이는 윅스 컨테이너의 overflow/transform 영향을 받지 않도록 document.body 에 붙인다 (light DOM)
  var MNAV_CSS = '#vdvia-mnav{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483000;background:#fff;color:#141414;font-family:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:-0.16px;-webkit-font-smoothing:antialiased;overflow:auto}' +
    '#vdvia-mnav *{box-sizing:border-box;margin:0;padding:0}#vdvia-mnav a{color:inherit;text-decoration:none}#vdvia-mnav ul{list-style:none}' +
    '#vdvia-mnav .bar{height:64px;padding:0 24px;display:flex;align-items:center;justify-content:space-between}' +
    '#vdvia-mnav .logo{display:block;width:96px;color:#000;align-self:flex-start;margin-top:24px}#vdvia-mnav .logo svg{display:block;width:100%;height:auto}' +
    '#vdvia-mnav .x{width:22px;height:22px;position:relative;background:none;border:0;cursor:pointer;padding:0}#vdvia-mnav .x i{position:absolute;left:0;top:10px;width:22px;height:1.5px;background:#141414;transform:rotate(45deg)}#vdvia-mnav .x i+i{transform:rotate(-45deg)}' +
    '#vdvia-mnav nav{padding:24px 24px 40px}#vdvia-mnav nav a{display:block;padding:14px 0;font-size:22px;line-height:32px;font-weight:600;border-bottom:1px solid #e9e9e9}' +
    '#vdvia-mnav nav a:first-child{border-top:1px solid #141414}';

  class VdviaHeader extends HTMLElement {
    static get observedAttributes() { return ['links']; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); this._open = false; }
    connectedCallback() { injectFonts(); this._render(); }
    disconnectedCallback() { this._closeMenu(); }
    attributeChangedCallback() { if (this.shadowRoot.firstChild) this._render(); }
    _render() {
      var L = readLinks(this), self = this;
      var nav = NAV.map(function (n) { return '<a href="' + esc(L[n[1]]) + '">' + esc(n[0]) + '</a>'; }).join('');
      this.shadowRoot.innerHTML = '<style>' + HEADER_CSS + '</style>' +
        '<header class="hd"><div class="in"><a class="logo" href="' + esc(L.home) + '" aria-label="VDVIA Home">' + lockup('lk') + '</a>' +
        '<nav class="nav" aria-label="Main">' + nav + '</nav>' +
        '<button class="menu" type="button" aria-label="Menu" aria-expanded="false"><i></i><i></i></button></div></header>';
      this.shadowRoot.querySelector('.menu').addEventListener('click', function () { self._openMenu(); });
    }
    _openMenu() {
      if (this._open) return;
      var L = readLinks(this), self = this;
      if (!document.getElementById('vdvia-mnav-style')) { var st = document.createElement('style'); st.id = 'vdvia-mnav-style'; st.textContent = MNAV_CSS; document.head.appendChild(st); }
      var d = document.createElement('div'); d.id = 'vdvia-mnav'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Menu');
      d.innerHTML = '<div class="bar"><a class="logo" href="' + esc(L.home) + '" aria-label="VDVIA Home">' + lockup('lk') + '</a><button class="x" type="button" aria-label="Close"><i></i><i></i></button></div>' +
        '<nav aria-label="Main">' + NAV.map(function (n) { return '<a href="' + esc(L[n[1]]) + '">' + esc(n[0]) + '</a>'; }).join('') + '</nav>';
      document.body.appendChild(d);
      this._mnav = d; this._open = true;
      this._prevOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow = 'hidden';
      d.querySelector('.x').addEventListener('click', function () { self._closeMenu(); });
      this._onKey = function (e) { if (e.key === 'Escape') self._closeMenu(); };
      document.addEventListener('keydown', this._onKey);
      this.shadowRoot.querySelector('.menu').setAttribute('aria-expanded', 'true');
      d.querySelector('.x').focus();
    }
    _closeMenu() {
      if (!this._open) return;
      if (this._mnav && this._mnav.parentNode) this._mnav.parentNode.removeChild(this._mnav);
      document.documentElement.style.overflow = this._prevOverflow || '';
      document.removeEventListener('keydown', this._onKey);
      this._open = false; this._mnav = null;
      var b = this.shadowRoot.querySelector('.menu'); if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); }
    }
  }

  // ======================= 푸터 =======================
  var FOOTER_CSS = BASE_CSS + '\n' + [
    ':host{background:#000;color:#fff}',
    '.ft{background:#000;color:#fff}',
    /* 모바일 (figma_home_build.js footerMob: 40/24 패딩, 행 16/16 + 룰 #2a2a2a, 40, ©, 16, 정보 13/22, 10, 개인정보, 40, 셀렉트, 60, 락업) */
    '.f-in{padding:40px 24px}',
    '.fh{display:flex;justify-content:space-between;align-items:center;padding:16px 0;font-size:14px;line-height:20px;color:#fff;border-bottom:1px solid #2a2a2a}',
    '.fh a{flex:1}.fh .sg{flex:none;width:24px;height:20px;line-height:20px;text-align:right;font-size:14px;color:#fff;padding:0}',
    '.fc ul{display:none;padding:8px 0 12px;border-bottom:1px solid #2a2a2a}.fc.open ul{display:block}.fc li a,.fc li .tx{display:block;font-size:14px;line-height:24px;color:#ccc;padding:2px 0}',
    '.f-copy{margin-top:40px;font-size:14px;line-height:24px}',
    '.f-info{margin-top:16px;font-size:13px;line-height:22px;color:#9d9d9d}',
    '.f-priv{display:block;margin-top:10px;font-size:13px;line-height:22px;color:#fff}',
    '.fam{position:relative;margin-top:40px;width:180px}',
    '.sel{display:flex;align-items:center;justify-content:space-between;width:180px;height:40px;padding:8px 12px;border:1px solid #3a3a3a;color:#fff;font-size:14px;line-height:24px}',
    '.sel .chev{flex:none;transition:transform .15s;transform-origin:50% 50%;transform-box:fill-box}.fam.open .sel .chev{transform:rotate(180deg)}',
    '.fam-list{display:none;position:absolute;left:0;top:40px;width:180px;background:#000;border:1px solid #3a3a3a;border-top:0;z-index:5}.fam.open .fam-list{display:block}',
    '.fam-list a{display:block;padding:8px 12px;font-size:14px;line-height:24px;color:#ccc}.fam-list a:hover{color:#fff;background:#141414}',
    '.lockup{display:block;width:100%;max-width:592px;margin:60px auto 0;color:#fff}.lockup svg{display:block;width:100%;height:auto}',
    /* 데스크톱 (Figma 수정_3 1209:2405: 680 높이, © 128/30, 정보 250폭 69, 개인정보 223, 셀렉트 279 180×40, 열 5개 x 470+168n 170폭(2px 겹침), 락업 592 가운데 하단 60) */
    '@media (min-width:1281px){',
    '.f-in{position:relative;height:680px;padding:0}',
    '.f-left{position:absolute;left:0;top:30px;width:250px}',
    '.f-copy{margin-top:0}',
    '.f-info{margin-top:15px;font-size:14px;line-height:24px}',
    '.f-priv{margin-top:10px;font-size:14px;line-height:24px}',
    '.fam{margin-top:32px}', /* 수정_3: 개인정보 아래 32 (셀렉트 y279) */
    '.f-cols{position:absolute;left:342px;top:30px;display:flex;gap:0}',
    '.fc{width:170px}.fc+.fc{margin-left:-2px}',
    '.fh{display:block;padding:0;border:0;font-size:14px;line-height:18px;color:#959595;margin-bottom:19px}.fh .sg{display:none}',
    '.fc ul,.fc.open ul{display:block;padding:0;border:0}.fc li a,.fc li .tx{padding:0;font-size:14px;line-height:24px;color:#ccc}.fc li a:hover{color:#fff}',
    '.lockup{position:absolute;left:50%;bottom:60px;width:592px;margin:0;transform:translateX(-50%)}',
    '}'
  ].join('\n');

  class VdviaFooter extends HTMLElement {
    static get observedAttributes() { return ['links']; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { injectFonts(); this._render(); }
    disconnectedCallback() { if (this._onDoc) document.removeEventListener('click', this._onDoc); }
    attributeChangedCallback() { if (this.shadowRoot.firstChild) this._render(); }
    _render() {
      var L = readLinks(this), F = FOOTER, self = this;
      var cols = F.cols.map(function (c) {
        var has = c[2].length > 0;
        return '<div class="fc"><div class="fh"><a href="' + esc(L[c[1]]) + '">' + esc(c[0]) + '</a>' +
          (has ? '<button class="sg" type="button" aria-expanded="false" aria-label="' + esc(c[0]) + ' submenu">+</button>' : '<a class="sg" href="' + esc(L[c[1]]) + '" aria-hidden="true" tabindex="-1">↗</a>') + '</div>' +
          (has ? '<ul>' + c[2].map(function (s) { return '<li>' + (L[s[1]] ? '<a href="' + esc(L[s[1]]) + '">' + esc(s[0]) + '</a>' : '<span class="tx">' + esc(s[0]) + '</span>') + '</li>'; }).join('') + '</ul>' : '') + '</div>';
      }).join('');
      var priv = L.privacy ? '<a class="f-priv" href="' + esc(L.privacy) + '">' + esc(F.privacy) + '</a>' : '<span class="f-priv">' + esc(F.privacy) + '</span>';
      var fam = '<div class="fam"><button class="sel" type="button" aria-haspopup="true" aria-expanded="false"><span>' + esc(F.family) + '</span>' + CHEV + '</button>' +
        '<div class="fam-list" role="menu">' + F.familySites.map(function (s) { return '<a role="menuitem" href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a>'; }).join('') + '</div></div>';
      this.shadowRoot.innerHTML = '<style>' + FOOTER_CSS + '</style>' +
        '<footer class="ft"><div class="in f-in"><div class="f-cols">' + cols + '</div>' +
        '<div class="f-left"><p class="f-copy">' + esc(F.copy) + '</p><div class="f-info">' + F.info.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') + '</div>' + priv + fam + '</div>' +
        '<a class="lockup" href="' + esc(L.home) + '" aria-label="VDVIA, a ZISHEL company">' + lockup('lk') + '</a></div></footer>';
      var root = this.shadowRoot;
      // 모바일 아코디언
      root.querySelectorAll('.fc .sg[aria-expanded]').forEach(function (b) {
        b.addEventListener('click', function () { var fc = b.closest('.fc'), o = fc.classList.toggle('open'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); b.textContent = o ? '−' : '+'; });
      });
      // Family Site 드롭다운
      var fam = root.querySelector('.fam'), sel = root.querySelector('.sel');
      sel.addEventListener('click', function (e) { e.stopPropagation(); var o = fam.classList.toggle('open'); sel.setAttribute('aria-expanded', o ? 'true' : 'false'); });
      if (this._onDoc) document.removeEventListener('click', this._onDoc);
      this._onDoc = function () { fam.classList.remove('open'); sel.setAttribute('aria-expanded', 'false'); };
      document.addEventListener('click', this._onDoc);
      root.addEventListener('keydown', function (e) { if (e.key === 'Escape') self._onDoc(); });
    }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    window.VDVIA_HEADER_SEO_HTML = '<nav><a href="' + LINKS.home + '">VDVIA</a>' + NAV.map(function (n) { return '<a href="' + LINKS[n[1]] + '">' + esc(n[0]) + '</a>'; }).join('') + '</nav>';
    window.VDVIA_FOOTER_SEO_HTML = '<footer><p>' + esc(FOOTER.copy) + '</p>' + FOOTER.info.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') + '<ul>' +
      FOOTER.cols.map(function (c) { return '<li><a href="' + LINKS[c[1]] + '">' + esc(c[0]) + '</a>' + (c[2].length ? '<ul>' + c[2].map(function (s) { return '<li>' + (LINKS[s[1]] ? '<a href="' + LINKS[s[1]] + '">' + esc(s[0]) + '</a>' : esc(s[0])) + '</li>'; }).join('') + '</ul>' : '') + '</li>'; }).join('') + '</ul><p>VDVIA, a ZISHEL company</p></footer>';
  }

  if (typeof customElements !== 'undefined') {
    if (!customElements.get('vdvia-header')) customElements.define('vdvia-header', VdviaHeader);
    if (!customElements.get('vdvia-footer')) customElements.define('vdvia-footer', VdviaFooter);
  }
})();
