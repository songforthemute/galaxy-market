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
import { FloatingButton } from "@components/Molecules";
import { Add, Anchor } from "@components/Atoms";
const Item = dynamic(() => import("@components/Organisms/ItemCard"));

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
        url: "api/products",
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
            setItems(() => data?.map((data) => data.products).flat());
        } else {
            setItems([]);
        }
    }, [data]);

    return (
        <Layout title="홈" hasTabBar canGoBack hasConfig>
            <section className="flex flex-col divide-y-[1px] -mb-8">
                {items.map((item) => (
                    <Anchor
                        href={`/products/${item.id}`}
                        key={`item-${item?.id}`}
                    >
                        <button
                            className="transition duration-300 w-full hover:opacity-high hover:bg-achroma-light hover:shadow-inner
                            focus:outline-none focus:opacity-high focus:bg-achroma-light focus:shadow-inner"
                        >
                            <Item product={item} />
                        </button>
                    </Anchor>
                ))}
            </section>

            <FloatingButton>
                <Anchor
                    className="flex aspect-square w-full rounded-full items-center justify-center"
                    href="/products/upload"
                >
                    <Add className="mx-auto" />
                </Anchor>
            </FloatingButton>
        </Layout>
    );
};

export default Home;
