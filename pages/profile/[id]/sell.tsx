import { useRouter } from "next/router";
import { useEffect, Suspense, useState } from "react";
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
const Sold: NextPage = () => {
    const {
        query: { id },
    } = useRouter();

    // fetch data
    const getKey = useGetKey<RecordReturn>({
        url: `/api/users/me/record?id=${id}&kind=Sell`,
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
        <Layout title="판매내역" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {records.map((sell) => (
                    <Suspense fallback={<SkeletonItem />} key={sell.id}>
                        <Item
                            imageUrl={sell.product.image}
                            name={sell.product.name}
                            opt={sell.product.option}
                            price={sell.product.price}
                            likes={sell.product._count.record}
                            key={sell.id}
                            href={`/products/${sell.product.id}`}
                        />
                    </Suspense>
                ))}
            </div>
        </Layout>
    );
};

export default Sold;
