import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Post, Replies } from "@prisma/client";
// utils
import {
    useUser,
    useMutation,
    useToggleModal,
    useFocusEvent,
} from "@libs/client";
// components
import { Anchor, Layout, LoadingSuspense } from "components";
// dynamic components
const ProfileCard = dynamic(() => import("@components/Molecules/ProfileCard"), {
    loading: () => <LoadingSuspense />,
});
const PostDetailWithReply = dynamic(
    () => import("@components/Templates/PostDetailWithReply"),
    { loading: () => <LoadingSuspense variant="circle" /> }
);
const DeleteModal = dynamic(() => import("@components/Organisms/DeleteModal"));
const FloatingAnchor = dynamic(
    () => import("@components/Molecules/FloatingAnchor")
);
const PencilSquare = dynamic(
    () => import("@components/Atoms/icons/pencilSquare")
);

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

interface ReplyReturn {
    status: boolean;
    newReply: Replies;
}

// Page
const PostDetail: NextPage = () => {
    const { query, asPath } = useRouter();
    const { user } = useUser();
    const { onKeyDownEnter } = useFocusEvent("itself");

    // fetching post
    const { data, mutate } = useSWR<PostReturn | undefined>(
        query.id ? `/api/posts/${query.id}` : null
    );

    // toggle interested/non-interested
    const [toggleInterest, { loading: interestLoading }] = useMutation({
        url: `/api/posts/${query.id}/interest`,
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

    // upload reply
    const [replying, { data: replyData, loading: replyLoading }] =
        useMutation<ReplyReturn>({
            url: `/api/posts/${query.id}/replies`,
            method: "POST",
        });

    // for delete reply
    const { modal, toggleModal } = useToggleModal();
    const [deleteReplyId, setDeleteReplyId] = useState<number | undefined>();

    // delete reply
    const [
        deleteReply,
        { data: deleteReplyReturn, loading: deleteReplyLoading },
    ] = useMutation<{
        status: boolean;
    }>({
        url: `/api/posts/${query.id}/replies`,
        method: "DELETE",
    });

    // delete reply handler
    const _onClickDeleteReply = (replyId: number) => {
        setDeleteReplyId(replyId);
        toggleModal();
    };

    // after submit
    useEffect(() => {
        if (replyData && replyData.status) {
            mutate();
        }
    }, [replyData, mutate]);

    // delete reply
    useEffect(() => {
        if (deleteReplyReturn && deleteReplyReturn?.status) {
            mutate();
        }
    }, [deleteReplyReturn, mutate]);

    return (
        <Layout
            title={"커뮤니티"}
            backwardButton
            configTab
            metaContent="Posting page on the Community tab. Read posts and upload comments, or express your interest with the Like button."
        >
            {modal && (
                <DeleteModal
                    loading={deleteReplyLoading}
                    onClickConfirm={() => {
                        deleteReply({ replyId: deleteReplyId });
                        toggleModal();
                    }}
                />
            )}

            <div className="md:max-w-7xl mx-auto pt-4 px-4">
                <Anchor href={`/profile/${data?.post?.userId}`}>
                    <ProfileCard
                        onKeyDown={onKeyDownEnter}
                        tabIndex={0}
                        avatar={data?.post?.user?.avatarUrl}
                        username={data?.post?.user?.username}
                        subtext={"프로필 보기"}
                    />
                </Anchor>
            </div>

            <PostDetailWithReply
                mutatorFn={replying}
                onClickInterest={_onClickInterest}
                post={data?.post}
                isInterested={data?.isInterest}
                replyLoading={replyLoading}
                currentUser={user?.id}
                onClickDeleteReply={_onClickDeleteReply}
            />

            {user?.id === data?.post.userId && (
                <FloatingAnchor href={`${asPath}/update`}>
                    <PencilSquare />
                </FloatingAnchor>
            )}
        </Layout>
    );
};

export default PostDetail;
