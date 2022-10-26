import type { NextPage } from "next";
import Btn from "@components/btn";
import Reply from "@components/reply";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import UserCard from "@components/userCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, Replies } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { count } from "console";
import { cls } from "@libs/client/util";

interface RepliesWithUser extends Replies {
    user: {
        id: number;
        username: string;
        avatarUrl: string;
    };
}

interface PostWithUser extends Post {
    user: {
        username: string;
        avatarUrl: string;
    };
    _count: {
        replies: number;
        interest: number;
    };
    replies: RepliesWithUser[];
}

interface PostReturn {
    status: boolean;
    post: PostWithUser;
    isInterest: boolean;
}

const PostDetail: NextPage = () => {
    const router = useRouter();
    const { data, mutate } = useSWR<PostReturn | undefined>(
        router.query.id ? `/api/posts/${router.query.id}` : null
    );

    const [toggleInterest] = useMutation(
        `/api/posts/${router.query.id}/interest`
    );
    const _onClickInterest = () => {
        if (!data) return;

        toggleInterest({});
        mutate(
            {
                ...data,
                post: {
                    ...data.post,
                    _count: {
                        ...data.post._count,
                        interest: data.isInterest
                            ? data.post._count.interest - 1
                            : data.post._count.interest + 1,
                    },
                },
                isInterest: !data.isInterest,
            },
            false
        );
    };

    console.log(data);

    return (
        // 스테이트 전달로 동적 타이틀 변화
        <Layout title={"동네이야기"} hasTabBar canGoBack>
            {data?.post ? (
                <>
                    <UserCard
                        username={data.post.user?.username}
                        avatarUrl={data.post.user?.avatarUrl}
                        text="프로필 보기 →"
                        href="/profile"
                        type="profile"
                    />

                    <div className="mt-2 px-4 text-gray-700 text-xl">
                        <span className="text-purple-400 font-medium">Q. </span>
                        <span className="font-medium">{data.post.title}</span>
                    </div>

                    <div className="mt-2 ml-6 px-4 text-gray-700">
                        <p className="">{data.post.description}</p>
                    </div>

                    {/* Post's Reactions */}
                    <div className="flex px-4 space-x-4 mt-4 text-gray-700 py-2 border-t border-b w-full">
                        <button
                            onClick={_onClickInterest}
                            className={cls(
                                "flex space-x-2 items-center text-sm transition-all cursor-pointer hover:animate-bounce",
                                data.isInterest
                                    ? "font-semibold text-emerald-400 text- hover:text-gray-400 hover:font-normal"
                                    : "font-normal hover:text-emerald-400 hover:font-semibold"
                            )}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>궁금해요 {data.post._count.interest}</span>
                        </button>
                        <span className="flex space-x-2 items-center text-sm">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                ></path>
                            </svg>
                            <span>댓글 {data.post._count.replies}</span>
                        </span>
                    </div>

                    {/* Post's Replies */}
                    {data.post.replies.map((reply) => {
                        <div className="pb-4 px-4 my-4 space-y-4 border-b">
                            <Reply
                                key={reply?.id}
                                creator={reply?.user.username}
                                createdAt={reply.created.toDateString()}
                                imgUrl={reply.user.avatarUrl}
                                text={reply.text}
                            />
                        </div>;
                    })}

                    {/* Post's Textarea to Register new Reply */}
                    <div className="px-4">
                        <TxtArea
                            name="reply"
                            label="댓글"
                            placeholder="댓글을 적어주세요."
                        />

                        <Btn text="답변하기" />
                    </div>
                </>
            ) : (
                // Skeleton Loading Component
                <div className="p-4 flex w-full flex-1 flex-col items-center mb-8">
                    <div className="w-full animate-pulse flex-row items-center justfiy-center space-x-1 space-y-4">
                        <div className="h-20 rounded-md bg-gray-400" />
                        <div className="flex flex-col mt-8 space-y-2">
                            <div className="h-10 w-1/2 rounded-md bg-gray-400" />
                            <div className="h-16 w-2/3 rounded-md bg-gray-400" />
                            <div className="h-10 rounded-md bg-gray-400" />
                        </div>
                        <div className="h-32 rounded-md bg-gray-400" />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default PostDetail;
