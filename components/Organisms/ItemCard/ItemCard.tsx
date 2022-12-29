// types
import type { Product } from "@prisma/client";
// util
import { convertPrice, useFocusEvent } from "@libs/client";
// styles
import s from "./ItemCard.module.css";
// components
import { Anchor, Heart, Img, Quantity, Text } from "@components/Atoms";

interface ProductWithLike extends Product {
    _count: {
        record: number;
    };
}

interface Props {
    product: ProductWithLike;
    priority?: boolean;
}

const Item = ({ product, priority = false }: Props) => {
    const { onKeyDownEnter } = useFocusEvent();

    return (
        <article>
            <Anchor
                as={product.image ? "image" : undefined}
                className={s.root}
                href={`/products/${product?.id}`}
            >
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
                            priority={priority}
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
                        <Heart />
                        {product?._count.record}
                    </Quantity>
                </div>
            </Anchor>
        </article>
    );
};

export default Item;
