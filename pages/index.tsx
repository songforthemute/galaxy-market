import HelperBtn from "@components/helperBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";

interface ProductWithLike extends Product {
    _count: {
        record: number;
    };
}

interface ProductsReturn {
    status: boolean;
    products: ProductWithLike[];
}

const Home: NextPage = () => {
    const user = useUser();
    const { data } = useSWR<ProductsReturn>("/api/products");

    console.log(data);

    return (
        <Layout title="홈" hasTabBar canGoBack hasConfig>
            <Head>
                <title>Home - GalaxyMarket</title>
            </Head>

            <div className="flex flex-col divide-y-[1px]">
                {data?.products ? (
                    data?.products?.map((product) => (
                        <Item
                            href={`/products/${product.id}`}
                            name={product.name}
                            opt="Deep purple"
                            price={product.price}
                            likes={product._count.record}
                            key={product.id}
                        />
                    ))
                ) : (
                    // Skeleton Loading Component
                    <div className="p-4 flex w-full flex-1 flex-col items-center mb-8 transition-all">
                        <div className="w-full animate-pulse flex-row items-center justfiy-center space-y-4">
                            <div className="flex flex-row items-start">
                                <div className="h-24 w-24 mr-4 rounded-md bg-gray-200" />
                                <div className="h-24 w-full rounded-md bg-gray-200" />
                            </div>
                        </div>
                    </div>
                )}

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
