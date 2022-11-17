import Layout from "@components/layout";
import type { NextPage } from "next";
import { Product, Record } from "@prisma/client";
import { useRouter } from "next/router";
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
                {records?.map((sell) => (
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
