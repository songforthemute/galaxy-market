import type { NextPage } from "next";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Buy: NextPage = () => {
    return (
        <Layout title="구매내역" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Item
                        name="아이폰 14 프로 맥스"
                        opt="Deep purple"
                        price="130000"
                        reply={0}
                        likes={2}
                        key={i}
                        href={"/items/2"}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Buy;
