import type { NextPage } from "next";
import Layout from "@components/layout";
import useSWR from "swr";
import Item from "@components/item";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";
import { cls } from "@libs/client/util";

interface ProductWithLikes extends Product {
    _count: {
        record: number;
    };
}

interface SearchReturn {
    status: boolean;
    result: ProductWithLikes[];
}

const Search: NextPage = () => {
    const router = useRouter();
    const { data } = useSWR<SearchReturn>(
        router.query.name
            ? `/api/search?name=${router.query.name}&lowestPrice=${router.query.lowestPrice}&highestPrice=${router.query.highestPrice}&sort=${router.query.sort}`
            : null
    );

    const _onClick = () => {
        router.push("/search/opts", "/search");
    };

    return (
        <Layout title="검색" hasTabBar canGoBack hasConfig>
            <div className="flex flex-col divide-y-[1px]">
                {data ? (
                    data.result ? (
                        data.result.map((product) => (
                            <Item
                                key={product.id}
                                href={`/products/${product.id}`}
                                name={product.name}
                                opt={product.option}
                                price={product.price}
                                likes={product._count.record}
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
                            </div>
                        </div>
                    )
                ) : null}
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