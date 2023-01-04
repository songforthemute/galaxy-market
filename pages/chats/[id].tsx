import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWRInfinite from "swr/infinite";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Message } from "@prisma/client";
// utils
import {
    useUser,
    useGetKey,
    useMutation,
    useInfiniteScrollUp,
} from "@libs/client";
// components
import { Layout, ChatInput } from "components";
// dynamic components
const ChatBubble = dynamic(() => import("@components/Molecules/ChatBubble"));

// interfaces
interface SendingForm {
    message: string;
}
interface MessageWithUser extends Message {
    messagedBy: {
        id: number;
        avatarUrl?: string | null;
        username: string;
    };
}
interface MessagesReturn {
    status: boolean;
    messages: MessageWithUser[];
    pageNum: number;
    error?: string;
}

// Page
const ChatDetail: NextPage = () => {
    const { query } = useRouter();
    const { user } = useUser();

    // fetch prev messages
    const getKey = useGetKey<MessagesReturn>({
        url: query.id ? `/api/message/${query.id}` : null,
        hasQuery: false,
    });
    const { data, mutate, setSize } = useSWRInfinite<MessagesReturn>(getKey, {
        refreshInterval: 2000,
    });

    // set page number for infinite scroll
    const page = useInfiniteScrollUp();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // sending message - submit
    const [sending, { loading }] = useMutation({
        url: `/api/message/${query.id}`,
        method: "POST",
    });
    const { register, handleSubmit, reset } = useForm<SendingForm>();
    const _onSubmit = ({ message }: SendingForm) => {
        if (loading) return;

        // ISSUE: 스크롤위치가 최하단이 아닌데서 메시지 전송시 위로 한번 갔다가옴..
        // 초기 로딩시 스크롤 바닥으로 안가는 에러 있음..
        mutate(
            (prev) =>
                prev && [
                    {
                        status: true,
                        messages: [
                            {
                                id: Date.now(),
                                text: message,
                                created: new Date(),
                                updated: new Date(),
                                messagedById: user?.id as number,
                                messagedToId: Number(query.id),
                                messagedBy: {
                                    username: user?.username as string,
                                    id: user?.id as number,
                                    avatarUrl: user?.avatarUrl,
                                },
                            },
                        ],
                        pageNum: 0,
                    },
                    ...prev,
                ],
            false
        );

        sending({ message });
        scrollTo({
            top: Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            ),
            behavior: "smooth",
        });

        reset();
    };

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
        <Layout
            title={"메시지 주고받기"}
            backwardButton
            configTab
            metaContent="Chat page on the Messages tab. You can send and receive messages with sellers or buyers."
        >
            <div className="w-full mx-auto md:max-w-7xl p-4 pb-20 space-y-4">
                {messages.length > 0 &&
                    messages
                        .reverse()
                        .map((v) => (
                            <ChatBubble
                                avatarUrl={v.messagedBy.avatarUrl}
                                date={v.created}
                                key={`chat_${v.id}`}
                                isMine={v.messagedById === user?.id}
                                text={v.text}
                            />
                        ))}

                <form onSubmit={handleSubmit(_onSubmit)}>
                    <ChatInput
                        register={register("message", {
                            required: "반드시 입력해야하는 필드입니다.",
                        })}
                        id="message"
                        placeholder="전송할 메세지를 입력해주세요."
                        required
                        loading={loading}
                    />
                </form>
            </div>
        </Layout>
    );
};

export default ChatDetail;
