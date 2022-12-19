import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
// types
import type { Post, Replies } from "@prisma/client";
// styles
import s from "./PostDetailWithReply.module.css";
// components
import { PostDetail } from "@components/Organisms";
import { ProfileCard, TextareaWithLabel } from "@components/Molecules";
import { Anchor, Button } from "@components/Atoms";
import useFocusEvent from "@libs/client/useFocusEvent";

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
    const { onKeyDownEnter } = useFocusEvent("itself");
    const { register, handleSubmit, reset } = useForm<FormInterface>();
    const _onSubmit = (data: FormInterface) => {
        if (replyLoading) return;

        reset();
        mutatorFn(data);
    };

    return (
        <section className={s.root}>
            <Anchor href={`/profile/${post?.userId}`}>
                <ProfileCard
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    avatar={post?.user?.avatarUrl}
                    username={post?.user?.username}
                    subtext={"프로필 보기"}
                />
            </Anchor>

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
                                    onClick={() => onClickDeleteReply(v.id)}
                                    className={s.deleteReply}
                                >
                                    <Close w={5} h={5} strokeWidth={1.75} />
                                </button>
                            )}
                        </ReplyDetail>
                    ))}
            </div>

            <form className={s.form} onSubmit={handleSubmit(_onSubmit)}>
                <TextareaWithLabel
                    id="reply"
                    label="댓글 달기"
                    placeholder="등록할 댓글을 입력해주세요."
                    register={register("reply", {
                        required: "반드시 입력해야하는 필드입니다.",
                    })}
                />

                <Button loading={replyLoading} className={s.button}>
                    댓글 업로드하기
                </Button>
            </form>
        </section>
    );
};

export default PostDetailWithReply;
