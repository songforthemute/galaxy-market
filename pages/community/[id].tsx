import type { NextPage } from "next";
import Btn from "@components/btn";
import Reply from "@components/reply";
import Layout from "@components/layout";
import Reaction from "@components/reaction";
import TxtArea from "@components/txtArea";
import UserCard from "@components/userCard";

const CommunityPosting: NextPage = () => {
    return (
        // 스테이트 전달로 동적 타이틀 변화
        <Layout title={"동네이야기"} hasTabBar canGoBack>
            <div className="">
                <UserCard
                    username="조이"
                    text="프로필 보기 →"
                    href="/profile"
                    type="profile"
                />

                <div className="mt-2 px-4 text-gray-700 text-xl">
                    <span className="text-purple-400 font-medium">Q. </span>
                    <span className="font-medium">
                        어느 피자 가게가 제일 맛있나요?
                    </span>
                </div>

                <div className="mt-2 ml-6 px-4 text-gray-700">
                    <p className="">
                        서울에 살고 있고, 삼성중앙역으로 출퇴근 하고 있어요.
                        삼성역에서 가까우면 좋아요!
                    </p>
                </div>

                <Reaction likes={1} reply={2} />

                <div className="pb-4 px-4 my-4 space-y-4 border-b">
                    <Reply
                        creator="스티브"
                        createdAt="2시간 전"
                        text="우리 집 앞!"
                    />
                    <Reply creator="아이브" createdAt="7시간 전" text="서울!" />
                </div>

                <div className="px-4">
                    <TxtArea
                        name="reply"
                        label="댓글"
                        placeholder="댓글을 적어주세요."
                    />

                    <Btn text="답변하기" />
                </div>
            </div>
        </Layout>
    );
};

export default CommunityPosting;
