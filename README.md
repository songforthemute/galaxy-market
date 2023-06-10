# Galaxy-Market

## **_목차_**

0. [개요](#0-개요)
1. [기술 스택](#1-기술-스택)
2. [프로젝트 상세](#2-프로젝트-상세)
3. [Google Lighthouse Inspection](#3-Google-Lighthouse-Inspection)
4. [API 인터페이스](#4-api-인터페이스)
5. [프로젝트 개발 환경 및 스크립트](#5-프로젝트-개발-환경-및-스크립트)

---

<img alt="Deployment Screenshot" src="https://file.notion.so/f/s/4a2fe40d-fbb4-47cd-a292-68501eb6a160/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.41.42.png?id=1f4e961f-04b1-408e-a163-db108f270dc5&table=block&spaceId=0808aacc-90cf-42dd-9736-c8efd0fc09b4&expirationTimestamp=1684255283577&signature=Xh3cbKVzkW5sWBiFcCJGq5YHEAQXJ1bR1RrsOgWsoX0&downloadName=%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2023-03-19+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+11.41.42.png"/>

---

## _0. 개요_

-   이 프로젝트는 **C2C 중고 거래 서비스**로, 프런트엔드와 백엔드 모두 Next.js를 이용해 개발한 풀스택 웹 애플리케이션입니다. _(This project is **C2C Used Trading Service**, a full-stack web application developed using Next.js, both front-end and back-end.)_

-   Deployment : [Galaxy-Market](https://galaxy-market-rose.vercel.app)

-   Blog : [Medium](https://medium.com/@songforthemute)

-   <details>
       <summary><i>프로젝트 구조(Project structure)</i></summary>

        📦galaxy-market
        ┣ 📂components
        ┃ ┣ 📂Atoms
        ┃ ┃ ┣ 📂Anchor
        ┃ ┃ ┃ ┣ 📜Anchor.tsx
        ┃ ┃ ┃ ┗ 📜index.tsx
        ┃ ┃ ┣ 📂Badge
        ┃ ┃ ┃ ┣ 📜Badge.module.css
        ┃ ┃ ┃ ┣ 📜Badge.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Button
        ┃ ┃ ┃ ┣ 📜Button.module.css
        ┃ ┃ ┃ ┣ 📜Button.tsx
        ┃ ┃ ┃ ┗ 📜index.tsx
        ┃ ┃ ┣ 📂ErrorMessage
        ┃ ┃ ┃ ┣ 📜ErrorMessage.module.css
        ┃ ┃ ┃ ┣ 📜ErrorMessage.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Img
        ┃ ┃ ┃ ┣ 📜Img.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Input
        ┃ ┃ ┃ ┣ 📜Input.module.css
        ┃ ┃ ┃ ┣ 📜Input.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Label
        ┃ ┃ ┃ ┣ 📜Label.module.css
        ┃ ┃ ┃ ┣ 📜Label.tsx
        ┃ ┃ ┃ ┗ 📜index.tsx
        ┃ ┃ ┣ 📂LoadingDots
        ┃ ┃ ┃ ┣ 📜LoadingDots.module.css
        ┃ ┃ ┃ ┣ 📜LoadingDots.tsx
        ┃ ┃ ┃ ┗ 📜index.tsx
        ┃ ┃ ┣ 📂Modal
        ┃ ┃ ┃ ┣ 📜Modal.module.css
        ┃ ┃ ┃ ┣ 📜Modal.tsx
        ┃ ┃ ┃ ┗ 📜index.tsx
        ┃ ┃ ┣ 📂Quantity
        ┃ ┃ ┃ ┣ 📜Quantity.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Rating
        ┃ ┃ ┃ ┣ 📜Rating.module.css
        ┃ ┃ ┃ ┣ 📜Rating.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Select
        ┃ ┃ ┃ ┣ 📜Select.module.css
        ┃ ┃ ┃ ┣ 📜Select.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Sidebar
        ┃ ┃ ┃ ┣ 📜Sidebar.module.css
        ┃ ┃ ┃ ┣ 📜Sidebar.tsx
        ┃ ┃ ┃ ┗ 📜index.tsx
        ┃ ┃ ┣ 📂Skeleton
        ┃ ┃ ┃ ┣ 📜Skeleton.module.css
        ┃ ┃ ┃ ┣ 📜Skeleton.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Text
        ┃ ┃ ┃ ┣ 📜Text.module.css
        ┃ ┃ ┃ ┣ 📜Text.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Textarea
        ┃ ┃ ┃ ┣ 📜Textarea.module.css
        ┃ ┃ ┃ ┣ 📜Textarea.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂icons
        ┃ ┃ ┃ ┣ 📜add.tsx
        ┃ ┃ ┃ ┣ 📜bin.tsx
        ┃ ┃ ┃ ┣ 📜building.tsx
        ┃ ┃ ┃ ┣ 📜bulb.tsx
        ┃ ┃ ┃ ┣ 📜chatBubbleRound.tsx
        ┃ ┃ ┃ ┣ 📜chatBubbleSquare.tsx
        ┃ ┃ ┃ ┣ 📜check.tsx
        ┃ ┃ ┃ ┣ 📜chevronDown.tsx
        ┃ ┃ ┃ ┣ 📜chevronLeft.tsx
        ┃ ┃ ┃ ┣ 📜chevronRight.tsx
        ┃ ┃ ┃ ┣ 📜chevronUp.tsx
        ┃ ┃ ┃ ┣ 📜close.tsx
        ┃ ┃ ┃ ┣ 📜eye.tsx
        ┃ ┃ ┃ ┣ 📜eyeSlash.tsx
        ┃ ┃ ┃ ┣ 📜heart.tsx
        ┃ ┃ ┃ ┣ 📜home.tsx
        ┃ ┃ ┃ ┣ 📜horizontalDots.tsx
        ┃ ┃ ┃ ┣ 📜iconProps.ts
        ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┣ 📜login.tsx
        ┃ ┃ ┃ ┣ 📜magnifyingGlass.tsx
        ┃ ┃ ┃ ┣ 📜paperAirPlane.tsx
        ┃ ┃ ┃ ┣ 📜pencilSquare.tsx
        ┃ ┃ ┃ ┣ 📜picture.tsx
        ┃ ┃ ┃ ┣ 📜questionMark.tsx
        ┃ ┃ ┃ ┣ 📜shoppingBag.tsx
        ┃ ┃ ┃ ┣ 📜shoppingCart.tsx
        ┃ ┃ ┃ ┣ 📜star.tsx
        ┃ ┃ ┃ ┗ 📜user.tsx
        ┃ ┃ ┗ 📜index.ts
        ┃ ┣ 📂Molecules
        ┃ ┃ ┣ 📂ChatBubble
        ┃ ┃ ┃ ┣ 📜ChatBubble.module.css
        ┃ ┃ ┃ ┣ 📜ChatBubble.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ChatInput
        ┃ ┃ ┃ ┣ 📜ChatInput.module.css
        ┃ ┃ ┃ ┣ 📜ChatInput.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂CircleButton
        ┃ ┃ ┃ ┣ 📜CircleButton.module.css
        ┃ ┃ ┃ ┣ 📜CircleButton.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂FloatingAnchor
        ┃ ┃ ┃ ┣ 📜FloatingAnchor.module.css
        ┃ ┃ ┃ ┣ 📜FloatingAnchor.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂FloatingButton
        ┃ ┃ ┃ ┣ 📜FloatingButton.module.css
        ┃ ┃ ┃ ┣ 📜FloatingButton.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ImageInput
        ┃ ┃ ┃ ┣ 📜ImageInput.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ItemThumbnail
        ┃ ┃ ┃ ┣ 📜ItemThumbnail.module.css
        ┃ ┃ ┃ ┣ 📜ItemThumbnail.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂LoadingSuspense
        ┃ ┃ ┃ ┣ 📜LoadingSuspense.module.css
        ┃ ┃ ┃ ┣ 📜LoadingSuspense.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂NumberInput
        ┃ ┃ ┃ ┣ 📜NumberInput.module.css
        ┃ ┃ ┃ ┣ 📜NumberInput.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂PasswordInput
        ┃ ┃ ┃ ┣ 📜PasswordInput.module.css
        ┃ ┃ ┃ ┣ 📜PasswordInput.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂PostReaction
        ┃ ┃ ┃ ┣ 📜PostReaction.module.css
        ┃ ┃ ┃ ┣ 📜PostReaction.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ProfileCard
        ┃ ┃ ┃ ┣ 📜ProfileCard.module.css
        ┃ ┃ ┃ ┣ 📜ProfileCard.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂Scoring
        ┃ ┃ ┃ ┣ 📜Scoring.module.css
        ┃ ┃ ┃ ┣ 📜Scoring.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂TextInput
        ┃ ┃ ┃ ┣ 📜TextInput.module.css
        ┃ ┃ ┃ ┣ 📜TextInput.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂TextareaWithLabel
        ┃ ┃ ┃ ┣ 📜TextareaWithLabel.module.css
        ┃ ┃ ┃ ┣ 📜TextareaWithLabel.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┗ 📜index.ts
        ┃ ┣ 📂Organisms
        ┃ ┃ ┣ 📂AccountResetForm
        ┃ ┃ ┃ ┣ 📜AccountResetForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂AuthResetModal
        ┃ ┃ ┃ ┣ 📜AuthResetModal.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂DeleteModal
        ┃ ┃ ┃ ┣ 📜DeleteModal.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂DockBar
        ┃ ┃ ┃ ┣ 📜DockBar.module.css
        ┃ ┃ ┃ ┣ 📜DockBar.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ItemCard
        ┃ ┃ ┃ ┣ 📜ItemCard.module.css
        ┃ ┃ ┃ ┣ 📜ItemCard.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂JoinForm
        ┃ ┃ ┃ ┣ 📜JoinForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂LogOutModal
        ┃ ┃ ┃ ┣ 📜LogOutModal.module.css
        ┃ ┃ ┃ ┣ 📜LogOutModal.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂LoginForm
        ┃ ┃ ┃ ┣ 📜LoginForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂PostCard
        ┃ ┃ ┃ ┣ 📜PostCard.module.css
        ┃ ┃ ┃ ┣ 📜PostCard.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂PostDetail
        ┃ ┃ ┃ ┣ 📜PostDetail.module.css
        ┃ ┃ ┃ ┣ 📜PostDetail.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ReplyDetail
        ┃ ┃ ┃ ┣ 📜ReplyDetail.module.css
        ┃ ┃ ┃ ┣ 📜ReplyDetail.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ReviewCard
        ┃ ┃ ┃ ┣ 📜ReviewCard.module.css
        ┃ ┃ ┃ ┣ 📜ReviewCard.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂UploadItemInputs
        ┃ ┃ ┃ ┣ 📜UploadItemInputs.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂WithdrawalModal
        ┃ ┃ ┃ ┣ 📜WithdrawalModal.module.css
        ┃ ┃ ┃ ┣ 📜WithdrawalModal.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┗ 📜index.ts
        ┃ ┣ 📂Templates
        ┃ ┃ ┣ 📂AuthForm
        ┃ ┃ ┃ ┣ 📜AuthForm.module.css
        ┃ ┃ ┃ ┣ 📜AuthForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ConfigSidebar
        ┃ ┃ ┃ ┣ 📜ConfigSidebar.module.css
        ┃ ┃ ┃ ┣ 📜ConfigSidebar.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂EditProfileForm
        ┃ ┃ ┃ ┣ 📜EditProfileForm.module.css
        ┃ ┃ ┃ ┣ 📜EditProfileForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ItemDetail
        ┃ ┃ ┃ ┣ 📜ItemDetail.module.css
        ┃ ┃ ┃ ┣ 📜ItemDetail.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂PostDetailWithReply
        ┃ ┃ ┃ ┣ 📜PostDetailWithReply.module.css
        ┃ ┃ ┃ ┣ 📜PostDetailWithReply.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂ReviewForm
        ┃ ┃ ┃ ┣ 📜ReviewForm.module.css
        ┃ ┃ ┃ ┣ 📜ReviewForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂SearchFormModal
        ┃ ┃ ┃ ┣ 📜SearchFormModal.module.css
        ┃ ┃ ┃ ┣ 📜SearchFormModal.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂UploadItemForm
        ┃ ┃ ┃ ┣ 📜UploadItemForm.module.css
        ┃ ┃ ┃ ┣ 📜UploadItemForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂UploadPostForm
        ┃ ┃ ┃ ┣ 📜UploadPostForm.module.css
        ┃ ┃ ┃ ┣ 📜UploadPostForm.tsx
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┗ 📜index.ts
        ┃ ┣ 📂contexts
        ┃ ┃ ┣ 📜themeContext.tsx
        ┃ ┃ ┣ 📜uiContext.tsx
        ┃ ┃ ┗ 📜userContext.tsx
        ┃ ┣ 📂layout
        ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┣ 📜layout.module.css
        ┃ ┃ ┗ 📜layout.tsx
        ┃ ┣ 📜.DS_Store
        ┃ ┗ 📜index.ts
        ┣ 📂libs
        ┃ ┣ 📂client
        ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┣ 📜useFetch.ts
        ┃ ┃ ┣ 📜useFocusEvent.ts
        ┃ ┃ ┣ 📜useGetKey.ts
        ┃ ┃ ┣ 📜useInfiniteScroll.ts
        ┃ ┃ ┣ 📜useMergeRefs.ts
        ┃ ┃ ┣ 📜useMutation.tsx
        ┃ ┃ ┣ 📜useSessionStorage.tsx
        ┃ ┃ ┣ 📜useToggle.ts
        ┃ ┃ ┣ 📜useUser.ts
        ┃ ┃ ┗ 📜util.ts
        ┃ ┗ 📂server
        ┃ ┃ ┣ 📜client.ts
        ┃ ┃ ┣ 📜handlerHelper.ts
        ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┗ 📜sessionHelper.ts
        ┣ 📂pages
        ┃ ┣ 📂api
        ┃ ┃ ┣ 📂message
        ┃ ┃ ┃ ┣ 📜[id].ts
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂posts
        ┃ ┃ ┃ ┣ 📂[id]
        ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┣ 📜interest.ts
        ┃ ┃ ┃ ┃ ┗ 📜replies.ts
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📂products
        ┃ ┃ ┃ ┣ 📂[id]
        ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┣ 📜like.ts
        ┃ ┃ ┃ ┃ ┗ 📜soldout.ts
        ┃ ┃ ┃ ┣ 📜filter.ts
        ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┗ 📜search.ts
        ┃ ┃ ┣ 📂users
        ┃ ┃ ┃ ┣ 📂auth
        ┃ ┃ ┃ ┃ ┣ 📜join.ts
        ┃ ┃ ┃ ┃ ┣ 📜login.ts
        ┃ ┃ ┃ ┃ ┗ 📜reset.ts
        ┃ ┃ ┃ ┣ 📂me
        ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┣ 📜profile.ts
        ┃ ┃ ┃ ┗ 📜reviews.ts
        ┃ ┃ ┣ 📜.DS_Store
        ┃ ┃ ┗ 📜files.ts
        ┃ ┣ 📂auth
        ┃ ┃ ┣ 📜index.tsx
        ┃ ┃ ┗ 📜reset.tsx
        ┃ ┣ 📂chats
        ┃ ┃ ┣ 📜[id].tsx
        ┃ ┃ ┗ 📜index.tsx
        ┃ ┣ 📂community
        ┃ ┃ ┣ 📂[id]
        ┃ ┃ ┃ ┣ 📜index.tsx
        ┃ ┃ ┃ ┗ 📜update.tsx
        ┃ ┃ ┣ 📜index.tsx
        ┃ ┃ ┗ 📜upload.tsx
        ┃ ┣ 📂products
        ┃ ┃ ┣ 📂[id]
        ┃ ┃ ┃ ┣ 📜index.tsx
        ┃ ┃ ┃ ┗ 📜update.tsx
        ┃ ┃ ┗ 📜upload.tsx
        ┃ ┣ 📂profile
        ┃ ┃ ┣ 📂[id]
        ┃ ┃ ┃ ┣ 📜buy.tsx
        ┃ ┃ ┃ ┣ 📜index.tsx
        ┃ ┃ ┃ ┣ 📜like.tsx
        ┃ ┃ ┃ ┣ 📜review.tsx
        ┃ ┃ ┃ ┗ 📜sell.tsx
        ┃ ┃ ┣ 📜.DS_Store
        ┃ ┃ ┗ 📜edit.tsx
        ┃ ┣ 📜.DS_Store
        ┃ ┣ 📜_app.tsx
        ┃ ┣ 📜_document.tsx
        ┃ ┣ 📜index.tsx
        ┃ ┗ 📜search.tsx
        ┣ 📂prisma
        ┃ ┗ 📜schema.prisma
        ┣ 📂public
        ┃ ┣ 📜favicon.ico
        ┃ ┗ 📜vercel.svg
        ┣ 📂styles
        ┃ ┗ 📜globals.css
        ┣ 📜.env
        ┣ 📜.env.local
        ┣ 📜.eslintrc.json
        ┣ 📜.gitignore
        ┣ 📜README.md
        ┣ 📜middleware.ts
        ┣ 📜next-env.d.ts
        ┣ 📜next.config.js
        ┣ 📜package-lock.json
        ┣ 📜package.json
        ┣ 📜postcss.config.js
        ┣ 📜tailwind.config.js
        ┗ 📜tsconfig.json

    </details>

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

-   이 프로젝트의 프런트엔드 파트와 백엔드 파트 모두 `Next.js`를 이용해 개발을 진행하였습니다. 로그인 여부에 따른 접근을 한정하는 미들웨어 또한 `Next.js`를 이용해 개발하였습니다. _(Both the front-end and back-end parts of this project were developed using `Next.js`. Middleware was also developed using `Next.js`, which limits access according to login.)_

-   백엔드 파트는 `GET`, `POST`, `PUT`, `DELETE`등의 메서드를 사용하는 `RESTful API`의 형태로 개발하였습니다. _(The back-end part was developed in the form of `RESTful API` using methods such as `GET`, `POST`, `PUT`, and `DELETE`.)_

-   프런트엔드 파트에 **아토믹 디자인 시스템(Atomic Design System)** 아키텍쳐를 적용했습니다.
    _(**Atomic Design System** architecture has been applied to the front-end part.)_

    > _`Atoms`, `Molecules`, `Organisms`, `Templates`, `Pages`의 다섯 단계로 나누어 컴포넌트를 개발하고, 사용자 인터페이스 디자인의 일관성을 높게 유지할 수 있었습니다. 또한, 하위 컴포넌트에 가까워질수록 순수 컴포넌트로 사용할 수 있도록 로직과 분리시켰으며, 상위 컴포넌트에 가까울수록 로직에 보다 집중할 수 있도록 시도했습니다._ _(Components were developed in five stages: `Atoms`, `Molecules`, `Organisms`, `Templates`, and `Pages`, and user interface design was could gained highly consistent. In addition, we separated it from logic so that it could be used as a pure component as it approached the lower component, and tried to focus more on logic as it approached the upper component.)_

-   웹 접근성을 고려하여, `aria-label` 등의 WAI-ARIA 속성들을 이용하며, 상호작용 가능한 컴포넌트는 탭 키로 모두 순환할 수 있도록 설계하였습니다. _(In consideration of web accessibility, WAI-ARIA attributes such as `aria-label` are used, and all interactive components are designed to be rotated by tap keys.)_

-   시맨틱 태그 사용, 메타 태그의 `content` 설정 등의 방법을 통해 SEO 향상을 시도했습니다. _(I tried to improve SEO by using semantic tags and setting `content` of meta tags.)_

-   일정 시간 내 방문했던 페이지 재방문 시, 반복적인 API 호출로 인한 필요없는 코스트 낭비 대신, `SWR`로 캐싱한 데이터를 이용해 빠른 응답을 제공합니다. 사용자와 상호 작용하며 변경되는 데이터에 있어서는 캐시에 뮤테이션을 주어 대응하였습니다. _(Instead of wasting unnecessary money due to repeated API calls, it provides a quick response using data cached by `SWR` when revisiting pages visited within a certain period of time. When it comes to data that interacts with users and changes, we responded by mutating the cache.)_

-   무한스크롤링을 통한 페이지네이션 또한, `SWR`에서 제공하는 `swr/infinite`의 기능을 이용해 개발하였습니다. _(Pagenation through infinite scrolling was also developed using the function of `swr/infinite` provided by `SWR`.)_

-   모달과 사이드바 컴포넌트의 상태는 `React Context API`를 이용하여 관리했습니다. _(The state of modal and sidebar components was managed using `React Context API`.)_

-   스타일링은 `Tailwind CSS`를 `CSS Module` 방식으로 적용시켰습니다. 셀렉트 컴포넌트는 `Radix-ui/react-select`를, 폼 컴포넌트는 `React-hook-form`을 추가로 이용해 개발하였습니다. _(For styling, `Tailwind CSS` is applied in the `CSS Module` The select component was developed using `Radix-ui/react-select` and the form component using `React-hook-form`.)_

-   데이터베이스는 `MySQL`을 `Prisma` ORM을 이용하여 MySQL과 호환되는 서버리스 데이터베이스 플랫폼인 `PlanetScale`을 통해서 구축하였습니다. _(The database was built using `Prisma` ORM through `PlanetScale`, a serverless database platform compatible with MySQL.)_

-   이미지는 CDN으로 `Cloudflare Images`를 이용해 로드하였으며, 프로젝트의 배포는 `Vercel` 플랫폼을 이용하여 진행하였습니다. _(The image was loaded using `Cloudflare Images` on CDN, and the project was distributed using the `Vercel` platform.)_

---

## _3. Google Lighthouse Inspection_

<img width="50%" height="auto" alt="Google Lighthouse Inspection" src="https://github.com/songforthemute/galaxy-market/assets/105373350/c9380277-f5eb-4092-9b04-74ad814752c5"/>

---

## _4. API 인터페이스_

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

## _5. 프로젝트 개발 환경 및 스크립트_

-   ### 이 프로젝트의 개발 환경
    -   Editor : `Visual Studio Code`
    -   OS : `Mac OS Monterey 12.6 (w/ Apple M1)`
    -   Runtime : `Node.js v16.14.0`
    -   Package Manager : `npm` | `yarn v1`
    -   Browser : `Chrome` | `Safari` | `Vivaldi`

```
pscale connect `planetScaleDB[, branchName]`
```

-   프로젝트를 PlanetScale CLI를 통해 PlanetScale의 데이터베이스 `planetScaleDB`에 연결할 수 있습니다. 이 명령어는 PlanetScale CLI의 설치가 필요합니다. _(You can connect a project to PlanetScale database `planetScaleDB` by using PlanetScale CLI. This command line need to install PlanetScale CLI.)_
-   `branchName`을 입력하지 않는 경우 main branch에 연결됩니다. _(If you not enter `branchName`, be connected to `main` branch.)_

```
npx prisma studio
```

-   연결된 데이터베이스의 어드민 페이지를 볼 수 있습니다. _(Show you the Admin page of the linked database.)_

```
npm run dev
# or
npm next dev
# or
yarn dev
```

-   프로젝트를 개발 모드로 실행할 수 있습니다. _(Run the development server)_

    [http://localhost:3000]("http://localhost:3000") 환경에서 실행되며, 기본 포트 넘버는 3000입니다. _(Default port number is 3000.)_

```
npm run build
# or
npm next build
# or
yarn build
```

-   애플리케이션이 `.next` 폴더에 빌드됩니다. _(Be built to `.next` folder.)_

---

<h2 align="center"><i>
Thank you for visit, <br/>
Have a great day! <br/>
<i></h2>

---
