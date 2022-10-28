import type { NextPage } from "next";
import Btn from "@components/btn";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostingFormInterface {
    title: string;
    description: string;
}

interface PostingReturn {
    status: boolean;
    post: Post;
}

const Posting: NextPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<PostingFormInterface>();
    const [post, { loading, data }] = useMutation<PostingReturn>("/api/posts");
    const _onValid = (data: PostingFormInterface) => {
        if (loading) return;

        post(data);
    };

    useEffect(() => {
        // sending user to 'community/data.post.id' (warp user to correspond posting)
        if (data && data.status) {
            router.push(`/community/${data.post.id}`);
        }
    }, [data, router]);

    return (
        <Layout title="질문하기" hasTabBar canGoBack>
            <form onSubmit={handleSubmit(_onValid)} className="p-4">
                <Input
                    register={register("title", {
                        required: true,
                        minLength: {
                            value: 2,
                            message: "2~32자 사이로 입력해주세요.",
                        },
                        maxLength: {
                            value: 32,
                            message: "2~32자 사이로 입력해주세요.",
                        },
                    })}
                    name="title"
                    label="제목"
                    required
                    placeholder="제목을 적어주세요."
                />

                <TxtArea
                    register={register("description", {
                        maxLength: {
                            value: 4000,
                            message: "4000자 이내로 입력해주세요.",
                        },
                    })}
                    name="description"
                    label="내용"
                    placeholder="궁금한 내용을 적어주세요."
                />

                <Btn
                    text={
                        loading
                            ? "포스팅을 업로드하고 있어요."
                            : "질문 업로드하기"
                    }
                />
            </form>
        </Layout>
    );
};

export default Posting;
