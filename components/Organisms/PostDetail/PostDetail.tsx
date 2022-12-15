// types
import { Post } from "@prisma/client";
// styles
import s from "./PostDetail.module.css";
// components
import { PostReaction, ProfileCard } from "@components/Molecules";
import { Anchor, Badge, Text } from "@components/Atoms";
import { convertDate } from "@libs/client/util";

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
        <section className={s.root}>
            <button className={s.profile}>
                <Anchor href={`/profile/${post?.userId}`}>
                    <ProfileCard
                        avatar={post?.user?.avatarUrl}
                        username={post?.user?.username}
                        subtext={"프로필 보기"}
                    />
                </Anchor>
            </button>

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
        </section>
    );
};

export default PostDetail;
