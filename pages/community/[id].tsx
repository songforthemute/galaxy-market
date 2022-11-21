import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import useSWR from "swr";
// types
import type { NextPage } from "next";
import type { Post, Replies } from "@prisma/client";
// custom hooks
import useMutation from "@libs/client/useMutation";
// components
import Btn from "@components/btn";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import SkeletonUserCard from "@components/skeleton/userCard";
import SkeletonBadge from "@components/skeleton/badge";
import SkeletonPostingBody from "@components/skeleton/postingBody";

// dynamic imports
const Reply = dynamic(() => import("@components/reply"), {
    ssr: false,
    suspense: true,
});
const UserCard = dynamic(() => import("@components/userCard"), {
    ssr: false,
    suspense: true,
});
const Badge = dynamic(() => import("@components/badge"), {
    ssr: false,
    suspense: true,
});
const PostingBody = dynamic(() => import("@components/postingBody"), {
    ssr: false,
    suspense: true,
});
const ErrorMessage = dynamic(() => import("@components/errMessage"), {
    ssr: false,
});

// interfaces
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

// Page
const PostDetail: NextPage = () => {
    const router = useRouter();

    // fetch post data
    const { data, mutate } = useSWR<PostReturn | undefined>(
        router.query.id ? `/api/posts/${router.query.id}` : null
    );

    // toggle interested/cancel
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

    // fetch for replying
    const [replying, { data: replyData, loading: replyLoading }] =
        useMutation<ReplyReturn>({
            url: `/api/posts/${router.query.id}/replies`,
            method: "POST",
        });

    // submit reply form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReplyForm>();
    const _onValid = (form: ReplyForm) => {
        if (replyLoading) return;

        replying(form);
    };

    // after submit reply form
    useEffect(() => {
        if (replyData && replyData.status) {
            reset();
            mutate();
        }
    }, [replyData, reset, mutate]);

    return (
        // 스테이트 전달로 동적 타이틀 변화
        <Layout title={"커뮤니티"} canGoBack>
            {data?.post && (
                <>
                    <Suspense fallback={<SkeletonUserCard />}>
                        <UserCard
                            username={data.post.user.username}
                            avatarUrl={data.post.user.avatarUrl}
                            text="프로필 보기 →"
                            href={`/profile/${data.post.userId}`}
                            type="profile"
                        />
                    </Suspense>

                    <Suspense fallback={<SkeletonBadge />}>
                        <Badge text={data.post.tag} isLarge />
                    </Suspense>

                    <Suspense fallback={<SkeletonPostingBody />}>
                        <PostingBody
                            title={data.post.title}
                            description={data.post.description}
                            created={data.post.created}
                            _onClickInterest={_onClickInterest}
                            isInterested={data.isInterest}
                            interest={data.post._count.interest}
                            replies={data.post._count.replies}
                        />
                    </Suspense>

                    {/* Post's Replies */}
                    <div className="pb-4 px-4 my-4 space-y-4 border-b">
                        {data?.post.replies.map((reply) => (
                            <Reply
                                key={reply.id}
                                created={reply.created}
                                text={reply.text}
                                username={reply.user.username}
                                avatarUrl={reply.user.avatarUrl}
                            />
                        ))}
                    </div>

                    {/* Post's Textarea to Register new Reply */}
                    <form onSubmit={handleSubmit(_onValid)} className="px-4">
                        <TxtArea
                            required
                            register={register("reply", {
                                required: "댓글을 입력해주세요.",
                            })}
                            name="reply"
                            label="댓글"
                            placeholder="댓글을 적어주세요."
                        />

                        {errors?.reply?.message && (
                            <ErrorMessage text={errors.reply.message} />
                        )}

                        <Btn
                            text={
                                replyLoading
                                    ? "댓글을 업로드하고 있어요"
                                    : "답변하기"
                            }
                        />
                    </form>
                </>
            )}
        </Layout>
    );
};

export default PostDetail;
