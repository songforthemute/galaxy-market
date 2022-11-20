import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Product, Record } from "@prisma/client";
// custom hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// components
import Layout from "@components/layout";
import SkeletonItem from "@components/skeleton/item";

// dynamic imports
const Item = dynamic(() => import("@components/item"), {
    ssr: false,
    suspense: true,
});

// interfaces
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

// Page
const Buy: NextPage = () => {
    const {
        query: { id },
    } = useRouter();
    // fetch data
    const getKey = useGetKey<RecordReturn>({
        url: `/api/users/me/record?id=${id}&kind=Buy`,
        hasQuery: true,
    });
    const { data, setSize } = useSWRInfinite<RecordReturn>(getKey);

    // set page number for infinite scroll
    const page = useInfiniteScrollDown();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // changed received dataset
    const [records, setRecords] = useState<RecordWithProduct[]>([]);
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setRecords(() => data.map((data) => data.record).flat());
        } else {
            setRecords([]);
        }
    }, [data]);

    return (
        <Layout title="구매내역" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {records.map((buy) => (
                    <Suspense fallback={<SkeletonItem />} key={buy.id}>
                        <Item
                            imageUrl={buy.product.image}
                            name={buy.product.name}
                            opt={buy.product.option}
                            price={buy.product.price}
                            likes={buy.product._count.record}
                            key={buy.id}
                            href={`/products/${buy.product.id}`}
                        />
                    </Suspense>
                ))}
            </div>
        </Layout>
    );
};

export default Buy;
