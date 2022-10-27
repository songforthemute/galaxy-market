import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";

const Like: NextPage = () => {
    return (
        <Layout title="관심목록" hasTabBar canGoBack>
            <div className="flex flex-col divide-y-[1px]">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Item
                        name="아이폰 14 프로 맥스"
                        opt="Deep purple"
                        price={130000}
                        likes={2}
                        key={i}
                        href={"/items/2"}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Like;
