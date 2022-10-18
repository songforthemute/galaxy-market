import HelperBtn from "@components/helperBtn";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    const user = useUser();

    return (
        <Layout title="홈" hasTabBar canGoBack hasConfig>
            <Head>
                <title>Home - GalaxyMarket</title>
            </Head>
            <div className="flex flex-col divide-y-[1px]">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Item
                        href="/items/1"
                        name="iPhone 14 Pro Max"
                        opt="Deep purple"
                        price={"130000"}
                        likes={2}
                        reply={0}
                        key={i}
                    />
                ))}

                <HelperBtn href="/items/upload">
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
