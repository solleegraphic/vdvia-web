/* VDVIA What is Different 페이지 웹 컴포넌트 <vdvia-wid>  (2026-11-05)
 * 정본: Figma [VDVIA] Design › 'VDVIA What is Different EN 1440 (PC)_sol 수정_3' (섹션 1209:2629, 보드 1209:2630). 문구는 피그마에서 노드 아이디로 자동 추출.
 * 배치는 News 페이지(vdvia-news.js)와 같다. 1440 기준 헤더(64) 아래 1978:
 *   히어로 440: What is 39.12 / Different 94.04, Adobe Garamond 400, 줄높이 100%, 자간 -2%, 글상자 위 264
 *   소개: 룰(위에서 10, 라벨 Difference는 2026-11-10 Sol 지시로 지우고 제목에서 선까지 거리를 Contact와 같게), 리드 23/33 SemiBold 480폭 + 본문 16/26 592폭(x 720), 룰 아래 30
 *   여백 200 → Three Differences(1281 이상 82/89, Sol 11/08 규칙) → 첫 룰
 *   행(2026-11-10 Sol 1920 보드 'VDVIA What is Different 1920 (PC)_20261110_수정' 1269:2357의 Differences 부분):
 *     룰 → 40 → 이미지 틀 1184 x 565(컨테이너 폭, 세로 이미지 1744 x 2336을 폭에 맞춰 넣고 틀로 자름) → 64 → 번호 16/19 180폭 가운데 | 제목 23/33 SemiBold 478폭 | 설명 16/23 #555 478폭 → 49 → 룰
 *     번호, 제목, 설명은 첫 줄 기준선을 맞춘다(보드에서 번호 10, 설명 6 내려 맞춘 것 = align-items:baseline). 큰 제목 기준선 → 첫 룰은 보드대로 약 82(이전 155.5).
 *     보드의 세 행 간격이 조금씩 달라(룰 → 이미지 37, 44, 42, 이미지 → 글 64, 57, 66) 평균에 가까운 40, 64로 통일. 보드의 이미지 왼쪽 7 들여쓰기(x 375, 폭 1177)는 컨테이너 폭 1184로 읽었다.
 *   이미지 움직임(2026-11-10 Sol, 같은 날 C 세워 두기 → B 빠르게 → 자동 이동 순으로 바꿈): 기본은 자동 이동. 스크롤과 상관없이 사진이 틀 안에서 천천히 오르내린다(autoOn, 보드의 자리에서 출발, 검은 여백만 보이는 끝은 건너뜀). B(스크롤 따라 지나가기)와 C(세워 두기)는 보관해 두었고 주소에 ?pan=fast, ?pan=hold를 붙이거나 속성 pan으로 켠다(panOpt). 움직임 줄이기, 에디터 미리보기, 인쇄에서는 보드의 자리(--fc = 틀 가운데에 오는 이미지 높이 %)에 고정.
 * 폭(2026-11-06 Sol, 1920, 1440, 1024, 768, 390): 1281 이상 컨테이너 1184 가운데(피그마 그대로). 1024~1280 좌우 48, 768~1023 좌우 32, 같은 배치에서 글자와 여백을 폭에 비례해 줄인다(fv()). 767 이하는 390 배치(좌우 29.25), 390보다 좁으면 zoom으로 그대로 줄인다(윅스 모바일 320 포함).
 * 768 이하(윅스 모바일 320 포함): News 모바일 규칙을 따른다. Three Differences는 320에서도 한 줄에 들어가게 폭 비례로 줄인다. 피그마에 모바일 보드가 없어 Claude가 정한 값.
 *   모바일 행은 Sol Home 390 보드의 Structure 칸과 같은 순서와 값: 룰 → 29.5 → 이미지 331.5 x 207 → 25 → 번호 → 25 → 제목 → 12.3 → 설명 → 41.8 → 룰.
 * 사진 3장(wid_science, wid_data, wid_global, 각 1744 x 2336과 폭 1000 사본)은 Sol이 피그마에 넣은 원본(1316:2, 1316:3, 1316:97)을 JPEG로 바꾼 것. 기본 주소 IMG_BASE, 속성 img-base로 바꾼다.
 * 글 안 U+2028(피그마 Shift+Enter)은 1101 이상에서만 줄바꿈, 그 아래는 공백. 줄바꿈 문자(Enter)는 항상 줄바꿈.
 * 윅스: Custom Element, Server URL = 이 파일, Tag = vdvia-wid, 전체 폭. 폰트 링크는 document.head에 한 번만(다른 컴포넌트와 같은 id).
 */
