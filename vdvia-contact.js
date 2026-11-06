/* VDVIA Contact 페이지 웹 컴포넌트 <vdvia-contact>  (2026-11-05)
 * 정본: Figma [VDVIA] Design › 'VDVIA Contact EN 1440 (PC)_sol 수정_3' (섹션 1209:2750, 보드 1209:2751). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 1440 기준 헤더(64) 아래 1172: 히어로 440(Get in Touch 39.12 / Contact 94.04, 글상자 위 286, 다른 하위 페이지보다 22 아래인 피그마 그대로)
 *   | Contact 552: 라벨 16/26 Bold, 룰(라벨 위에서 32), 30 아래 두 칸 480 | 112 | 592
 *     왼쪽: 리드 23/33(두 줄) → 24 → 본문 16/26 → 48 → 룰 → 16 → Email, Tel, Office(13/18 #555 → 4 → 16/26, 행 간격 80) → 16 → 룰
 *     오른쪽 폼: Message 16/26 Bold → 24 → First | Last(284 | 24 | 284) → 32 → Email → 32 → Message(4줄 104) → 40 → Send 240x48 1px 테두리
 *     칸 = 라벨 13/18 #555 → 10 → 입력 16/26 → 10 → 1px 룰 | 여백 180
 * 폼: 보내기를 누르면 이벤트 'vdvia-contact-submit'(detail: firstName, lastName, email, message, t = 화면을 연 뒤 ms)를 낸다. 윅스 페이지 코드가 백엔드로 접수한 뒤
 *   이 요소의 status 속성을 'sent' 또는 'error'(뒤에 ':아무값' 허용)로 바꾸면 결과 문구를 보여 준다. 20초 안에 답이 없으면 오류 문구(메일 안내). 숨은 칸(contact_ref)에 값이 있으면 봇으로 보고 보내지 않는다.
 *   데모: demo 속성을 주면 0.6초 뒤 sent로 답한다.
 * 폭(2026-11-06 Sol, 1920, 1440, 1024, 768, 390): 1281 이상 컨테이너 1184 가운데(피그마 그대로). 1024~1280 좌우 48, 768~1023 좌우 32, 같은 배치에서 글자와 여백을 폭에 비례해 줄인다(fv()). 767 이하는 390 배치(폼은 정보 아래로, 이름 두 칸은 세로로, 좌우 29.25), 390보다 좁으면 zoom으로 그대로 줄인다(윅스 모바일 320 포함).
 * 윅스: Custom Element, Server URL = 이 파일, Tag = vdvia-contact, 전체 폭.
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
    "Get in Touch",
    "Contact"
  ],
  "label": "Contact",
  "lead": "For partnerships, products\nand careers, write to us.",
  "body": "Reach us through the contacts below \u2029or the form.",
  "rows": [
    [
      "Email",
      "cs@vdvia.com",
      "mailto:cs@vdvia.com"
    ],
    [
      "Tel",
      "+82 70-7718-5528",
      "tel:+827077185528"
    ],
    [
      "Office",
      "7F, 214 Bongeunsa-ro, Gangnam-gu, Seoul, Korea",
      null
    ]
  ],
  "form": {
    "title": "Message",
    "first": "First Name",
    "last": "Last Name",
    "email": "Email",
    "message": "Message",
    "send": "Send"
  },
  "msg": {
    "sending": "Sending…",
    "sent": "Thank you. Your message has been sent.",
    "error": "Something went wrong. Please email us at cs@vdvia.com.",
    "invalid": "Please fill in First Name, Email and Message.",
    "email": "Please enter a valid email address."
  }
};

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function br(s) { return esc(s).replace(/ ?\u2029/g, ' <br class="m">').replace(/ ?\u2028/g, ' <br class="d">').replace(/ ?\n/g, ' <br>'); }
  function nw(s) { return esc(s).replace(/(\S*-\S*)/g, '<span class="nw">$1</span>'); } /* Gangnam-gu처럼 하이픈 낱말은 줄 끝에서 끊지 않는다 */
  function flat(s) { return String(s).replace(/\s*[\u2028\u2029\n]\s*/g, ' '); }
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
    'a{color:inherit;text-decoration:none}',
    '@media (hover:hover){a:hover{text-decoration:underline;text-underline-offset:3px}}', /* 터치 기기에선 hover가 남아 있지 않게 */
    /* 히어로 */
    '.hero{position:relative;height:' + fv(300, 440) + '}',
    '.ht{position:absolute;left:0;top:' + fv(200, 286) + ';font-weight:400}',
    '.ht span{display:block;white-space:nowrap;letter-spacing:-0.02em}',
    '.ht .l1{font-size:' + fv(24, 39.12) + ';line-height:' + fv(24, 39.12) + ';position:relative;top:' + fv(-1, -2) + '}',
    '.ht .l2{font-size:' + fv(56, 94.04) + ';line-height:' + fv(56, 94.04) + ';position:relative;top:' + fv(6, 10) + '}',
    /* Contact */
    '.contact{min-height:' + fv(480, 552) + '}',
    '.lab,.ftitle{font-weight:700;font-size:16px;line-height:26px;position:relative;top:var(--lab-dy,1px)}',
    '.rule{height:1px;background:#141414}',
    '.m{display:none}',
    '.contact .in > .rule{margin-top:6px}',
    '.two{display:grid;grid-template-columns:minmax(0,480fr) minmax(0,112fr) minmax(0,592fr);margin-top:' + fv(24, 30) + ';align-items:start}',
    '.info{grid-column:1}',
    '.lead{font-weight:600;font-size:' + fv(20, 23) + ';line-height:' + fv(29, 33) + ';position:relative;top:var(--t23-dy,1px)}',
    '.t16{font-size:16px;line-height:26px;position:relative;top:var(--t16-dy,2px)}',
    '.t13{font-size:13px;line-height:18px;color:#555;position:relative;top:var(--t13-dy,1px)}',
    '.intro{margin-top:' + fv(16, 24) + '}',
    '.info .rule.r1{margin-top:' + fv(32, 48) + '}',
    '.rows{margin-top:16px}',
    '.rows dd{margin-top:4px;--t16-dy:1px}', /* 값 줄은 피그마 대조로 1px(소개 줄은 2px) */
    '.nw{white-space:nowrap}',
    '.rows dd + dt{margin-top:32px}',
    '.info .rule.r2{margin-top:16px}',
    /* 폼 */
    '.form{grid-column:3}',
    '.frow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:24px;margin-top:24px}',
    '.field{display:block;position:relative}',
    '.flabel{display:block}', /* label은 기본이 inline이라 부모 줄높이 26을 따라간다 */
    '.field.bad .flabel{color:#b42318}',
    '.f-email,.f-msg{margin-top:32px}',
    '.finput{display:block;width:100%;height:46px;margin:0;padding:10px 0;border:0;border-radius:0;background:transparent;outline:none;font-family:inherit;font-size:16px;line-height:26px;letter-spacing:-0.16px;color:#141414;-webkit-appearance:none;appearance:none}',
    'textarea.finput{height:124px;resize:none;overflow:auto}', /* 글 104 + 위아래 10(누를 수 있는 영역을 칸 전체로) */
    '.fline{height:1px;background:#141414}',
    '.field:focus-within .fline{box-shadow:0 1px 0 #141414}', /* 두께만 2px처럼, 배치는 그대로 */
    '.field.bad .fline{background:#b42318;box-shadow:0 1px 0 #b42318}',
    '.send-row{display:flex;align-items:center;gap:24px;margin-top:40px}',
    '.send{flex:none;width:240px;height:48px;padding:0;border:1px solid #141414;border-radius:0;background:transparent;color:#141414;font-family:inherit;font-weight:600;font-size:16px;line-height:16px;letter-spacing:-0.16px;cursor:pointer;-webkit-appearance:none;appearance:none}',
    '.send span{position:relative;top:var(--send-dy,1px)}',
    '@media (hover:hover){.send:hover{background:#141414;color:#fff}}',
    '.send:focus-visible{background:#141414;color:#fff;outline:none}',
    '.send[disabled]{opacity:.45;cursor:default;background:transparent;color:#141414}',
    '.status{min-height:18px}',
    '.status.err{color:#b42318}',
    '.hp{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}', /* 봇용 숨은 칸: 화면 밖으로 빼지 않고 잘라 숨긴다 */
    '.hp label,.hp input{display:block;width:1px;height:1px;padding:0;border:0}',
    '.gap{height:' + fv(110, 180) + '}',
    '@media (max-width:1280.98px){.in{max-width:none;margin:0 48px}.intro,.rows dd{text-wrap:pretty}}',
    '@media (max-width:1023.98px){.in{margin:0 32px}}',
    '@media (max-width:1100.98px){.d{display:none}}',
    /* 1000 이하: 결과 문구를 버튼 아래 한 줄로, 자리를 미리 잡아 두어 문구가 나와도 화면이 밀리지 않게 */
    '@media (max-width:1000.98px){.send-row{flex-wrap:wrap;column-gap:24px;row-gap:16px}.status{flex:1 1 100%;min-height:36px}}',
    /* 767 이하: 390 배치 */
    '@media (max-width:767.98px){',
    '.in{margin:0 29.25px}',
    '.hero{height:auto;padding:200px 0 40px}',
    '.ht{position:static}',
    '.ht .l1{font-size:24px;line-height:28.5px;letter-spacing:0;top:0}',
    '.ht .l2{font-size:58px;line-height:55.5px;letter-spacing:-1.0725px;top:0;margin-top:23px}',
    '.lab,.ftitle{font-size:19.5px;line-height:31.6875px;letter-spacing:-.195px;top:0}',
    '.contact .in > .rule{margin-top:6.7px}',
    '.m{display:inline}',
    '.contact{min-height:0}',
    '.two{display:block;margin-top:25.8px}',
    '.lead{font-size:21.5px;line-height:30.5px;letter-spacing:-.195px;top:0}',
    '.t16{font-size:18px;line-height:26px;letter-spacing:-.195px;top:0}',
    '.t13{font-size:14px;line-height:21.9375px;letter-spacing:-.195px;top:0}',
    '.intro{margin-top:39.8px}',
    '.info .rule.r1{margin-top:57.7px;background:rgba(20,20,20,.3)}',
    '.rows{margin-top:29.5px}',
    '.rows dd{margin-top:5px}',
    '.rows dd + dt{margin-top:41.8px}',
    '.info .rule.r2{margin-top:41.8px;background:rgba(20,20,20,.3)}',
    '.form{margin-top:128px}',
    '.frow{display:block;margin-top:25.8px}',
    '.frow .field + .field,.f-email,.f-msg{margin-top:39px}',
    '.finput{height:52px;padding:13px 0;font-size:18px;line-height:26px;letter-spacing:-.195px}',
    'textarea.finput{height:130px}',
    '.send-row{margin-top:48.75px}',
    '.send{width:100%;height:48.8px;font-size:18px;line-height:18px;letter-spacing:-.195px}',
    '.gap{height:75.5px}',
    '}',
    ZOOM,
    MOTION_CSS
  ].join('\n');

  function html(D) {
    var F = D.form;
    var field = function (cls, id, label, input) { return '<div class="field ' + cls + '"><label class="flabel t13" for="' + id + '">' + esc(label) + '</label>' + input + '<div class="fline" aria-hidden="true"></div></div>'; };
    return '<style>' + CSS + '</style><div lang="en">' +
      '<section class="hero"><div class="in" style="position:relative;height:100%"><h1 class="ht serif">' + mk('l1 d6', esc(D.hero[0])) + ' ' + mk('l2 d8', esc(D.hero[1])) + '</h1></div></section>' +
      '<section class="contact rv"><div class="in"><p class="lab">' + esc(D.label) + '</p><div class="rule" role="presentation"></div>' +
      '<div class="two"><div class="info"><p class="lead">' + br(D.lead) + '</p><p class="t16 intro">' + br(D.body) + '</p><div class="rule r1" role="presentation"></div>' +
      '<dl class="rows">' + D.rows.map(function (r) { return '<dt class="t13">' + esc(r[0]) + '</dt><dd class="t16">' + (r[2] ? '<a href="' + esc(r[2]) + '">' + nw(r[1]) + '</a>' : nw(r[1])) + '</dd>'; }).join('') + '</dl>' +
      '<div class="rule r2" role="presentation"></div></div>' +
      '<form class="form" novalidate aria-label="Contact form"><p class="ftitle" id="vc-ftitle">' + esc(F.title) + '</p>' +
      '<div class="frow">' + field('f-first', 'vc-first', F.first, '<input class="finput" id="vc-first" name="firstName" type="text" autocomplete="given-name" autocapitalize="words" enterkeyhint="next" maxlength="80" required aria-required="true">') +
      field('f-last', 'vc-last', F.last, '<input class="finput" id="vc-last" name="lastName" type="text" autocomplete="family-name" autocapitalize="words" enterkeyhint="next" maxlength="80">') + '</div>' +
      field('f-email', 'vc-email', F.email, '<input class="finput" id="vc-email" name="email" type="email" autocomplete="email" inputmode="email" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="next" maxlength="160" required aria-required="true">') +
      field('f-msg', 'vc-msg', F.message, '<textarea class="finput" id="vc-msg" name="message" rows="4" maxlength="4000" required aria-required="true"></textarea>') +
      '<div class="hp" aria-hidden="true"><label for="vc-ref">Leave this field empty</label><input id="vc-ref" name="contact_ref" type="text" tabindex="-1" autocomplete="off"></div>' +
      '<div class="send-row"><button class="send" type="submit"><span>' + esc(F.send) + '</span></button><p class="status t13" id="vc-status" role="status" aria-live="polite"></p></div>' +
      '</form></div></div></section><div class="gap" aria-hidden="true"></div></div>';
  }

  class VdviaContact extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); this._timer = null; this._t0 = Date.now(); this._sent = false; }
    static get observedAttributes() { return ['status']; }
    connectedCallback() {
      fitOn(this);
      injectFonts();
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = html(DATA);
      this._mo = motionOn(this.shadowRoot);
      var self = this, form = this.shadowRoot.querySelector('form');
      form.addEventListener('submit', function (e) { e.preventDefault(); self._submit(); });
      form.addEventListener('input', function (e) { var f = e.target.closest('.field'); if (f && f.classList.contains('bad')) { f.classList.remove('bad'); e.target.removeAttribute('aria-invalid'); e.target.removeAttribute('aria-describedby'); } if (self._sent) { self._sent = false; self._say(''); } });
    }
    disconnectedCallback() { fitOff(); if (this._mo) this._mo.disconnect(); }
    attributeChangedCallback(name, oldV, v) { if (name === 'status' && this.shadowRoot.firstChild) this._result(v); }
    _say(text, err) { var s = this.shadowRoot.querySelector('.status'); s.textContent = text || ''; s.classList.toggle('err', !!err); }
    _submit() {
      var r = this.shadowRoot, M = DATA.msg, q = function (id) { return r.getElementById(id); };
      if (this._busy) return;
      var v = { firstName: q('vc-first').value.trim(), lastName: q('vc-last').value.trim(), email: q('vc-email').value.trim(), message: q('vc-msg').value.trim() };
      var bad = [];
      if (!v.firstName) bad.push('f-first');
      if (!v.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) bad.push('f-email');
      if (!v.message) bad.push('f-msg');
      r.querySelectorAll('.field').forEach(function (f) { var isBad = bad.some(function (b) { return f.classList.contains(b); }), inp = f.querySelector('.finput'); f.classList.toggle('bad', isBad); if (isBad) { inp.setAttribute('aria-invalid', 'true'); inp.setAttribute('aria-describedby', 'vc-status'); } else { inp.removeAttribute('aria-invalid'); inp.removeAttribute('aria-describedby'); } });
      if (bad.length) { this._say(bad.length === 1 && bad[0] === 'f-email' && v.email ? M.email : M.invalid, true); var first = r.querySelector('.field.bad .finput'); if (first) first.focus(); return; }
      if (q('vc-ref').value) { this._result('sent'); return; } /* 봇: 보낸 척만 */
      v.t = Date.now() - this._t0; /* 화면을 연 뒤 걸린 시간(백엔드가 너무 빠른 접수를 봇으로 본다) */
      this._busy = true; r.querySelector('.send').disabled = true; this._say(M.sending);
      this.removeAttribute('status');
      var self = this;
      clearTimeout(this._timer);
      this._timer = setTimeout(function () { self._result('error'); }, 20000);
      this.dispatchEvent(new CustomEvent('vdvia-contact-submit', { detail: v, bubbles: true, composed: true }));
      if (this.hasAttribute('demo')) setTimeout(function () { self.setAttribute('status', 'sent'); }, 600);
    }
    _result(v) {
      v = String(v || '').split(':')[0]; /* 페이지 코드는 'sent:시각'처럼 매번 다른 값을 줄 수 있다(같은 값이면 변경 알림이 안 오므로) */
      if (v !== 'sent' && v !== 'error') return;
      var r = this.shadowRoot, M = DATA.msg;
      clearTimeout(this._timer); this._busy = false; r.querySelector('.send').disabled = false;
      if (v === 'sent') { r.querySelector('form').reset(); this._say(M.sent); this._sent = true; } else this._say(M.error, true);
    }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    window.VDVIA_CONTACT_SEO_HTML = '<h1>' + esc(DATA.hero.join(' ')) + '</h1><p>' + esc(flat(DATA.lead)) + '</p><p>' + esc(flat(DATA.body)) + '</p><dl>' +
      DATA.rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>';
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-contact')) customElements.define('vdvia-contact', VdviaContact);
})();
