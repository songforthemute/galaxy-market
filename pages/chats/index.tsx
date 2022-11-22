import { Suspense, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Message } from "@prisma/client";
// custom hooks
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollDown } from "@libs/client/useInfiniteScroll";
// utils
import { dateConverter } from "@libs/client/util";
import Layout from "@components/layout";
import SkeletonUserCard from "@components/skeleton/userCard";

// dynamic imports
const UserCard = dynamic(() => import("@components/userCard"), {
    ssr: false,
    suspense: true,
});

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
            <div className="divide-y-[1px] divide-slate-100">
                {messages.map((message) => (
                    <Suspense fallback={<SkeletonUserCard />} key={message.id}>
                        <UserCard
                            key={message.id}
                            text={`마지막으로 받은 메시지: ${dateConverter(
                                message.created
                            )}`}
                            avatarUrl={message.messagedBy.avatarUrl}
                            username={message.messagedBy.username}
                            type="message"
                            href={`/chats/${message.messagedBy.id}`}
                        />
                    </Suspense>
                ))}
            </div>
        </Layout>
    );
};

export default Chats;
