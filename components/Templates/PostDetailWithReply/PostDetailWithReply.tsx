import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
// types
import type { Post, Replies } from "@prisma/client";
// styles
import s from "./PostDetailWithReply.module.css";
// components
import { PostDetail } from "@components/Organisms";
import { TextareaWithLabel } from "@components/Molecules";
import { Button } from "@components/Atoms";

const ReplyDetail = dynamic(() => import("@components/Organisms/ReplyDetail"));
const Close = dynamic(() => import("@components/Atoms/icons/close"));

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

interface FormInterface {
    reply: string;
}

interface Props {
    mutatorFn: (data: FormInterface | any) => void;
    onClickInterest: () => void;
    replyLoading?: boolean;
    isInterested?: boolean;
    post?: PostWithUser;
    currentUser?: number;
    onClickDeleteReply: (replyId: number) => void;
}

const PostDetailWithReply = ({
    mutatorFn,
    onClickInterest,
    replyLoading = false,
    isInterested,
    post,
    currentUser,
    onClickDeleteReply,
}: Props) => {
    const { register, handleSubmit, reset } = useForm<FormInterface>();
    const _onSubmit = (data: FormInterface) => {
        if (replyLoading) return;

        reset();
        mutatorFn(data);
    };

    return (
        <section className={s.root}>
            <PostDetail
                onClickInterest={onClickInterest}
                isInterested={isInterested}
                post={post}
            />

            <div className={s.container}>
                {post &&
                    post.replies.map((v) => (
                        <ReplyDetail
                            key={v.id}
                            avatar={v.user.avatarUrl}
                            created={v.created}
                            text={v.text}
                            username={v.user.username}
                        >
                            {currentUser === v.user.id && (
                                <button
                                    aria-label="Remove Reply Button"
                                    onClick={() => onClickDeleteReply(v.id)}
                                    className={s.deleteReply}
                                >
                                    <Close w={5} h={5} strokeWidth={1.75} />
                                </button>
                            )}
                        </ReplyDetail>
                    ))}
            </div>

            <form
                aria-label="Form for Upload Reply"
                className={s.form}
                onSubmit={handleSubmit(_onSubmit)}
            >
                <TextareaWithLabel
                    aria-label="Reply Input for Upload Reply"
                    id="reply"
                    label="?????? ??????"
                    placeholder="????????? ????????? ??????????????????."
                    register={register("reply", {
                        required: "????????? ?????????????????? ???????????????.",
                    })}
                />

                <Button loading={replyLoading} className={s.button}>
                    ?????? ???????????????
                </Button>
            </form>
        </section>
    );
};

export default PostDetailWithReply;
