// types
import type { Post } from "@prisma/client";
// styles
import s from "./PostCard.module.css";
// utils
import { convertDate } from "@libs/client/util";
// components
import { Anchor, Badge, Text } from "@components/Atoms";
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
}

const Posting = ({ data }: Props) => {
    return (
        <article>
            <Anchor href={`/community/${data?.id}`}>
                <button className={s.button} key={data?.id}>
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
                </button>
            </Anchor>
        </article>
    );
};

export default Posting;
