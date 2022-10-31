import type { NextPage } from "next";
import Layout from "@components/layout";
import UserCard from "@components/userCard";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Message } from "@prisma/client";

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
}

const Chats: NextPage = () => {
    const { user } = useUser();
    const { data } = useSWR<MessageListReturn>(`/api/message?id=${user?.id}`);

    console.log(data);

    return (
        <Layout title="메시지" hasTabBar canGoBack hasConfig>
            <div className="divide-y-[1px] divide-slate-100">
                {data?.messages.map((message) => (
                    <UserCard
                        key={message.id}
                        text={message.text}
                        username={message.messagedBy.username}
                        type="message"
                        href={`/chats/${message.messagedById}`}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Chats;
