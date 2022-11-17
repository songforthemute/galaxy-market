import HelperBtn from "@components/helperBtn";
import Layout from "@components/layout";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import useGetKey from "@libs/client/useGetKey";
import useSWRInfinite from "swr/infinite";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import SkeletonItem from "@components/skeleton/item";

const Item = dynamic(() => import("@components/item"), {
    ssr: false,
    suspense: true,
});

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
    const page = useInfiniteScrollDown();

    const products = !data?.[0]?.error
        ? data?.map((data) => data.products).flat()
        : undefined;

    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    return (
        <Layout title="홈" hasTabBar canGoBack hasConfig>
            <div className="flex flex-col divide-y-[1px]">
                {products?.map((product) => (
                    <Suspense fallback={<SkeletonItem />} key={product.id}>
                        <Item
                            href={`/products/${product.id}`}
                            name={product.name}
                            opt={product.option}
                            imageUrl={product.image}
                            price={product.price}
                            likes={product._count.record}
                            key={product.id}
                        />
                    </Suspense>
                ))}

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
