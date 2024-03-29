import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Product, Record } from "@prisma/client";
// hooks
import { useGetKey, useInfiniteScrollDown } from "@libs/client";
// components
import { Layout, LoadingSuspense } from "components";
// dynamic components
const ItemCard = dynamic(() => import("@components/Organisms/ItemCard"), {
    loading: () => <LoadingSuspense />,
});

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
        url: `/api/products/filter?id=${id}&kind=Sell`,
        hasQuery: true,
    });

    const { data, setSize } = useSWRInfinite<ItemsInterface>(getKey);
    const page = useInfiniteScrollDown();

    const [items, setItems] = useState<RecordsWithProducts[] | undefined>();

    // page number configuration
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // recevie & connect database for mount
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setItems(() => data.map((data) => data.products).flat());
        }
    }, [data]);

    return (
        <Layout
            title="판매내역"
            backwardButton
            configTab
            metaContent="This is the Sales History page on the Profiles tab. You can view a list of the user's sales products."
        >
            <section className="flex flex-col divide-y-[1px]">
                {items?.map((item, index) => (
                    <ItemCard
                        key={`item-${item?.product.id}-${index}`}
                        product={item?.product}
                    />
                ))}
            </section>
        </Layout>
    );
};

export default Likes;
