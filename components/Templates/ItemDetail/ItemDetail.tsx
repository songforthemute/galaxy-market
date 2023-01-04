import dynamic from "next/dynamic";
// types
import type { Product } from "@prisma/client";
// styles
import s from "./ItemDetail.module.css";
// utils
import { booleanCls, convertPrice, useFocusEvent } from "@libs/client";
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
    const { onKeyDownEnter } = useFocusEvent("parent");

    return (
        <section className={s.root}>
            {item?.image ? (
                <Img
                    alt="item"
                    src={item?.image}
                    className={s.image}
                    priority
                />
            ) : (
                <div className={s.empty} />
            )}

            <Anchor
                className="border-y-[1px] p-2"
                href={`/profile/${item?.userId}`}
            >
                <ProfileCard
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    avatar={item?.user.avatarUrl}
                    username={item?.user.username}
                    subtext="프로필 보기"
                />
            </Anchor>

            {/* 상품 상세 */}
            <article className={s.main}>
                <Text variant="pageHeading">{item?.name}</Text>
                <Text variant="span">{convertPrice(item?.price)} 원</Text>
                <Text className={s.description}>{item?.description}</Text>
            </article>

            <div className={s.buttonContainer}>
                <Button className="w-full" onClick={onClickButton}>
                    {isOwner
                        ? item?.isSoldOut
                            ? `판매 재개하기`
                            : `판매 완료하기`
                        : `판매자에게 연락하기`}
                </Button>
                <button
                    aria-label="Like Item or not toggle Button"
                    onClick={onToggleLike}
                >
                    <Heart
                        strokeWidth={1.5}
                        className={booleanCls(isLiked, s.like, s.dislike)}
                    />
                </button>
            </div>

            {/* 연관된 상품 */}
            <Text variant="pageHeading">
                {related?.length
                    ? "이런 상품은 어떠세요?"
                    : "관련된 상품이 없는 것 같아요 😂"}
            </Text>
            <article className={s.related}>
                {related?.map((v) => (
                    <Anchor
                        as={v.image ? "image" : undefined}
                        href={`/products/${v.id}`}
                        key={`related_${v.id}`}
                    >
                        <ItemThumbnail
                            onKeyDown={onKeyDownEnter}
                            tabIndex={0}
                            image={v.image}
                            subTitle={`₩ ${convertPrice(v.price)}`}
                            title={v.name}
                            className={s.relatedItem}
                        />
                    </Anchor>
                ))}
            </article>
        </section>
    );
};

export default ItemDetail;
