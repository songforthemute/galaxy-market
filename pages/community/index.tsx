import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { MouseEvent, KeyboardEvent } from "react";
import type { Post } from "@prisma/client";
// utils
import { useFocusEvent, useGetKey, useInfiniteScrollDown } from "@libs/client";
// components
import {
    Layout,
    FloatingAnchor,
    Add,
    Anchor,
    Badge,
    LoadingSuspense,
} from "components";
// dynamic components
const PostCard = dynamic(() => import("@components/Organisms/PostCard"), {
    loading: () => <LoadingSuspense />,
});

// interfaes
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

// Page
const Community: NextPage = () => {
    const { onKeyDownEnter } = useFocusEvent("parent");
    // tag for filter posts
    const [selected, setSelected] = useState("모두");
    const _onClickCategory = (e: MouseEvent<HTMLSpanElement>) => {
        const { innerText } = e.target as HTMLSpanElement;
        setSelected(innerText);
        mutate();
    };
    const _onKeyDownCategory = (e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.code === "Enter") {
            const { innerText } = e.target as HTMLSpanElement;
            setSelected(innerText);
            mutate();
        }
    };

    // fetch data
    const getKey = useGetKey<PostsReturn>({
        url: `/api/posts?tag=${selected}`,
        hasQuery: true,
    });
    const { data, setSize, mutate } = useSWRInfinite<PostsReturn>(getKey);

    // set page number for infinite scroll
    const page = useInfiniteScrollDown();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // received dataset
    const [postings, setPostings] = useState<PostWithReaction[]>([]);
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setPostings(() => data.map((data) => data.posts).flat());
        } else {
            setPostings([]);
        }
    }, [data]);

    return (
        <Layout
            title="커뮤니티"
            backwardButton
            dockBar
            configTab
            metaContent="Main page of the Community tab. You can see the posts separated by the tag button."
        >
            <div className="flex p-2 gap-2">
                {["모두", "질문", "정보", "후기", "자유"].map((v, i) => (
                    <button
                        key={i}
                        onKeyDown={_onKeyDownCategory}
                        onClick={_onClickCategory}
                        className="rounded-lg transtion duration-300 focus:outline-none focus:ring-[1.5px] focus:ring-offset-2 focus:ring-primary-dark"
                    >
                        <Badge
                            className="transtion duration-300"
                            active={selected === v}
                        >
                            {v}
                        </Badge>
                    </button>
                ))}
            </div>

            <section className="flex flex-col">
                {postings.map((post) => (
                    <article key={`post_${post.id}`}>
                        <Anchor href={`/community/${post.id}`}>
                            <PostCard
                                data={post}
                                tabIndex={0}
                                onKeyDown={onKeyDownEnter}
                            />
                        </Anchor>
                    </article>
                ))}
            </section>

            <FloatingAnchor href={"/community/upload"}>
                <Add />
            </FloatingAnchor>
        </Layout>
    );
};

export default Community;
