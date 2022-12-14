// types
import type { Product } from "@prisma/client";
// styles
import s from "./Item.module.css";
// components
import { Heart, Img, Quantity, Text } from "@components/Atoms";
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
    return (
        <article className={s.root}>
            {product?.image ? (
                <Img src={product.image} className={s.image} priority={true} />
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
        </article>
    );
};

export default Item;
