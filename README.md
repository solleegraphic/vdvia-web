# VDVIA 웹 컴포넌트 (홈, 헤더, 푸터)

피그마 홈 스펙(`../_build/figma_home_build.js`)을 그대로 옮긴 커스텀 엘리먼트 `<vdvia-home>`, 그리고 vdvia.com 헤더와 푸터를 교체하는 `<vdvia-header>` `<vdvia-footer>`.

## 파일
- `vdvia-home.js` 자급자족 웹 컴포넌트(shadow DOM, 빌드 도구 없음). 같은 파일이 `window.VDVIA_HOME_SEO_HTML`(SEO용 평문 HTML)도 만든다. 파일 끝 주석에 윅스 사용법.
- `index.html` 데모 페이지(스크립트 + `<vdvia-home>` 하나).
- `vdvia-chrome.js` 헤더 `<vdvia-header>` + 푸터 `<vdvia-footer>` 한 파일(2026-11-04). 정본은 피그마 'VDVIA Home 1440 (PC)_sol 수정_1'(1173:966)의 Header 1173:968, Footer 1173:1089, 락업 1194:2(흰색 SVG = `05) 패키지 디자인/05) 인증서, 마크 모음/비디비아_로고_white.svg`에서 가이드 rect와 숨긴 레이어를 뺀 path). 모바일(≤1280)은 빌드 스크립트의 header()/footerMob() 390 스펙. 링크 규칙(Sol): 로고 = Company = 홈 `/`, Brand `/services-1`, What is Different `/what-is-difference`, Contact `/contact-8`, 푸터 Mission, Vision `/mission-and-vision`, Core Value `/what-we-do`, Structure `/about-3`, Brand 하위는 `/services-1`. Privacy Policy는 페이지가 없어 글자만(`links` 속성 JSON의 `privacy`에 주소를 주면 링크). Family Site는 ZISHEL(zishel.com), Lemonderma(lemonderma.co.kr) 새 창. 모바일 메뉴 버튼은 `document.body`에 흰 전체화면 오버레이(`#vdvia-mnav`)를 붙인다(윅스 컨테이너 overflow 영향 회피). `window.VDVIA_HEADER_SEO_HTML`, `window.VDVIA_FOOTER_SEO_HTML`도 만든다. 폰트는 Pretendard만(세리프 없음).
- `chrome.html` 헤더+푸터 데모 페이지.
- `README.md` 이 문서.

## 폰트 출처
- 한글, 본문: Pretendard Variable. `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`
- 세리프 디스플레이: Adobe Garamond Pro Regular 400, Adobe Fonts 웹 프로젝트(Sol 계정, kit `cle2qyf`) `https://use.typekit.net/cle2qyf.css`, CSS 패밀리명 `adobe-garamond-pro`. 2026-11-04까지는 EB Garamond 대체였음.
- 두 링크는 컴포넌트가 `document.head`에 한 번만 주입한다(shadow 안 @font-face는 안 먹기 때문). 패밀리 순서는 `'Adobe Garamond Pro','EB Garamond',Garamond,serif`라 Adobe 폰트가 설치된 PC에서는 그게 먼저 쓰인다.

## 이미지 넣기
이미지는 기본 `#e9e9e9` 자리 블록이다. 둘 중 하나로 채운다.
1. CSS 변수(값이 있으면 background cover): `--img-mission`, `--img-healthcare`, `--img-lifestyle`, `--img-creativity`
   `vdvia-home{ --img-mission:url("https://.../mission.jpg"); }`
2. 속성: `<vdvia-home images='{"mission":"https://.../a.jpg","healthcare":"...","lifestyle":"...","creativity":"..."}'></vdvia-home>` (URL만 줘도 되고 `url(...)` 형태도 됨)

## 반응형
- 1281px 이상: 컨테이너 1184 가운데(1920에서 좌우 368, 1440에서 128), 데스크톱 레이아웃.
- 1280px 이하: 좌우 24px 단일 컬럼, 모바일 레이아웃(768, 390 스펙).
- `data-fit` 요소(히어로 두 줄, 각 섹션 디스플레이)는 JS가 부모 폭에 맞춰 글자 크기를 줄인다(최소 8px). 로드, 리사이즈, 폰트 로드 후에 다시 계산.

## 헤드리스 크롬으로 실측
크롬 headless는 창 최소 폭이 500이라 390/768은 iframe으로 감싸서 잰다. (2026-11-04부터는 puppeteer-core로 재는 게 편하다: 스크래치 `pup/measure.js <url> <폭> <높이> <모바일 0|1> <png> [전체 1] [평가 js]` — 모바일 1이면 iPhone UA + isMobile이라 윅스 모바일(viewport 320)이 그대로 재현된다. 헤더, 푸터 1440 실측은 피그마 수치와 전부 일치: 로고 128/23 110×19, 내비 489, 613, 709, 889, © 128/30, 정보 250×144, Privacy 223, Family 303, 열 470/664/858/1052, 락업 424/428 592×192.)
```
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,5345 --virtual-time-budget=9000 \
  --screenshot=/tmp/vd-1920.png "file:///.../_web/index.html"
```
숫자 실측은 임시 페이지에 측정 스크립트를 넣어 `document.title`에 JSON을 쓰고 `--dump-dom`으로 읽는다. 측정 스크립트는 shadow root(`host.shadowRoot`)에서 `.hlead`, `.hl`, `.mission .rule`의 `getBoundingClientRect()`와 `Range`를 쓴다. 대문자 윗선과 기준선은 canvas `measureText('H')`의 `fontBoundingBoxAscent`, `actualBoundingBoxAscent`로 계산한다.
히어로 위아래 보정은 컴포넌트가 실제 폰트 메트릭으로 매번 다시 계산한다(`_calibrate`).

## 윅스에 넣기
1. `vdvia-home.js`를 윅스 저장소(`solleegraphic/VDVIA`)의 `src/public/custom-elements/vdvia-home.js`로 복사해 main에 푸시한다(Server URL 방식이면 호스팅한 JS 주소).
2. 에디터에서 Add Elements > Embed > Custom Element > Choose Source > Velo file(또는 Server URL) 선택, Tag Name = `vdvia-home`.
3. SEO: `window.VDVIA_HOME_SEO_HTML` 값을 `src/public/vdvia-home-seo.js`에 `export const SEO_HTML = '...'`로 복사하고, 페이지 코드에서 `import { SEO_HTML } from 'public/vdvia-home-seo.js'; $w.onReady(() => { $w('#customElement1').seoMarkup = SEO_HTML; });`
