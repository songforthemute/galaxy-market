import Layout from "@components/layout";
import type { NextPage } from "next";
import Item from "@components/item";
import { Product, Record } from "@prisma/client";
import { useRouter } from "next/router";
import useGetKey from "@libs/client/useGetKey";
import useSWRInfinite from "swr/infinite";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
import { useEffect } from "react";

interface ProductWithLikes extends Product {
    _count: { record: number };
}

interface RecordWithProduct extends Record {
    product: ProductWithLikes;
}

interface RecordReturn {
    status: boolean;
    record: RecordWithProduct[];
    pageNum: number;
    error?: string;
}

const Sold: NextPage = () => {
    const {
        query: { id },
    } = useRouter();
    const getKey = useGetKey<RecordReturn>({
        url: `/api/users/me/record?id=${id}&kind=Sell`,
        hasQuery: true,
    });
    const { data, setSize } = useSWRInfinite<RecordReturn>(getKey);
    const page = useInfiniteScrollDown();

    const records = !data?.[0]?.error
        ? data?.map((data) => data.record).flat()
        : undefined;

    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    return (
        <Layout title="판매내역" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {data && records ? (
                    records?.map((sell) => (
                        <Item
                            name={sell.product.name}
                            opt={sell.product.option}
                            price={sell.product.price}
                            likes={sell.product._count.record}
                            key={sell.id}
                            href={`/products/${sell.product.id}`}
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
                )}
            </div>
        </Layout>
    );
};

export default Sold;
