import type { NextPage } from "next";
import Post from "@components/post";
import HelperBtn from "@components/helperBtn";
import Layout from "@components/layout";

const Community: NextPage = () => {
    return (
        <Layout title="동네이야기" hasTabBar canGoBack hasConfig>
            <div className="-mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((v, i) => (
                    <Post
                        href="/community/1"
                        key={i}
                        badge="궁금해요"
                        text="이 주변의 어디 피자집이 제일 맛있나요?"
                        creator="조이"
                        createdAt="11 hours ago"
                        interested={2}
                        reply={1}
                    />
                ))}
            </div>

            <HelperBtn href={"/community/posting"}>
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                </svg>
            </HelperBtn>
        </Layout>
    );
};

export default Community;
