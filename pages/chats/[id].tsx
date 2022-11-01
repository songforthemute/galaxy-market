import type { NextPage } from "next";
import { Fragment } from "react";
import Layout from "@components/layout";
import Messages from "@components/message";
import Sending from "@components/sendingMessage";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Message } from "@prisma/client";
import useUser from "@libs/client/useUser";

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
}

const ChatDetail: NextPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const [send, { loading }] = useMutation(
        `/api/message/${router.query.id}`,
        "POST"
    );

    const { register, handleSubmit, reset } = useForm<SendingForm>();
    const _onValid = ({ message }: SendingForm) => {
        send({ message });
        reset();
    };

    const { data } = useSWR<MessagesReturn>(`/api/message/${router.query.id}`);

    return (
        <Layout title={"메시지"} canGoBack>
            <div className="p-4 pb-20 space-y-4">
                {data?.status === true ? (
                    data?.messages?.map((message) => (
                        <Messages
                            avatarUrl={
                                message.messagedBy.avatarUrl || undefined
                            }
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
                    />
                </form>
            </div>
        </Layout>
    );
};

export default ChatDetail;
