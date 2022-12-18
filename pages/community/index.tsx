import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Post } from "@prisma/client";
// custom hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// components
import Layout from "@components/layout";
import { FloatingButton } from "@components/Molecules";
import { Add, Anchor, Badge } from "@components/Atoms";

const PostCard = dynamic(() => import("@components/Organisms/PostCard"));

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
    // tag for filter posts
    const [selected, setSelected] = useState("모두");
    const _onClickCategory = (e: React.MouseEvent<HTMLSpanElement>) => {
        const { innerHTML } = e.target as HTMLSpanElement;
        setSelected(innerHTML);
        mutate();
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
        <Layout title="커뮤니티" hasTabBar canGoBack hasConfig>
            <div className="flex p-2 gap-2">
                {["모두", "질문", "정보", "후기", "자유"].map((v, i) => (
                    <button
                        key={i}
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
                    <PostCard key={`post_${post.id}`} data={post} />
                ))}
            </section>

            <Anchor
                className="aspect-square rounded-full"
                href={"/community/upload"}
            >
                <FloatingButton>
                    <Add className="mx-auto" />
                </FloatingButton>
            </Anchor>
        </Layout>
    );
};

export default Community;
