// types
import type { Post } from "@prisma/client";
// styles
import s from "./Posting.module.css";
// utils
import { convertDate } from "@libs/client/util";
// components
import { Badge, Text } from "@components/Atoms";
import { PostReaction } from "@components/Molecules";

interface Props extends Post {
    user: {
        username: string;
    };
    _count: {
        replies: number;
        interest: number;
    };
}

const Posting = ({
    title,
    updated,
    tag,
    user: { username },
    _count: { replies, interest },
}: Props) => {
    return (
        <article className={s.root}>
            <Badge className={s.badge} disabled>
                {tag}
            </Badge>

            <Text variant="contentsHeading" className={s.title}>
                <span>Q. </span>
                {title}
            </Text>
            <div className={s.detail}>
                <Text variant="span">{username}</Text>
                <Text variant="span">{convertDate(updated!, "Full")}</Text>
            </div>

            <PostReaction
                interest={interest}
                replies={replies}
                className={s.reaction}
            />
        </article>
    );
};

export default Posting;
