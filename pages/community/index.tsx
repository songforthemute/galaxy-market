import type { NextPage } from "next";
import HelperBtn from "@components/helperBtn";
import Layout from "@components/layout";
import { Post } from "@prisma/client";
import useGetKey from "@libs/client/useGetKey";
import useSWRInfinite from "swr/infinite";
import React, { Suspense, useEffect, useState } from "react";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
import Badge from "@components/badge";
import dynamic from "next/dynamic";
import SkeletonPosting from "@components/skeleton/post";

const Posting = dynamic(() => import("@components/post"), {
    ssr: false,
    suspense: true,
});

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
    const [selected, setSelected] = useState("모두");
    const _onTagClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        const { innerHTML } = e.target as HTMLSpanElement;
        setSelected(innerHTML);
        mutate();
    };

    const getKey = useGetKey<PostsReturn>({
        url: `/api/posts?tag=${selected}`,
        hasQuery: true,
    });
    const { data, setSize, mutate } = useSWRInfinite<PostsReturn>(getKey);
    const page = useInfiniteScrollDown();

    // received dataset
    const [posts, setPosts] = useState<PostWithReaction[]>([]);

    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setPosts(() => data.map((data) => data.posts).flat());
        } else {
            setPosts([]);
        }
    }, [data]);

    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    return (
        <Layout title="커뮤니티" hasTabBar canGoBack hasConfig>
            <>
                {["모두", "질문", "정보", "후기", "자유"].map((v, i) => (
                    <Badge
                        text={v}
                        key={i}
                        isLarge
                        _onClick={_onTagClick}
                        isSelected={selected === v}
                    />
                ))}
            </>

            <div className="-mb-2">
                {posts.map((post) => (
                    <Suspense fallback={<SkeletonPosting />} key={post.id}>
                        <Posting
                            href={`/community/${post.id}`}
                            key={post.id}
                            badge={post.tag}
                            text={post.title}
                            creator={post.user.username}
                            createdAt={post.created}
                            createdAtOpts="Full"
                            interested={post._count.interest}
                            reply={post._count.replies}
                        />
                    </Suspense>
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
