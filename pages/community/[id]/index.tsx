import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Post, Replies } from "@prisma/client";
// custom hooks
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/useMutation";
import { useToggleModal } from "@libs/hooks/useToggle";
// components
import Layout from "@components/layout";
import { PostDetailWithReply } from "@components/Templetes";

const DeleteModal = dynamic(() => import("@components/Organisms/DeleteModal"));
const FloatingButton = dynamic(
    () => import("@components/Molecules/FloatingButton")
);
const Anchor = dynamic(() => import("@components/Atoms/Anchor"));
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

    // after submit & delete reply
    useEffect(() => {
        if (
            (replyData && replyData.status) ||
            (deleteReplyReturn && deleteReplyReturn?.status)
        ) {
            mutate();
        }
    }, [replyData, deleteReplyReturn, mutate]);

    return (
        <Layout title={"커뮤니티"} canGoBack>
            {modal && (
                <DeleteModal
                    loading={deleteReplyLoading}
                    onClickConfirm={() => {
                        deleteReply({ replyId: deleteReplyId });
                        toggleModal();
                    }}
                />
            )}

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
                <FloatingButton>
                    <Anchor href={`${asPath}/update`}>
                        <PencilSquare />
                    </Anchor>
                </FloatingButton>
            )}
        </Layout>
    );
};

export default PostDetail;
