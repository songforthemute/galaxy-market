// types
import type { Review } from "@prisma/client";
// utils
import { convertDate } from "@libs/client/util";
import useFocusEvent from "@libs/client/useFocusEvent";
// styles
import s from "./ReviewCard.module.css";
// components
import { Anchor, Close, Star, Text } from "@components/Atoms";
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
    userId?: number;
    onClickDelete: (reviewId: number) => void;
}

const ReviewCard = ({ data, userId, onClickDelete }: Props) => {
    const { onKeyDownEnter } = useFocusEvent("parent");

    return (
        <article className={s.root}>
            <Anchor
                as={data?.createdBy.avatarUrl ? "image" : undefined}
                className={s.anchor}
                href={`/profile/${data?.createdById}`}
            >
                <ProfileCard
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
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
            </Anchor>

            <Text className={s.review} variant="paragraph">
                {data?.text}
                {userId === data?.createdById && (
                    <button
                        onClick={() => onClickDelete(data?.id!)}
                        className={s.deleteReview}
                    >
                        <Close w={5} h={5} strokeWidth={1.75} />
                    </button>
                )}
            </Text>

            <Anchor
                as={data?.product.image ? "image" : undefined}
                className={s.anchor}
                href={`/products/${data?.productId}`}
            >
                <ProfileCard
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    avatar={data?.product.image}
                    username={data?.product.name}
                    isSquare
                    subtext={convertDate(data?.created!)}
                />
            </Anchor>
        </article>
    );
};

export default ReviewCard;
