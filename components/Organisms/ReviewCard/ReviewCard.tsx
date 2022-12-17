// utils
import { convertDate } from "@libs/client/util";
// styles
import s from "./ReviewCard.module.css";
// components
import { Anchor, Img, Star, Text } from "@components/Atoms";
import { ProfileCard } from "@components/Molecules";

interface Props {
    avatar?: string | null;
    score?: number;
    username?: string;
    userId?: number;
    productImage?: string | null;
    productName?: string;
    productId?: string;
    review?: string;
    date?: Date;
}

const ReviewCard = ({
    avatar = null,
    score = 0,
    username,
    productId,
    productImage,
    productName,
    userId,
    review,
    date,
}: Props) => {
    return (
        <article className={s.root}>
            <Anchor href={`/profile/${userId}`}>
                <button className={s.button}>
                    <ProfileCard
                        avatar={avatar}
                        username={username}
                        subtext={[0, 0, 0, 0, 0].map((_, i) => (
                            <Star
                                fill={score > i}
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
                {review}
            </Text>

            <Anchor href={`/products/${productId}`}>
                <button className={s.button}>
                    <div className={s.product}>
                        {productImage ? (
                            <Img
                                src={productImage}
                                className={s.image}
                                priority
                            />
                        ) : (
                            <div className={s.empty} />
                        )}

                        <div className={s.textbox}>
                            <Text className={s.title} variant="contentsHeading">
                                {productName}
                            </Text>
                            <Text className={s.date} variant="span">
                                {convertDate(date!)}
                            </Text>
                        </div>
                    </div>
                </button>
            </Anchor>
        </article>
    );
};

export default ReviewCard;
