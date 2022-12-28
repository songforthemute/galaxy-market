import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Message } from "@prisma/client";
// utils
import {
    convertDate,
    useInfiniteScrollDown,
    useGetKey,
    useFocusEvent,
} from "@libs/client";
// components
import { Layout, Anchor, ProfileCard } from "components";

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
    const { onKeyDownEnter } = useFocusEvent("parent");
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
        <Layout title="메시지" backwardButton dockBar configTab>
            <section className="flex flex-col divide-y-[1px] divide-achroma-light w-full mx-auto">
                {messages.map((v) => (
                    <Anchor
                        className="p-2"
                        key={v.id}
                        href={`/chats/${v.messagedBy.id}`}
                    >
                        <ProfileCard
                            onKeyDown={onKeyDownEnter}
                            tabIndex={0}
                            avatar={v.messagedBy.avatarUrl}
                            username={v.messagedBy.username}
                            subtext={`마지막으로 받은 메시지: ${convertDate(
                                v.created
                            )}`}
                        />
                    </Anchor>
                ))}
            </section>
        </Layout>
    );
};

export default Chats;
