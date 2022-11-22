import { useEffect, Suspense, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import useSWRInfinite from "swr/infinite";
// types
import type { NextPage } from "next";
import type { Message } from "@prisma/client";
// custom hooks
import useUser from "@libs/client/useUser";
import useGetKey from "@libs/client/useGetKey";
import useMutation from "@libs/client/useMutation";
import { useInfiniteScrollUp } from "@libs/client/useInfiniteScroll";
// components
import Layout from "@components/layout";
import SendingMessageForm from "@components/sendingForm";
import SkeletonMessageBody from "@components/skeleton/message";

// dynamic imports
const MessageBody = dynamic(() => import("@components/message"), {
    ssr: false,
    suspense: true,
});

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
    const router = useRouter();
    const { user } = useUser();

    // fetch prev messages
    const getKey = useGetKey<MessagesReturn>({
        url: router.query.id ? `/api/message/${router.query.id}` : null,
        hasQuery: false,
    });
    const { data, mutate, setSize } = useSWRInfinite<MessagesReturn>(getKey, {
        refreshInterval: 1000,
    });

    // set page number for infinite scroll
    const page = useInfiniteScrollUp();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // sending message - submit
    const [send, { loading }] = useMutation({
        url: `/api/message/${router.query.id}`,
        method: "POST",
    });
    const { register, handleSubmit, reset } = useForm<SendingForm>();
    const _onValid = ({ message }: SendingForm) => {
        if (loading) return;

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
                                messagedToId: Number(router.query.id),
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

        send({ message });
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
        <Layout title={"메시지"} canGoBack>
            <div className="p-4 pb-20 space-y-4">
                {messages.length > 0 &&
                    messages.reverse().map((message) => (
                        <Suspense
                            fallback={
                                <SkeletonMessageBody
                                    isReverse={
                                        message.messagedById === user?.id
                                    }
                                />
                            }
                            key={message.id}
                        >
                            <MessageBody
                                avatarUrl={message.messagedBy.avatarUrl}
                                key={message.id}
                                text={message.text}
                                isReverse={message.messagedById === user?.id}
                                createdAt={message.created}
                            />
                        </Suspense>
                    ))}

                <form onSubmit={handleSubmit(_onValid)}>
                    <SendingMessageForm
                        register={register("message", { required: true })}
                        placeholder="메시지를 입력해주세요."
                        isLoading={loading}
                    >
                        {loading ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                />
                            </svg>
                        )}
                    </SendingMessageForm>
                </form>
            </div>
        </Layout>
    );
};

export default ChatDetail;
