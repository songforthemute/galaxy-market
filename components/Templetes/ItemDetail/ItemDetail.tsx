import dynamic from "next/dynamic";
// types
import type { Product } from "@prisma/client";
// styles
import s from "./ItemDetail.module.css";
// utils
import { booleanCls, convertPrice } from "@libs/client/util";
// components
import { Anchor, Button, Heart, Img, Text } from "@components/Atoms";
import { ProfileCard } from "@components/Molecules";

const ItemThumbnail = dynamic(
    () => import("@components/Molecules/ItemThumbnail")
);

// interfaces
interface ProductWithUserInterface extends Product {
    user: {
        username: string;
        avatarUrl: string;
    };
}

interface Props {
    item?: ProductWithUserInterface;
    related?: Product[];
    isLiked?: boolean;
    isOwner?: boolean;
    onClickButton?: () => void;
    onToggleLike?: () => void;
}

const ItemDetail = ({
    item,
    related,
    isLiked = false,
    isOwner = false,
    onClickButton,
    onToggleLike,
}: Props) => {
    return (
        <section className={s.root}>
            {item?.image ? (
                <Img src={item?.image} className={s.image} priority />
            ) : (
                <div className={s.empty} />
            )}

            <Anchor href={`/profile/${item?.userId}`}>
                <button className={s.profile}>
                    <ProfileCard
                        avatar={item?.user.avatarUrl}
                        username={item?.user.username}
                        subtext="프로필 보기"
                    />
                </button>
            </Anchor>

            {/* 상품 상세 */}
            <article className={s.main}>
                <Text variant="pageHeading">{item?.name}</Text>
                <Text variant="span">{convertPrice(item?.price)} 원</Text>
                <Text className={s.description}>{item?.description}</Text>
            </article>

            <div className={s.interactive}>
                <Button onClick={onClickButton}>
                    {isOwner ? `판매자에게 연락하기` : `이런 상품은 어떠세요?`}
                </Button>
                <button onClick={onToggleLike}>
                    <Heart
                        strokeWidth={1.5}
                        w={7}
                        h={7}
                        className={booleanCls(isLiked, s.like, s.dislike)}
                    />
                </button>
            </div>

            {/* 연관된 상품 */}
            <Text variant="pageHeading">이런 상품은 어떠세요?</Text>
            <article className={s.related}>
                {related?.map((v) => (
                    <Anchor href={`/products/${v.id}`} key={`related_${v.id}`}>
                        <button>
                            <ItemThumbnail
                                image={v.image}
                                subTitle={`₩ ${convertPrice(v.price)}`}
                                title={v.name}
                            />
                        </button>
                    </Anchor>
                ))}
            </article>
        </section>
    );
};

export default ItemDetail;
