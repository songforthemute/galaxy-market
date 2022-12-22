import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
// hooks
import { useToggleModal } from "@libs/hooks/useToggle";
import useMutation from "@libs/client/useMutation";
//types
import type { Replies, Post } from "@prisma/client";
import type { NextPage } from "next";
// components
import Layout from "@components/layout";
import { UploadPostForm } from "@components/Templetes";
import { FloatingButton } from "@components/Molecules";
import { Bin } from "@components/Atoms";
import { DeleteModal } from "@components/Organisms";

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
interface UploadReturn {
    status: boolean;
    post: Post;
}

const UpdatePost: NextPage = () => {
    const { push, asPath } = useRouter();
    const postId = asPath.split("/")[2];

    const { modal, toggleModal } = useToggleModal();
    const _onClickDelete = async () => {
        deleteMutation({ id: postId });
        await push("/community");
    };

    // preset value
    const { data: preset } = useSWR<PostReturn | undefined>(
        `/api/posts/${postId}`
    );

    // for update
    const [mutation, { loading, data }] = useMutation<UploadReturn>({
        url: `/api/posts/${postId}`,
        method: "PUT",
    });

    // for delete
    const [deleteMutation, { loading: deleteLoading }] =
        useMutation<UploadReturn>({
            url: `/api/posts/${postId}`,
            method: "DELETE",
        });

    // success fetch
    useEffect(() => {
        if (data?.status === true) {
            push(`/community/${postId}`);
        }
    }, [data]);

    return (
        <Layout title="게시글 업데이트" backwardButton configTab>
            {modal && (
                <DeleteModal
                    loading={deleteLoading}
                    onClickConfirm={_onClickDelete}
                />
            )}

            <UploadPostForm
                loading={loading}
                mutatorFn={mutation}
                preset={preset?.post}
            />

            <FloatingButton
                className="hover:text-rose-400"
                onClick={() => toggleModal()}
            >
                <Bin className="mx-auto" />
            </FloatingButton>
        </Layout>
    );
};

export default UpdatePost;
