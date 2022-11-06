import HelperBtn from "@components/helperBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useGetKey from "@libs/client/useGetKey";
import useSWRInfinite from "swr/infinite";
import useInfiniteScroll from "@libs/client/useInfiniteScroll";
import { useEffect } from "react";

interface ProductWithLike extends Product {
    _count: {
        record: number;
    };
}

interface ProductsReturn {
    status: boolean;
    products: ProductWithLike[];
    pageNum: number;
    error?: string;
}

const Home: NextPage = () => {
    const getKey = useGetKey<ProductsReturn>({
        url: `/api/products`,
        hasQuery: false,
    });
    const { data, setSize } = useSWRInfinite<ProductsReturn>(getKey);
    const page = useInfiniteScroll();

    const products = !data?.[0]?.error
        ? data?.map((data) => data.products).flat()
        : undefined;

    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    return (
        <Layout title="홈" hasTabBar canGoBack hasConfig>
            <Head>
                <title>Home - GalaxyMarket</title>
            </Head>

            <div className="flex flex-col divide-y-[1px]">
                {data && products ? (
                    products?.map((product) => (
                        <Item
                            href={`/products/${product.id}`}
                            name={product.name}
                            opt={product.option}
                            price={product.price}
                            likes={product._count.record}
                            key={product.id}
                        />
                    ))
                ) : (
                    // Skeleton Loading Component
                    <div className="p-4 flex w-full flex-1 flex-col items-center mb-8 transition-all">
                        <div className="w-full animate-pulse flex-row items-center justfiy-center space-y-4">
                            <div className="flex flex-row items-start">
                                <div className="h-24 w-24 mr-4 rounded-md bg-slate-200" />
                                <div className="h-24 w-full rounded-md bg-slate-200" />
                            </div>
                            <div className="flex flex-row items-start">
                                <div className="h-24 w-24 mr-4 rounded-md bg-slate-100" />
                                <div className="h-24 w-full rounded-md bg-slate-100" />
                            </div>
                        </div>
                    </div>
                )}

                <HelperBtn href="/products/upload">
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </HelperBtn>
            </div>
        </Layout>
    );
};

export default Home;
