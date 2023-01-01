# 0. Galaxy-Market

## **_개요_**

-   이 프로젝트는 **사용자간 거래 서비스 웹 애플리케이션**으로, 번개장터에서 영감을 받아 진행하였으며, Next.js를 이용해 개발한 풀스택 웹 애플리케이션입니다.

-   Project Deployment : [Galaxy-Market](https://galaxy-market-rose.vercel.app)

-   Medium Blog : [https://medium.com/@songforthemute](https://medium.com/@songforthemute)

---

## **_목차_**

1. 기술 스택
2. 구현 기능
3. 프로젝트 상세
4. 프로젝트 스크립트

---

## _1. 기술 스택_

-   Language : `TypeScript`

-   Framework : `Next.js`

-   Architecture : `Atomic Design System`

-   State Management : `React Context API`, `SWR`

-   Styling : `Tailwind CSS (w/ CSS Module)`

-   Database : `MySQL (w/ PlanetScale)`

-   Image Server : `Cloudflare Images`

-   ORM : `Prisma`

-   Deployment : `Vercel`

-   Others : `React-hook-form`, `Radix-ui/react-select`, `bcrypt`, `iron-session`, `body-scroll-lock`

---

## _2. 구현 기능_

-   사용자 관련
    -   계정 생성
    -   로그인
    -   로그아웃
    -   비밀번호 변경
    -   계정 탈퇴
-   상품 관련
    -   새 상품 업로드
    -   상품 수정 및 삭제
    -   상품 판매 완료 및 재개 토글
    -   관심 상품 설정
    -   검색 옵션에 따른 상품 검색
    -   판매자에게 메시지 전송
-   커뮤니티 관련
    -   새 포스트 업로드
    -   포스트 전체 및 태그별 보기
    -   포스트 관심 설정
    -   포스트 수정 및 삭제
    -   포스트 내 새 댓글 업로드 및 삭제
-   메시지 관련
    -   상대에게 수신한 메시지가 있는 경우 메시지 수신 및 전송
-   프로필 관련
    -   프로필 보기
    -   프로필 수정
    -   판매 상품 보기
    -   구매 상품 보기
    -   관심 상품 보기
    -   리뷰 업로드 및 삭제

---

## _3. 프로젝트 상세_

-   이 프로젝트의 프론트엔드 파트와 백엔트 파트는 모두 `Next.js`로 개발하였습니다. 계정 생성 및 로그인 페이지와, 비밀번호 찾기 및 변경 페이지 이외의 페이지에서는 로그인을 해야 이용할 수 있도록 미들웨어 또한 `Next.js`에서 제공하는 기능으로 개발하였습니다.

-   백엔드 파트는 `GET`, `POST`, `PUT`, `DELETE`등의 메서드를 사용하는 `RESTful API`의 형태로 개발하였습니다.

-   프론트엔드 파트에 **아토믹 디자인 시스템(Atomic Design System)** 아키텍쳐를 적용했습니다.

    _`Atoms`, `Molecules`, `Organisms`, `Templates`, `Pages`의 다섯 단계로 나누어 컴포넌트를 개발하고, 사용자 인터페이스 디자인의 일관성을 높게 유지할 수 있었습니다. 또한, 하위 컴포넌트에 가까워질수록 순수 컴포넌트로 사용할 수 있도록 로직과 분리시켰으며, 샹위 컴포넌트에 가까울수록 로직에 보다 집중할 수 있도록 시도했습니다._

-   일정 시간 내 방문했던 페이지 재방문 시, 반복적인 API 호출로 인한 필요없는 코스트 낭비 대신, `SWR`로 캐싱한 데이터를 이용해 빠른 응답을 제공합니다. 사용자와 상호작용하며 변경되는 데이터에 있어서는 캐시에 뮤테이션을 주어 대응하였습니다.

-   무한스크롤링을 통한 페이지네이션 또한, `SWR`에서 제공하는 `swr/infinite`의 기능을 이용해 개발하였습니다.

-   모달과 사이드바 컴포넌트는 `React Context API`를 이용해 상태를 관리했습니다.

-   스타일링은 `Tailwind CSS`를 `CSS Module` 방식으로 적용시켰습니다. 셀렉트 컴포넌트는 `Radix-ui/react-select`를, 폼 컴포넌트는 `React-hook-form`을 이용해 개발하였습니다.

-   데이터베이스는 `MySQL`을, `Prisma` ORM을 이용하여, MySQL과 호환되는 서버리스 데이터베이스 플랫폼인 `PlanetScale`을 통해서 구축하였습니다.

-   이미지 서버는 `Cloudflare Images`를 이용하였으며, 프로젝트의 배포는 `Vercel` 플랫폼을 이용하여 진행하였습니다.

---

## _4. 프로젝트 스크립트_

-   ### 이 프로젝트의 개발 환경
    -   Editor : `Visual Studio Code`
    -   OS : `Mac OS Monterey 12.6 (w/ Apple M1)`
    -   Runtime : `Node.js v16.14.0`
    -   Package Manager : `npm` | `yarn v1`
    -   Browser : `Chrome` | `Safari` | `Vivaldi`

```
npm run dev
# or
npm next dev
# or
yarn dev
```

-   프로젝트를 개발 모드로 실행할 수 있습니다.

    [http://localhost:3000]("http://localhost:3000") 환경에서 실행되며, 기본 포트 넘버는 3000입니다.

```
npm run build
# or
npm next build
# or
yarn build
```

-   애플리케이션이 `.next` 폴더에 빌드됩니다.

---

---

## _봐주셔서 감사합니다 :D_

---
