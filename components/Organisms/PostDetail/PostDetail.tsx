// types
import { Post } from "@prisma/client";
// utils
import { convertDate } from "@libs/client";
// styles
import s from "./PostDetail.module.css";
// components
import { PostReaction } from "@components/Molecules";
import { Badge, Text } from "@components/Atoms";

interface PostWithUserAndReaction extends Post {
    user?: {
        username: string;
        avatarUrl: string | null;
    };
    _count?: {
        replies: number;
        interest: number;
    };
}

interface Props {
    post?: PostWithUserAndReaction;
    onClickInterest?: () => void;
    isInterested?: boolean;
}

const PostDetail = ({ post, onClickInterest, isInterested }: Props) => {
    return (
        <article className={s.root}>
            <Badge disabled>{post?.tag}</Badge>

            <Text variant="contentsHeading" className={s.title}>
                <span>Q. </span>
                {post?.title}
            </Text>

            <Text variant="body" className={s.description}>
                {post?.description}
            </Text>

            <Text className={s.detail} variant="span">
                {convertDate(post?.updated!, "Full")}
            </Text>

            <PostReaction
                isInterested={isInterested}
                interest={post?._count?.interest}
                replies={post?._count?.replies}
                className={s.reaction}
                onClickInterest={onClickInterest}
            />
        </article>
    );
};

export default PostDetail;
