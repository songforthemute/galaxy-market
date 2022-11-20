import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Product } from "@prisma/client";
// custom hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// util
import { cls } from "@libs/client/util";
// components
import Layout from "@components/layout";
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
interface SearchReturn {
    status: boolean;
    result: ProductWithLike[];
    pageNum: number;
    error?: string;
}

// Page
const Search: NextPage = () => {
    const router = useRouter();
    // fatch data
    const getKey = useGetKey<SearchReturn>({
        url: router.query.name
            ? `/api/search?name=${router.query.name}&lowestPrice=${router.query.lowestPrice}&highestPrice=${router.query.highestPrice}&sort=${router.query.sort}`
            : null,
        hasQuery: true,
    });
    const { data, setSize } = useSWRInfinite<SearchReturn>(getKey);

    // set page number for infinite sroll
    const page = useInfiniteScrollDown();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // changed received dataset
    const [results, setResults] = useState<ProductWithLike[]>([]);
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setResults(() => data.map((data) => data.result).flat());
        } else {
            setResults([]);
        }
    }, [data]);

    // event handler
    const _onClick = () => {
        router.push("/search/opts");
    };

    return (
        <Layout title="검색" hasTabBar canGoBack hasConfig>
            <div className="flex flex-col divide-y-[1px]">
                {results.map((result) => (
                    <Suspense fallback={<SkeletonItem />} key={result.id}>
                        <Item
                            key={result.id}
                            href={`/products/${result.id}`}
                            name={result.name}
                            opt={result.option}
                            price={result.price}
                            likes={result._count.record}
                            imageUrl={result.image}
                        />
                    </Suspense>
                ))}

                <button
                    onClick={_onClick}
                    className={cls(
                        "fixed bottom-28 right-4 shadow-xl border-transparent bg-purple-400 rounded-full p-4 text-white hover:bg-purple-700 transition-colors",
                        data ? "hover:animate-bounce" : "animate-bounce"
                    )}
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </Layout>
    );
};

export default Search;
