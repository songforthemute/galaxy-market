// types
import type { Product } from "@prisma/client";
// util
import useFocusEvent from "@libs/client/useFocusEvent";
// styles
import s from "./ItemCard.module.css";
// components
import { Anchor, Heart, Img, Quantity, Text } from "@components/Atoms";
import { convertPrice } from "@libs/client/util";

interface ProductWithLike extends Product {
    _count: {
        record: number;
    };
}

interface Props {
    product: ProductWithLike;
}

const Item = ({ product }: Props) => {
    const { onKeyDownEnter } = useFocusEvent();

    return (
        <article>
            <Anchor className={s.root} href={`/products/${product?.id}`}>
                <div
                    onKeyDown={onKeyDownEnter}
                    tabIndex={0}
                    className={s.container}
                >
                    {product?.image ? (
                        <Img
                            alt="item"
                            src={product.image}
                            className={s.image}
                            priority
                        />
                    ) : (
                        <div className={s.empty} />
                    )}

                    <div className={s.summary}>
                        <Text variant="contentsHeading" className={s.title}>
                            {product?.name}
                        </Text>
                        <Text variant="span" className={s.option}>
                            {product?.option}
                        </Text>
                        <Text variant="body" className={s.price}>
                            ₩ {convertPrice(product?.price)}
                        </Text>
                    </div>

                    <Quantity className={s.preferences}>
                        <Heart w={4} h={4} />
                        {product?._count.record}
                    </Quantity>
                </div>
            </Anchor>
        </article>
    );
};

export default Item;
