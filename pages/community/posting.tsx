import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
// types
import type { NextPage } from "next";
import type { Post } from "@prisma/client";
// custom hooks
import useMutation from "@libs/client/useMutation";
// utils
import { cls } from "@libs/client/util";
// components
import Btn from "@components/btn";
import Layout from "@components/layout";
import TxtArea from "@components/txtArea";
import Input from "@components/input";

// dynamic imports
const ErrorMessage = dynamic(() => import("@components/errMessage"), {
    ssr: false,
});

// interfaces
interface PostingFormInterface {
    title: string;
    description: string;
}
interface PostingReturn {
    status: boolean;
    post: Post;
}

// Page
const Posting: NextPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostingFormInterface>();

    // for fetch data
    const [post, { loading, data }] = useMutation<PostingReturn>({
        url: "/api/posts",
        method: "POST",
    });

    // submit form
    const _onValid = (form: PostingFormInterface) => {
        if (loading) return;

        post({ ...form, tag: dropdownValue });
    };

    // dropdown - tag
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("질문");
    const _onDropDownClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setDropdownValue((e.target as HTMLDivElement).innerHTML);
        setdropdownOpen(false);
    };

    // if success
    useEffect(() => {
        // sending user to 'community/data.post.id' (warp user to correspond posting)
        if (data && data.status) {
            router.push(`/community/${data.post.id}`);
        }
    }, [data, router]);

    return (
        <Layout title="질문하기" canGoBack>
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
                    isCheckOk={!Boolean(errors.title?.message)}
                />
                {errors.title && <ErrorMessage text={errors.title.message} />}

                {/* 드롭다운 */}
                <label
                    // htmlFor={name}
                    className="text-sm font-medium text-slate-400 block mb-1"
                >
                    탭
                </label>

                <div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="rounded-md shadow-md relative flex items-center my-2 hover:cursor-pointer hover:bg-slate-100 transition-all"
                >
                    <div className="px-4 py-2 overflow-hidden rounded-full flex justify-center items-center">
                        {dropdownValue}
                    </div>

                    <div
                        className={cls(
                            "absolute left-0 z-40 mt-2 w-full rounded-xl border-[.5px] border-light bg-white py-5 shadow-card transition-all",
                            dropdownOpen
                                ? `top-full opacity-100 visible`
                                : "top-[110%] invisible opacity-0"
                        )}
                    >
                        {["질문", "정보", "후기", "자유"].map((item, i) => (
                            <div
                                key={i}
                                onClick={_onDropDownClick}
                                className="block cursor-pointer py-2 px-5 text-sm font-medium hover:bg-opacity-5 hover:text-purple-400 hover:bg-purple-400 transition-all"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

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
                {errors.description && (
                    <ErrorMessage text={errors.description.message} />
                )}

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
