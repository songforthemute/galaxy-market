import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { Product, Record } from "@prisma/client";

interface ProductWithLikes extends Product {
    _count: { record: number };
}

interface RecordWithProduct extends Record {
    product: ProductWithLikes;
}

interface RecordReturn {
    status: boolean;
    record: RecordWithProduct[];
}

const Like: NextPage = () => {
    const { data } = useSWR<RecordReturn>("/api/users/me/record?kind=Like");

    return (
        <Layout title="관심목록" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {data ? (
                    data.record?.map((like) => (
                        <Item
                            name={like.product.name}
                            price={like.product.price}
                            likes={like.product._count.record}
                            key={like.id}
                            href={`/products/${like.product.id}`}
                        />
                    )) // Skeleton Loading Component
                ) : (
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

export default Like;