(function () {
  'use strict';
  var SERIF = "'adobe-garamond-pro','Adobe Garamond Pro','EB Garamond',Garamond,serif";
  var SANS = '"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,sans-serif';
  var IMG_BASE = 'https://solleegraphic.github.io/vdvia-web/img/';
  var FONT_LINKS = [
    ['vdvia-font-pretendard', 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'],
    ['vdvia-font-garamond', 'https://use.typekit.net/cle2qyf.css']
  ];
  var DATA = {
  "hero": [
    "What is",
    "Different"
  ],
  "lead": "A bio company stands \u2028behind every brand we build.",
  "body": "VDVIA is a subsidiary of Zishel, a Korean regenerative-medicine company \u2028founded in 2008. Zishel researches and produces the active ingredients. \nVDVIA builds the brands and takes them to the world. That parent company is what makes us different.",
  "display": "Three\nDifferences",
  "items": [
    [
      "I",
      "Science at the source.",
      "Our exosomes come from Zishel’s own patented platform, produced in its aseptic GMP facility. The science is invented and made inside our group.",
      { "img": "wid_science", "fc": 52.64, "c": [0, 0.668], "alt": "Microscopic view of exosome vesicles beside a cell" }
    ],
    [
      "II",
      "Decided by data, \nexecuted by AI.",
      "VDVIA runs on a proprietary AI operating system we built in-house. It reads market data and consumer response across every market in real time, and carries every decision through to execution, from content and advertising to daily operations. We decide on evidence, not instinct, and move before the market does.",
      { "img": "wid_data", "fc": 63.38, "c": [0.382, 0.946], "alt": "A glowing processor chip with rising data charts above a circuit board" }
    ],
    [
      "III",
      "From research to retail, \nin one group.",
      "Zishel’s technology reaches 46+ countries through more than 59 partners. VDVIA turns that technology into brands and brings them directly to consumers worldwide. Between research and the market, there is no distance.",
      { "img": "wid_global", "fc": 53.67, "c": [0.206, 0.963], "alt": "Earth at night with connection lines radiating from Korea" }
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
    '}@media print{.rv{opacity:1!important}.mk .mi{transform:none!important}.fig .fimg{top:50%!important;transform:translate3d(0,calc(var(--fc,50%) * -1),0)!important}.hold{height:auto!important}.stick{position:static!important}}';
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
  /* 이미지 팬(2026-11-10 Sol "스크롤 시 위에서 아래로 이미지가 프레임 속에서 이동해, 이미지 전체가 보이도록").
     세로 이미지(틀 높이의 약 2.8배)가 틀 안에서 움직인다. 움직임 줄이기, 에디터 미리보기에서는 켜지 않아 CSS의 고정 자리(--fc)가 남는다.
     같은 날 세 번 바뀌었다: C 세워 두기를 먼저 라이브에 올림 → Sol "C로 막상 해보니 그렇게 좋아보이지 않습니다" → B 빠르게 → Sol "자동으로 이미지가 이동하게 해줄래요? 이 시안은 킵하겠습니다" → 자동 이동.
     기본은 자동 이동(auto)이고, B(fast)와 C(hold)는 지우지 않고 둔다. 방식은 panOpt가 고른다(주소의 ?pan=, 요소 속성 pan).
       자동 이동(auto, 기본)  스크롤과 상관없이 사진이 틀 안에서 천천히 오르내린다(autoOn).
       지나가기(B, fast)  틀이 화면을 지나가는 동안 이미지가 틀 안에서 아래로 내려간다(들어올 때 이미지 아래쪽, 나갈 때 위쪽).
         틀이 온전히 보이는 구간이 이동 거리보다 길면 그 구간에서 전부 지나가고(모바일 약 0.37배), 짧으면 틀이 화면 가운데를 지나는 동안 틀 안 속도 최대 1.75배로 한 번에 지나가 가운데 80~90%가 나온다.
         (제약: 이미지 아래 끝(위 끝)은 틀 아랫선(윗선)이 화면 안에 있을 때만 보인다. 데스크톱은 틀(565)이 창 높이의 절반을 넘어 스크롤로는 전체를 다 보이기 어렵다. 900 창에서 틀이 온전히 보이는 구간 335, 이동 거리 1021)
       세워 두기(C, hold)  768 이상에서 행(틀과 글)을 화면에 세워 두고(sticky) 스크롤만큼 이미지가 틀 안에서 위로 올라가 위에서 아래 순서로 전부 지나간 뒤 행이 다시 올라간다. 행마다 스크롤이 이동 거리 / 1.25만큼 길어진다.
         자리: 행을 화면 가운데에. 창이 낮아 행이 다 안 들어오면 위 여백 16에 세우고 글 아래쪽은 이미지가 지나간 뒤 올라온다. 틀이 작아 지나가는 동안 다 보이는 창과 틀도 안 들어오는 창(틀 + 32 미만)은 세우지 않고 지나가기로 둔다 */
  var PASS_K = 1.75, HOLD_K = 1.25, HOLD_MIN = 16;
  /* 방식 고르기. 주소의 ?pan=이 먼저(보관한 시안을 라이브에서 바로 보려고: fast = B, hold = C), 다음이 요소 속성 pan, 없으면 auto.
     자동 이동의 빠르기와 범위도 같은 식으로: ?sec=(맨 위에서 맨 아래까지 가는 빠르기를 초로, 3~120) 또는 속성 pan-sec, ?full=1(검은 여백 끝까지) 또는 속성 pan-full */
  function panOpt(el) {
    var q = null; try { q = new URLSearchParams(window.location.search); } catch (e) { }
    var get = function (k, attr) { return (q && q.get(k)) || el.getAttribute(attr) || ''; };
    var mode = get('pan', 'pan'), sec = parseFloat(get('sec', 'pan-sec')), full = get('full', 'pan-full');
    return { mode: mode === 'fast' || mode === 'hold' ? mode : 'auto', sec: sec >= 3 && sec <= 120 ? sec : 0, full: full === '1' || full === 'true' };
  }
  /* 자동 이동(2026-11-10 Sol "자동으로 이미지가 이동하게"). Web Animations로 transform만 움직여 스크롤과 따로 돈다.
     범위: 사진 세 장 모두 위나 아래가 검은 여백이라(둘째 사진 맨 위는 틀 전체가 검다) 끝까지 가면 빈 틀이 오래 보인다. 사진마다 그림이 있는 줄의 처음과 끝(data-c, 이미지 높이 대비)을 재 두고,
       틀 높이의 20%까지만 여백이 들어오는 자리에서 돌아선다. 그림이 있는 줄은 전부 지나간다. full이면 맨 위에서 맨 아래까지.
     시작: 보드의 자리(--fc)에서, 먼저 사진이 아래로 내려가는 쪽으로. 끝에서 천천히 멈췄다가 되돌아온다(사인 곡선에 가까운 가감속, 끝없이 왕복).
     빠르기: 맨 위에서 맨 아래까지 sec초(768 이상 20, 767 이하 10)에 가는 빠르기로 세 장이 같다. 범위가 짧은 사진은 그만큼 일찍 돌아선다.
     틀이 절반 이상 보이면 움직이고(행이 나타난 뒤라 보드의 자리가 먼저 보인다) 화면 밖으로 다 나가면 멈춘다(다시 들어오면 멈춘 자리에서 잇는다).
     열어 둔 채 움직임 줄이기를 켜면 고정 자리로 돌아간다. 멈춤 버튼은 없다(계속 움직이는 그림에 멈춤 수단을 두라는 WCAG 2.2.2에는 못 미친다, Sol 결정 사항) */
  var IMG_R = 2336 / 1744, FRAME_R = [565 / 1184, 224 / 358.67], AUTO_SEC = [20, 10], AUTO_GAP = 0.2, AUTO_SEEN = 0.5; /* 사진 세로/가로, 틀 세로/가로(768 이상, 767 이하: CSS의 aspect-ratio와 같은 값) */
  function autoOn(rows, opt) {
    if (!window.IntersectionObserver || !rows[0].fig.firstElementChild.animate) return null;
    var mq = window.matchMedia('(max-width:767.98px)'), rm = window.matchMedia('(prefers-reduced-motion:reduce)'), dead = false;
    var build = function () {
      if (dead) return;
      if (rm.matches) { rows.forEach(function (o) { if (o.anim) { o.anim.cancel(); o.anim = null; } o.fig.classList.remove('auto'); }); return; }
      var k = mq.matches ? 1 : 0, f = FRAME_R[k] / IMG_R, full = 1 - f, sec = opt.sec || AUTO_SEC[k]; /* f = 틀 높이 / 이미지 높이, 자리는 틀 윗선이 이미지의 어디에 오는지(0 ~ full) */
      rows.forEach(function (o) {
        var img = o.fig.firstElementChild, c = (o.fig.getAttribute('data-c') || '0,1').split(','), fc = parseFloat(o.fig.getAttribute('data-fc')) / 100 || 0.5;
        var A = opt.full ? 0 : Math.max(0, +c[0] - AUTO_GAP * f), B = opt.full ? full : Math.min(full, +c[1] + AUTO_GAP * f - f);
        if (o.anim) { o.anim.cancel(); o.anim = null; }
        if (!(B > A + 0.01)) { o.fig.classList.remove('auto'); return; } /* 움직일 범위가 없으면 고정 자리 그대로 */
        var p0 = (Math.min(B, Math.max(A, fc - f / 2)) - A) / (B - A), t0 = Math.acos(1 - 2 * p0) / Math.PI; /* 보드의 자리가 범위의 어디인지, 사인 곡선에서 그 자리에 오는 때 */
        o.fig.classList.add('auto');
        o.anim = img.animate([{ transform: 'translate3d(0,' + (-A * 100).toFixed(3) + '%,0)' }, { transform: 'translate3d(0,' + (-B * 100).toFixed(3) + '%,0)' }],
          { duration: Math.max(3, sec * (B - A) / full) * 1000, iterations: Infinity, direction: 'alternate-reverse', iterationStart: 1 - t0, easing: 'cubic-bezier(.37,0,.63,1)' }); /* 거꾸로 먼저: 보드의 자리에서 위쪽 끝(A)으로, 사진은 아래로 내려간다 */
        if (!o.fig.classList.contains('go')) o.anim.pause();
      });
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var o = rows.filter(function (r) { return r.fig === e.target; })[0];
        if (e.intersectionRatio >= AUTO_SEEN) { e.target.classList.add('go'); if (o && o.anim) o.anim.play(); }
        else if (!e.isIntersecting) { e.target.classList.remove('go'); if (o && o.anim) o.anim.pause(); }
      });
    }, { threshold: [0, AUTO_SEEN] });
    build();
    rows.forEach(function (o) { io.observe(o.fig); });
    [mq, rm].forEach(function (m) { if (m.addEventListener) m.addEventListener('change', build); else if (m.addListener) m.addListener(build); }); /* 틀 비율과 빠르기는 767을 넘나들 때, 켜고 끄기는 움직임 줄이기 설정이 바뀔 때 */
    return function () { dead = true; io.disconnect(); [mq, rm].forEach(function (m) { if (m.removeEventListener) m.removeEventListener('change', build); else if (m.removeListener) m.removeListener(build); }); rows.forEach(function (o) { if (o.anim) { o.anim.cancel(); o.anim = null; } }); };
  }
  /* 세워 두기는 가장 가까운 스크롤 조상이 창일 때만 된다. 윅스가 감싼 상자 중 하나라도 overflow가 걸려 있으면(예: overflow:clip을 모르는 브라우저의 hidden) 늘린 스크롤만 빈 채로 남으므로 세우지 않는다 */
  function canStick(el) {
    if (!(window.CSS && window.CSS.supports && window.CSS.supports('position', 'sticky'))) return false; /* 이 파일 안의 CSS는 스타일 문자열이라 window.CSS로 부른다 */
    var de = document.documentElement, cs = getComputedStyle(de), bodyIsView = cs.overflowX === 'visible' && cs.overflowY === 'visible'; /* html이 visible이면 body의 overflow는 창의 것 */
    for (var n = el.parentNode; n; n = n.parentNode || n.host) {
      if (n.nodeType !== 1 || n === de || (n === document.body && bodyIsView)) continue;
      cs = getComputedStyle(n);
      if (/auto|scroll|hidden|overlay/.test(cs.overflowX + ' ' + cs.overflowY)) return false;
    }
    return true;
  }
  function panOn(root, opt) {
    var rows = [].slice.call(root.querySelectorAll('.row')).map(function (row) { return { row: row, fig: row.querySelector('.fig'), hold: row.querySelector('.hold'), stick: row.querySelector('.stick') }; }).filter(function (o) { return o.fig; });
    var live = window.self === window.top && window.requestAnimationFrame && window.matchMedia('(prefers-reduced-motion:no-preference)').matches;
    if (!live || !rows.length) return null;
    if (opt.mode === 'auto') return autoOn(rows, opt);
    var mode = opt.mode, raf = 0, dead = false, lw = 0, lh = 0, wide = window.matchMedia('(min-width:768px)'), coarse = window.matchMedia('(pointer:coarse)');
    var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
    var setup = function () { /* 창 크기에 맞춰 세워 둘 자리와 길이를 다시 잡는다 */
      var vh = window.innerHeight, pin = mode === 'hold' && wide.matches && canStick(rows[0].hold);
      rows.forEach(function (o) { o.fh = o.fig.offsetHeight; o.tr = o.fig.firstElementChild.offsetHeight - o.fh; o.bh = o.stick.offsetHeight; }); /* 먼저 전부 재고 나서 고친다 */
      rows.forEach(function (o) {
        var ok = pin && o.tr > vh - o.fh && vh >= o.fh + HOLD_MIN * 2; /* 지나가는 동안 다 못 보이는 틀만, 틀이 온전히 들어오는 창에서 세운다 */
        o.D = ok ? Math.round(o.tr / HOLD_K) : 0; o.T = ok ? Math.max(HOLD_MIN, Math.round((vh - o.bh) / 2)) : 0;
        o.row.classList.toggle('hd', ok); o.hold.style.height = ok ? (o.bh + o.D) + 'px' : ''; o.stick.style.top = ok ? o.T + 'px' : '';
      });
    };
    var all = true; /* 처음과 크기가 바뀐 뒤에는 멀리 있는 틀도 제자리에 둔다 */
    var draw = function () {
      raf = 0;
      var vh = window.innerHeight, every = all; all = false;
      rows.forEach(function (o) {
        var r = o.fig.getBoundingClientRect();
        if (!every && (r.bottom < -vh || r.top > vh * 2)) return; /* 멀리 있는 틀은 건너뛴다 */
        var img = o.fig.firstElementChild, travel = img.offsetHeight - o.fig.offsetHeight; /* zoom이 걸려도 둘 다 같은 좌표계 */
        if (travel <= 0) return;
        var y;
        if (o.D) y = -travel * clamp((o.T - o.hold.getBoundingClientRect().top) / o.D); /* 세워 둔 동안 위 → 아래 */
        else {
          var tv = travel * r.height / o.fig.offsetHeight; /* 화면 기준 이동 거리 */
          var L = Math.min(vh + r.height, Math.max(vh - r.height, tv / PASS_K)); /* 이동에 쓰는 스크롤 길이, 틀이 화면 가운데일 때가 중간 */
          y = -travel * (1 - clamp((vh - r.top - (vh + r.height - L) / 2) / L));
        }
        img.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
      });
    };
    var req = function () { if (!raf && !dead) raf = requestAnimationFrame(draw); };
    var relayout = function () { if (dead) return; lw = window.innerWidth; lh = window.innerHeight; setup(); all = true; req(); };
    var resize = function () { /* 터치 기기는 스크롤 중 주소창이 접히며 높이만 조금 바뀐다. 그때 자리를 다시 잡으면 세워 둔 틀이 튀므로 그대로 둔다 */
      if (coarse.matches && window.innerWidth === lw && Math.abs(window.innerHeight - lh) < 120) { all = true; req(); return; }
      relayout();
    };
    var ro = window.ResizeObserver ? new ResizeObserver(relayout) : null; /* 글꼴이 늦게 와 줄 수가 바뀌거나 창은 그대로인데 호스트 폭만 바뀌어도 행 높이에 맞춰 다시 잡는다(행 크기는 여기서 안 바꾸므로 되돌이 없음) */
    rows.forEach(function (o) { o.fig.classList.add('pan'); o.fig.firstElementChild.addEventListener('load', relayout); if (ro) ro.observe(o.stick); });
    window.addEventListener('scroll', req, { passive: true }); window.addEventListener('resize', resize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
    lw = window.innerWidth; lh = window.innerHeight; setup(); draw();
    return function () { dead = true; if (ro) ro.disconnect(); window.removeEventListener('scroll', req); window.removeEventListener('resize', resize); if (raf) cancelAnimationFrame(raf); };
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
    '.intro .in{padding-top:' + fv(18, 10) + '}', /* 라벨을 지운 뒤 제목 기준선에서 선까지 거리를 Contact와 같게(Contact 제목이 768에서 14, 1280 이상에서 22 아래에 있어 라벨 자리 32에서 그만큼 뺐다), 2026-11-10 Sol */
    '.rule{height:1px;background:#141414}',
    '.two{display:grid;grid-template-columns:minmax(0,480fr) minmax(0,112fr) minmax(0,592fr);margin-top:' + fv(24, 30) + '}',
    /* Pretendard 실측 보정(피그마 대비): 23/33은 1px, 16/26은 2px 아래로. 배치에는 영향 없음 */
    '.lead{grid-column:1;font-weight:600;font-size:' + fv(20, 23) + ';line-height:' + fv(29, 33) + ';position:relative;top:var(--t23-dy,1px)}',
    '.body{grid-column:3;font-size:16px;line-height:26px;position:relative;top:var(--t16-dy,2px)}',
    '.gap1{height:' + fv(120, 200) + '}',
    /* 행 */
    '.disp{font-size:' + fv(54, 90) + ';line-height:' + fv(46, 77) + ';letter-spacing:-0.01em;position:relative;top:' + fv(-3, -5) + '}',
    '.rows{list-style:none;margin-top:' + fv(27, 75) + '}', /* 큰 제목 → 첫 룰: Sol 11/10 보드에서 절반으로 줄었다(기준선 기준 155.5 → 약 78). 폭별 비율은 기존 그대로 */
    '.row:first-child{border-top:1px solid #141414}', /* 윗줄도 첫 칸과 함께 나타나게(자리는 그대로) */
    '.row{padding:' + fv(26, 40) + ' 0 ' + fv(32, 49) + ';border-bottom:1px solid #141414}', /* 룰 → 이미지 40, 글 → 룰 49 */
    /* 이미지 틀: 컨테이너 폭, 1184 x 565 비율. 세로 이미지는 폭에 맞추고 틀이 자른다. 고정 자리는 이미지의 --fc 지점이 틀 가운데에 오게 */
    '.fig{position:relative;overflow:hidden;aspect-ratio:1184/565;background:#0b0b0b}',
    '.fimg{position:absolute;left:0;top:50%;display:block;width:100%;height:auto;transform:translate3d(0,calc(var(--fc,50%) * -1),0)}',
    '.fig.pan .fimg,.fig.auto .fimg{top:0;will-change:transform}', /* pan = 스크롤 따라(B, C), auto = 자동 이동. 움직임은 panOn, autoOn이 transform으로 */
    '.row.hd .stick{position:sticky}', /* 세워 두기(pan="hold"일 때만): 자리(top)와 길이(.hold 높이)는 panOn이 창 크기에 맞춰 넣는다 */
    /* 글 줄: 번호 | 제목 | 설명, 첫 줄 기준선을 맞춘다(Sol 11/10 보드) */
    '.rt{display:grid;grid-template-columns:minmax(0,180fr) ' + fv(32, 24) + ' minmax(0,478fr) ' + fv(32, 24) + ' minmax(0,478fr);align-items:baseline;margin-top:' + fv(42, 64) + '}',
    '.num{grid-column:1;font-size:16px;line-height:19px;text-align:center;position:relative;top:var(--t23-dy,1px)}', /* 첫 열 가운데, 제목과 같은 1px 보정 */
    '.ttl{grid-column:3;font-weight:600;font-size:' + fv(19, 23) + ';line-height:' + fv(27, 33) + ';position:relative;top:var(--t23-dy,1px)}',
    '.desc{grid-column:5;font-size:16px;line-height:26px;color:#555;position:relative;top:var(--t16-dy,2px)}',
    '.gap2{height:' + fv(110, 180) + '}',
    /* 1024~1280 좌우 48, 768~1023 좌우 32: 같은 배치. 피그마가 줄을 정한 1281 이상은 그대로 두고 그 아래만 마지막 줄 한 단어 방지 */
    '@media (max-width:1280.98px){.in{max-width:none;margin:0 48px}.lead,.body,.desc{text-wrap:pretty}}',
    '@media (max-width:1023.98px){.in{margin:0 32px}}',
    /* U+2028 강제 줄바꿈은 글 열이 충분히 넓은 1101 이상에서만(News와 같음) */
    '@media (max-width:1100.98px){.d{display:none}}',
    /* 1281 이상: Sol 1920 Home 수정본의 규칙 */
    '@media (min-width:1281px){',
    '.ht .l1{top:-5px}.ht .l2{top:17.4px}',
    '.disp{font-size:82px;line-height:89px;letter-spacing:0;top:-9px}',
    '.lead{letter-spacing:0}',
    '.body{line-height:23px;letter-spacing:0}',
    '.rows{margin-top:47.5px}',
    '.row:first-child{border-top-color:rgba(20,20,20,.3)}',
    '.row{border-bottom-color:rgba(20,20,20,.3)}',
    '.desc{line-height:23px}',
    '.gap2{height:162px}',
    '}',
    /* 1024~1280: Sol 1024 Home 수정본의 규칙 */
    '@media (min-width:1024px) and (max-width:1280.98px){',
    '.ht .l1{top:' + fw(-3.5, -5) + '}.ht .l2{top:' + fw(17, 17.4) + '}',
    '.disp{font-size:' + fw(72, 82) + ';line-height:' + fw(76, 89) + ';letter-spacing:' + fw(-0.72, 0) + ';top:' + fw(-8, -9) + '}',
    '.lead{line-height:' + fw(29, 33) + ';letter-spacing:' + fw(-0.16, 0) + '}',
    '.body{line-height:' + fw(24, 23) + ';letter-spacing:' + fw(-0.16, 0) + '}',
    '.rows{margin-top:' + fw(51, 47.5) + '}',
    '.row:first-child{border-top-color:rgba(20,20,20,.3)}',
    '.row{border-bottom-color:rgba(20,20,20,.3)}',
    '.desc{line-height:23px}',
    '.gap2{height:' + fw(120.5, 162) + '}',
    '}',
    /* 768~1023: Sol 768 Home 수정본의 규칙 */
    '@media (min-width:768px) and (max-width:1023.98px){',
    '.ht .l1{top:-.5em}.ht .l2{top:3px}',
    '.disp{top:-6px}',
    '.disp{line-height:1.05556}',
    '.rows{margin-top:' + fv(27, 75) + '}',
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
    '.disp{font-size:55.5px;line-height:64px;letter-spacing:-.585px;top:0}',
    '.rows{margin-top:57.7px}',
    '.row:first-child{border-top:1px solid rgba(20,20,20,.3)}',
    '.row{padding:29.5px 0 41.8px;border-bottom:1px solid rgba(20,20,20,.3)}',
    '.fig{aspect-ratio:358.67/224}', /* Home 390 Structure 사진과 같은 비율(331.5 x 207) */
    '.rt{display:block;margin-top:25px}',
    '.num{display:block;font-size:14px;line-height:21.9375px;letter-spacing:-.195px;top:0;text-align:left}',
    '.ttl{margin-top:25px;font-size:21.5px;line-height:30.5px;letter-spacing:-.195px;top:0;text-wrap:balance}',
    '.desc{margin-top:12.3px;font-size:18px;line-height:26px;letter-spacing:-.195px;top:0}',
    '.gap2{height:75.5px}',
    '}',
    ZOOM,
    MOTION_CSS
  ].join('\n');

  var SIZES = '(max-width:767.98px) calc(100vw - 58.5px), (max-width:1023.98px) calc(100vw - 64px), (max-width:1280.98px) calc(100vw - 96px), 1184px';
  function fig(m, base) {
    return '<figure class="fig" data-fc="' + m.fc + '" data-c="' + m.c.join(',') + '"><img class="fimg" src="' + esc(base + m.img + '.jpg') + '" srcset="' + esc(base + m.img + '_1000.jpg') + ' 1000w, ' + esc(base + m.img + '.jpg') + ' 1744w" sizes="' + SIZES + '" width="1744" height="2336" alt="' + esc(m.alt) + '" loading="lazy" decoding="async" style="--fc:' + m.fc + '%"></figure>';
  }
  function html(D, base) {
    return '<style>' + CSS + '</style><div lang="en">' +
      '<section class="hero"><div class="in" style="position:relative;height:100%"><h1 class="ht serif">' + mk('l1 d6', esc(D.hero[0])) + ' ' + mk('l2 d8', esc(D.hero[1])) + '</h1></div></section>' +
      '<section class="intro rv"><div class="in"><div class="rule" role="presentation"></div>' +
      '<div class="two"><p class="lead">' + br(D.lead) + '</p><p class="body">' + br(D.body) + '</p></div></div></section>' +
      '<div class="gap1" aria-hidden="true"></div>' +
      '<section class="list"><div class="in"><h2 class="disp serif rv">' + br(D.display) + '</h2><ol class="rows" role="list">' +
      D.items.map(function (it) { return '<li class="row rv rs"><div class="hold"><div class="stick">' + fig(it[3], base) + '<div class="rt"><p class="num" aria-hidden="true">' + esc(it[0]) + '</p><h3 class="ttl">' + br(it[1]) + '</h3><p class="desc">' + br(it[2]) + '</p></div></div></div></li>'; }).join('') +
      '</ol></div></section><div class="gap2" aria-hidden="true"></div></div>';
  }

  class VdviaWid extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    static get observedAttributes() { return ['img-base', 'pan', 'pan-sec', 'pan-full']; }
    connectedCallback() { fitOn(this); injectFonts(); this._render(); }
    disconnectedCallback() { fitOff(); if (this._mo) this._mo.disconnect(); if (this._pan) { this._pan(); this._pan = null; } }
    attributeChangedCallback() { if (this.isConnected && this.shadowRoot.firstChild) this._render(); } /* 떼어 낸 뒤에는 다시 그리지 않는다(창 리스너가 남는다). 다시 붙으면 connectedCallback이 그린다 */
    _render() {
      this.shadowRoot.innerHTML = html(DATA, (this.getAttribute('img-base') || IMG_BASE).replace(/\/?$/, '/')); /* 끝 슬래시가 없어도 되게 */
      if (this._pan) this._pan(); this._pan = panOn(this.shadowRoot, panOpt(this)); /* 기본 자동 이동(2026-11-10 Sol). 보관한 시안은 ?pan=fast(B), ?pan=hold(C) 또는 속성 pan. C는 행이 길어지므로 등장 판정보다 먼저 */
      if (this._mo) this._mo.disconnect(); this._mo = motionOn(this.shadowRoot);
    }
  }

  // SEO 평문 (윅스 페이지 코드에서 $w('#id').seoMarkup 에 넣을 때 사용)
  if (typeof window !== 'undefined') {
    window.VDVIA_WID_SEO_HTML = '<h1>' + esc(DATA.hero.join(' ')) + '</h1><p>' + esc(flat(DATA.lead)) + '</p><p>' + esc(flat(DATA.body)) + '</p><h2>' + esc(flat(DATA.display)) + '</h2><ol>' +
      DATA.items.map(function (it) { return '<li><h3>' + esc(flat(it[1])) + '</h3><p>' + esc(flat(it[2])) + '</p></li>'; }).join('') + '</ol>';
  }
  if (typeof customElements !== 'undefined' && !customElements.get('vdvia-wid')) customElements.define('vdvia-wid', VdviaWid);
})();
