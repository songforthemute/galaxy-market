import type { NextPage } from "next";
import Layout from "@components/layout";
import { Product, Record } from "@prisma/client";
import { useRouter } from "next/router";
import useGetKey from "@libs/client/useGetKey";
import useSWRInfinite from "swr/infinite";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import SkeletonItem from "@components/skeleton/item";

const Item = dynamic(() => import("@components/item"), {
    ssr: false,
    suspense: true,
});

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

const Buy: NextPage = () => {
    const {
        query: { id },
    } = useRouter();
    const getKey = useGetKey<RecordReturn>({
        url: `/api/users/me/record?id=${id}&kind=Buy`,
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
        <Layout title="구매내역" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {records?.map((buy) => (
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
