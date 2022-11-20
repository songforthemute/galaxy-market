import { useEffect, Suspense, useState } from "react";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
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
const Like: NextPage = () => {
    const {
        query: { id },
    } = useRouter();
    // fetch data
    const getKey = useGetKey<RecordReturn>({
        url: `/api/users/me/record?id=${id}&kind=Like`,
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
        <Layout title="관심목록" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {records.map((like) => (
                    <Suspense fallback={<SkeletonItem />} key={like.id}>
                        <Item
                            imageUrl={like.product.image}
                            name={like.product.name}
                            opt={like.product.option}
                            price={like.product.price}
                            likes={like.product._count.record}
                            key={like.id}
                            href={`/products/${like.product.id}`}
                        />
                    </Suspense>
                ))}
            </div>
        </Layout>
    );
};

export default Like;
