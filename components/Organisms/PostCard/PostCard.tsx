// types
import type { Post } from "@prisma/client";
import type { KeyboardEvent } from "react";
// styles
import s from "./PostCard.module.css";
// utils
import { convertDate } from "@libs/client";
// components
import { Badge, Text } from "@components/Atoms";
import { PostReaction } from "@components/Molecules";

interface PostWithReaction extends Post {
    user: {
        username: string;
    };
    _count: {
        replies: number;
        interest: number;
    };
}

interface Props {
    data?: PostWithReaction;
    onKeyDown?: (e: KeyboardEvent) => void;
    tabIndex?: number;
}

const PostCard = ({ data, onKeyDown, tabIndex }: Props) => {
    return (
        <div onKeyDown={onKeyDown} tabIndex={tabIndex} className={s.container}>
            <Badge className={s.badge} disabled>
                {data?.tag}
            </Badge>

            <Text variant="contentsHeading" className={s.title}>
                <span>Q. </span>
                {data?.title}
            </Text>
            <div className={s.detail}>
                <Text variant="span">{data?.user.username}</Text>
                <Text variant="span">
                    {convertDate(data?.updated!, "Full")}
                </Text>
            </div>

            <PostReaction
                interest={data?._count.interest}
                replies={data?._count.replies}
                className={s.reaction}
            />
        </div>
    );
};

export default PostCard;
