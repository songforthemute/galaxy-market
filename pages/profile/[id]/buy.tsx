import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Product, Record } from "@prisma/client";
// hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// components
import Layout from "@components/layout";
import { Anchor } from "@components/Atoms";
const Item = dynamic(() => import("@components/Organisms/ItemCard"));

interface ProductsWithLike extends Product {
    _count: {
        record: number;
    };
}

interface RecordsWithProducts extends Record {
    product: ProductsWithLike;
}

interface ItemsInterface {
    status: boolean;
    products: RecordsWithProducts[];
    pageNum: number;
    error?: string | any;
}

const Likes: NextPage = () => {
    const {
        query: { id },
    } = useRouter();

    const getKey = useGetKey<ItemsInterface>({
        url: `/api/products/filter?id=${id}&kind=Buy`,
        hasQuery: true,
    });

    const { data, setSize } = useSWRInfinite<ItemsInterface>(getKey);
    const page = useInfiniteScrollDown();

    const [items, setItems] = useState<RecordsWithProducts[]>([]);

    // page number configuration
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // recevie & connect database for mount
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setItems(() => data.map((data) => data.products).flat());
        } else {
            setItems([]);
        }
    }, [data]);

    return (
        <Layout title="구매내역" hasTabBar canGoBack hasConfig>
            <section className="flex flex-col divide-y-[1px]">
                {items.map((item) => (
                    <Anchor
                        href={`/products/${item.product.id}`}
                        key={`item-${item?.product.id}`}
                    >
                        <button
                            className="transition duration-300 w-full hover:opacity-high hover:bg-achroma-light hover:shadow-inner
                            focus:outline-none focus:opacity-high focus:bg-achroma-light focus:shadow-inner"
                        >
                            <Item product={item.product} />
                        </button>
                    </Anchor>
                ))}
            </section>
        </Layout>
    );
};

export default Likes;
