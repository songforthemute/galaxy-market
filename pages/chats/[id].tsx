import type { NextPage } from "next";
import { Fragment } from "react";
import Layout from "@components/layout";
import Message from "@components/message";
import Sending from "@components/sendingMessage";
import useUser from "@libs/client/useUser";

const ChatDetail: NextPage = () => {
    const { user } = useUser();

    return (
        // 스테이트로 유저 네임 동적 할당
        <Layout title={"메시지"} canGoBack>
            <div className="p-4 pb-20 space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((v, i) => (
                    <Fragment key={i}>
                        <Message text="올려 둔 상품 얼마에 판매하시나요?" />
                        <Message
                            text="130,000원까지 생각하고 있어요!"
                            isReverse={true}
                        />
                        <Message text="오!" />
                    </Fragment>
                ))}

                <Sending placeholder="Write here sending message..." />
            </div>
        </Layout>
    );
};

export default ChatDetail;
