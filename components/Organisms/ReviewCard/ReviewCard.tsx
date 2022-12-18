// types
import type { Review } from "@prisma/client";
// utils
import { convertDate } from "@libs/client/util";
// styles
import s from "./ReviewCard.module.css";
// components
import { Anchor, Star, Text } from "@components/Atoms";
import { ProfileCard } from "@components/Molecules";

interface ReviewWithUser extends Review {
    createdBy: {
        id: number;
        username: string;
        avatarUrl?: string;
    };
    product: {
        name: string;
        option: string;
        image: string;
    };
}

interface Props {
    data?: ReviewWithUser;
}

const ReviewCard = ({ data }: Props) => {
    return (
        <article className={s.root}>
            <Anchor className={s.anchor} href={`/profile/${data?.createdById}`}>
                <button className={s.button}>
                    <ProfileCard
                        avatar={data?.createdBy.avatarUrl}
                        username={data?.createdBy.username}
                        subtext={[0, 0, 0, 0, 0].map((_, i) => (
                            <Star
                                fill={(data?.star || 0) > i}
                                w={4}
                                h={4}
                                className="text-primary-medium inline-flex"
                                key={`score_${i}`}
                            />
                        ))}
                    />
                </button>
            </Anchor>

            <Text className={s.review} variant="paragraph">
                {data?.text}
            </Text>

            <Anchor className={s.anchor} href={`/products/${data?.productId}`}>
                <button className={s.button}>
                    <ProfileCard
                        avatar={data?.product.image}
                        username={data?.product.name}
                        isSquare
                        subtext={convertDate(data?.created!)}
                    />
                </button>
            </Anchor>
        </article>
    );
};

export default ReviewCard;
