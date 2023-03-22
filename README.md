# 0. Galaxy-Market

## **_개요_**

-   이 프로젝트는 **C2C 거래 서비스 웹 애플리케이션**으로, 번개장터에서 영감을 받아 진행하였으며, Next.js를 이용해 개발한 풀스택 웹 애플리케이션입니다.

-   Project Deployment : [Galaxy-Market](https://galaxy-market-rose.vercel.app)

-   Medium Blog : [https://medium.com/@songforthemute](https://medium.com/@songforthemute)

---

## **_목차_**

1. [기술 스택](#1-기술-스택)
2. [프로젝트 상세](#2-프로젝트-상세)
3. [API 인터페이스](#3-api-인터페이스)
4. [프로젝트 스크립트](#4-프로젝트-스크립트)

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

## _2. 프로젝트 상세_

-   이 프로젝트의 프론트엔드 파트와 백엔트 파트는 모두 `Next.js`로 개발하였습니다. 계정 생성 및 로그인 페이지와, 비밀번호 찾기 및 변경 페이지 이외의 페이지에서는 로그인을 해야 이용할 수 있도록 하는 미들웨어 또한 `Next.js`에서 제공하는 기능으로 개발하였습니다.

-   백엔드 파트는 `GET`, `POST`, `PUT`, `DELETE`등의 메서드를 사용하는 `RESTful API`의 형태로 개발하였습니다.

-   프론트엔드 파트에 **아토믹 디자인 시스템(Atomic Design System)** 아키텍쳐를 적용했습니다.

    _`Atoms`, `Molecules`, `Organisms`, `Templates`, `Pages`의 다섯 단계로 나누어 컴포넌트를 개발하고, 사용자 인터페이스 디자인의 일관성을 높게 유지할 수 있었습니다. 또한, 하위 컴포넌트에 가까워질수록 순수 컴포넌트로 사용할 수 있도록 로직과 분리시켰으며, 샹위 컴포넌트에 가까울수록 로직에 보다 집중할 수 있도록 시도했습니다._

-   웹 접근성을 고려하여, `aria-label` 등의 WAI-ARIA 속성들을 이용하며, 상호작용 가능한 컴포넌트는 탭 키로 모두 순환할 수 있도록 설계하였습니다.

-   시맨틱 태그 사용, 메타 태그 설정 등 높은 SEO를 유도할 수 있도록 하였습니다.

-   일정 시간 내 방문했던 페이지 재방문 시, 반복적인 API 호출로 인한 필요없는 코스트 낭비 대신, `SWR`로 캐싱한 데이터를 이용해 빠른 응답을 제공합니다. 사용자와 상호작용하며 변경되는 데이터에 있어서는 캐시에 뮤테이션을 주어 대응하였습니다.

-   무한스크롤링을 통한 페이지네이션 또한, `SWR`에서 제공하는 `swr/infinite`의 기능을 이용해 개발하였습니다.

-   모달과 사이드바 컴포넌트는 `React Context API`를 이용해 상태를 관리했습니다.

-   스타일링은 `Tailwind CSS`를 `CSS Module` 방식으로 적용시켰습니다. 셀렉트 컴포넌트는 `Radix-ui/react-select`를, 폼 컴포넌트는 `React-hook-form`을 추가로 이용해 개발하였습니다.

-   데이터베이스는 `MySQL`을 `Prisma` ORM을 이용하여 MySQL과 호환되는 서버리스 데이터베이스 플랫폼인 `PlanetScale`을 통해서 구축하였습니다.

-   이미지는 CDN으로 `Cloudflare Images`를 이용해 로드하였으며, 프로젝트의 배포는 `Vercel` 플랫폼을 이용하여 진행하였습니다.

---

## _3. API 인터페이스_

-   ### `.../api`

    -   ### `/users`

        -   **`/me`**

            > -   `GET` 현재 로그인한 사용자 요청, 없는 경우 `null`
            > -   `POST` 현재 로그인한 사용자의 세션 해제
            > -   `PUT` 현재 로그인한 사용자의 프로필 수정
            > -   `DELETE` 현재 로그인한 사용자의 회원 탈퇴

        -   **`/auth`**

            -   **`/join`**

                > -   `POST` 신규 사용자의 회원 가입

            -   **`/login`**

                > -   `POST` 사용자 로그인

            -   **`/reset`**

                > -   `POST` 패스워드 변경을 위한 이메일 검증 요청
                > -   `PUT` 패스워드 변경 요청

        -   **`/profile`**

            > -   `GET` 파라미터의 사용자 프로필 요청

        -   **`/reviews`**

            > -   `GET` 파라미터의 리뷰 요청
            > -   `POST` 신규 리뷰 작성
            > -   `DELETE` 파라미터의 리뷰 삭제

    -   ### `/products`

        -   **`/index`**

            > -   `GET` 상품 리스트 요청
            > -   `POST` 새 상품 등록

        -   **`/[id]`**

            -   **`/index`**

                > -   `GET` 파라미터의 상품 상세 정보 요청
                > -   `PUT` 파라미터의 상품 수정
                > -   `DELETE` 파라미터의 상품 삭제

            -   **`/like`**

                > -   `POST` 파라미터의 상품 좋아요 토글

            -   **`/soldout`**

                > -   `GET` 판매 완료된 상품 리스트 요청
                > -   `PUT` 파라미터의 상품 판매 완료 토글

        -   **`/filter`**

            > -   `GET` 파라미터의 사용자와 종류에 해당하는 상품 리스트 요청

        -   **`/search`**

            > -   `GET` 파라미터의 검색 옵션에 해당하는 상품 리스트 요청

    -   ### `/post`

        -   **`/index`**

            > -   `GET` 파라미터의 태그에 해당하는 게시글 리스트 요청
            > -   `POST` 새 게시글 등록

        -   **`/[id]`**

            -   **`/index`**

                > -   `GET` 파라미터의 게시글 상세 정보 요청
                > -   `PUT` 파라미터의 게시글 수정
                > -   `DELETE` 파라미터의 게시글 삭제

            -   **`/interest`**

                > -   `POST` 파라미터의 게시글 좋아요 토글

            -   **`/replies`**

                > -   `POST` 새 댓글 등록
                > -   `DELETE` 파라미터의 댓글 삭제

    -   ### `/message`

        -   **`/index`**

            > -   `GET` 사용자가 수신한 메시지 리스트 요청
            > -   `POST` 파라미터의 사용자에게 메시지 전송

        -   **`/[id]`**

            > -   `/GET` 현재 사용자와 파라미터에 해당하는 사용자의 이전 메시지 수발신 이력 요청

    -   ### `/files`

        > -   `/GET` CloudFlare Images 업로드 요청

---

## _4. 프로젝트 스크립트_

-   ### 이 프로젝트의 개발 환경
    -   Editor : `Visual Studio Code`
    -   OS : `Mac OS Monterey 12.6 (w/ Apple M1)`
    -   Runtime : `Node.js v16.14.0`
    -   Package Manager : `npm` | `yarn v1`
    -   Browser : `Chrome` | `Safari` | `Vivaldi`

```
pscale connect `planetScaleDB[, branchName]`
```

-   프로젝트를 PlanetScale에 연결할 수 있습니다.
-   branchName을 입력하지 않는 경우 main branch에 연결됩니다.

```
npx prisma studio
```

-   연결된 데이터베이스를 어드민 페이지를 볼 수 있습니다.

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

<h2 align="center"><i>
Thank you for visit, <br/>
Have a great day! <br/>
<i></h2>

---
