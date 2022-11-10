import type { NextPage } from "next";
import Btn from "@components/btn";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import UserCard from "@components/userCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, Replies } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls, dateConverter, getImgSource } from "@libs/client/util";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Badge from "@components/badge";

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

interface ReplyForm {
    reply: string;
}

interface ReplyReturn {
    status: boolean;
    newReply: Replies;
}

const PostDetail: NextPage = () => {
    const router = useRouter();
    // Click Interest
    const { data, mutate } = useSWR<PostReturn | undefined>(
        router.query.id ? `/api/posts/${router.query.id}` : null
    );
    const [toggleInterest, { loading: interestLoading }] = useMutation({
        url: `/api/posts/${router.query.id}/interest`,
        method: "POST",
    });
    const _onClickInterest = () => {
        if (!data) return;

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

        // Preventing the occurrence of Race condition due to clicking hard
        if (!interestLoading) toggleInterest({});
    };

    // Register new reply
    const { register, handleSubmit, reset } = useForm<ReplyForm>();
    const [replying, { data: replyData, loading: replyLoading }] =
        useMutation<ReplyReturn>({
            url: `/api/posts/${router.query.id}/replies`,
            method: "POST",
        });
    const _onValid = (form: ReplyForm) => {
        if (replyLoading) return;

        replying(form);
    };

    useEffect(() => {
        if (replyData && replyData.status) {
            reset();
            mutate();
        }
    }, [replyData, reset, mutate]);

    return (
        // 스테이트 전달로 동적 타이틀 변화
        <Layout title={"커뮤니티"} hasTabBar canGoBack>
            {data?.post ? (
                <>
                    <UserCard
                        username={data.post.user?.username}
                        avatarUrl={getImgSource(
                            data.post.user?.avatarUrl,
                            "avatar"
                        )}
                        text="프로필 보기 →"
                        href={`/profile/${data.post.userId}`}
                        type="profile"
                    />

                    <Badge text={data.post.tag} isLarge />

                    <div className="px-4 text-xl font-medium">
                        <span className="text-purple-400">Q. </span>
                        <span className="text-slate-700">
                            {data.post.title}
                        </span>
                    </div>
                    <div className="mt-2 px-4 space-y-2">
                        <p className="text-slate-700">
                            {data.post.description}
                        </p>

                        <div className="text-xs text-slate-400">
                            {dateConverter(data.post.created, "Full")}
                        </div>
                    </div>

                    {/* Post's Reactions */}
                    <div className="flex px-4 space-x-4 mt-4 text-slate-700 py-2 border-t border-b w-full">
                        <button
                            onClick={_onClickInterest}
                            className={cls(
                                "flex space-x-2 items-center text-sm transition-all cursor-pointer hover:animate-bounce",
                                data.isInterest
                                    ? "font-semibold text-emerald-400 text- hover:text-slate-400 hover:font-normal"
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
                    <div className="pb-4 px-4 my-4 space-y-4 border-b">
                        {data.post.replies.map((reply) => (
                            <div
                                key={reply.id}
                                className="flex items-start space-x-4"
                            >
                                {/* avatarUrl */}
                                {reply.user.avatarUrl ? (
                                    <img
                                        src={getImgSource(
                                            reply.user.avatarUrl,
                                            "avatar"
                                        )}
                                        alt="avatar"
                                        className="w-8 h-8 bg-slate-400 rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 bg-slate-400 rounded-full" />
                                )}

                                <div>
                                    <div className="text-sm font-medium text-slate-700">
                                        {reply.user.username}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        {dateConverter(reply.created, "Full")}
                                    </div>
                                    <p className="text-slate-700 mt-2">
                                        {reply.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Post's Textarea to Register new Reply */}
                    <form onSubmit={handleSubmit(_onValid)} className="px-4">
                        <TxtArea
                            required
                            register={register("reply", { required: true })}
                            name="reply"
                            label="댓글"
                            placeholder="댓글을 적어주세요."
                        />

                        <Btn
                            text={
                                replyLoading
                                    ? "댓글을 업로드하고 있어요"
                                    : "답변하기"
                            }
                        />
                    </form>
                </>
            ) : (
                // Skeleton Loading Component
                <div className="p-4 flex w-full flex-1 flex-col items-center mb-8 transition-all">
                    <div className="w-full animate-pulse flex-row items-center justfiy-center space-y-4">
                        <div className="h-20 rounded-md bg-slate-200" />
                        <div className="flex flex-col mt-8 space-y-2">
                            <div className="h-10 w-1/2 rounded-md bg-slate-200" />
                            <div className="h-16 w-2/3 rounded-md bg-slate-200" />
                            <div className="h-10 rounded-md bg-slate-200" />
                        </div>
                        <div className="h-32 rounded-md bg-slate-200" />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default PostDetail;
