import HelperBtn from "@components/helperBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";

interface ProductsReturn {
    status: boolean;
    products: Product[];
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
                {data?.products?.map((product) => (
                    <Item
                        href={`/products/${product.id}`}
                        name={product.name}
                        opt="Deep purple"
                        price={product.price}
                        likes={2}
                        reply={0}
                        key={product.id}
                    />
                ))}

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
