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
                        text={message.text}
                {data?.status === true ? (
                    data?.messages.map((message) => (
                        <UserCard
                            key={message.id}
                            username={message.messagedBy.username}
                            type="message"
                            href={`/chats/${message.messagedBy.id}`}
                        />
                    ))
                ) : (
                    // Skeleton Loading Component
                    <div className="p-4 flex w-full flex-1 flex-col items-center mb-8 transition-all">
                        <div className="w-full animate-pulse flex-row items-center justfiy-center space-y-4">
                            <div className="flex flex-row items-start">
                                <div className="h-16 w-16 mr-4 rounded-md bg-slate-200" />
                                <div className="h-24 w-full rounded-md bg-slate-200" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Chats;
