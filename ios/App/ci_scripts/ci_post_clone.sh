#!/bin/sh

# 1. Node.js 20 설치
brew install node@20
brew link --overwrite node@20

# 2. Yarn 설치
npm install -g yarn

# 3. 프로젝트 루트로 이동
cd ../..

# --- [중요] Xcode Cloud 변수를 .env 파일로 생성 ---
# 대시보드에 입력한 변수명($VITE_API_URL)을 그대로 가져와서 .env에 씁니다.
echo "VITE_API_URL=$VITE_API_URL" >> .env
# 추가 변수가 있다면 아래에 계속 추가하세요.
# echo "NEXT_PUBLIC_ANOTHER_VAR=$NEXT_PUBLIC_ANOTHER_VAR" >> .env

# 4. 라이브러리 설치 및 빌드
yarn install
yarn build

# 5. 캐패시터 동기화
npx cap sync ios