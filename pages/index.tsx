import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Product } from "@prisma/client";
// hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// components
import Layout from "@components/layout";
import { FloatingAnchor } from "@components/Molecules";
import { Add } from "@components/Atoms";
const ItemCard = dynamic(() => import("@components/Organisms/ItemCard"));

interface ProductsWithLike extends Product {
    _count: {
        record: number;
    };
}

interface ItemsInterface {
    status: boolean;
    products: ProductsWithLike[];
    pageNum: number;
    error?: string | any;
}

const Home: NextPage = () => {
    const getKey = useGetKey<ItemsInterface>({
        url: "/api/products",
        hasQuery: false,
    });

    const { data, setSize } = useSWRInfinite<ItemsInterface>(getKey);
    const page = useInfiniteScrollDown();

    const [items, setItems] = useState<ProductsWithLike[]>([]);

    // page number configuration
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // recevie & connect database for mount
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setItems(() => data?.map((data) => data?.products).flat());
        } else {
            setItems([]);
        }
    }, [data]);

    return (
        <Layout title="홈" hasTabBar canGoBack hasConfig>
            <section className="flex flex-col divide-y-[1px]">
                {items.map((item) => (
                    <ItemCard product={item} key={`item-${item?.id}`} />
                ))}
            </section>

            <FloatingAnchor href="/products/upload"></FloatingAnchor>
        </Layout>
    );
};

export default Home;
