import type { NextPage } from "next";
import Layout from "../../components/layout";
import UserCard from "../../components/userCard";

const Chats: NextPage = () => {
    return (
        <Layout title="메시지" hasTabBar canGoBack hasConfig>
            <div className="divide-y-[1px] divide-gray-100">
                {[1, 2, 3, 4, 5].map((v, i) => (
                    <UserCard
                        text="See you tomorrow in the corner at 11:00!"
                        username="조이"
                        type="message"
                        key={i}
                        href={"/chats/1"}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Chats;
