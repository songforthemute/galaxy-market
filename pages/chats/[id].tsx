import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "@components/layout";
import Messages from "@components/message";
import Sending from "@components/sendingMessage";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { Message } from "@prisma/client";
import useUser from "@libs/client/useUser";
import useSWRInfinite from "swr/infinite";
import useGetKey from "@libs/client/useGetKey";
import { useInfiniteScrollUp } from "@libs/client/useInfiniteScroll";
import { getImgSource } from "@libs/client/util";

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

const ChatDetail: NextPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const [send, { loading }] = useMutation({
        url: `/api/message/${router.query.id}`,
        method: "POST",
    });

    const page = useInfiniteScrollUp();
    const getKey = useGetKey<MessagesReturn>({
        url: router.query.id ? `/api/message/${router.query.id}` : null,
        hasQuery: false,
    });
    const { data, mutate, setSize } = useSWRInfinite<MessagesReturn>(getKey, {
        refreshInterval: 1000,
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
                        pageNum: 1,
                    },
                    ...prev,
                ],
            false
        );
        send({ message });
        reset();
    };

    const messages = !data?.[0]?.error
        ? data?.map((data) => data.messages).flat()
        : undefined;

    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    // 초기설정 - 맨 아래가 보이도록
    // 메시지 전송했을 경우 - 아래로 끌어내림
    useEffect(() => {
        if (data) {
            scrollTo({
                top:
                    document.body.scrollHeight ||
                    document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [data]); // messages로 설정시 에러

    return (
        <Layout title={"메시지"} canGoBack>
            <div className="p-4 pb-20 space-y-4">
                {data ? (
                    messages
                        ?.reverse()
                        .map((message) => (
                            <Messages
                                avatarUrl={message.messagedBy.avatarUrl}
                                key={message.id}
                                text={message.text}
                                isReverse={message.messagedById === user?.id}
                                createdAt={message.created}
                            />
                        ))
                ) : (
                    // Skeleton Loading Component
                    <div className="flex w-full flex-1 flex-col items-center mb-8 transition-all">
                        <div className="w-full animate-pulse flex-row items-center justfiy-center space-y-4">
                            <div className="flex flex-row items-start">
                                <div className="h-12 w-12 mr-4 rounded-md bg-slate-200" />
                                <div className="h-16 w-full rounded-md bg-slate-200" />
                            </div>
                            <div className="flex flex-row items-start">
                                <div className="h-16 mr-4 w-full rounded-md bg-slate-200" />
                                <div className="h-12 w-12 rounded-md bg-slate-200" />
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(_onValid)}>
                    <Sending
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
                    </Sending>
                </form>
            </div>
        </Layout>
    );
};

export default ChatDetail;
