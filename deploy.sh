#!/bin/zsh
# VDVIA 홈, 헤더, 푸터, News, Brand 웹 컴포넌트를 회사 저장소(_web/)에서 이 Pages 저장소로 복사해 푸시한다.
# 사용: ./deploy.sh "커밋 메시지"
set -e
SRC="/Users/sollee/Desktop/vdvia/30_growth/design/06) 웹사이트, 스마트 스토어/03) 비디비아 웹사이트/_web"
cd "$(dirname "$0")"
cp "$SRC/vdvia-home.js" ./vdvia-home.js
cp "$SRC/index.html" ./index.html
cp "$SRC/vdvia-chrome.js" ./vdvia-chrome.js
cp "$SRC/chrome.html" ./chrome.html
cp "$SRC/vdvia-news.js" ./vdvia-news.js
cp "$SRC/news.html" ./news.html
cp "$SRC/vdvia-brand.js" ./vdvia-brand.js
cp "$SRC/brand.html" ./brand.html
mkdir -p img && cp "$SRC/img/"*.jpg "$SRC/img/"*.png ./img/
git add vdvia-home.js index.html vdvia-chrome.js chrome.html vdvia-news.js news.html vdvia-brand.js brand.html img deploy.sh
git commit -q -m "${1:-홈 컴포넌트 갱신}" || { echo "변경 없음"; exit 0; }
git push origin main 2>&1 | tail -1
echo "게시: https://solleegraphic.github.io/vdvia-web/  (반영까지 약 1분)"
