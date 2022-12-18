import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Message } from "@prisma/client";
// custom hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// utils
import { convertDate } from "@libs/client/util";
import Layout from "@components/layout";
import { ProfileCard } from "@components/Molecules";
import { Anchor } from "@components/Atoms";

// interfaces
interface MessageWithUser extends Message {
    messagedBy: {
        id: number;
        username: string;
        avatarUrl?: string | null;
    };
}
interface MessageListReturn {
    status: boolean;
    messages: MessageWithUser[];
    pageNum: number;
    error?: string;
}

// Page
const Chats: NextPage = () => {
    // fetch messages list
    const getKey = useGetKey<MessageListReturn>({
        url: `/api/message`,
        hasQuery: false,
    });
    const { data, setSize } = useSWRInfinite<MessageListReturn>(getKey);

    // set page number for infinite scroll
    const page = useInfiniteScrollDown();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // received dataset
    const [messages, setMessages] = useState<MessageWithUser[]>([]);
    useEffect(() => {
        if (data && !data?.[0]?.error) {
            setMessages(() => data.map((data) => data.messages).flat());
        } else {
            setMessages([]);
        }
    }, [data]);

    return (
        <Layout title="메시지" hasTabBar canGoBack hasConfig>
            <section className="flex flex-col divide-y-[1px] divide-achroma-light w-full mx-auto">
                {messages.map((v) => (
                    <Anchor key={v.id} href={`/chats/${v.messagedBy.id}`}>
                        <button
                            className="p-4 transition duration-300 w-full hover:opacity-high hover:bg-achroma-light hover:shadow-inner
                            focus:outline-none focus:opacity-high focus:bg-achroma-light focus:shadow-inner"
                        >
                            <ProfileCard
                                avatar={v.messagedBy.avatarUrl}
                                username={v.messagedBy.username}
                                subtext={`마지막으로 받은 메시지: ${convertDate(
                                    v.created
                                )}`}
                            />
                        </button>
                    </Anchor>
                ))}
            </section>
        </Layout>
    );
};

export default Chats;
