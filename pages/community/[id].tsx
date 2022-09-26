import type { NextPage } from "next";
import Badge from "../../components/badge";
import Btn from "../../components/btn";
import Comment from "../../components/reply";
import Layout from "../../components/layout";
import Reaction from "../../components/reaction";
import TxtArea from "../../components/txtArea";
import UserCard from "../../components/userCard";

const CommunityPosting: NextPage = () => {
    return (
        // 스테이트 전달로 동적 타이틀 변화
        <Layout title={"동네이야기"} hasTabBar canGoBack>
            <div className="">
                <Badge isLarge text="궁금해요" />
                <UserCard
                    username="조이"
                    text="프로필 보기 →"
                    href="/profile"
                    type="profile"
                />

                <div className="mt-2 px-4 text-gray-700">
                    <span className="text-purple-400 font-medium">Q. </span>
                    어느 피자 가게가 제일 맛있나요?
                </div>

                <Reaction likes={1} reply={2} />

                <div className="pb-4 px-4 my-4 space-y-4 border-b">
                    <Comment
                        creator="스티브"
                        createdAt="2시간 전"
                        text="우리 집 앞!"
                    />
                    <Comment
                        creator="아이브"
                        createdAt="7시간 전"
                        text="서울!"
                    />
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
