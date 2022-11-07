import type { NextPage } from "next";
import Posting from "@components/post";
import HelperBtn from "@components/helperBtn";
import Layout from "@components/layout";
import { Post } from "@prisma/client";
import useGetKey from "@libs/client/useGetKey";
import useSWRInfinite from "swr/infinite";
import { dateConverter } from "@libs/client/util";
import { useEffect } from "react";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";

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
    posts: PostWithReaction[];
    pageNum: number;
    error?: string;
}

const Community: NextPage = () => {
    const getKey = useGetKey<PostsReturn>({
        url: `/api/posts`,
        hasQuery: false,
    });
    const { data, setSize } = useSWRInfinite<PostsReturn>(getKey);
    const page = useInfiniteScrollDown();

    const posts = !data?.[0]?.error
        ? data?.map((data) => data.posts).flat()
        : undefined;

    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    return (
        <Layout title="커뮤니티" hasTabBar canGoBack hasConfig>
            {data && posts ? (
                <div className="-mb-2">
                    {posts?.map((post) => (
                        <Posting
                            href={`/community/${post.id}`}
                            key={post.id}
                            badge={post.tag}
                            text={post.title}
                            creator={post.user.username}
                            createdAt={dateConverter(post.created, "Full")}
                            interested={post._count.interest}
                            reply={post._count.replies}
                        />
                    ))}
                </div>
            ) : (
                // Skeleton Loading Component
                <div className="p-4 flex w-full flex-1 flex-col items-center mb-8 transition-all">
                    <div className="w-full animate-pulse flex-row items-center justfiy-center space-y-4">
                        <div className="h-24 rounded-md bg-slate-200" />
                        <div className="h-8 rounded-md bg-slate-200" />
                        <div className="h-24 rounded-md bg-slate-100" />
                        <div className="h-8 rounded-md bg-slate-100" />
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
