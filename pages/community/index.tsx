import type { NextPage } from "next";
import Posting from "@components/post";
import HelperBtn from "@components/helperBtn";
import Layout from "@components/layout";
import useSWR from "swr";
import { Post } from "@prisma/client";

interface PostWithReaction extends Post {
    user: {
        username: string;
    };
    _count: {
        replies: number;
        interest: number;
    };
}

interface PostsReturn {
    status: boolean;
    post: PostWithReaction[];
}

const Community: NextPage = () => {
    const { data } = useSWR<PostsReturn>("/api/posts");

    return (
        <Layout title="동네이야기" hasTabBar canGoBack hasConfig>
            {data?.post ? (
                <div className="-mb-2">
                    {data?.post.map((p) => (
                        <Posting
                            href={`/community/${p.id}`}
                            key={p.id}
                            badge="궁금해요"
                            text={p.title}
                            creator={p.user.username}
                            createdAt={String(p.created)}
                            interested={p._count.interest}
                            reply={p._count.replies}
                        />
                    ))}
                </div>
            ) : (
                // Skeleton Loading Component
                <div className="p-4 flex w-full flex-1 flex-col items-center mb-8 transition-all">
                    <div className="w-full animate-pulse flex-row items-center justfiy-center space-y-4">
                        <div className="h-24 rounded-md bg-slate-200" />
                        <div className="h-8 rounded-md bg-slate-200" />
                        <div className="h-24 rounded-md bg-slate-200" />
                        <div className="h-8 rounded-md bg-slate-200" />
                    </div>
                </div>
            )}

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
