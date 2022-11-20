import { useEffect, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
// type
import type { NextPage } from "next";
import type { Product } from "@prisma/client";
// custom hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// components
import Layout from "@components/layout";
import HelperBtn from "@components/helperBtn";
import SkeletonItem from "@components/skeleton/item";

// dynamic imports
const Item = dynamic(() => import("@components/item"), {
    ssr: false,
    suspense: true,
});

// interfaces
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

// Page
const Home: NextPage = () => {
    // fetch Data
    const getKey = useGetKey<ProductsReturn>({
        url: `/api/products`,
        hasQuery: false,
    });
    const { data, setSize } = useSWRInfinite<ProductsReturn>(getKey);

    // set page number for infinite sroll
    const page = useInfiniteScrollDown();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // changed received dataset
    const [products, setProducts] = useState<ProductWithLike[]>([]);
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setProducts(() => data.map((data) => data.products).flat());
        } else {
            setProducts([]);
        }
    }, [data]);

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
